# Data model

The ApexTalenti backend uses NocoDB as its initial operational datastore. [web:175]

## Design principles

- Keep the model **CRM-agnostic**: use generic `crm_*` references, not CRM-specific IDs.
- Separate commercial entities (subscriptions) from technical entities (projects, domains, email).
- Store only **secret references**, not raw secrets.
- Make provider references explicit per resource type.

## Core tables

### `customers`

Represents an organization or individual buying one or more SKUs.

Key fields:

- `id`
- `display_name`
- `legal_name`
- `primary_contact_name`
- `primary_contact_email`
- `billing_email`
- `country_code`
- `status` (`active`, `prospect`, `inactive`)
- Generic CRM references (future): `crm_customer_id`, `crm_contact_id`

### `applications`

Represents an inbound request for a launch package.

Key fields:

- `id`
- `customer_id`
- `brand_name`
- `activity_type`
- `activity_description`
- `desired_domain`
- `country_target`
- `sku` (`basic`, `premium`, `enterprise`)
- `application_status` (`draft`, `submitted`, `under_review`, `approved`, `rejected`, `cancelled`)
- Timestamps: `submitted_at`, `approved_at`

### `subscriptions`

Represents the commercial subscription.

Key fields:

- `id`
- `customer_id`
- `application_id`
- `sku`
- `billing_cycle` (`annual`)
- `term_start_at`
- `term_end_at`
- `renewal_due_at`
- `renewal_status`
- `billing_status`
- `price_amount`, `price_currency`
- `auto_renew`
- Generic CRM references (future): `crm_subscription_id`

### `projects`

Represents a concrete provisioned environment for a subscription.

Key fields:

- `id`
- `customer_id`
- `application_id`
- `subscription_id`
- `project_name`
- `brand_name`
- `sku`
- `project_status`
- `go_live_at`
- `final_domain`
- `public_url`
- `html_version`
- `secret_policy`

### `project_domains`

Domain registration details per project.

Key fields:

- `id`
- `project_id`
- `requested_domain`
- `registered_domain`
- `registrar_provider`
- `registrar_operation_ref`
- `registration_status`
- `registration_years`
- `auto_renew`
- `expires_at`

### `project_dns`

DNS configuration per project.

Key fields:

- `id`
- `project_id`
- `dns_provider`
- `zone_ref`
- `zone_status`
- `nameservers`
- `dnssec_status`
- `last_verified_at`

### `project_sites`

Static hosting details per project.

Key fields:

- `id`
- `project_id`
- `site_provider`
- `bucket_or_site_ref`
- `custom_domain_ref`
- `publish_status`
- `latest_artifact_ref`
- `published_url`
- `last_publish_at`

### `project_email`

Email details per project.

Key fields:

- `id`
- `project_id`
- `email_provider`
- `sku_mode` (`basic`, `premium`, `enterprise`)
- `business_address` (e.g. `admin@newbrand.com`)
- `mailbox_type` (`forwarded`, `hosted`, `dedicated`)
- `provider_mailbox_ref`
- `provider_alias_ref`
- `destination_address` (if forwarding)
- `credential_secret_ref` (for Premium/Enterprise)
- `email_status`
- `last_verified_at`

### `generated_assets`

Generated content per project.

Key fields:

- `id`
- `project_id`
- `asset_type` (`html`, `image`, `config`)
- `generator` (e.g. `ollama:v1`)
- `version`
- `storage_ref`
- `checksum`
- `created_at`

### `provisioning_jobs` and `provisioning_events`

Jobs and events capture the history of provisioning and are used for retries and debugging.

### `renewal_jobs`

Represents scheduled renewal operations for subscriptions.

The exact table definitions can be implemented as NocoDB tables with appropriate relationships and exposed over the NocoDB REST API. [web:175]