# Web application implementation

## Purpose

This document tracks the implementation status of the public ApexTalenti web application.

## Current milestone

### Iteration 5: Shared schema validation and professionalized request page

Implemented:

- Node/TypeScript frontend application in the monorepo
- Next.js App Router structure
- Basic SKU auto-selected in the UI
- Gradient highlight around the selected Basic SKU card
- Premium and Enterprise visible with `Coming shortly` status pills
- Controlled React form state
- Shared Zod schema for form and API validation
- Client-side validation powered by shared schema definitions
- Server-side route validation powered by the same schema definitions
- Structured validation errors in the local placeholder API route
- Dedicated frontend API client helper
- Environment-variable-ready frontend API base URL configuration
- Professional landing-page copy for the package offering
- Professional request form wording with no beta or prototype language
- Fix for SKU card text visibility

Not yet implemented:

- separate backend application service
- shared schema package across frontend and backend applications
- persistent storage
- NocoDB integration
- n8n workflow trigger
- authentication

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
