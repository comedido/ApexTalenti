# Frontend runtime

## Purpose

This document records the runtime environment for the ApexTalenti frontend application.

The frontend is developed and hosted in its own dedicated LXC so it can evolve independently from the backend, NocoDB, and n8n services.

## Runtime inventory

### Frontend UI runtime

- **Runtime name**: `apextalenti-web`
- **Purpose**: development and initial hosting of the ApexTalenti public web UI
- **Platform**: Proxmox LXC
- **OS**: `Ubuntu 24.04.04 LTS`
- **Internal IP address**: `10.10.10.118`
- **vCPU**: `2`
- **RAM**: `2048`
- **Disk**: `8`
- **Node.js version**: `24.14.1`
- **npm version**: `11.12.1`

## Repository layout

- **Repository root**: `/opt/ApexTalenti`
- **Frontend app root**: `/opt/ApexTalenti/apps/web`

## Runtime ports

- **3000/tcp** — Next.js development server

## Execution model

Current mode:

- local development runtime
- manually started with:
  - `npm run dev -- --hostname 0.0.0.0`

Future mode:

- production build
- process supervisor
- reverse proxy
- TLS termination
- custom domain

## Operational notes

- This runtime currently serves the initial UI-only implementation.
- No backend API communication is implemented yet.
- The form submit action is currently a local placeholder success state only.

## Source references

- Frontend application root: `apps/web/README.md`
- Main route: `apps/web/src/app/page.tsx`
- Global styles: `apps/web/src/app/globals.css`
