# Provisioning workflow decisions from Perplexity conversation

- Date: 2026-04-12
- Source conversation: https://www.perplexity.ai/search/i-have-a-typescript-project-fo-7q5yLppNSFOCHjjZYYCXYw

## Scope

This note records product, data-model, and workflow decisions made during the provisioning workflow design discussion for ApexTalenti.

## Product decisions

- The public application form should be replaced by a result-only state after successful submission.
- After success, the page remains locked and the user must refresh the page to submit a new request.
- The landing page should move toward a more business-friendly and corporate visual style.

## Frontend implementation decisions

- The form no longer relies on in-memory idempotency.
- `idempotencyKey` should be removed from the frontend and backend flow for the current iteration.
- The success state should display the server response and application reference.
- The hero and overview sections should use more structured, corporate-oriented copy.

## Data model decisions

- Use a single main workflow field: `workflowStatus`.
- Do not keep both `applicationStatus` and `lifecycleStatus` as active operational fields for the same purpose.
- Replace vendor-specific field names with vendor-neutral names.

### Preferred workflow fields

- `workflowStatus`
- `statusUpdatedAt`
- `statusDetail`
- `adminOwner`
- `reviewDecision`
- `reviewNotes`
- `reviewedAt`
- `priority`
- `internalTags`
- `provisioningRequested`
- `provisioningRequestedAt`
- `provisioningRunId`
- `domainProvider`
- `registeredDomain`
- `emailProvider`
- `emailAccountAddress`
- `hostingProvider`
- `storageTarget`
- `siteUrl`
- `provisioningNotes`
- `lastProvisioningError`

### Naming decision

Provider-specific fields such as `protonAccountEmail` and `s3BucketName` should not be used in the normalized workflow model.

## Provisioning decisions

### Selected providers

- DNS / registrar: AWS Route 53
- Email: Forward Email
- Static hosting: Cloudflare Pages

### Default mailbox

- Default mailbox alias should be `admin@<registeredDomain>`.

### Provisioning pattern

- Provisioning should be asynchronous.
- Domain and DNS setup should happen before email activation is considered final.
- Email setup should be completed in a later retryable workflow after DNS propagation.

### Verification

- Verifalia should be considered as a post-email-registration validation step.
- Verifalia should not be used as a blocking pre-check for a newly provisioned domain.

## n8n workflow decisions

- The NocoDB queue view already returns the fields required for processing.
- NocoDB updates must explicitly target the internal row `Id`.
- The previous `RECORD_NOT_FOUND` issue came from an update call without a correctly mapped target row identifier.
- The provisioning flow should be split into:
  - Workflow A: DNS + hosting provisioning
  - Workflow B: email finalization + verification + retries

### Recommended workflow statuses

- `queued_for_provisioning`
- `provisioning`
- `awaiting_email_dns`
- `completed`
- `failed`

## Operational notes

- If direct n8n Route 53 integration is too cumbersome, the fallback is to move Route 53 logic into the ApexTalenti backend.
- Forward Email should be invoked from n8n using token-authenticated HTTP requests.
- Cloudflare Pages should remain the preferred hosting target unless cost or deployment constraints change.

## Follow-up

Implementation details should continue in the next iteration with:

- exact n8n node-by-node configuration
- Route 53 integration path confirmation
- Forward Email retry logic
- Cloudflare Pages deployment details
- final NocoDB update strategy
