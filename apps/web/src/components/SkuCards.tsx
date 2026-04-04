const skus = [
  {
    name: "Basic",
    description: "Domain, static site, and branded business email presence.",
    status: "Available now",
    active: true,
  },
  {
    name: "Premium",
    description: "Dedicated standalone mailbox and stronger operational setup.",
    status: "Phase 2",
    active: false,
  },
  {
    name: "Enterprise",
    description: "Advanced multi-mailbox and extended business setup.",
    status: "Phase 2",
    active: false,
  },
];

export function SkuCards() {
  return (
    <section className="sku-grid">
      {skus.map((sku) => (
        <article
          key={sku.name}
          className={`sku-card ${sku.active ? "sku-card--active" : "sku-card--disabled"}`}
        >
          <div className="sku-card__header">
            <h2>{sku.name}</h2>
            <span className="badge">{sku.status}</span>
          </div>
          <p>{sku.description}</p>
        </article>
      ))}
    </section>
  );
}
