# Renewals

Renewals are handled as scheduled workflows, driven by subscription dates.

## Renewal policy (initial)

- **T-45 days**: mark subscription as `renewal_due` and create a `renewal_job`.
- **T-30 days**: begin renewal processing (e.g. payment collection).
- **T-0**: if renewal succeeds, extend term and reset `renewal_due_at`.
- **T+15**: if unresolved, set `billing_status` to `past_due`.
- **T+30**: consider project suspension or decommissioning according to policy.

## Implementation

- n8n runs a scheduled workflow daily that:
  - queries NocoDB for subscriptions nearing renewal, using the REST API. [web:175]
  - creates `renewal_jobs`.
  - coordinates external billing/payment if configured.
  - updates subscription fields and statuses.

Detailed runbooks for manual intervention in renewal failures will be added as the system matures.