import { Router } from "express";
import {
  CreateApplicationResponse,
  createApplicationRequestSchema,
} from "@apextalenti/contracts";
import { createNocoRecord } from "../lib/nocodb";

const router = Router();

function makeId(prefix: string) {
  const randomPart = Math.random().toString(36).slice(2, 10);
  return `${prefix}_${randomPart}`;
}

router.post("/", async (req, res) => {
  const validation = createApplicationRequestSchema.safeParse(req.body);

  if (!validation.success) {
    const flattened = validation.error.flatten();

    return res.status(400).json({
      error: {
        code: "VALIDATION_ERROR",
        message: "The submitted application payload is invalid.",
        fieldErrors: flattened.fieldErrors,
      },
    });
  }

  const payload = validation.data;
  const applicationId = makeId("app");
  const customerId = makeId("cus");
  const submittedAt = new Date().toISOString();

  try {
    await createNocoRecord({
      applicationId,
      customerId,
      sku: payload.application.sku,
      brandName: payload.application.brandName,
      desiredDomain: payload.application.desiredDomain,
      activityType: payload.application.activityType,
      activityDescription: payload.application.activityDescription,
      customerDisplayName: payload.customer.displayName,
      primaryContactName: payload.customer.primaryContactName,
      primaryContactEmail: payload.customer.primaryContactEmail,
      billingEmail: payload.customer.billingEmail,
      countryCode: payload.customer.countryCode,
      language: payload.customer.language,
      submissionSource: "web-form",
      submittedAt,
      notes: "",

      workflowStatus: "submitted",
      statusUpdatedAt: submittedAt,
      statusDetail: "Application submitted from the public request form.",

      adminOwner: "",
      reviewDecision: "pending",
      reviewNotes: "",
      reviewedAt: null,
      priority: "normal",
      internalTags: "",

      provisioningRequested: false,
      provisioningRequestedAt: null,
      provisioningRunId: "",
      domainProvider: "",
      registeredDomain: "",
      emailProvider: "",
      emailAccountAddress: "",
      hostingProvider: "",
      storageTarget: "",
      siteUrl: "",
      provisioningNotes: "",
      lastProvisioningError: "",
    });

    const response: CreateApplicationResponse = {
      applicationId,
      customerId,
      applicationStatus: "submitted",
      message:
        "Your request has been received successfully. Our team will review the information provided and contact you with the next steps.",
    };

    return res.status(201).json(response);
  } catch (error) {
    return res.status(500).json({
      error: {
        code: "NOCODB_WRITE_FAILED",
        message:
          error instanceof Error
            ? error.message
            : "Unexpected persistence error.",
      },
    });
  }
});

export default router;
