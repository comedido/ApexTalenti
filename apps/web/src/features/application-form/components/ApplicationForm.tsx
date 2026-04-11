"use client";

import { useState } from "react";
import { config } from "@/lib/config";

type ApplicationPayload = {
  fullName: string;
  email: string;
  brandName: string;
  desiredDomain: string;
  activityType: string;
  activityDescription: string;
};

export function ApplicationForm() {
  const [form, setForm] = useState<ApplicationPayload>({
    fullName: "",
    email: "",
    brandName: "",
    desiredDomain: "",
    activityType: "",
    activityDescription: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (field: keyof ApplicationPayload, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setSubmitting(true);
    setMessage(null);
    setError(null);

    try {
      if (!config.applicationApiBaseUrl) {
        throw new Error("API base URL is not configured");
      }

      const url = `${config.applicationApiBaseUrl}/api/applications`;

      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      if (!response.ok) {
        const text = await response.text().catch(() => "");
        throw new Error(
          `API error: ${response.status} ${response.statusText} ${text}`,
        );
      }

      setMessage("Application submitted successfully.");
      setForm({
        fullName: "",
        email: "",
        brandName: "",
        desiredDomain: "",
        activityType: "",
        activityDescription: "",
      });
    } catch (err) {
      console.error(err);
      setError(
        err instanceof Error
          ? err.message
          : "Unexpected error submitting application",
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="application-form">
      <h2>Request Basic package onboarding</h2>
      <form onSubmit={handleSubmit}>
        <div className="field-grid">
          <label>
            Full name
            <input
              type="text"
              value={form.fullName}
              onChange={(e) => handleChange("fullName", e.target.value)}
              required
            />
          </label>

          <label>
            Email
            <input
              type="email"
              value={form.email}
              onChange={(e) => handleChange("email", e.target.value)}
              required
            />
          </label>

          <label>
            Brand name
            <input
              type="text"
              value={form.brandName}
              onChange={(e) => handleChange("brandName", e.target.value)}
              required
            />
          </label>

          <label>
            Desired domain
            <input
              type="text"
              value={form.desiredDomain}
              onChange={(e) => handleChange("desiredDomain", e.target.value)}
              required
            />
          </label>

          <label>
            Activity type
            <input
              type="text"
              value={form.activityType}
              onChange={(e) => handleChange("activityType", e.target.value)}
              required
            />
          </label>

          <label className="field-full">
            Activity description
            <textarea
              value={form.activityDescription}
              onChange={(e) =>
                handleChange("activityDescription", e.target.value)
              }
              rows={4}
              required
            />
          </label>
        </div>

        <button type="submit" disabled={submitting}>
          {submitting ? "Submitting..." : "Submit application"}
        </button>

        {message && <p className="status status--success">{message}</p>}
        {error && <p className="status status--error">{error}</p>}
      </form>
    </section>
  );
}
