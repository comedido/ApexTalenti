import { Hero } from "@/components/Hero";
import { ApplicationForm } from "@/features/application-form/components/ApplicationForm";

export default function HomePage() {
  return (
    <main>
      <div className="container">
        <Hero />

        <section className="trust-band" aria-label="Business value highlights">
          <div className="trust-band__track">
            <span>Professional brand presence</span>
            <span>Domain and website launch</span>
            <span>Business-facing communication</span>
            <span>Clear packaged scope</span>
            <span>Faster online credibility</span>
          </div>
        </section>

        <section className="metric-grid">
          <article className="metric-card">
            <strong>01</strong>
            <h3>Stronger first impression</h3>
            <p>
              Present your business with a cleaner, more credible identity from
              the first visit.
            </p>
          </article>

          <article className="metric-card">
            <strong>02</strong>
            <h3>Faster launch path</h3>
            <p>
              Get the essentials in place without overcomplicating your first
              online presence.
            </p>
          </article>

          <article className="metric-card">
            <strong>03</strong>
            <h3>Better customer trust</h3>
            <p>
              Use branded assets that help your company look more mature and
              client-ready.
            </p>
          </article>

          <article className="metric-card metric-card--highlight">
            <span className="metric-card__kicker">Business value</span>
            <h3>Your brand should not look temporary</h3>
            <p>
              A polished domain, a modern landing page, and stronger business
              presentation help reduce hesitation and improve perceived quality.
            </p>
          </article>
        </section>

        <section className="corporate-overview corporate-overview--enhanced">
          <div className="corporate-overview__intro">
            <p className="eyebrow">Overview</p>
            <h2>Everything you need to look ready</h2>
            <p>
              The Basic package brings together the visible assets that shape
              how your company is perceived online: your domain, your public
              landing page, and your branded communication starting point.
            </p>
          </div>

          <div className="corporate-overview__grid">
            <article className="info-card info-card--accent">
              <div className="info-card__icon">01</div>
              <h3>Modern web presence</h3>
              <p>
                Show your business with a cleaner landing page that feels more
                polished, credible, and ready for customers.
              </p>
            </article>

            <article className="info-card info-card--accent">
              <div className="info-card__icon">02</div>
              <h3>Branded identity</h3>
              <p>
                Strengthen recognition with a business domain aligned to your
                company name and positioning.
              </p>
            </article>

            <article className="info-card info-card--accent">
              <div className="info-card__icon">03</div>
              <h3>Clear communications base</h3>
              <p>
                Start with a more professional communication setup that supports
                external trust and brand consistency.
              </p>
            </article>
          </div>
        </section>

        <section className="feature-band">
          <div className="feature-band__content">
            <div className="feature-band__left">
              <p className="eyebrow">Why it works</p>
              <h2>Be taken seriously earlier</h2>
              <p>
                Customers often decide in seconds whether a business looks
                ready. A stronger digital presence helps your company feel more
                real, more trustworthy, and more prepared to serve.
              </p>
            </div>

            <div className="feature-band__right">
              <div className="feature-band__card">
                <strong>Sharper presentation</strong>
                <span>
                  Replace improvised visuals with a more credible public
                  presence.
                </span>
              </div>
              <div className="feature-band__card">
                <strong>More brand consistency</strong>
                <span>
                  Align your visible business assets around one cleaner
                  identity.
                </span>
              </div>
              <div className="feature-band__card">
                <strong>Cleaner launch experience</strong>
                <span>
                  Start with the essentials that most new companies need first.
                </span>
              </div>
            </div>
          </div>
        </section>

        <section className="cta-band">
          <div className="cta-band__content">
            <div>
              <p className="eyebrow">Start now</p>
              <h2>Request your launch package</h2>
              <p>
                Share your brand and business details to begin with a more
                polished online presence.
              </p>
            </div>
            <a href="#application" className="cta-band__link">
              Go to application
            </a>
          </div>
        </section>

        <section id="application">
          <ApplicationForm />
        </section>
      </div>
    </main>
  );
}
