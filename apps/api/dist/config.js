import dotenv from "dotenv";
dotenv.config();
export const config = {
    port: Number(process.env.PORT || 4000),
    corsOrigin: process.env.CORS_ORIGIN || "http://localhost:3000",
    nocodbBaseUrl: process.env.NOCODB_BASE_URL || "http://10.10.10.187:8080",
    nocodbToken: process.env.NOCODB_TOKEN || "",
    nocodbTablePath: process.env.NOCODB_TABLE_PATH || "",
};
