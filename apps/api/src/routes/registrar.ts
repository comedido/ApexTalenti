import { Router } from "express";
import {
  searchDomainForApplication,
  checkDomainForApplication,
  registerDomainForApplication,
  rawDomainCheck,
} from "../lib/cloudflare-registrar.js";

const router = Router();

type ApplicationActionRequest = {
  applicationId?: string;
};

function getApplicationId(body: ApplicationActionRequest): string {
  const applicationId = body.applicationId?.trim();
  if (!applicationId) {
    throw new Error("Missing applicationId");
  }
  return applicationId;
}

router.post("/search", async (req, res) => {
  try {
    const applicationId = getApplicationId(req.body);
    const result = await searchDomainForApplication(applicationId);

    return res.status(200).json({
      ok: true,
      action: "search",
      applicationId,
      result,
    });
  } catch (error) {
    return res.status(400).json({
      ok: false,
      error:
        error instanceof Error ? error.message : "Unexpected search error.",
    });
  }
});

router.post("/check", async (req, res) => {
  try {
    const applicationId = getApplicationId(req.body);
    const result = await checkDomainForApplication(applicationId);

    return res.status(200).json({
      ok: true,
      action: "check",
      applicationId,
      result,
    });
  } catch (error) {
    return res.status(400).json({
      ok: false,
      error: error instanceof Error ? error.message : "Unexpected check error.",
    });
  }
});

router.post("/register", async (req, res) => {
  try {
    const applicationId = getApplicationId(req.body);
    const result = await registerDomainForApplication(applicationId);

    return res.status(200).json({
      ok: true,
      action: "register",
      applicationId,
      result,
    });
  } catch (error) {
    return res.status(400).json({
      ok: false,
      error:
        error instanceof Error ? error.message : "Unexpected register error.",
    });
  }
});

router.post("/check-domain", async (req, res) => {
  try {
    const { domain } = req.body as { domain?: string };
    const trimmed = domain?.trim() ?? "";

    if (!trimmed) {
      return res.status(400).json({ ok: false, error: "Missing domain" });
    }

    const lower = trimmed.toLowerCase();
    if (!lower.endsWith(".com")) {
      return res
        .status(400)
        .json({ ok: false, error: "Solo se permiten dominios .com." });
    }

    const result = await rawDomainCheck(trimmed);

    return res.status(200).json({
      ok: true,
      action: "check-domain",
      domain: trimmed,
      result,
    });
  } catch (error) {
    return res.status(400).json({
      ok: false,
      error:
        error instanceof Error
          ? error.message
          : "Unexpected domain check error.",
    });
  }
});

export default router;
