export function Hero() {
  return (
    <section className="hero hero--enhanced">
      <div className="hero__bg" aria-hidden="true">
        <div className="hero__orb hero__orb--one" />
        <div className="hero__orb hero__orb--two" />
        <div className="hero__grid" />
      </div>

      <div className="hero__content">
        <div className="hero__badge-row">
          <p className="eyebrow">ApexTalenti</p>
          <span className="hero__mini-badge">Business Launch Package</span>
        </div>

        <h1>
          Launch smarter.
          <br />
          Look established.
        </h1>

        <p className="hero__description">
          Build a stronger first impression with a branded domain, a polished
          landing page, and business-ready communication foundations designed to
          help your company look credible from day one.
        </p>

        <div className="hero__actions">
          <a href="#application" className="hero__primary-link">
            Start your request
          </a>
          <span className="hero__secondary-note">
            Fast setup for founders, small businesses, and new service brands
          </span>
        </div>

        <div className="hero__highlights">
          <span>Branded domain</span>
          <span>Modern landing page</span>
          <span>Business email base</span>
          <span>Launch-ready package</span>
        </div>
      </div>
    </section>
  );
}
