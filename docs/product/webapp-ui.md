# Web application UI

## Purpose

The web application UI is the public-facing intake layer for ApexTalenti. Its role is to capture a new application from a customer, validate the data, and submit it to the backend Node/TypeScript API for processing.

This UI is intentionally simple, modern, and clean. It should feel trustworthy, lightweight, and operational rather than flashy. The goal is to reduce friction, collect accurate project data, and hand the request into the provisioning pipeline.

## Scope

Phase 1 includes a single application form for the **Basic** SKU. The UI should still display the existence of **Premium** and **Enterprise**, but those options must be visually marked as "coming in Phase 2" and not selectable for submission.

The web UI is not intended to be a full customer portal in Phase 1. It is a focused intake experience.

## Design principles

### Simplicity first

The interface should use a minimal number of screens and fields. The best Phase 1 experience is a single, well-structured application form with clear sections and strong validation.

### Professional appearance

The design should feel modern but restrained:

- light background
- dark readable text
- one accent color
- clean spacing
- clear form labels
- minimal animation
- no decorative clutter

### Fast completion

A user should be able to complete the form in a few minutes. The UI should prioritize:

- obvious field labels
- strong defaults
- inline validation
- clear required vs optional fields
- section grouping

### Backend-driven

The UI should not contain complex business logic. It should:

- collect input
- validate basic format
- submit to the backend
- display success or failure states

All provisioning decisions remain in the backend and workflow layers.

## User flows

### Main flow: submit a new application

1. User opens the landing page.
2. User reads a short explanation of the service.
3. User sees SKU cards for:
   - Basic
   - Premium (Phase 2)
   - Enterprise (Phase 2)
4. User chooses **Basic**.
5. User completes the application form.
6. Frontend validates fields.
7. Frontend submits to backend API.
8. User sees confirmation with application reference.

### Future flow: return to track status

This is not part of Phase 1. Status tracking can be handled internally through NocoDB and n8n until a customer portal exists.

## Page structure

The initial UI should have one public page with the following sections:

### 1. Hero section

Purpose:
- explain the service in one sentence
- set trust and clarity
- lead directly into the application flow

Suggested content:
- short headline
- one supporting paragraph
- primary CTA: `Start your application`

### 2. SKU summary section

Purpose:
- explain the three product levels
- make Basic actionable
- make Premium and Enterprise visible but clearly deferred

Suggested presentation:
- three cards in a responsive grid
- Basic card active
- Premium and Enterprise cards marked with a badge such as `Phase 2`

### 3. Application form

Purpose:
- collect the minimum viable information required to create an application record

Suggested form sections:
- Contact details
- Brand details
- Business activity
- Domain preference
- Market/location
- Consent and submission

### 4. Submission confirmation state

Purpose:
- reassure the user
- provide a clear reference number or application ID
- explain next steps

## Form fields

The Basic application form should collect the following fields.

### Contact details

- Full name
- Email address
- Phone number (optional)
- Company or brand owner name

### Brand details

- Brand name
- Preferred domain
- Alternate domain (optional)

### Business activity

- Activity type
- Short business description
- Service category
- Main target audience (optional)

### Market and geography

- Primary country
- Primary city or region (optional)
- Preferred language

### Product selection

- SKU (locked to `basic` in Phase 1)
- Premium shown as unavailable
- Enterprise shown as unavailable

### Consent

- Confirmation that submitted information is accurate
- Consent to be contacted about the application

## Validation rules

Frontend validation should remain lightweight and predictable.

### Required fields

- Full name
- Email address
- Brand name
- Preferred domain
- Activity type
- Business description
- Primary country
- Preferred language
- Consent checkbox

### Format validation

- Email must match standard email format
- Preferred domain must be normalized and stripped of protocol
- Brand name length should be capped
- Description length should be capped
- No HTML should be accepted in free-text fields

### UX behavior

- Validate on blur for individual fields
- Validate on submit for full form
- Show inline errors under fields
- Keep server-side validation as the source of truth

## UI states

The UI should support these states:

### Default

- Empty form
- Basic selected
- Premium and Enterprise visible but disabled

### Loading

- Submit button disabled
- Inline spinner or progress state
- Prevent duplicate submissions

### Success

- Confirmation message
- Generated application reference
- Short explanation of what happens next

### Error

- Friendly error message
- Retry option
- Preserve entered data where possible

## Recommended frontend stack

Use a Node/TypeScript-friendly stack so the UI and backend can share types and validation utilities.

### Recommended option

- **Next.js with TypeScript**

Why:
- easy to combine a modern frontend with a Node/TypeScript backend ecosystem
- simple form handling
- easy deployment later if needed
- easy to share DTO types and schemas with backend services

### Alternative

- **Vite + React + TypeScript**

This is also valid, but Next.js gives a smoother path if later want:
- admin pages
- authenticated dashboards
- server components
- hybrid frontend/backend hosting

## Suggested frontend architecture

A simple structure is enough for Phase 1:

```text
apps/
  web/
    src/
      app/
      components/
      features/
        application-form/
      lib/
        api/
        validation/
        types/
      styles/
```

### Responsibilities

- `components/`: reusable UI elements
- `features/application-form/`: form logic and field grouping
- `lib/api/`: typed client calls to backend
- `lib/validation/`: Zod or similar validation schemas
- `lib/types/`: shared request and response types

## Backend connectivity

The web UI should communicate only with the Admin Backend.

### Suggested API interactions

- `POST /api/applications`
- future:
  - `GET /api/applications/{id}`
  - `POST /api/applications/{id}/confirm`
  - `GET /api/skus`

### Rule

The frontend never calls provider APIs directly.  
All domain, email, and static hosting provisioning remains behind the backend API.

## Security considerations

Phase 1 security requirements for the public form:

- rate limiting
- bot protection or CAPTCHA alternative if abuse appears
- backend-side validation
- input sanitization
- no exposure of provider credentials
- no direct write access to NocoDB from the public frontend

## Visual direction

The UI should feel:

- modern
- clean
- trustworthy
- operational
- lightweight

Avoid:
- loud gradients
- overly rounded "template" UI
- too many colors
- decorative icons everywhere
- marketing-heavy language

Prefer:
- strong typography
- restrained palette
- simple cards
- clear labels
- a clean success state

## Suggested color and style direction

Use a neutral palette with one accent color.

Recommended style:
- white or near-white background
- charcoal or slate text
- muted grays for borders
- one deep blue or teal accent
- medium corner radius
- thin borders
- subtle hover states
- no heavy shadows

## Accessibility requirements

The form must be accessible from the start:

- proper labels for every field
- visible focus states
- keyboard-friendly tab order
- sufficient color contrast
- required fields clearly indicated
- error messages associated with fields

## Phase boundaries

### Phase 1

- public landing page
- Basic SKU active
- application form
- backend submission
- confirmation state

### Phase 2

- Premium and Enterprise activation
- customer portal
- application status tracking
- authenticated views
- richer asset previews
- upgrade flows

## Open implementation decisions

These are the remaining implementation choices for the web UI layer:

- whether the UI lives in the same repository as the backend or as a separate app folder
- whether Next.js is used as the primary stack
- whether the initial form submits directly to the backend or through n8n webhook entrypoints
- whether operator-facing internal views are added early or kept entirely inside NocoDB

## Recommendation

For Phase 1, implement a single clean public web app using **Next.js + TypeScript**, with one page dedicated to the application flow and one typed API client that submits applications to the backend.

Keep the UI intentionally small, polished, and easy to evolve. The goal is not to build a large SaaS frontend yet. The goal is to create a reliable intake surface for the provisioning engine.