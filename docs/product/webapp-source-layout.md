# Web application source layout

## Purpose

This document records the source layout of the ApexTalenti frontend application.

It should be updated whenever the frontend structure changes significantly.

## Repository location

- **Repository root**: `/opt/ApexTalenti`
- **Frontend root**: `apps/web`

## Current file layout

```text
ApexTalenti
├── apps/
│   ├── api/
│   │   ├── package.json
│   │   ├── tsconfig.json
│   │   └── src/
│   │       ├── config.ts
│   │       ├── lib/
│   │       │   └── nocodb.ts
│   │       ├── routes/
│   │       │   └── applications.ts
│   │       └── server.ts
│   └── web/
│       ├── .env.local
│       ├── package.json
│       ├── tsconfig.json
│       └── src/
│           ├── app/
│           │   ├── globals.css
│           │   ├── layout.tsx
│           │   └── page.tsx
│           ├── components/
│           │   └── Hero.tsx
│           ├── features/
│           │   └── application-form/
│           │       ├── components/
│           │       │   └── ApplicationForm.tsx
│           │       ├── lib/
│           │       │   ├── api.ts
│           │       │   └── validation.ts
│           │       └── types/
│           │           └── index.ts
│           └── lib/
│               └── config.ts
└── packages/
    └── contracts/
        ├── package.json
        └── src/
            └── index.ts
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

- `apps/web/src/features/application-form/components/ApplicationForm.tsx` now manages frontend submission locking and regenerates an idempotency key when the form changes.
- `apps/web/src/features/application-form/lib/api.ts` sends the `Idempotency-Key` header to the backend service.
- `apps/api/src/routes/applications.ts` enforces backend idempotency and prevents duplicate NocoDB writes for repeated identical requests.
- `apps/web/next.config.ts` defines `turbopack.root` to align Next.js with the monorepo root.
