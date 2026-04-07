"use client";

import { ChangeEvent, FormEvent, useMemo, useState } from "react";
import { createApplication } from "../lib/api";
import {
  initialApplicationFormValues,
  normalizeApplicationFormValues,
  validateApplicationForm,
} from "../lib/validation";
import {
  ApplicationFormErrors,
  ApplicationFormValues,
  CreateApplicationRequest,
  SkuValue,
} from "../types";

type TouchedState = Partial<Record<keyof ApplicationFormValues, boolean>>;

const skuOptions: Array<{
  value: SkuValue;
  title: string;
  description: string;
  pill: string;
  available: boolean;
}> = [
  {
    value: "basic",
    title: "Basic",
    description:
      "A complete starter package covering domain intake, a professional static web presence, and provisioning-ready business setup preparation.",
    pill: "Available now",
    available: true,
  },
  {
    value: "premium",
    title: "Premium",
    description:
      "Expanded delivery for businesses that require broader service scope and additional operational setup.",
    pill: "Planned",
    available: false,
  },
  {
    value: "enterprise",
    title: "Enterprise",
    description:
      "A tailored package for organizations that need a more advanced operational model and scalable delivery path.",
    pill: "Planned",
    available: false,
  },
];

export function ApplicationForm() {
  const [values, setValues] = useState<ApplicationFormValues>(
    initialApplicationFormValues,
  );
  const [errors, setErrors] = useState<ApplicationFormErrors>({});
  const [touched, setTouched] = useState<TouchedState>({});
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [serverMessage, setServerMessage] = useState("");
  const [applicationRef, setApplicationRef] = useState<string | null>(null);

  const hasErrors = useMemo(() => {
    return Object.keys(validateApplicationForm(values)).length > 0;
  }, [values]);

  function handleChange(
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) {
    const { name, value } = event.target;

    setValues((current) => ({
      ...current,
      [name]: value,
    }));

    if (touched[name as keyof ApplicationFormValues]) {
      const nextValues = {
        ...values,
        [name]: value,
      };
      setErrors(validateApplicationForm(nextValues));
    }
  }

  function handleBlur(
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) {
    const { name } = event.target;

    const nextTouched = {
      ...touched,
      [name]: true,
    };

    setTouched(nextTouched);
    setErrors(validateApplicationForm(values));
  }

  function handleSkuSelect(sku: SkuValue) {
    if (sku !== "basic") return;

    const nextValues = {
      ...values,
      sku,
    };

    setValues(nextValues);
    setErrors(validateApplicationForm(nextValues));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (submitting || submitted) {
      return;
    }

    const allTouched: TouchedState = {
      sku: true,
      fullName: true,
      email: true,
      brandName: true,
      desiredDomain: true,
      activityType: true,
      activityDescription: true,
    };

    const normalizedValues = normalizeApplicationFormValues(values);
    const validationErrors = validateApplicationForm(normalizedValues);

    setTouched(allTouched);
    setValues(normalizedValues);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      setSubmitted(false);
      return;
    }

    const payload: CreateApplicationRequest = {
      customer: {
        displayName: normalizedValues.brandName,
        primaryContactName: normalizedValues.fullName,
        primaryContactEmail: normalizedValues.email,
        billingEmail: normalizedValues.email,
        countryCode: "ES",
        language: "en",
      },
      application: {
        brandName: normalizedValues.brandName,
        activityType: normalizedValues.activityType,
        activityDescription: normalizedValues.activityDescription,
        desiredDomain: normalizedValues.desiredDomain,
        sku: "basic",
        consentAccepted: true,
      },
    };

    try {
      setSubmitting(true);
      setServerMessage("");
      setApplicationRef(null);

      const data = await createApplication(payload);

      setSubmitted(true);
      setServerMessage(data.message);
      setApplicationRef(data.applicationId);
    } catch (error) {
      setSubmitted(false);
      setServerMessage(
        error instanceof Error
          ? error.message
          : "Unexpected error during submission.",
      );
    } finally {
      setSubmitting(false);
    }
  }

  function getFieldError(field: keyof ApplicationFormValues) {
    if (!touched[field]) return undefined;
    return errors[field];
  }

  if (submitted) {
    return (
      <section className="form-section">
        <div className="submission-result submission-result--success">
          <p className="eyebrow">Request submitted</p>
          <h2>Your request has been received</h2>
          <p>{serverMessage}</p>
          {applicationRef ? (
            <p className="reference-text">
              Reference: <code>{applicationRef}</code>
            </p>
          ) : null}
          <p className="helper-text">
            This page is locked after submission to prevent duplicate requests.
            Refresh the page if you need to start a new application.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="form-section">
      <div className="section-heading">
        <p className="eyebrow">Application</p>
        <h2>Request the Basic package</h2>
        <p>
          Submit your business and brand details to request review for the Basic
          package, including domain intake, a professional landing page, and
          operational setup preparation.
        </p>
      </div>

      <div className="offering-summary">
        <h3>What is included</h3>
        <ul>
          <li>Professional business landing page delivery.</li>
          <li>Preferred domain intake and review for the requested brand.</li>
          <li>Operationally structured intake for downstream provisioning.</li>
        </ul>
      </div>

      <form className="application-form" onSubmit={handleSubmit} noValidate>
        <fieldset className="sku-selector">
          <legend>Select your package</legend>

          <div className="sku-grid sku-grid--selectable">
            {skuOptions.map((sku) => {
              const isSelected = values.sku === sku.value;

              return (
                <button
                  key={sku.value}
                  type="button"
                  className={[
                    "sku-card",
                    "sku-card--interactive",
                    isSelected ? "sku-card--selected" : "",
                    !sku.available ? "sku-card--disabled" : "",
                  ]
                    .filter(Boolean)
                    .join(" ")}
                  onClick={() => handleSkuSelect(sku.value)}
                  aria-pressed={isSelected}
                  aria-disabled={!sku.available}
                >
                  <div className="sku-card__header">
                    <h3>{sku.title}</h3>
                    <span className="badge">{sku.pill}</span>
                  </div>
                  <p className="sku-card__description">{sku.description}</p>
                </button>
              );
            })}
          </div>

          {getFieldError("sku") ? (
            <span className="field-error" id="sku-error">
              {getFieldError("sku")}
            </span>
          ) : null}
        </fieldset>

        <div className="field-grid">
          <label>
            Full name
            <input
              type="text"
              name="fullName"
              placeholder="Jane Doe"
              value={values.fullName}
              onChange={handleChange}
              onBlur={handleBlur}
              aria-invalid={Boolean(getFieldError("fullName"))}
              aria-describedby={
                getFieldError("fullName") ? "fullName-error" : undefined
              }
            />
            {getFieldError("fullName") ? (
              <span className="field-error" id="fullName-error">
                {getFieldError("fullName")}
              </span>
            ) : null}
          </label>

          <label>
            Email address
            <input
              type="email"
              name="email"
              placeholder="jane@example.com"
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
              aria-invalid={Boolean(getFieldError("email"))}
              aria-describedby={
                getFieldError("email") ? "email-error" : undefined
              }
            />
            {getFieldError("email") ? (
              <span className="field-error" id="email-error">
                {getFieldError("email")}
              </span>
            ) : null}
          </label>

          <label>
            Brand name
            <input
              type="text"
              name="brandName"
              placeholder="New Brand"
              value={values.brandName}
              onChange={handleChange}
              onBlur={handleBlur}
              aria-invalid={Boolean(getFieldError("brandName"))}
              aria-describedby={
                getFieldError("brandName") ? "brandName-error" : undefined
              }
            />
            {getFieldError("brandName") ? (
              <span className="field-error" id="brandName-error">
                {getFieldError("brandName")}
              </span>
            ) : null}
          </label>

          <label>
            Preferred domain
            <input
              type="text"
              name="desiredDomain"
              placeholder="newbrand.com"
              value={values.desiredDomain}
              onChange={handleChange}
              onBlur={handleBlur}
              aria-invalid={Boolean(getFieldError("desiredDomain"))}
              aria-describedby={
                getFieldError("desiredDomain")
                  ? "desiredDomain-error"
                  : undefined
              }
            />
            {getFieldError("desiredDomain") ? (
              <span className="field-error" id="desiredDomain-error">
                {getFieldError("desiredDomain")}
              </span>
            ) : null}
          </label>
        </div>

        <label>
          Business activity
          <input
            type="text"
            name="activityType"
            placeholder="Dental clinic"
            value={values.activityType}
            onChange={handleChange}
            onBlur={handleBlur}
            aria-invalid={Boolean(getFieldError("activityType"))}
            aria-describedby={
              getFieldError("activityType") ? "activityType-error" : undefined
            }
          />
          {getFieldError("activityType") ? (
            <span className="field-error" id="activityType-error">
              {getFieldError("activityType")}
            </span>
          ) : null}
        </label>

        <label>
          Business description
          <textarea
            name="activityDescription"
            placeholder="Briefly describe the products or services your business provides"
            rows={5}
            value={values.activityDescription}
            onChange={handleChange}
            onBlur={handleBlur}
            aria-invalid={Boolean(getFieldError("activityDescription"))}
            aria-describedby={
              getFieldError("activityDescription")
                ? "activityDescription-error"
                : undefined
            }
          />
          {getFieldError("activityDescription") ? (
            <span className="field-error" id="activityDescription-error">
              {getFieldError("activityDescription")}
            </span>
          ) : null}
        </label>

        <div className="form-meta">
          <p className="helper-text">
            Submitted requests enter an internal review workflow before any
            provisioning activity begins.
          </p>
        </div>

        <div className="form-actions">
          <button
            type="submit"
            disabled={
              submitting || (hasErrors && Object.keys(touched).length > 0)
            }
          >
            {submitting ? "Submitting..." : "Submit request"}
          </button>
        </div>

        {serverMessage && !submitted ? (
          <div className="error-message" role="status" aria-live="polite">
            <strong>Submission error:</strong> {serverMessage}
          </div>
        ) : null}
      </form>
    </section>
  );
}
