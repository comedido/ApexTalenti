# Service boundaries

The core services are separated by responsibility to keep the system maintainable and easy to extend.

## Admin Backend

**Responsibilities**

- API endpoints for the form capture website and internal tools.
- Validation, normalization, and persistence of incoming applications.
- Creation of provisioning jobs for projects.
- Encapsulation of provider operations behind internal adapter interfaces.

**Does not own**

- Direct database UI (NocoDB handles UI).
- Long-running workflows (n8n orchestrates those).

## Operational Datastore (NocoDB)

**Responsibilities**

- System of record for:
  - customers
  - applications
  - subscriptions
  - projects
  - project domains, DNS, sites, email
  - provisioning jobs/events
- Operational UI for browsing and editing records.
- REST API for backend and n8n to read/write data. [web:175]

**Does not own**

- Provider-specific business logic.
- Secret values (only stores references).

## Workflow Engine (n8n)

**Responsibilities**

- Webhook endpoints for automation triggers. [web:191]
- Scheduling and periodic jobs (e.g., renewals).
- Retry and error handling flows.
- Notifications and manual escalation flows.

**Does not own**

- Business data schema.
- Provider adapter implementations.

## Content Generation Service

**Responsibilities**

- Generate HTML landing content for a project using local models. [cite:31]
- Maintain a simple API for the backend to request and receive assets.
- Tag generated assets with version and checksums.

## Provider Adapter Layer

**Responsibilities**

- Provide internal interfaces for:
  - domain registration
  - DNS and static hosting
  - Basic email provisioning
  - (Phase 2) Premium/Enterprise email provisioning
- Translate internal commands into provider-specific API calls.
- Normalize provider responses into internal result structures.

**Does not own**

- Long-running orchestration (n8n).
- User-facing front end.

## Secrets Management

**Responsibilities**

- Vaultwarden or similar is used to store:
  - provider API keys
  - mailbox credentials
  - temporary passwords
- Only **references** to secrets are stored in NocoDB.

This separation allows you to scale, swap, or replace services without rewriting the entire system.