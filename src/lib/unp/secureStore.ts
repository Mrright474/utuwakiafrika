/**
 * Encryption-at-rest helper for on-device caches, with scheduled key rotation.
 *
 * Non-extractable AES-GCM keys are kept in IndexedDB, so raw key material never
 * touches localStorage and cannot be read back out by page scripts. Payloads are
 * stored as `v2:<generation>:<iv>:<ciphertext>` envelopes (legacy `v1:` envelopes
 * are still readable). Keys are rotated on a schedule; previous generations are
 * retained until every cached item has been re-encrypted, so rotation never
 * loses data.
 */

import { DEFAULT_KEY_ROTATION_INTERVAL_MS, getKeyRotationInterval } from '@/config/fieldEncryption';

const DB_NAME = 'unp_secure_store';
const DB_STORE = 'keys';
const LEGACY_KEY_ID = 'field_queue_key_v1';
const META_ID = 'field_queue_key_meta';
const keyId = (generation: number) => `field_queue_key_g${generation}`;

/**
 * Rotation interval is operator-configurable (clamped to safe bounds) — see
 * `src/config/fieldEncryption.ts`. Defaults to 30 days.
 */
export const KEY_ROTATION_INTERVAL_MS = DEFAULT_KEY_ROTATION_INTERVAL_MS;


export interface KeyMeta {
  generation: number;
  createdAt: string;
  /** Older generations kept around only so pending payloads stay readable. */
  retired: number[];
}

const openDb = (): Promise<IDBDatabase> =>
  new Promise((resolve, reject) => {
    const req = indexedDB.open(DB_NAME, 1);
    req.onupgradeneeded = () => {
      if (!req.result.objectStoreNames.contains(DB_STORE)) req.result.createObjectStore(DB_STORE);
    };
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });

const idb = async <T>(mode: IDBTransactionMode, run: (store: IDBObjectStore) => IDBRequest): Promise<T> => {
  const db = await openDb();
  return new Promise<T>((resolve, reject) => {
    const req = run(db.transaction(DB_STORE, mode).objectStore(DB_STORE));
    req.onsuccess = () => resolve(req.result as T);
    req.onerror = () => reject(req.error);
  }).finally(() => db.close());
};

const newKey = () =>
  crypto.subtle.generateKey({ name: 'AES-GCM', length: 256 }, false, ['encrypt', 'decrypt']);

let metaPromise: Promise<KeyMeta> | null = null;
const keyCache = new Map<number, CryptoKey>();

/** Loads (or bootstraps) the key metadata record describing the active generation. */
const getMeta = (): Promise<KeyMeta> => {
  if (!metaPromise) {
    metaPromise = (async () => {
      const existing = await idb<KeyMeta | undefined>('readonly', (s) => s.get(META_ID));
      if (existing) return existing;
      const meta: KeyMeta = { generation: 1, createdAt: new Date().toISOString(), retired: [] };
      const key = await newKey();
      await idb('readwrite', (s) => s.put(key, keyId(1)));
      await idb('readwrite', (s) => s.put(meta, META_ID));
      return meta;
    })().catch((err) => {
      metaPromise = null;
      throw err;
    });
  }
  return metaPromise;
};

const getKeyForGeneration = async (generation: number): Promise<CryptoKey | null> => {
  const cached = keyCache.get(generation);
  if (cached) return cached;
  const key = await idb<CryptoKey | undefined>('readonly', (s) => s.get(keyId(generation)));
  if (!key) return null;
  keyCache.set(generation, key);
  return key;
};

/** Legacy (pre-rotation) single key, used to read `v1:` envelopes. */
const getLegacyKey = () => idb<CryptoKey | undefined>('readonly', (s) => s.get(LEGACY_KEY_ID));

const toB64 = (buf: ArrayBuffer | Uint8Array) => {
  const bytes = buf instanceof Uint8Array ? buf : new Uint8Array(buf);
  let s = '';
  bytes.forEach((b) => (s += String.fromCharCode(b)));
  return btoa(s);
};

const fromB64 = (s: string) => Uint8Array.from(atob(s), (c) => c.charCodeAt(0));

export const encryptJson = async (value: unknown): Promise<string> => {
  const meta = await getMeta();
  const key = await getKeyForGeneration(meta.generation);
  if (!key) throw new Error('Encryption key unavailable');
  const iv = crypto.getRandomValues(new Uint8Array(12));
  const data = new TextEncoder().encode(JSON.stringify(value));
  const cipher = await crypto.subtle.encrypt({ name: 'AES-GCM', iv }, key, data);
  return `v2:${meta.generation}:${toB64(iv)}:${toB64(cipher)}`;
};

export const decryptJson = async <T>(envelope: string): Promise<T | null> => {
  try {
    const parts = envelope.split(':');
    let key: CryptoKey | null | undefined = null;
    let ivB64: string | undefined;
    let dataB64: string | undefined;

    if (parts[0] === 'v2') {
      [, , ivB64, dataB64] = parts;
      key = await getKeyForGeneration(Number(parts[1]));
    } else if (parts[0] === 'v1') {
      [, ivB64, dataB64] = parts;
      // Legacy envelopes predate rotation: try the old single key, then gen 1.
      key = (await getLegacyKey()) ?? (await getKeyForGeneration(1));
    }

    if (!key || !ivB64 || !dataB64) return null;
    const plain = await crypto.subtle.decrypt(
      { name: 'AES-GCM', iv: fromB64(ivB64) },
      key,
      fromB64(dataB64)
    );
    return JSON.parse(new TextDecoder().decode(plain)) as T;
  } catch {
    return null;
  }
};

