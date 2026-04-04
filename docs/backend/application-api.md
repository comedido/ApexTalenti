# Application API

## Purpose

The Application API is the first backend surface exposed to the web application UI. Its job is to accept a new application request, validate it, persist it, and return a normalized response that the frontend can use to show a confirmation state.

Phase 1 focuses on a single public use case:

- submit a new **Basic** application

The API is designed so that Premium and Enterprise can be added later without breaking the contract.

## Design goals

- Keep the API small and predictable.
- Use JSON over HTTP.
- Validate all inputs on the server.
- Return stable, typed response shapes.
- Avoid leaking provider-specific details to the frontend.
- Keep the public API separate from internal provisioning APIs.

## Public endpoints

### Create application

`POST /api/applications`

Creates:

- a customer record if needed
- an application record
- optional related subscription/project placeholders depending on backend flow

### Get application

`GET /api/applications/{applicationId}`

Returns the current application record and its public-facing status.

This endpoint is optional in Phase 1, but recommended if the frontend will have a confirmation page or internal operator testing flow.

## Request model

### Create application request

```json
{
  "customer": {
    "displayName": "New Brand SL",
    "primaryContactName": "Jane Doe",
    "primaryContactEmail": "jane@example.com",
    "billingEmail": "billing@example.com",
    "countryCode": "ES",
    "language": "es"
  },
  "application": {
    "brandName": "New Brand",
    "activityType": "dental clinic",
    "activityDescription": "Pediatric and family dentistry in Madrid",
    "desiredDomain": "newbrand.com",
    "alternateDomain": "newbrand.es",
    "primaryCountry": "ES",
    "primaryRegion": "Madrid",
    "sku": "basic",
    "consentAccepted": true
  }
}
```

## Response model

### Create application response

```json
{
  "applicationId": "app_123",
  "customerId": "cus_123",
  "applicationStatus": "submitted",
  "message": "Your application has been received successfully."
}
```

### Get application response

```json
{
  "applicationId": "app_123",
  "customerId": "cus_123",
  "sku": "basic",
  "applicationStatus": "submitted",
  "brandName": "New Brand",
  "desiredDomain": "newbrand.com",
  "submittedAt": "2026-04-04T18:00:00Z"
}
```

## Error model

All errors should use a consistent structure.

### Validation error

HTTP `400`

```json
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "One or more fields are invalid.",
    "fields": {
      "application.desiredDomain": "Domain format is invalid",
      "customer.primaryContactEmail": "Email format is invalid"
    }
  }
}
```

### Conflict error

HTTP `409`

Used when a request cannot proceed due to a business conflict.

Examples:

- domain already reserved in your system
- duplicate active application for same brand/domain
- unsupported SKU in Phase 1

```json
{
  "error": {
    "code": "APPLICATION_CONFLICT",
    "message": "An active application already exists for this domain."
  }
}
```

### Server error

HTTP `500`

```json
{
  "error": {
    "code": "INTERNAL_ERROR",
    "message": "An unexpected error occurred."
  }
}
```

## Validation rules

The API must validate:

- required fields
- field lengths
- email format
- domain normalization
- consent flag
- allowed SKU values

In Phase 1:

- `basic` is accepted
- `premium` and `enterprise` should return a controlled validation or business rule error if public submission is attempted

Recommended behavior:

- return HTTP `400` if the value is structurally invalid
- return HTTP `409` if the request is well-formed but not allowed by current business rules

## Domain normalization

The backend should normalize domains before persistence.

Examples:

- `https://newbrand.com` → `newbrand.com`
- `WWW.NewBrand.com` → `newbrand.com`
- trailing spaces removed
- lowercase enforced

The raw user input can optionally be stored separately for audit purposes, but the normalized value should be used everywhere operationally.

## Idempotency

The public application endpoint should support idempotency to avoid duplicate submissions due to retries or double-clicks.

Recommended approach:

- frontend sends `Idempotency-Key` header
- backend stores request hash + result for a short replay window
- repeated identical request returns the original success response

## Persistence flow

On successful application creation:

1. validate input
2. normalize fields
3. create or find customer
4. create application record
5. emit an internal event or enqueue follow-up workflow
6. return public response

The public endpoint should not perform domain registration or provisioning synchronously.

## Security requirements

- rate limiting
- request size limits
- CORS restricted to allowed frontend origins
- bot protection if abuse appears
- no provider details exposed to caller
- structured audit logging
- server-side validation required even if frontend validates

## Suggested implementation structure

For a Node/TypeScript backend:

```text
src/
  modules/
    applications/
      application.controller.ts
      application.service.ts
      application.repository.ts
      application.schemas.ts
      application.types.ts
  shared/
    http/
    validation/
    errors/
```

## Future extensions

This API should later support:

- application update before approval
- file uploads or logo uploads
- customer confirmation links
- CRM sync hooks
- Premium and Enterprise application intake
- status retrieval endpoints for customer portal use