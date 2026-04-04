# ADR-002: CRM-agnostic core model

## Status

Accepted

## Context

ApexTalenti will eventually integrate with one or more CRMs to manage leads, accounts, and subscriptions, but:

- the initial implementation must not depend on any specific CRM
- the system should remain portable between CRM vendors
- the core provisioning logic must work with or without a CRM

## Decision

The core data model and backend will be **CRM-agnostic**:

- All CRM references will be stored as generic `crm_*` fields (e.g. `crm_customer_id`).
- No CRM-specific objects or IDs (e.g. Salesforce IDs) will appear in core tables.
- CRM integration will be implemented as an optional adapter at a later stage.

## Rationale

- Keeps the provisioning engine independent of any one CRM.
- Allows the project to start immediately using NocoDB and n8n without a CRM.
- Makes it easier to adopt, change, or remove CRM integrations in the future.

## Consequences

- The platform can run in **“no CRM” mode** in Phase 1.
- A future CRM adapter will synchronize `customers`, `applications`, `subscriptions`, and `projects` with CRM objects, using the generic reference fields.
- Any CRM-specific logic will live outside the core backend.

## Alternatives considered

- Hard-coding Salesforce-specific fields (e.g. `AccountId`): rejected due to lock-in.
- Building a custom CRM inside ApexTalenti: unnecessary complexity.