# Diagram playground

This page is a scratchpad for architecture diagrams. Use Mermaid to sketch and iterate.

```mermaid
flowchart LR
  subgraph Client
    WebForm[Form capture website]
  end

  subgraph Backend
    API[Admin Backend]
    NocoDB[(NocoDB)]
    N8N[n8n]
    Gen[HTML generator (Ollama)]
  end

  subgraph Providers
    Reg[Domain registrar]
    DNS[DNS + Static hosting]
    EmailBasic[Basic email provider]
  end

  WebForm -->|Submit application| API
  API -->|Persist| NocoDB
  API -->|Enqueue job| N8N
  N8N -->|Read/write| NocoDB
  N8N -->|Call| API
  API -->|Generate HTML| Gen
  API -->|Register domain| Reg
  API -->|Configure DNS/site| DNS
  API -->|Provision Basic email| EmailBasic
```

Use this page to capture ideas visually as the architecture evolves.  
For finalized diagrams, link them from the main architecture pages.