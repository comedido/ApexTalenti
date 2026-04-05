import { config } from "../config";

type NocoRecordPayload = Record<string, unknown>;

export async function createNocoRecord(record: NocoRecordPayload) {
  if (!config.nocodbToken) {
    throw new Error("NOCODB_TOKEN is not configured.");
  }

  if (!config.nocodbTablePath) {
    throw new Error("NOCODB_TABLE_PATH is not configured.");
  }

  const endpoint = `${config.nocodbBaseUrl}${config.nocodbTablePath}`;

  const response = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "xc-token": config.nocodbToken,
    },
    body: JSON.stringify({
      records: [record],
    }),
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`NocoDB create record failed: ${response.status} ${text}`);
  }

  return response.json();
}
