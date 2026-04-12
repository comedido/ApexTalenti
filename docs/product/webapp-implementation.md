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

## Conversation checkpoint: 2026-04-12

The provisioning workflow discussion introduced the following changes:

- the application form now targets a result-only success state after submission
- page refresh is required for a new submission
- idempotency is removed from the current implementation scope
- the landing page direction is now more corporate and business-facing
- the workflow model uses `workflowStatus` as the main operational status field
- provider-specific schema fields were replaced with vendor-neutral provisioning fields
- the default mailbox alias is `admin@<registeredDomain>`
- provisioning is planned as an asynchronous multi-step workflow
- Route 53, Forward Email, and Cloudflare Pages are the current preferred providers
- Verifalia is reserved for post-email-setup verification

## Frontend presentation refresh

A visual refresh was applied to the public landing page without changing functionality.

Changes included:

- more dynamic, cloud-tech-inspired hero section
- richer visual hierarchy and layered decorative styling
- new business-value content sections
- stronger public-facing feature framing
- removal of internal workflow language from the marketing page
- enhanced section styling for a more eye-catching and premium presentation

## Frontend presentation refresh, pass 2

A second visual and copy refinement pass was applied to the public landing page.

Changes included:

- shorter, more benefit-driven hero headline
- improved line fill and tighter headline formatting
- trust-band style benefit strip
- stronger value cards near the top of the page
- new CTA band above the application form
- more dynamic section rhythm inspired by modern SaaS and cloud landing pages
- no functional changes to submission or backend integration
