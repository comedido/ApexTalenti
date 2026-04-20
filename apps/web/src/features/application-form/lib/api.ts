import { config } from "@/lib/config";
import {
  CreateApplicationError,
  CreateApplicationRequest,
  CreateApplicationResponse,
  createApplicationRequestSchema,
  createApplicationResponseSchema,
} from "../types";

export async function createApplication(
  payload: CreateApplicationRequest,
  submissionSource = "web-form",
): Promise<CreateApplicationResponse> {
  const validatedPayload = createApplicationRequestSchema.parse(payload);

  if (!config.applicationApiBaseUrl) {
    throw new Error(
      "Application API base URL is not configured. Check apps/web/.env.local.",
    );
  }

  const endpoint = `${config.applicationApiBaseUrl}/api/applications`;

  const response = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-submission-source": submissionSource,
    },
    body: JSON.stringify(validatedPayload),
  });

  if (!response.ok) {
    let errorMessage = "Failed to submit application.";

    try {
      const errorData = (await response.json()) as CreateApplicationError;
      errorMessage = errorData.error?.message || errorMessage;
    } catch {
      errorMessage = "Failed to submit application.";
    }

    throw new Error(errorMessage);
  }

  const data = await response.json();
  return createApplicationResponseSchema.parse(data);
}

type DomainCheckResponse = {
  ok: boolean;
  action?: string;
  domain?: string;
  result?: {
    domains?: {
      name: string;
      registrable: boolean;
      reason?: string;
    }[];
  };
  error?: string;
};

export async function checkDomainByName(
  domain: string,
): Promise<DomainCheckResponse> {
  if (!config.applicationApiBaseUrl) {
    throw new Error(
      "Application API base URL is not configured. Check apps/web/.env.local.",
    );
  }

  const endpoint = `${config.applicationApiBaseUrl}/api/registrar/check-domain`;

  const response = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ domain }),
  });

  const data = (await response.json()) as DomainCheckResponse;

  if (!response.ok || !data.ok) {
    throw new Error(data.error || "Domain availability check failed.");
  }

  return data;
}
