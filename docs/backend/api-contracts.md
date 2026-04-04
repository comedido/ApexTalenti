# API contracts

This document defines the internal API contracts used between the Admin Backend, n8n workflows, and provider adapters.

## High-level conventions

- All internal APIs use JSON over HTTP.
- Idempotency is enforced using an `Idempotency-Key` header where relevant.
- Provider adapters return normalized result structures with `success`, `provider`, and `rawStatus` fields.

## Application APIs

### Create application

`POST /api/applications`

Payload:

```json
{
  "customer": {
    "display_name": "New Brand SL",
    "primary_contact_name": "Jane Doe",
    "primary_contact_email": "jane@example.com",
    "billing_email": "billing@example.com",
    "country_code": "ES"
  },
  "application": {
    "brand_name": "New Brand",
    "activity_type": "dental clinic",
    "activity_description": "Pediatric and family dentistry in Madrid",
    "desired_domain": "newbrand.com",
    "sku": "basic"
  }
}
```

Response:

```json
{
  "application_id": "app_123",
  "customer_id": "cus_123",
  "application_status": "submitted"
}
```

### Approve application

`POST /api/applications/{application_id}/approve`

Response:

```json
{
  "application_id": "app_123",
  "application_status": "approved",
  "project_id": "prj_123",
  "subscription_id": "sub_123"
}
```

## Subscription APIs

### Activate subscription

`POST /api/subscriptions/{subscription_id}/activate`

Response:

```json
{
  "subscription_id": "sub_123",
  "billing_status": "paid",
  "renewal_due_at": "2027-04-04T00:00:00Z"
}
```

## Project APIs

### Queue provisioning

`POST /api/projects/{project_id}/provision`

Request:

```json
{
  "force": false
}
```

Response:

```json
{
  "project_id": "prj_123",
  "project_status": "queued",
  "job_id": "job_123"
}
```

## Domain adapter

```ts
interface RegisterDomainInput {
  domain: string
  years: number
  autoRenew: boolean
  registrantContactRef: string
  adminContactRef?: string
  techContactRef?: string
}

interface RegisterDomainResult {
  success: boolean
  provider: string
  operationRef: string
  registeredDomain: string
  expiresAt?: string
  rawStatus: string
}
```

## DNS adapter

```ts
interface UpsertDnsZoneInput {
  domain: string
  records: Array<{
    type: "A" | "AAAA" | "CNAME" | "MX" | "TXT" | "NS"
    name: string
    value: string
    ttl?: number
    priority?: number
    proxied?: boolean
  }>
}

interface UpsertDnsZoneResult {
  success: boolean
  provider: string
  zoneRef: string
  appliedRecords: Array<{
    type: string
    name: string
    value: string
    providerRef: string
  }>
}
```

## Site adapter

```ts
interface PublishSiteInput {
  projectId: string
  domain: string
  html: string
  assets?: Array<{
    path: string
    contentType: string
    bodyBase64: string
  }>
}

interface PublishSiteResult {
  success: boolean
  provider: string
  siteRef: string
  customDomainRef?: string
  publishedUrl: string
}
```

## Basic email adapter

```ts
interface ProvisionBasicEmailInput {
  projectId: string
  domain: string
  localPart: string
  mailboxDisplayName: string
}

interface ProvisionBasicEmailResult {
  success: boolean
  provider: string
  businessAddress: string
  mailboxType: "forwarded" | "hosted"
  providerMailboxRef?: string
  providerAliasRef?: string
  destinationAddress?: string
}
```

## Premium email adapter (Phase 2)

```ts
interface ProvisionPremiumEmailInput {
  projectId: string
  domain: string
  localPart: string
  displayName: string
  credentialPolicyRef: string
}

interface ProvisionPremiumEmailResult {
  success: boolean
  provider: string
  businessAddress: string
  providerMailboxRef: string
  credentialSecretRef: string
}
```

## Project verification

```ts
interface VerifyProjectInput {
  projectId: string
}

interface VerifyProjectResult {
  domainOk: boolean
  dnsOk: boolean
  siteOk: boolean
  emailOk: boolean
  finalStatus: "completed" | "failed_retryable" | "failed_manual_review"
}
```

These contracts provide the backbone for consistent communication between the backend, workflows, and provider adapters.