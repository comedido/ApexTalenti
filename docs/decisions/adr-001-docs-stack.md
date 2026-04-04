# ADR-001 Docs stack

## Status

Accepted

## Context

ApexTalenti needs a documentation stack that is lightweight, versionable, easy to host in Proxmox, and friendly to engineers.

## Decision

Use MkDocs with Material for MkDocs as the primary documentation platform.

## Consequences

- Documentation lives as code in Git.
- Hosting is simple inside an LXC.
- Structure and navigation are explicit and maintainable.
