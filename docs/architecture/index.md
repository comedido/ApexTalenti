# Architecture

This section describes the overall architecture of ApexTalenti: how services are separated, how they communicate, and how they are deployed.

The design aims for:

- Clear service boundaries between the admin backend, workflow engine, operational datastore, content generation, and provider adapters.
- A **CRM-agnostic core** so that no specific CRM is required in Phase 1.
- A deployment model that fits a Proxmox-based homelab while remaining portable to cloud infrastructure later on.

Use the subsections below for details:

- [System overview](overview.md)
- [Service boundaries](service-boundaries.md)
- [Deployment topology](deployment-topology.md)
- [Diagram playground](diagram-playground.md)

## Frontend runtime

The public frontend runs in a dedicated LXC runtime so that UI development can progress independently from the backend and workflow stack.

See [Frontend runtime](frontend-runtime.md) for the runtime inventory, network details, and source references.
