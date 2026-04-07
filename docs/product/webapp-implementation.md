# Web application implementation

## Purpose

This document tracks the implementation status of the public ApexTalenti web application.

## Current milestone

### Iteration 8: Corporate landing page, result-only submission state, and normalized workflow model

Implemented:

- public-facing request page with a more corporate presentation
- form replaced by a submission result state after successful request
- page refresh required before a new request can be started
- normalized NocoDB workflow model using a single canonical status field
- admin workflow fields for internal review
- vendor-neutral provisioning fields for future automation and provider flexibility
- backend initialization of workflow, review, and provisioning-ready data

Not yet implemented:

- n8n-triggered execution
- registrar automation
- email provisioning automation
- hosting deployment automation

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
