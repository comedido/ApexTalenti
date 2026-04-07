import { Hero } from "@/components/Hero";
import { ApplicationForm } from "@/features/application-form/components/ApplicationForm";

export default function HomePage() {
  return (
    <main>
      <div className="container">
        <Hero />

        <section className="corporate-overview">
          <div className="corporate-overview__intro">
            <p className="eyebrow">Overview</p>
            <h2>
              A structured starting point for digital presence and service
              readiness
            </h2>
            <p>
              The Basic package is intended for companies that need a
              professional first-stage presence while keeping client intake,
              internal review, and future provisioning properly organized from
              the beginning.
            </p>
          </div>

          <div className="corporate-overview__grid">
            <article className="info-card">
              <h3>Business-focused intake</h3>
              <p>
                Captures the business, contact, and domain information required
                to review each request in a consistent and operationally useful
                way.
              </p>
            </article>

            <article className="info-card">
              <h3>Review-ready records</h3>
              <p>
                Every submission enters a structured workflow with fields for
                ownership, review decisions, and downstream provisioning
                readiness.
              </p>
            </article>

            <article className="info-card">
              <h3>Future-proof delivery model</h3>
              <p>
                The data model is designed to support evolving providers and
                automation workflows without requiring provider-specific field
                names.
              </p>
            </article>
          </div>
        </section>

        <ApplicationForm />
      </div>
    </main>
  );
}
