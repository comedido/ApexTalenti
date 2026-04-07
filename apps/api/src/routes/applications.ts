import { Router } from "express";
import {
  CreateApplicationResponse,
  createApplicationRequestSchema,
} from "@apextalenti/contracts";
import { createNocoRecord } from "../lib/nocodb";

const router = Router();

type CachedSuccess = {
  fingerprint: string;
  response: CreateApplicationResponse;
};

const idempotencyStore = new Map<string, CachedSuccess>();

function makeId(prefix: string) {
  const randomPart = Math.random().toString(36).slice(2, 10);
  return `${prefix}_${randomPart}`;
}

function buildFingerprint(body: unknown) {
  return JSON.stringify(body);
}

router.post("/", async (req, res) => {
  const idempotencyKey = req.header("Idempotency-Key");

  if (!idempotencyKey) {
    return res.status(400).json({
      error: {
        code: "MISSING_IDEMPOTENCY_KEY",
        message: "Idempotency-Key header is required.",
      },
    });
  }

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
  const fingerprint = buildFingerprint(payload);
  const existing = idempotencyStore.get(idempotencyKey);

  if (existing) {
    if (existing.fingerprint !== fingerprint) {
      return res.status(409).json({
        error: {
          code: "IDEMPOTENCY_KEY_REUSE_CONFLICT",
          message:
            "This Idempotency-Key was already used with a different request payload.",
        },
      });
    }

    res.setHeader("Idempotency-Status", "cached");
    return res.status(201).json(existing.response);
  }

  const applicationId = makeId("app");
  const customerId = makeId("cus");
  const submittedAt = new Date().toISOString();

  try {
    await createNocoRecord({
      applicationId,
      customerId,
      idempotencyKey,
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
      applicationStatus: "submitted",
      submissionSource: "web-form",
      submittedAt,
      notes: "",
    });

    const response: CreateApplicationResponse = {
      applicationId,
      customerId,
      applicationStatus: "submitted",
      message:
        "Your request has been received successfully. Our team will review the submission and continue with the next setup steps.",
    };

    idempotencyStore.set(idempotencyKey, {
      fingerprint,
      response,
    });

    res.setHeader("Idempotency-Status", "created");
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
