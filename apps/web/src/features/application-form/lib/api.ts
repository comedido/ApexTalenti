import { config } from "@/lib/config";
import {
  CreateApplicationError,
  CreateApplicationRequest,
  CreateApplicationResponse,
} from "../types";

export async function createApplication(
  payload: CreateApplicationRequest,
): Promise<CreateApplicationResponse> {
  const endpoint = config.applicationApiBaseUrl
    ? `${config.applicationApiBaseUrl}/api/applications`
    : "/api/applications";

  const response = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
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

  return (await response.json()) as CreateApplicationResponse;
}
