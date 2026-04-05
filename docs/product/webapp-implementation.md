# Web application implementation

## Purpose

This document tracks the implementation status of the public ApexTalenti web application.

## Current milestone

### Iteration 4: Feature-based frontend structure and extracted API client

Implemented:

- Node/TypeScript frontend application in the monorepo
- Next.js App Router structure
- Basic SKU auto-selected in the UI
- Gradient highlight around the selected Basic SKU card
- Premium and Enterprise visible with `Coming shortly` status pills
- Controlled React form state
- Client-side validation rules
- Inline field-level validation feedback
- Local placeholder API submission using a Next.js route handler
- Mock application reference returned to the UI
- Feature-based source structure for the application form
- Dedicated frontend API client helper
- Environment-variable-ready frontend API base URL configuration
- Fix for SKU card text visibility so card content remains visible without hover

Not yet implemented:

- separate backend application service
- shared schema package across frontend and backend
- persistent storage
- NocoDB integration
- n8n workflow trigger
- backend-driven business validation

## Repository paths

- `apps/web/README.md`
- `apps/web/src/app/layout.tsx`
- `apps/web/src/app/page.tsx`
- `apps/web/src/app/globals.css`
- `apps/web/src/components/Hero.tsx`
- `apps/web/src/components/SkuCards.tsx`
- `apps/web/src/components/ApplicationForm.tsx`

## UX behavior

Current behavior:

1. user lands on the page
2. user sees product positioning and SKU cards
3. user fills in the Basic application form
4. user clicks submit
5. the page prevents real submission
6. a placeholder success message appears

## Design direction

The current UI follows these principles:

- modern but restrained
- simple layout
- neutral palette
- clear hierarchy
- no unnecessary visual complexity

## Next planned milestone

### Iteration 2: Client-side form state and validation

Planned additions:

- stronger controlled form state
- field-level validation
- validation messages
- typed request model
- preparation for backend API integration
