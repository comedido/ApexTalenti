# SKUs

ApexTalenti defines three SKUs with increasing levels of email and operational maturity.

## Basic

**Status**: Implemented in Phase 1.

**Positioning**

- Lowest-cost way to get a professional online presence.
- Ideal for solo businesses and early-stage projects.
- Includes:

  - domain registration
  - static HTML landing page
  - branded business email presence (e.g. `admin@newbrand.com`) using a low-cost provider

**Technical characteristics**

- Domain registered via registrar API.
- DNS and static hosting via a DNS + static hosting provider.
- Basic email delivered via a low-cost email provider that can forward or host messages for the business address at minimal cost.
- No customer interaction is required to activate email.

## Premium

**Status**: Defined, implemented in Phase 2.

**Positioning**

- For customers who want a **dedicated standalone mailbox** from day one.
- Better separation between business and personal email.
- Includes:

  - everything in Basic, plus
  - a dedicated mailbox for `admin@newbrand.com` with its own login credentials
  - stronger operational posture for teams and scaling

**Technical characteristics (planned)**

- Uses a mailbox provider that supports user creation via API. AWS WorkMail most probably.
- Credentials stored as secret references in the backend.
- Mailbox lifecycle (password resets, suspension, deletion) managed by the platform.

## Enterprise

**Status**: Defined, implemented in Phase 2.

**Positioning**

- For customers with more complex needs:
  - multiple mailboxes
  - additional domains
  - more elaborate websites or integrations
- Includes:

  - everything in Premium, plus
  - additional mailboxes or aliases under the same domain
  - extended support and SLA options
  - potential integrations with other systems (e.g. CRM, analytics)

**Technical characteristics (planned)**

- Multi-mailbox management and possibly multiple domains per customer.
- Additional provider integrations (e.g. advanced email security, logging).
- Support for custom workflow and approval steps.

## Phase visibility

All three SKUs are **visible to customers and documented**, but only **Basic** is implemented and fulfilled in Phase 1.  
Premium and Enterprise are defined so the architecture and backend can be built with their future needs in mind.