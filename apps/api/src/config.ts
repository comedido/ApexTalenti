import "dotenv/config";

function requireEnv(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value;
}

function parseCsv(value: string | undefined): string[] {
  return (value ?? "")
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}

export const config = {
  port: Number(process.env.PORT ?? 4000),
  host: process.env.HOST ?? "0.0.0.0",
  corsOrigins: parseCsv(process.env.CORS_ORIGIN),
  nocodbBaseUrl: requireEnv("NOCODB_BASE_URL"),
  nocodbApiToken: requireEnv("NOCODB_API_TOKEN"),
  nocodbTableId: requireEnv("NOCODB_TABLE_ID"),
};
