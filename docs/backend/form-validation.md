# Form validation

## Purpose

Form validation ensures that application data is clean, complete, and safe before it enters the provisioning pipeline.

Validation is performed in two layers:

- **frontend validation** for user experience
- **backend validation** as the source of truth

The same field model should be reused across both layers where possible.

## Validation strategy

### Frontend

Frontend validation should provide immediate feedback and reduce friction.

Recommended behavior:

- validate on blur for individual fields
- validate on submit for the whole form
- display friendly inline messages
- preserve form state if submission fails

### Backend

Backend validation is mandatory and authoritative.

It must:

- enforce all required rules
- sanitize and normalize values
- reject invalid or unsafe input
- return structured field errors

## Recommended approach

Use a shared TypeScript schema definition layer.

Recommended library:

- **Zod**

Benefits:

- runtime validation
- TypeScript type inference
- reusable schemas across frontend and backend
- simple error handling

## Validation domains

### Customer fields

Validate:

- `displayName`
- `primaryContactName`
- `primaryContactEmail`
- `billingEmail`
- `countryCode`
- `language`

Rules:

- names must be non-empty
- email fields must be valid email addresses
- country code should be ISO-like uppercase format
- language should be restricted to allowed values in Phase 1

### Application fields

Validate:

- `brandName`
- `activityType`
- `activityDescription`
- `desiredDomain`
- `alternateDomain`
- `primaryCountry`
- `primaryRegion`
- `sku`
- `consentAccepted`

Rules:

- `brandName` required, trimmed, length-limited
- `activityType` required
- `activityDescription` required and length-limited
- `desiredDomain` required and normalized
- `alternateDomain` optional but validated if present
- `sku` must be one of known values
- only `basic` is submit-enabled in Phase 1
- `consentAccepted` must be `true`

## Example shared schema

```ts
import { z } from "zod"

const domainField = z
  .string()
  .trim()
  .min(3)
  .max(255)
  .transform((value) =>
    value
      .toLowerCase()
      .replace(/^https?:\/\//, "")
      .replace(/^www\./, "")
      .replace(/\/.*$/, "")
  )
  .refine((value) => /^[a-z0-9.-]+\.[a-z]{2,}$/.test(value), {
    message: "Please enter a valid domain"
  })

export const createApplicationSchema = z.object({
  customer: z.object({
    displayName: z.string().trim().min(2).max(120),
    primaryContactName: z.string().trim().min(2).max(120),
    primaryContactEmail: z.string().trim().email(),
    billingEmail: z.string().trim().email(),
    countryCode: z.string().trim().length(2).transform((v) => v.toUpperCase()),
    language: z.string().trim().min(2).max(10)
  }),
  application: z.object({
    brandName: z.string().trim().min(2).max(120),
    activityType: z.string().trim().min(2).max(120),
    activityDescription: z.string().trim().min(10).max(1000),
    desiredDomain: domainField,
    alternateDomain: domainField.optional().or(z.literal("")),
    primaryCountry: z.string().trim().min(2).max(2),
    primaryRegion: z.string().trim().max(120).optional().or(z.literal("")),
    sku: z.enum(["basic", "premium", "enterprise"]),
    consentAccepted: z.literal(true)
  })
})
```

## Business rule validation

Schema validation alone is not enough. The backend must also apply business rules.

Examples:

- Premium and Enterprise cannot be submitted publicly in Phase 1
- duplicate active application for same domain is not allowed
- domain may be blocked if already reserved internally
- country/language combinations may later be restricted

These checks belong in the service layer, not just the schema layer.

## Error formatting

Validation errors should be converted into a frontend-friendly map.

Recommended output:

```json
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "One or more fields are invalid.",
    "fields": {
      "customer.primaryContactEmail": "Please enter a valid email address",
      "application.desiredDomain": "Please enter a valid domain"
    }
  }
}
```

## Input sanitization

Validation should be paired with sanitization:

- trim whitespace
- lowercase emails and domains where appropriate
- strip protocols from domain input
- reject HTML/script content in free-text fields
- apply server-side escaping when rendering values anywhere

## UX recommendations

- mark required fields clearly
- place errors directly beneath the field
- avoid validating every keystroke for long text areas
- disable submit only when actively submitting, not merely because the form has untouched errors
- show a top-level summary only if many fields fail

## Test cases

At minimum, test these cases:

- valid Basic submission
- missing required field
- invalid email format
- invalid domain format
- domain with protocol and uppercase letters
- consent unchecked
- Premium selected in Phase 1
- duplicate domain/application conflict

## Recommendation

Use a single shared validation package or module so the web app and backend stay aligned.  
Frontend validation improves usability. Backend validation protects the system.