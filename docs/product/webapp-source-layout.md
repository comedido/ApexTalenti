# Web application source layout

## Purpose

This document records the source layout of the ApexTalenti frontend application.

It should be updated whenever the frontend structure changes significantly.

## Repository location

- **Repository root**: `/opt/ApexTalenti`
- **Frontend root**: `apps/web`

## Current file layout

```text
apps/web
├── README.md
├── .env.local
├── next.config.ts
├── package.json
├── tsconfig.json
├── eslint.config.mjs
├── public/
└── src/
    ├── app/
    │   ├── api/
    │   │   └── applications/
    │   │       └── route.ts
    │   ├── globals.css
    │   ├── layout.tsx
    │   └── page.tsx
    ├── components/
    │   └── Hero.tsx
    ├── features/
    │   └── application-form/
    │       ├── components/
    │       │   └── ApplicationForm.tsx
    │       ├── lib/
    │       │   ├── api.ts
    │       │   └── validation.ts
    │       └── types/
    │           └── index.ts
    └── lib/
        └── config.ts
```

## Key files

### Application shell

- `apps/web/src/app/layout.tsx`
- `apps/web/src/app/page.tsx`

### Styling

- `apps/web/src/app/globals.css`

### UI components

- `apps/web/src/components/Hero.tsx`
- `apps/web/src/components/SkuCards.tsx`
- `apps/web/src/components/ApplicationForm.tsx`

## Notes

This is the initial Phase 1 layout for the public web form.

As the project evolves, additional folders are expected for:

- form validation
- API client logic
- shared types
- reusable UI primitives
