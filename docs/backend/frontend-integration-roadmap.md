# Frontend integration roadmap

## Purpose

This document describes the staged integration path between the ApexTalenti frontend UI and the backend services.

## Current status

## Current status

### Iteration 7

Implemented:

- frontend request form
- backend application service
- shared schema contracts
- NocoDB persistence
- frontend duplicate-submit protection
- backend idempotency-key handling
- monorepo Turbopack root configuration

Not implemented:

- persistent idempotency store
- provisioning workflows
- registrar integration
- mailbox provisioning
- S3 deployment

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
