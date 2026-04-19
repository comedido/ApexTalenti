import { config } from "../config.js";
export async function createNocoRecord(record) {
    if (!config.nocodbToken) {
        throw new Error("NOCODB_TOKEN is not configured.");
    }
    if (!config.nocodbTablePath) {
        throw new Error("NOCODB_TABLE_PATH is not configured.");
    }
    const endpoint = `${config.nocodbBaseUrl}${config.nocodbTablePath}`;
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
        throw new Error(`NocoDB create record failed: ${response.status} ${responseText}`);
    }
    try {
        return JSON.parse(responseText);
    }
    catch {
        return responseText;
    }
}
