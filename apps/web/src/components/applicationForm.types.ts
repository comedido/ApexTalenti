export type SkuValue = "basic" | "premium" | "enterprise";

export type ApplicationFormValues = {
  sku: SkuValue;
  fullName: string;
  email: string;
  brandName: string;
  desiredDomain: string;
  activityType: string;
  activityDescription: string;
};

export type ApplicationFormErrors = Partial<
  Record<keyof ApplicationFormValues, string>
>;

export type CreateApplicationRequest = {
  customer: {
    displayName: string;
    primaryContactName: string;
    primaryContactEmail: string;
    billingEmail: string;
    countryCode: string;
    language: string;
  };
  application: {
    brandName: string;
    activityType: string;
    activityDescription: string;
    desiredDomain: string;
    sku: "basic";
    consentAccepted: true;
  };
};

export type CreateApplicationResponse = {
  applicationId: string;
  customerId: string;
  applicationStatus: "submitted";
  message: string;
};
