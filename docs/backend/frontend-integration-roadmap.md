# Frontend integration roadmap

## Purpose

This document describes the staged integration path between the ApexTalenti frontend UI and the backend services.

## Current status

## Current status

### Iteration 8

Implemented:

- frontend request form
- backend application service
- NocoDB persistence
- post-submission result-only frontend state
- corporate landing page content structure
- normalized workflow status model
- admin workflow fields
- vendor-neutral provisioning-ready record fields

Not implemented:

- n8n-triggered execution
- provider automation flows
- registrar integration
- email integration
- hosting deployment

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
