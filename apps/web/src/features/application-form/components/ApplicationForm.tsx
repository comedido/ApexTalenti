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
    description: "Domain, static site, and branded business email presence.",
    pill: "Available now",
    available: true,
  },
  {
    value: "premium",
    title: "Premium",
    description: "Dedicated standalone mailbox and stronger operational setup.",
    pill: "Coming shortly",
    available: false,
  },
  {
    value: "enterprise",
    title: "Enterprise",
    description: "Advanced multi-mailbox and extended business setup.",
    pill: "Coming shortly",
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

    setSubmitted(false);
    setServerMessage("");
    setApplicationRef(null);

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
    setSubmitted(false);
    setServerMessage("");
    setApplicationRef(null);
    setErrors(validateApplicationForm(nextValues));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

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
      setSubmitted(false);
      setServerMessage("");
      setApplicationRef(null);

      const data = await createApplication(payload);

      setSubmitted(true);
      setServerMessage(data.message);
      setApplicationRef(data.applicationId);
      console.log("Iteration 4 placeholder API response:", data);
    } catch (error) {
      setSubmitted(false);
      setServerMessage(
        error instanceof Error
          ? error.message
          : "Unexpected error during placeholder submission.",
      );
    } finally {
      setSubmitting(false);
    }
  }

  function getFieldError(field: keyof ApplicationFormValues) {
    if (!touched[field]) return undefined;
    return errors[field];
  }

  return (
    <section className="form-section">
      <div className="section-heading">
        <p className="eyebrow">Phase 1 application</p>
        <h2>Apply for the Basic package</h2>
        <p>
          This iteration refactors the form into a feature-based structure and
          extracts API logic for future backend integration.
        </p>
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
            placeholder="Briefly describe the business activity"
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
            The form posts through a dedicated client API helper and can switch
            later to an external backend base URL.
          </p>
        </div>

        <div className="form-actions">
          <button
            type="submit"
            disabled={
              submitting || (hasErrors && Object.keys(touched).length > 0)
            }
          >
            {submitting ? "Submitting..." : "Submit application"}
          </button>
        </div>

        {serverMessage ? (
          <div
            className={submitted ? "success-message" : "error-message"}
            role="status"
            aria-live="polite"
          >
            <strong>{submitted ? "Success:" : "Submission error:"}</strong>{" "}
            {serverMessage}
            {applicationRef ? (
              <>
                <br />
                <span className="reference-text">
                  Application reference: <code>{applicationRef}</code>
                </span>
              </>
            ) : null}
          </div>
        ) : null}
      </form>
    </section>
  );
}
