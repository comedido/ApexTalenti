apps / api / src / lib / nocodb.ts;
import { config } from "../config";

// Define the type for the payload that will be sent to NocoDB
type NocoRecordPayload = Record<string, unknown>;

// Export an asynchronous function to create a record in NocoDB
export async function createNocoRecord(record: NocoRecordPayload) {
  // Check if NOCODB_TOKEN is configured and throw an error if not
  if (!config.nocodbToken) {
    throw new Error("NOCODB_TOKEN is not configured.");
  }

  // Check if NOCODB_TABLE_PATH is configured and throw an error if not
  if (!config.nocodbTablePath) {
    throw new Error("NOCODB_TABLE_PATH is not configured.");
  }

  // Construct the endpoint URL for NocoDB using the configuration
  const endpoint = `${config.nocodbBaseUrl}${config.nocodbTablePath}`;

  // Log the NocoDB endpoint to the console
  console.log("NocoDB endpoint:", endpoint);

  // Log the payload being sent to NocoDB
  console.log("NocoDB payload:", JSON.stringify(record, null, 2));

  // Make a POST request to NocoDB using the fetch API
  const response = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json", // Set the content type header to JSON
      "xc-token": config.nocodbToken, // Include the token in the header for authentication
    },
    body: JSON.stringify(record), // Convert the payload to JSON and send it as the request body
  });

  // Read the response text from NocoDB
  const responseText = await response.text();

  // Log the status code of the response
  console.log("NocoDB response status:", response.status);

  // Log the response body
  console.log("NocoDB response body:", responseText);

  // Check if the response was successful (HTTP status codes 200-299)
  if (!response.ok) {
    throw new Error(
      `NocoDB create record failed: ${response.status} ${responseText}`, // Throw an error with the status and text if not successful
    );
  }

  try {
    // Attempt to parse the response text as JSON
    return JSON.parse(responseText);
  } catch {
    // Return the response text as is if parsing fails
    return responseText;
  }
}
