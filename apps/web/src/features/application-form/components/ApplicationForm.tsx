"use client";

import { ChangeEvent, FocusEvent, FormEvent, useMemo, useState } from "react";
import { createApplication, checkDomainByName } from "../lib/api";
import {
  initialApplicationFormValues,
  normalizeApplicationFormValues,
  normalizeDomain,
  validateApplicationForm,
} from "../lib/validation";
import {
  ApplicationFormErrors,
  ApplicationFormValues,
  CreateApplicationRequest,
  SkuValue,
} from "../types";

type TouchedState = Partial<Record<keyof ApplicationFormValues, boolean>>;

type ApplicationFormCopy = {
  eyebrow: string;
  title: string;
  description: string;
  summaryTitle: string;
  summaryItems: [string, string, string];
  formLegend: string;
  fullNameLabel: string;
  fullNamePlaceholder: string;
  emailLabel: string;
  emailPlaceholder: string;
  brandNameLabel: string;
  brandNamePlaceholder: string;
  desiredDomainLabel: string;
  desiredDomainPlaceholder: string;
  activityTypeLabel: string;
  activityTypePlaceholder: string;
  activityDescriptionLabel: string;
  activityDescriptionPlaceholder: string;
  helperText: string;
  submitButton: string;
  submittingButton: string;
  successEyebrow: string;
  successTitle: string;
  successLockedText: string;
  referenceLabel: string;
  errorPrefix: string;
};

type ApplicationFormSkuOption = {
  value: SkuValue;
  title: string;
  description: string;
  pill: string;
  available: boolean;
};

const defaultCopy: ApplicationFormCopy = {
  eyebrow: "Application",
  title: "Request the Basic package",
  description:
    "Share your business and brand details to request a launch package built to help you establish a stronger online presence from the start.",
  summaryTitle: "What the Basic package helps you achieve",
  summaryItems: [
    "Present your business with a more polished and credible online identity.",
    "Align your domain presence with your business name and brand direction.",
    "Build a stronger foundation for customer-facing communication.",
  ],
  formLegend: "Select your package",
  fullNameLabel: "Full name",
  fullNamePlaceholder: "Jane Doe",
  emailLabel: "Email address",
  emailPlaceholder: "jane@example.com",
  brandNameLabel: "Brand name",
  brandNamePlaceholder: "New Brand",
  desiredDomainLabel: "Preferred domain",
  desiredDomainPlaceholder: "newbrand.com",
  activityTypeLabel: "Business activity",
  activityTypePlaceholder: "Dental clinic",
  activityDescriptionLabel: "Business description",
  activityDescriptionPlaceholder:
    "Briefly describe the products or services your business provides",
  helperText:
    "Complete the form below to request your package and receive a response from our team.",
  submitButton: "Submit request",
  submittingButton: "Submitting...",
  successEyebrow: "Request submitted",
  successTitle: "Your request has been received",
  successLockedText:
    "This page is locked after submission to prevent duplicate requests. Refresh the page if you need to start a new application.",
  referenceLabel: "Reference",
  errorPrefix: "Submission error:",
};

const defaultSkuOptions: ApplicationFormSkuOption[] = [
  {
    value: "basic",
    title: "Basic",
    description:
      "A launch-focused package combining domain setup planning, a polished business landing page, and branded communication foundations.",
    pill: "Available now",
    available: true,
  },
  {
    value: "premium",
    title: "Premium",
    description:
      "Expanded delivery for businesses that want a broader presence, stronger presentation, and additional setup support.",
    pill: "Planned",
    available: false,
  },
  {
    value: "enterprise",
    title: "Enterprise",
    description:
      "A tailored engagement for organizations that need a more advanced digital presence and broader service scope.",
    pill: "Planned",
    available: false,
  },
];

