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

- `src/features/application-form/types/index.ts` now contains the shared Zod schemas and inferred TypeScript types used by both the client form and the local placeholder API route.
- `src/features/application-form/lib/validation.ts` normalizes form values and maps Zod validation output into field-level UI errors.
- `src/features/application-form/lib/api.ts` validates outbound payloads and parses inbound responses.
