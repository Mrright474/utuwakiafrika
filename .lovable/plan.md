## Goal
Fix defective / mismatched images across the site and add a fitting image where one is missing, using freshly AI-generated artwork.

## Audit findings (from the codebase)

Static images currently referenced:

- **Hero** — `src/assets/hero-ubuntu-community.jpg` ✅ keep
- **About → Who We Are** — `helping-hands-bread.jpg` ✅ keep
- **About → Our Founder** — `/lovable-uploads/6e61272d…png` (needs verification — appears to be old uploaded portrait, often looks flat/defective on hero pages)
- **About → Where We Work** — `/lovable-uploads/f90b8fff…png` (generic PNG map, does not fit an African Ubuntu network aesthetic → replace + add fitting hero-style image)
- **Impact → Uganda Map** — `/lovable-uploads/b9465bc7…png` (generic map, low quality → replace with stylized African map illustration)
- **Impact → Annual Report** — `/lovable-uploads/b07d8f50…png` (report cover placeholder → replace with clean report mock)
- **Communities page** — uses `ubuntu-community-meeting.jpg`, `ubuntu-community-marketplace.jpg` ✅ keep
- **Index promo strip** — `/lovable-uploads/688ac280…png` (verify fit, replace if generic)
- **Programs → Future Projects / Program cards** — use `programsData` images (mixed; will audit each and replace any defective one)

Dynamic images (events, success stories, gallery, team) come from Supabase and are managed by admins — out of scope for this pass.

## Plan

1. **Visual audit** — spin up Playwright to capture the current renders of About/Impact/Home/Programs so I can confirm which images actually look broken/off-brand vs. acceptable.
2. **Generate replacements** with the image tool (photorealistic, Ubuntu/African community aesthetic, warm palette matching the site's red/gold/green tokens):
   - `where-we-work-africa.jpg` — stylized Africa map with warm gradient + community silhouettes (for the Where We Work card, replacing the plain PNG map)
   - `uganda-impact-map.jpg` — refined Uganda map illustration in brand colors (Impact section)
   - `annual-report-cover.jpg` — a polished annual report cover mock (Impact → Annual Report)
   - `founder-portrait.jpg` — only if the current founder image is clearly defective; otherwise keep the uploaded portrait
   - Any Program card image that reads as broken/off-brand
3. **Wire the new assets in** — import from `src/assets/`, swap the `src` in:
   - `src/components/home/about/WhereWeWork.tsx`
   - `src/components/home/impact/UgandaMap.tsx`
   - `src/components/home/impact/AnnualReport.tsx`
   - `src/components/home/about/OurFounder.tsx` (only if replacement is generated)
   - `src/components/home/programs/programsData.tsx` (only for defective entries)
4. **Add alt text** describing each image (SEO + a11y).
5. **Verify** — re-open the pages in Playwright, screenshot, confirm every image loads and looks on-brand. No visual regressions on unchanged sections.

## Out of scope
- Admin-managed dynamic images (events, success stories, gallery, team members)
- Layout or copy changes
- Programs data content changes beyond swapping a defective `image` field

## Technical notes
- New assets saved as `.jpg` under `src/assets/` and imported as ES6 modules (not externalized).
- Keep existing `object-cover`, aspect ratios, and rounded-corner styling untouched — only the `src`/`import` changes.
- No DB, no edge function, no route changes.
