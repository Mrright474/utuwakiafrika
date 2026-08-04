/**
 * Encryption-at-rest helper for on-device caches.
 *
 * A non-extractable AES-GCM key is generated once and kept in IndexedDB, so the
 * raw key material never touches localStorage and cannot be read back out by
 * page scripts. Payloads are stored as base64 `iv:ciphertext` envelopes.
 */

const DB_NAME = 'unp_secure_store';
const DB_STORE = 'keys';
const KEY_ID = 'field_queue_key_v1';

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

let keyPromise: Promise<CryptoKey> | null = null;

const getKey = (): Promise<CryptoKey> => {
  if (!keyPromise) {
    keyPromise = (async () => {
      const existing = await idb<CryptoKey | undefined>('readonly', (s) => s.get(KEY_ID));
      if (existing) return existing;
      const key = await crypto.subtle.generateKey({ name: 'AES-GCM', length: 256 }, false, [
        'encrypt',
        'decrypt',
      ]);
      await idb('readwrite', (s) => s.put(key, KEY_ID));
      return key;
    })().catch((err) => {
      keyPromise = null;
      throw err;
    });
  }
  return keyPromise;
};

const toB64 = (buf: ArrayBuffer | Uint8Array) => {
  const bytes = buf instanceof Uint8Array ? buf : new Uint8Array(buf);
  let s = '';
  bytes.forEach((b) => (s += String.fromCharCode(b)));
  return btoa(s);
};

const fromB64 = (s: string) => Uint8Array.from(atob(s), (c) => c.charCodeAt(0));

export const encryptJson = async (value: unknown): Promise<string> => {
  const key = await getKey();
  const iv = crypto.getRandomValues(new Uint8Array(12));
  const data = new TextEncoder().encode(JSON.stringify(value));
  const cipher = await crypto.subtle.encrypt({ name: 'AES-GCM', iv }, key, data);
  return `v1:${toB64(iv)}:${toB64(cipher)}`;
};

export const decryptJson = async <T>(envelope: string): Promise<T | null> => {
  try {
    const [version, ivB64, dataB64] = envelope.split(':');
    if (version !== 'v1' || !ivB64 || !dataB64) return null;
    const key = await getKey();
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

/** True when the browser can actually protect the cache at rest. */
export const secureStoreAvailable = () =>
  typeof indexedDB !== 'undefined' && typeof crypto !== 'undefined' && !!crypto.subtle;
