"use client";

import { ChangeEvent, FormEvent, useMemo, useState } from "react";
import {
  ApplicationFormErrors,
  ApplicationFormValues,
  initialApplicationFormValues,
  normalizeApplicationFormValues,
  validateApplicationForm,
} from "./applicationForm.validation";

type TouchedState = Partial<Record<keyof ApplicationFormValues, boolean>>;

export function ApplicationForm() {
  const [values, setValues] = useState<ApplicationFormValues>(
    initialApplicationFormValues,
  );
  const [errors, setErrors] = useState<ApplicationFormErrors>({});
  const [touched, setTouched] = useState<TouchedState>({});
  const [submitted, setSubmitted] = useState(false);

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

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const allTouched: TouchedState = {
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

    setSubmitted(true);

    console.log("Iteration 2 placeholder payload:", normalizedValues);
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
          Fill in the form below to create a new application. This iteration
          validates the form locally and does not yet submit data to the
          backend.
        </p>
      </div>

      <form className="application-form" onSubmit={handleSubmit} noValidate>
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
            This form is validated locally only. Submission is still a
            placeholder in this iteration.
          </p>
        </div>

        <div className="form-actions">
          <button
            type="submit"
            disabled={hasErrors && Object.keys(touched).length > 0}
          >
            Submit application
          </button>
        </div>

        {submitted ? (
          <div className="success-message" role="status" aria-live="polite">
            Form validated successfully. Backend integration comes in a later
            iteration.
          </div>
        ) : null}
      </form>
    </section>
  );
}
