import { config } from "../config.js";

type NocoRecordPayload = Record<string, unknown>;

export type ApplicationRecord = {
  Id?: number;
  applicationId: string;
  customerId: string;
  sku: string;
  brandName: string;
  desiredDomain: string;
  activityType: string;
  activityDescription: string;
  customerDisplayName: string;
  primaryContactName: string;
  primaryContactEmail: string;
  billingEmail: string;
  countryCode: string;
  language: string;
  submissionSource: string;
  submittedAt: string;
  notes?: string | null;
  workflowStatus?: string;
  adminOwner?: string | null;
  reviewDecision?: string;
  reviewNotes?: string | null;
  reviewedAt?: string | null;
  priority?: string;
  internalTags?: string | null;
  provisioningRequested?: boolean | number;
  provisioningRequestedAt?: string | null;
  provisioningRunId?: string | null;
  registeredDomain?: string | null;
  siteUrl?: string | null;
  provisioningNotes?: string | null;
  lastProvisioningError?: string | null;
  emailAccountAddress?: string | null;
  emailProvider?: string | null;
  storageTarget?: string | null;
  hostingProvider?: string | null;
  domainProvider?: string | null;
  emailSetupAttempts?: number | null;
  emailLastCheckedAt?: string | null;
  dnsChangeReference?: string | null;
  pagesProjectName?: string | null;
  pagesDeploymentId?: string | null;
  pagesSubdomain?: string | null;
};

function getEndpoint() {
  if (!config.nocodbToken) {
    throw new Error("NOCODB_TOKEN is not configured.");
  }

  if (!config.nocodbTablePath) {
    throw new Error("NOCODB_TABLE_PATH is not configured.");
  }

  return `${config.nocodbBaseUrl}${config.nocodbTablePath}`;
}

export async function createNocoRecord(record: NocoRecordPayload) {
  const endpoint = getEndpoint();

  console.log("NocoDB endpoint:", endpoint);
  console.log("NocoDB payload:", JSON.stringify(record, null, 2));

  const response = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "xc-token": config.nocodbToken,
    },
    body: JSON.stringify(record),
  });

  const responseText = await response.text();

  console.log("NocoDB response status:", response.status);
  console.log("NocoDB response body:", responseText);

  if (!response.ok) {
    throw new Error(
      `NocoDB create record failed: ${response.status} ${responseText}`,
    );
  }

  try {
    return JSON.parse(responseText);
  } catch {
    return responseText;
  }
}

export async function getApplicationById(
  applicationId: string,
): Promise<ApplicationRecord | null> {
  const endpoint = new URL(getEndpoint());

  endpoint.searchParams.set("where", `(applicationId,eq,${applicationId})`);
  endpoint.searchParams.set("limit", "1");

  console.log("NocoDB lookup endpoint:", endpoint.toString());

  const response = await fetch(endpoint.toString(), {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "xc-token": config.nocodbToken,
    },
  });

  const responseText = await response.text();

  console.log("NocoDB lookup status:", response.status);
  console.log("NocoDB lookup body:", responseText);

  if (!response.ok) {
    throw new Error(
      `NocoDB get application failed: ${response.status} ${responseText}`,
    );
  }

  const parsed = JSON.parse(responseText) as
    | { list?: ApplicationRecord[] }
    | ApplicationRecord[];

  if (Array.isArray(parsed)) {
    return parsed[0] ?? null;
  }

  return parsed.list?.[0] ?? null;
}
