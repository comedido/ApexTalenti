import "dotenv/config";
import express from "express";
import cors from "cors";
import { config } from "./config.js";
import applicationsRouter from "./routes/applications.js";
const app = express();
const allowedOrigins = config.corsOrigins;
app.use(cors({
    origin(origin, callback) {
        if (!origin)
            return callback(null, true);
        if (allowedOrigins.includes(origin))
            return callback(null, true);
        return callback(new Error(`CORS blocked for origin: ${origin}`));
    },
    credentials: true,
}));
app.use(express.json());
app.get("/health", (_req, res) => {
    res.json({ ok: true });
});
app.use("/api/applications", applicationsRouter);
app.listen(config.port, config.host, () => {
    console.log(`API listening on http://${config.host}:${config.port}`);
});