/** Metadata about the active key: generation number and when it was created. */
export const getKeyMeta = async (): Promise<KeyMeta | null> => {
  if (!secureStoreAvailable()) return null;
  try {
    return await getMeta();
  } catch {
    return null;
  }
};

/** True when the active key is older than the configured rotation interval. */
export const keyRotationDue = async (intervalMs = getKeyRotationInterval()): Promise<boolean> => {
  const meta = await getKeyMeta();
  if (!meta) return false;
  return Date.now() - new Date(meta.createdAt).getTime() >= intervalMs;
};

/** Where a rotation attempt stopped, used for audit + retry decisions. */
export type RotationStage = 'unavailable' | 'key_create' | 'promote' | 're_encrypt' | 'cleanup' | 'done';

export interface RotationOutcome {
  rotated: boolean;
  from?: number;
  to?: number;
  reEncrypted?: number;
  error?: string;
  /** Stage the attempt reached (or failed at). */
  stage: RotationStage;
  /** True when the active generation was rolled back after a failure. */
  rolledBack?: boolean;
  /** Generations still held in IndexedDB so cached payloads stay readable. */
  retained?: number[];
  /** True when data is safe despite the failure (old keys retained). */
  dataSafe?: boolean;
}

/**
 * Rotates the device key and re-encrypts cached data under the new generation.
 *
 * Failure handling: the new key is created and promoted before re-encryption,
 * but *no* key material is destroyed until the rewrite succeeds. If the rewrite
 * throws, the active generation is rolled back to the previous one and every
 * generation (old + new) is retained, so cached payloads written under either
 * key remain readable and the caller can retry with backoff.
 */
export const rotateEncryptionKey = async (
  reEncrypt: (generation: number) => Promise<number>
): Promise<RotationOutcome> => {
  if (!secureStoreAvailable())
    return { rotated: false, stage: 'unavailable', error: 'Secure storage unavailable', dataSafe: true };

  let stage: RotationStage = 'key_create';
  let current: KeyMeta | null = null;
  let next: number | null = null;
  let promoted = false;

  try {
    current = await getMeta();
    next = current.generation + 1;

    // 1. Create + persist the new key while the old one is still active.
    const key = await newKey();
    await idb('readwrite', (s) => s.put(key, keyId(next)));
    keyCache.set(next, key);

    // 2. Promote it. Old generations stay in IndexedDB so nothing becomes
    //    unreadable if the re-encryption pass is interrupted.
    stage = 'promote';
    const meta: KeyMeta = {
      generation: next,
      createdAt: new Date().toISOString(),
      retired: [...current.retired, current.generation],
    };
    await idb('readwrite', (s) => s.put(meta, META_ID));
    metaPromise = Promise.resolve(meta);
    promoted = true;

    // 3. Rewrite cached payloads under the new key.
    stage = 're_encrypt';
    const reEncrypted = await reEncrypt(next);

    // 4. Only now discard retired key material.
    stage = 'cleanup';
    for (const gen of meta.retired) {
      await idb('readwrite', (s) => s.delete(keyId(gen)));
      keyCache.delete(gen);
    }
    await idb('readwrite', (s) => s.delete(LEGACY_KEY_ID));
    const cleaned: KeyMeta = { ...meta, retired: [] };
    await idb('readwrite', (s) => s.put(cleaned, META_ID));
    metaPromise = Promise.resolve(cleaned);

    return {
      rotated: true,
      stage: 'done',
      from: current.generation,
      to: next,
      reEncrypted,
      retained: [next],
      dataSafe: true,
    };
  } catch (err) {
    const error = err instanceof Error ? err.message : 'Unknown error';
    let rolledBack = false;
    const retained = new Set<number>();
    if (current) {
      current.retired.forEach((g) => retained.add(g));
      retained.add(current.generation);
    }
    if (promoted && next !== null) retained.add(next);

    // Roll the active generation back so new writes use the key the cache was
    // last written with; keep every key so nothing becomes unreadable.
    if (promoted && current) {
      try {
        const restored: KeyMeta = {
          generation: current.generation,
          createdAt: current.createdAt,
          retired: Array.from(retained).filter((g) => g !== current!.generation),
        };
        await idb('readwrite', (s) => s.put(restored, META_ID));
        metaPromise = Promise.resolve(restored);
        rolledBack = true;
      } catch {
        metaPromise = null;
      }
    } else {
      metaPromise = null;
    }

    return {
      rotated: false,
      stage,
      from: current?.generation,
      to: next ?? undefined,
      error,
      rolledBack,
      retained: Array.from(retained).sort((a, b) => a - b),
      // Data is safe as long as no key material was deleted, i.e. we never
      // reached (or completed) cleanup.
      dataSafe: stage !== 'cleanup',
    };
  }
};


/** True when the browser can actually protect the cache at rest. */
export const secureStoreAvailable = () =>
  typeof indexedDB !== 'undefined' && typeof crypto !== 'undefined' && !!crypto.subtle;
