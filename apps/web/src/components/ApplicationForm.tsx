"use client";

import { FormEvent, useState } from "react";

export function ApplicationForm() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);
  }

  return (
    <section className="form-section">
      <div className="section-heading">
        <p className="eyebrow">Phase 1 application</p>
        <h2>Apply for the Basic package</h2>
        <p>
          Fill in the form below to create a new application. This first version does not yet submit
          data to the backend.
        </p>
      </div>

      <form className="application-form" onSubmit={handleSubmit}>
        <div className="field-grid">
          <label>
            Full name
            <input type="text" name="fullName" placeholder="Jane Doe" required />
          </label>

          <label>
            Email address
            <input type="email" name="email" placeholder="jane@example.com" required />
          </label>

          <label>
            Brand name
            <input type="text" name="brandName" placeholder="New Brand" required />
          </label>

          <label>
            Preferred domain
            <input type="text" name="desiredDomain" placeholder="newbrand.com" required />
          </label>
        </div>

        <label>
          Business activity
          <input type="text" name="activityType" placeholder="Dental clinic" required />
        </label>

        <label>
          Business description
          <textarea
            name="activityDescription"
            placeholder="Briefly describe the business activity"
            rows={5}
            required
          />
        </label>

        <div className="form-actions">
          <button type="submit">Submit application</button>
        </div>

        {submitted ? (
          <div className="success-message" role="status" aria-live="polite">
            Placeholder success: the form submission UI is working. Backend integration comes next.
          </div>
        ) : null}
      </form>
    </section>
  );
}
