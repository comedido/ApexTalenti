# Secrets

Secrets are not stored in plain text anywhere in the ApexTalenti database.

## Principles

- Use a dedicated secret store (e.g. Vaultwarden) for:
  - provider API keys
  - mailbox credentials
  - temporary passwords and tokens
- Store only **references** to secrets in NocoDB (e.g. `credential_secret_ref`).
- Restrict secret access to the services and operators that absolutely need it.

## Examples

- **Good**: `credential_secret_ref = "vaultwarden://item/123"`
- **Bad**: `mailbox_password = "SuperSecret123"`

As the platform evolves, secrets management can be migrated to a more specialized vault if needed, without changing the data model.