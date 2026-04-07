# Web application implementation

## Purpose

This document tracks the implementation status of the public ApexTalenti web application.

## Current milestone

### Iteration 7: Duplicate submission protection and idempotent backend writes

Implemented:

- professional landing page and request form
- frontend submission to backend service
- shared schema contracts
- NocoDB persistence
- frontend duplicate-submit protection after successful request
- frontend regeneration of request identity when form data changes
- backend `Idempotency-Key` enforcement
- backend cached replay behavior for repeated identical submissions
- conflict response when the same idempotency key is reused with a different payload
- Turbopack workspace-root configuration for the monorepo

Not yet implemented:

- persistent idempotency storage
- multi-instance backend deduplication
- workflow execution after application submission
- registrar, mailbox, and S3 provisioning

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
