# ADR-002 CRM agnostic model

## Status

Proposed

## Context

ApexTalenti should avoid coupling core business entities too tightly to a single CRM implementation.

## Decision

Adopt a CRM-agnostic domain model with explicit mapping layers for external systems.

## Consequences

- Core workflows remain portable.
- Integrations require translation logic.
- Reporting and operations must distinguish canonical vs external identifiers.
