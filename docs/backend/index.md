# Backend

The backend is responsible for:

- Enforcing the data model and state transitions.
- Exposing internal APIs used by the form capture site and orchestration workflows.
- Coordinating with NocoDB, n8n, the HTML generator, and external providers.

This section describes:

- [Data model](data-model.md)
- [Status machine](status-machine.md)
- [API contracts](api-contracts.md)
- [Workflows](workflows.md)

## Frontend integration roadmap

Frontend-to-backend integration is being introduced in controlled steps, starting from a UI-only placeholder flow.

See [Frontend integration roadmap](frontend-integration-roadmap.md).
