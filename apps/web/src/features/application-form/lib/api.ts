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
): Promise<CreateApplicationResponse> {
  const validatedPayload = createApplicationRequestSchema.parse(payload);

  const endpoint = config.applicationApiBaseUrl
    ? `${config.applicationApiBaseUrl}/api/applications`
    : "/api/applications";

  const response = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
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