export function ApplicationForm({
  submissionSource = "apextalenti-web-form",
  copy = defaultCopy,
  skuOptions = defaultSkuOptions,
}: {
  submissionSource?: string;
  copy?: ApplicationFormCopy;
  skuOptions?: ApplicationFormSkuOption[];
}) {
  const [values, setValues] = useState<ApplicationFormValues>(
    initialApplicationFormValues,
  );
  const [errors, setErrors] = useState<ApplicationFormErrors>({});
  const [touched, setTouched] = useState<TouchedState>({});
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [serverMessage, setServerMessage] = useState("");
  const [applicationRef, setApplicationRef] = useState<string | null>(null);

  const [checkingDomain, setCheckingDomain] = useState(false);
  const [domainChecked, setDomainChecked] = useState(false);

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

    if (name === "desiredDomain") {
      setDomainChecked(false);
    }
  }

  async function handleBlur(
    event: FocusEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) {
    const { name } = event.currentTarget;

    const nextTouched = {
      ...touched,
      [name]: true,
    };

    setTouched(nextTouched);

    const nextValues = {
      ...values,
      [name]: event.currentTarget.value,
    } as ApplicationFormValues;

    setErrors(validateApplicationForm(nextValues));

    if (name === "desiredDomain") {
      const normalizedDomain = normalizeDomain(event.currentTarget.value);

      if (!normalizedDomain) {
        return;
      }

      if (!normalizedDomain.endsWith(".com")) {
        setErrors((current) => ({
          ...current,
          desiredDomain: "Solo se permiten dominios .com.",
        }));
        return;
      }

      try {
        setCheckingDomain(true);
        setDomainChecked(false);

        const response = await checkDomainByName(normalizedDomain);
        const domains = response.result?.domains ?? [];
        const match = domains.find(
          (domain) => domain.name.toLowerCase() === normalizedDomain,
        );

        if (!match) {
          setErrors((current) => ({
            ...current,
            desiredDomain:
              "No se ha podido comprobar la disponibilidad del dominio.",
          }));
          return;
        }

        if (!match.registrable) {
          setErrors((current) => ({
            ...current,
            desiredDomain:
              "Este dominio no está disponible. Por favor, elige otro .com.",
          }));
          return;
        }

        setErrors((current) => {
          const { desiredDomain, ...rest } = current;
          return rest;
        });
        setDomainChecked(true);
      } catch (error) {
        setErrors((current) => ({
          ...current,
          desiredDomain:
            error instanceof Error
              ? error.message
              : "No se ha podido comprobar la disponibilidad del dominio.",
        }));
      } finally {
        setCheckingDomain(false);
      }
    }
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

      const data = await createApplication(payload, submissionSource);

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
          <p className="eyebrow">{copy.successEyebrow}</p>
          <h2>{copy.successTitle}</h2>
          <p>{serverMessage}</p>
          {applicationRef ? (
            <p className="reference-text">
              {copy.referenceLabel}: <code>{applicationRef}</code>
            </p>
          ) : null}
          <p className="helper-text">{copy.successLockedText}</p>
        </div>
      </section>
    );
  }

  return (
    <section className="form-section form-section--enhanced">
      <div className="section-heading">
        <p className="eyebrow">{copy.eyebrow}</p>
        <h2>{copy.title}</h2>
        <p>{copy.description}</p>
      </div>

      <div className="offering-summary offering-summary--enhanced">
        <h3>{copy.summaryTitle}</h3>
        <ul>
          <li>{copy.summaryItems[0]}</li>
          <li>{copy.summaryItems[1]}</li>
          <li>{copy.summaryItems[2]}</li>
        </ul>
      </div>

      <form className="application-form" onSubmit={handleSubmit} noValidate>
        <fieldset className="sku-selector">
          <legend>{copy.formLegend}</legend>

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
            {copy.fullNameLabel}
            <input
              type="text"
              name="fullName"
              placeholder={copy.fullNamePlaceholder}
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
            {copy.emailLabel}
            <input
              type="email"
              name="email"
              placeholder={copy.emailPlaceholder}
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
            {copy.brandNameLabel}
            <input
              type="text"
              name="brandName"
              placeholder={copy.brandNamePlaceholder}
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
            {copy.desiredDomainLabel}
            <input
              type="text"
              name="desiredDomain"
              placeholder={copy.desiredDomainPlaceholder}
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
            {checkingDomain && !getFieldError("desiredDomain") ? (
              <span className="field-hint">
                Comprobando disponibilidad del dominio...
              </span>
            ) : null}
            {getFieldError("desiredDomain") ? (
              <span className="field-error" id="desiredDomain-error">
                {getFieldError("desiredDomain")}
              </span>
            ) : domainChecked ? (
              <span className="field-success">Dominio disponible.</span>
            ) : null}
          </label>
        </div>

        <label>
          {copy.activityTypeLabel}
          <input
            type="text"
            name="activityType"
            placeholder={copy.activityTypePlaceholder}
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
          {copy.activityDescriptionLabel}
          <textarea
            name="activityDescription"
            placeholder={copy.activityDescriptionPlaceholder}
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
          <p className="helper-text">{copy.helperText}</p>
        </div>

        <div className="form-actions">
          <button
            type="submit"
            disabled={
              submitting ||
              checkingDomain ||
              (hasErrors && Object.keys(touched).length > 0)
            }
          >
            {submitting ? copy.submittingButton : copy.submitButton}
          </button>
        </div>

        {serverMessage && !submitted ? (
          <div className="error-message" role="status" aria-live="polite">
            <strong>{copy.errorPrefix}</strong> {serverMessage}
          </div>
        ) : null}
      </form>
    </section>
  );
}
