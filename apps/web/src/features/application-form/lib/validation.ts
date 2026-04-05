import { ApplicationFormErrors, ApplicationFormValues } from "../types";

export const initialApplicationFormValues: ApplicationFormValues = {
  sku: "basic",
  fullName: "",
  email: "",
  brandName: "",
  desiredDomain: "",
  activityType: "",
  activityDescription: "",
};

export function normalizeDomain(value: string): string {
  return value
    .trim()
    .toLowerCase()
    .replace(/^https?:\/\//, "")
    .replace(/^www\./, "")
    .replace(/\/.*$/, "");
}

function isValidEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
}

function isValidDomain(value: string): boolean {
  return /^[a-z0-9][a-z0-9.-]*\.[a-z]{2,}$/.test(normalizeDomain(value));
}

export function validateApplicationForm(
  values: ApplicationFormValues,
): ApplicationFormErrors {
  const errors: ApplicationFormErrors = {};

  if (values.sku !== "basic") {
    errors.sku = "Only the Basic SKU is available in this phase.";
  }

  if (!values.fullName.trim()) {
    errors.fullName = "Full name is required.";
  } else if (values.fullName.trim().length < 2) {
    errors.fullName = "Full name must be at least 2 characters.";
  }

  if (!values.email.trim()) {
    errors.email = "Email address is required.";
  } else if (!isValidEmail(values.email)) {
    errors.email = "Please enter a valid email address.";
  }

  if (!values.brandName.trim()) {
    errors.brandName = "Brand name is required.";
  } else if (values.brandName.trim().length < 2) {
    errors.brandName = "Brand name must be at least 2 characters.";
  }

  if (!values.desiredDomain.trim()) {
    errors.desiredDomain = "Preferred domain is required.";
  } else if (!isValidDomain(values.desiredDomain)) {
    errors.desiredDomain = "Please enter a valid domain like newbrand.com.";
  }

  if (!values.activityType.trim()) {
    errors.activityType = "Business activity is required.";
  } else if (values.activityType.trim().length < 2) {
    errors.activityType = "Business activity must be at least 2 characters.";
  }

  if (!values.activityDescription.trim()) {
    errors.activityDescription = "Business description is required.";
  } else if (values.activityDescription.trim().length < 10) {
    errors.activityDescription =
      "Business description must be at least 10 characters.";
  } else if (values.activityDescription.trim().length > 1000) {
    errors.activityDescription =
      "Business description must be under 1000 characters.";
  }

  return errors;
}

export function normalizeApplicationFormValues(
  values: ApplicationFormValues,
): ApplicationFormValues {
  return {
    sku: "basic",
    fullName: values.fullName.trim(),
    email: values.email.trim().toLowerCase(),
    brandName: values.brandName.trim(),
    desiredDomain: normalizeDomain(values.desiredDomain),
    activityType: values.activityType.trim(),
    activityDescription: values.activityDescription.trim(),
  };
}
