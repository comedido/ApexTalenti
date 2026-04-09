import cors from "cors";
import express from "express";
import { config } from "./config";
import applicationsRouter from "./routes/applications";
const app = express();
app.use(cors({
    origin: config.corsOrigin,
}));
app.use(express.json());
app.get("/health", (_req, res) => {
    res.json({ ok: true, service: "apextalenti-api" });
});
app.use("/api/applications", applicationsRouter);
app.listen(config.port, () => {
    console.log(`API listening on http://localhost:${config.port}`);
});
