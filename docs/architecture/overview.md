# System overview

ApexTalenti provisions and manages “launch packages” for customers composed of:

- a registered domain
- a static HTML landing site
- a branded business email address

The system has six main components:

1. **Admin Backend**  
   - Exposes HTTP APIs for the form capture website and internal tools.  
   - Normalizes incoming applications into provisioning jobs.  
   - Encapsulates provider logic behind adapter interfaces for abstraction.  

2. **Operational Datastore (NocoDB)**  
   - Stores customers, applications, subscriptions, projects, and provisioning state.  
   - Provides a UI for inspecting and editing records.  
   - Exposes REST APIs used by the backend and n8n.

3. **Workflow Engine (n8n)**  
   - Manages webhooks, scheduled jobs, retry logic, and notifications.  
   - Orchestrates long-running operations (e.g., provisioning, renewals) by calling the backend and NocoDB APIs.

4. **Content Generation Service**  
   - Wraps the local Ollama engine to produce static HTML landing pages based on project data. 
   - Validates and version-tags generated assets.

5. **Provider Adapter Layer**  
   - Domain registrar adapter  
   - DNS and static hosting adapter  
   - Basic email provider adapter  
   - (Future) Premium and Enterprise email adapters  
   - (Future) CRM adapter  

6. **Form Capture Website**  
   - A simple web app for end-users to submit new “launch package” applications.  
   - Talks only to the Admin Backend.

This architecture keeps provisioning concerns separated from commercial systems and makes it straightforward to add new providers or CRM integrations in later phases.