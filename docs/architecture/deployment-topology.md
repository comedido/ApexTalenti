# Deployment topology

ApexTalenti is designed to run on a Proxmox-based homelab using LXC containers and/or VMs.

## Suggested topology

- `lxc-nocodb`  
  - Runs NocoDB and its database.  
  - Provides the operational data store and UI. [web:175]

- `lxc-n8n`  
  - Runs n8n for workflow orchestration, webhooks, and scheduled jobs. [web:191]

- `lxc-provisioning-api`  
  - Runs the Admin Backend and provider adapters.  
  - Exposes REST APIs for the form capture website and n8n.

- `lxc-ollama`  
  - Runs the Ollama-based HTML generation service. [cite:31]

- `lxc-vaultwarden`  
  - Runs Vaultwarden for secret storage and retrieval. [cite:33]

- (Optional) `lxc-docs`  
  - Hosts MkDocs + Material for MkDocs for internal documentation preview. [web:186][web:192]

## Connectivity

- Provisioning API ↔ NocoDB: REST APIs for CRUD operations. [web:175]
- Provisioning API ↔ n8n: HTTP triggers and callbacks. [web:191]
- Provisioning API ↔ Providers: HTTPS APIs (registrar, DNS, email, hosting).
- Provisioning API ↔ Content Generation: HTTP calls to the Ollama wrapper service. [cite:31]
- n8n ↔ NocoDB: REST APIs for workflow data access. [web:175]
- Operator access: through the NocoDB web UI, n8n UI, and the documentation site.

This topology balances separation of concerns with manageable operational overhead in a homelab environment.