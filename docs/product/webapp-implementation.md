# Web application implementation

## Purpose

This document tracks the implementation status of the public ApexTalenti web application.

## Current milestone

### Iteration 6: Real backend service and NocoDB persistence

Implemented:

- frontend application in Next.js
- professional landing page and request form
- Basic SKU selected by default
- shared contract package using Zod schemas
- dedicated backend application service
- frontend API client pointed to backend service
- backend validation using shared contracts
- NocoDB persistence integration in backend
- environment-variable-based backend configuration
- TypeScript alias migration away from deprecated `baseUrl`
- hero layout width fix for improved visual presentation

Not yet implemented:

- authentication
- advanced workflow automation
- downstream provisioning logic
- audit trail and operational status lifecycle

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
