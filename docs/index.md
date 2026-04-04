# ApexTalenti

ApexTalenti is a backend and operations platform for provisioning and managing small business “launch packages” that include a domain, a static website, and a branded business email address, sold as annual subscriptions.

The system is designed to be:

- **Vendor-mix friendly**: domains, DNS, email, and static hosting can come from different providers.
- **CRM-agnostic**: the core backend does not depend on any specific CRM; CRM integration is an optional adapter.
- **Workflow-driven**: n8n orchestrates long-running jobs, retries, and operator-facing automation.
- **Database-light**: NocoDB provides the initial operational datastore and UI.
- **Homelab-ready**: services run in Proxmox LXC/VMs, using infrastructure you already control.

## Phase 1 scope

Phase 1 focuses on:

- A **Basic** SKU that provisions:
  - a new domain (e.g. `newbrand.com`)
  - a static HTML landing site
  - a branded business email address such as `admin@newbrand.com` using a low-cost email provider
- An internal **control plane**:
  - operational data stored in NocoDB
  - workflows orchestrated by n8n
  - a provisioning API to call external providers
- A **form capture** front end that feeds new applications into the backend.

The **Premium** and **Enterprise** SKUs are defined and visible from day one but not implemented until Phase 2.

## Documentation structure

This documentation is organized as follows:

- **Architecture**: high-level system view, service boundaries, deployment topology, and diagrams.
- **Product**: SKUs (Basic, Premium, Enterprise) and the subscription model.
- **Backend**: data model, status machine, internal API contracts, and workflows.
- **Operations**: secrets, runbooks, and renewal processes.
- **Decisions**: architecture decision records (ADRs) that capture key design choices.

Use this documentation as the single source of truth while we iteratively build and refine the platform.