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

  if (result.success) {
    return {};
  }

  const flattened = result.error.flatten().fieldErrors;

  return {
    sku: flattened.sku?.[0],
    fullName: flattened.fullName?.[0],
    email: flattened.email?.[0],
    brandName: flattened.brandName?.[0],
    desiredDomain: flattened.desiredDomain?.[0],
    activityType: flattened.activityType?.[0],
    activityDescription: flattened.activityDescription?.[0],
  };
}
