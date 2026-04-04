# ApexTalenti Web UI

This application contains the public-facing frontend for ApexTalenti.

## Current status

Phase 1, iteration 1:

- Next.js with TypeScript
- App Router enabled
- Single public landing page
- SKU summary cards:
  - Basic
  - Premium (Phase 2)
  - Enterprise (Phase 2)
- Minimal application form
- Placeholder submit behavior only
- No backend API integration yet

## Run locally

```bash
npm install
npm run dev -- --hostname 0.0.0.0
```

Default local URL:

```text
http://localhost:3000
```

Example LAN URL:

```text
http://10.10.10.118:3000
```

## Important files

- `src/app/page.tsx` — main public page
- `src/app/layout.tsx` — app layout and metadata
- `src/app/globals.css` — global styling
- `src/components/Hero.tsx` — hero section
- `src/components/SkuCards.tsx` — SKU cards
- `src/components/ApplicationForm.tsx` — form and placeholder submit state

## Notes

This iteration is UI-only.  
Form submission does not yet call the backend.
