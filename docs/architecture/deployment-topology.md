# Deployment topology

ApexTalenti is designed to run on a Proxmox-based homelab using LXC containers and/or VMs.
Only exposing required services via cloudflared lxc tunnels - no reverse proxies are used.

## Suggested topology

- `lxc-nocodb`  
  - Runs NocoDB and its database.  
  - Provides the operational data store and UI.

- `lxc-n8n`  
  - Runs n8n for workflow orchestration, webhooks, and scheduled jobs.

- `lxc-provisioning-api`  
  - Runs the Admin Backend and provider adapters.  
  - Exposes REST APIs for the form capture website and n8n.

- `lxc-ollama`  
  - Runs the Ollama-based HTML generation service.

- `lxc-vaultwarden`  
  - Runs Vaultwarden for secret storage and retrieval.

- `lxc-mkdocs`  
  - Hosts MkDocs + Material for MkDocs for internal documentation preview.

## Connectivity

- Provisioning API ↔ NocoDB: REST APIs for CRUD operations.
- Provisioning API ↔ n8n: HTTP triggers and callbacks.
- Provisioning API ↔ Providers: HTTPS APIs (registrar, DNS, email, hosting).
- Provisioning API ↔ Content Generation: HTTP calls to the Ollama wrapper service.
- n8n ↔ NocoDB: REST APIs for workflow data access.
- Operator access: through the NocoDB web UI, n8n UI, and the documentation site.

This topology balances separation of concerns with manageable operational overhead in a homelab environment.