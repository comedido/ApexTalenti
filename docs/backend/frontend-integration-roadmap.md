# Frontend integration roadmap

## Purpose

This document describes the staged integration path between the ApexTalenti frontend UI and the backend services.

## Current status

### Iteration 5

Implemented:

- frontend application created
- public page and form rendered
- Basic SKU auto-selected in the UI
- Premium and Enterprise visible but not selectable
- controlled client-side form state
- shared schema-based client validation
- shared schema-based server validation
- local placeholder API route for application submission
- structured validation errors from the local route
- mock application reference returned to the UI
- extracted frontend API client layer
- environment-variable-ready frontend API base URL support
- professionalized service-page copy and form presentation

Not implemented:

- separate backend service
- cross-application shared schema package
- persistent storage
- workflow trigger
- NocoDB integration

## Planned integration stages

### Iteration 2: Client-side validation

- define frontend request type
- define validation rules
- normalize field structure
- prepare payload shape to match backend contract

### Iteration 3: Placeholder backend endpoint

- create backend app skeleton
- expose minimal `POST /api/applications`
- return mock success response
- connect frontend submit action to backend

### Iteration 4: Real application persistence

- persist application to backend datastore
- return application reference
- show backend-driven success state

### Iteration 5: Error handling

- validation errors
- conflict errors
- retryable failures
- user-friendly error states

## Boundary rule

The frontend communicates only with the Node/TypeScript backend.
It does not communicate directly with:

- NocoDB
- n8n
- provider APIs

This rule should remain in place throughout future iterations.
