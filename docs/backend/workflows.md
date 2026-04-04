# Workflows

n8n orchestrates the long-running and multi-step workflows in ApexTalenti. [web:191]

## Key workflows

### 1. Application intake

**Trigger**: Webhook call from form capture website to n8n.

**Steps**:

1. Validate payload.
2. Call Admin Backend `/api/applications` to create customer + application.
3. Return application ID to the caller.

### 2. Application approval

**Trigger**: manual decision or automated rules.

**Steps**:

1. Operator approves application via NocoDB or a small admin UI.
2. n8n calls `/api/applications/{id}/approve`.
3. Backend creates `subscription` and `project`.
4. n8n (or backend) queues provisioning for the project.

### 3. Project provisioning (Basic)

**Trigger**: `/api/projects/{project_id}/provision` or queue entry.

**Steps**:

1. Set project status to `queued`.
2. Register domain via Domain adapter.
3. Configure DNS via DNS adapter.
4. Request HTML generation from the HTML generator service.
5. Publish the site via Site adapter.
6. Provision Basic email via Basic email adapter.
7. Run verification via Verification adapter.
8. Set project status to `completed` or a failure state.

### 4. Renewals

**Trigger**: Time-based (e.g., daily cron).

**Steps**:

1. n8n queries NocoDB for subscriptions with `renewal_status = 'pending'` and `renewal_due_at` within the window.
2. For each subscription:
   - Create a `renewal_job`.
   - Trigger payment/renewal handling (internal or external).
   - On success, update `term_start_at`, `term_end_at`, `renewal_due_at`, and `renewal_status`.
3. Optionally invoke provider-specific renewal operations (e.g., domain auto-renew confirmations).

### 5. Failure escalation

**Trigger**: provisioning job or verification job sets status to `failed_retryable` or `failed_manual_review`.

**Steps**:

1. n8n detects failed jobs.
2. For `failed_retryable`:
   - Apply retry policy (e.g., exponential backoff).
3. For `failed_manual_review`:
   - Notify operator via preferred channel.
   - Link to NocoDB record and relevant logs.
   - Await manual resolution.

## Implementation notes

- Use n8n Webhook nodes to expose safe, documented entrypoints for external triggers. [web:191]
- Use HTTP Request nodes to call the backend and NocoDB. [web:175]
- Store idempotency keys for each provisioning step to avoid duplicate provider operations.

Over time, additional workflows (e.g. upgrade Basic → Premium) can be added without changing the core data model.