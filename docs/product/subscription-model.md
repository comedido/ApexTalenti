# Subscription model

ApexTalenti sells each SKU as an **annual subscription**.

## Core concepts

- **Subscription**: binds a customer to a SKU for a given term.
- **Project**: a concrete instance of a subscription, with its own domain, site, and email.
- **Term**: typically 12 months, with an explicit start and end date.
- **Renewal**: process of extending the subscription for another term.

## Subscription attributes

Each subscription record includes:

- `id`
- `customer_id`
- `application_id`
- `sku` (`basic`, `premium`, `enterprise`)
- `billing_cycle` (`annual`)
- `term_start_at`
- `term_end_at`
- `renewal_due_at`
- `renewal_status` (`pending`, `in_progress`, `completed`, `cancelled`)
- `billing_status` (`pending_payment`, `paid`, `past_due`, `cancelled`)
- `price_amount` and `price_currency`
- `auto_renew` flag
- `external_billing_ref` (if linked to external billing later)

## Lifecycle

Typical lifecycle for a subscription:

1. **Created** when an application is approved.
2. **Activated** when payment is confirmed.
3. **Active** during the term.
4. **Renewal due** shortly before `term_end_at`.
5. **Renewing** when renewal processing starts.
6. **Completed** when renewal succeeds and a new term is recorded.
7. **Expired or cancelled** if renewal does not occur.

Renewal workflows are handled by n8n and the backend, using scheduled jobs based on `renewal_due_at`.