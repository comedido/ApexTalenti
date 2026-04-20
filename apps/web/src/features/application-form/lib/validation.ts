import {
  ApplicationFormErrors,
  ApplicationFormValues,
  applicationFormSchema,
} from "../types";

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

export function validateApplicationForm(
  values: ApplicationFormValues,
): ApplicationFormErrors {
  const normalized = normalizeApplicationFormValues(values);
  const result = applicationFormSchema.safeParse(normalized);

  const errors: ApplicationFormErrors = {};

  if (!result.success) {
    const flattened = result.error.flatten().fieldErrors;

    errors.sku = flattened.sku?.[0];
    errors.fullName = flattened.fullName?.[0];
    errors.email = flattened.email?.[0];
    errors.brandName = flattened.brandName?.[0];
    errors.desiredDomain = flattened.desiredDomain?.[0];
    errors.activityType = flattened.activityType?.[0];
    errors.activityDescription = flattened.activityDescription?.[0];
  }

  // Additional .com enforcement on the client side
  if (normalized.desiredDomain) {
    const lower = normalized.desiredDomain.toLowerCase();
    if (!lower.endsWith(".com")) {
      errors.desiredDomain = "Solo se permiten dominios .com.";
    }
  }

  // Strip undefined values
  return Object.fromEntries(
    Object.entries(errors).filter(([, v]) => v !== undefined),
  ) as ApplicationFormErrors;
}
