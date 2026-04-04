# Status machine

The backend uses a state machine to ensure provisioning steps occur in a predictable order and that failures are recoverable.

## Application states

- `draft`
- `submitted`
- `under_review`
- `approved`
- `rejected`
- `cancelled`

**Transition rules (simplified):**

- `draft` → `submitted` → `under_review` → `approved` or `rejected`
- Approved applications spawn a `subscription` and `project`.

## Subscription states

- `pending_payment`
- `active`
- `renewal_due`
- `renewing`
- `past_due`
- `expired`
- `cancelled`

**Transition rules:**

- `pending_payment` → `active` once payment is confirmed.
- `active` → `renewal_due` based on `renewal_due_at`.
- `renewal_due` → `renewing` when renewal processing begins.
- `renewing` → `active` or `past_due`.
- `past_due` → `expired` or back to `active` if resolved.
- `active` or `renewal_due` → `cancelled` manually.

## Project states

- `created`
- `queued`
- `domain_registering`
- `domain_ready`
- `dns_configuring`
- `dns_ready`
- `email_provisioning`
- `email_ready`
- `html_generating`
- `site_publishing`
- `site_live`
- `verification_pending`
- `completed`
- `failed_retryable`
- `failed_manual_review`
- `suspended`
- `decommissioned`

**Key rules:**

- Cannot move to `queued` unless subscription is `active`.
- `domain_ready` requires successful registrar response.
- `dns_ready` requires confirmation that DNS records are applied.
- `email_ready` requires Basic (Phase 1) or Premium/Enterprise (Phase 2) email provisioning success.
- `site_live` requires successful static site publishing.
- `completed` requires all of domain, DNS, email, and site verification to pass.
- Failures move to `failed_retryable` or `failed_manual_review` depending on error type.

n8n workflows and the Admin Backend are responsible for enforcing these transitions and persisting them to NocoDB. [web:191][web:175]