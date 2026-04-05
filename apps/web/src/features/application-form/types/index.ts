import { z } from "zod";

export const skuSchema = z.enum(["basic", "premium", "enterprise"]);

export const applicationFormSchema = z.object({
  sku: z.literal("basic"),
  fullName: z
    .string()
    .trim()
    .min(2, "Full name must be at least 2 characters."),
  email: z.email("Please enter a valid email address."),
  brandName: z
    .string()
    .trim()
    .min(2, "Brand name must be at least 2 characters."),
  desiredDomain: z.string().trim().min(1, "Preferred domain is required."),
  activityType: z
    .string()
    .trim()
    .min(2, "Business activity must be at least 2 characters."),
  activityDescription: z
    .string()
    .trim()
    .min(10, "Business description must be at least 10 characters.")
    .max(1000, "Business description must be under 1000 characters."),
});

export const createApplicationRequestSchema = z.object({
  customer: z.object({
    displayName: z.string().trim().min(1, "Display name is required."),
    primaryContactName: z
      .string()
      .trim()
      .min(2, "Primary contact name is required."),
    primaryContactEmail: z.email("Primary contact email must be valid."),
    billingEmail: z.email("Billing email must be valid."),
    countryCode: z
      .string()
      .trim()
      .length(2, "Country code must be 2 characters."),
    language: z.string().trim().min(2, "Language is required."),
  }),
  application: z.object({
    brandName: z.string().trim().min(2, "Brand name is required."),
    activityType: z.string().trim().min(2, "Activity type is required."),
    activityDescription: z
      .string()
      .trim()
      .min(10, "Activity description is required."),
    desiredDomain: z.string().trim().min(1, "Desired domain is required."),
    sku: z.literal("basic"),
    consentAccepted: z.literal(true),
  }),
});

export const createApplicationResponseSchema = z.object({
  applicationId: z.string(),
  customerId: z.string(),
  applicationStatus: z.literal("submitted"),
  message: z.string(),
});

export type SkuValue = z.infer<typeof skuSchema>;
export type ApplicationFormValues = z.infer<typeof applicationFormSchema>;
export type CreateApplicationRequest = z.infer<
  typeof createApplicationRequestSchema
>;
export type CreateApplicationResponse = z.infer<
  typeof createApplicationResponseSchema
>;

export type ApplicationFormErrors = Partial<
  Record<keyof ApplicationFormValues, string>
>;

export type CreateApplicationError = {
  error: {
    code: string;
    message: string;
    fieldErrors?: Record<string, string[] | undefined>;
  };
};
