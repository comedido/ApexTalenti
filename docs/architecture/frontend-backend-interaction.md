# Frontend-backend interaction

## Purpose

This document defines how the public web application UI communicates with the backend API in Phase 1.

The goal is to keep the interaction model simple, typed, secure, and easy to evolve.

## Principles

- The frontend talks only to the Admin Backend.
- The frontend never talks directly to NocoDB.
- The frontend never talks directly to provider APIs.
- The backend owns validation, persistence, orchestration triggers, and response formatting.
- Long-running provisioning does not happen in the request-response path.

## Interaction model

### Public flow

1. User fills in the application form.
2. Frontend validates basic input.
3. Frontend sends `POST /api/applications`.
4. Backend validates and stores the application.
5. Backend optionally emits a workflow event.
6. Backend returns application reference.
7. Frontend shows confirmation.

This keeps the public request fast and avoids making the user wait for provisioning operations.

## Request path

```text
Browser UI
  -> Admin Backend
    -> NocoDB
    -> internal queue/workflow trigger
```

The backend may then trigger asynchronous workflows through n8n, but that is not visible to the user.

## Responsibilities by layer

### Frontend

Responsible for:

- rendering the form
- local validation
- submit state handling
- friendly error display
- confirmation state

Not responsible for:

- domain availability checks against providers
- provisioning logic
- workflow orchestration
- direct database writes

### Backend

Responsible for:

- request validation
- normalization
- deduplication
- persistence in NocoDB
- creation of related internal records
- triggering asynchronous workflows
- returning stable responses

### n8n

Responsible for:

- scheduled or asynchronous follow-up work
- retries
- notifications
- manual review routing

## API client design

The frontend should use a typed API client module.

Suggested structure:

```text
src/
  lib/
    api/
      client.ts
      applications.ts
    types/
      application.ts
```

### Example responsibilities

- `client.ts`: base fetch wrapper, error parsing, headers
- `applications.ts`: `createApplication`, `getApplication`
- `types/`: request/response DTOs shared with validation layer

## Suggested fetch wrapper behavior

The client wrapper should:

- send JSON headers
- support `Idempotency-Key`
- parse structured error responses
- normalize network errors into UI-friendly messages

### Example behavior

- `2xx`: return parsed JSON
- `400/409`: surface field or business errors
- `5xx`: show generic retryable error

## Submission sequence

### Step-by-step

1. User presses submit.
2. Frontend disables button and shows loading state.
3. Frontend generates or retrieves an idempotency key.
4. Frontend calls `POST /api/applications`.
5. Backend responds:
   - success → show confirmation
   - validation error → show field errors
   - conflict → show targeted message
   - server error → show retry state
6. Frontend preserves entered data if submission fails.

## Timeouts and retries

The frontend should not aggressively retry submissions automatically.

Recommended behavior:

- use reasonable request timeout
- allow user-triggered retry on failure
- rely on idempotency to avoid duplicates if retry occurs

## Security model

### CORS

Only allow approved frontend origins to call the backend.

### No direct database access

NocoDB remains internal to the backend and workflow layers.

### No secret leakage

The frontend should never receive:

- provider API keys
- internal adapter errors
- mailbox credentials
- internal infrastructure references

### Abuse controls

Public submission endpoints should support:

- rate limiting
- basic anti-abuse controls
- logging of suspicious patterns

## Future evolution

This interaction model can later expand to support:

- authenticated customer portal
- application status lookup
- payment steps
- upgrade from Basic to Premium
- document upload
- internal admin views

The contract remains stable if the backend continues to be the only gateway between the UI and the operational/provisioning systems.

## Recommendation

For Phase 1:

- build a single public web app
- connect it only to the Admin Backend
- keep the backend authoritative
- keep provisioning asynchronous
- avoid coupling the frontend to internal workflows or NocoDB structure