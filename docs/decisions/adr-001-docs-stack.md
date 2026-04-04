# ADR-001: Documentation stack

## Status

Accepted

## Context

ApexTalenti requires a documentation system that:

- works well with version control
- supports technical documentation (architecture, API contracts, ADRs)
- is easy to host locally in a Proxmox-based environment
- uses Markdown as the primary authoring format

## Decision

Use **MkDocs** with **Material for MkDocs** as the documentation stack.

## Rationale

- MkDocs is designed for Markdown-based documentation and is simple to configure.
- Material for MkDocs provides a high-quality UI, navigation features, and built-in support for a technical audience.
- The docs can be stored alongside code in a single Git repository.
- The stack runs easily in a small container or VM for local preview.

## Consequences

- Documentation is organized under a `docs/` folder with a `mkdocs.yml` configuration file.
- All design, architecture, and API details should be recorded as Markdown files.
- Future tools (e.g. static hosting for docs) will integrate with the MkDocs output.

## Alternatives considered

- GitHub Wiki: less control over structure and versioning.
- Confluence: heavier and not necessary for this early stage.
- Plain README files only: insufficient for complex architecture documentation.