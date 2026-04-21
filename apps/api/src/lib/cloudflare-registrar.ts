import { config } from "../config.js";
import { getApplicationById } from "./nocodb.js";

const cloudflareApiBase = "https://api.cloudflare.com/client/v4";

async function cloudflareRequest(path: string, init?: RequestInit) {
  const response = await fetch(
    `${cloudflareApiBase}/accounts/${config.cloudflareAccountId}${path}`,
    {
      ...init,
      headers: {
        Authorization: `Bearer ${config.cloudflareRegistrarToken}`,
        "Content-Type": "application/json",
        ...(init?.headers ?? {}),
      },
    },
  );

  const responseText = await response.text();

  console.log("Cloudflare Registrar status:", response.status);
  console.log("Cloudflare Registrar body:", responseText);

  let parsed: unknown;
  try {
    parsed = JSON.parse(responseText);
  } catch {
    parsed = responseText;
  }

  if (!response.ok) {
    throw new Error(
      `Cloudflare Registrar request failed: ${response.status} ${responseText}`,
    );
  }

  return parsed as {
    result?: unknown;
    success?: boolean;
    errors?: unknown[];
    messages?: unknown[];
  };
}

export async function searchDomainForApplication(applicationId: string) {
  const application = await getApplicationById(applicationId);

  if (!application) {
    throw new Error(`Application not found: ${applicationId}`);
  }

  const query =
    application.desiredDomain?.trim() || application.brandName?.trim();

  if (!query) {
    throw new Error(
      `Application ${applicationId} has no desiredDomain or brandName.`,
    );
  }

  const searchParams = new URLSearchParams({ q: query });

  return cloudflareRequest(
    `/registrar/domain-search?${searchParams.toString()}`,
    { method: "GET" },
  );
}

export async function checkDomainForApplication(applicationId: string) {
  const application = await getApplicationById(applicationId);

  if (!application) {
    throw new Error(`Application not found: ${applicationId}`);
  }

  const domain = application.desiredDomain?.trim();

  if (!domain) {
    throw new Error(`Application ${applicationId} has no desiredDomain.`);
  }

  if (!domain.toLowerCase().endsWith(".com")) {
    throw new Error("Only .com domains are allowed.");
  }

  return cloudflareRequest("/registrar/domain-check", {
    method: "POST",
    body: JSON.stringify({
      domains: [domain],
    }),
  });
}

export async function registerDomainForApplication(applicationId: string) {
  const application = await getApplicationById(applicationId);

  if (!application) {
    throw new Error(`Application not found: ${applicationId}`);
  }

  const domain = application.desiredDomain?.trim();

  if (!domain) {
    throw new Error(`Application ${applicationId} has no desiredDomain.`);
  }

  if (!domain.toLowerCase().endsWith(".com")) {
    throw new Error("Only .com domains are allowed for registration.");
  }

  const registrantName =
    application.primaryContactName?.trim() ||
    application.customerDisplayName?.trim() ||
    application.brandName?.trim();

  const registrantEmail = application.primaryContactEmail?.trim();
  const registrantCountry = application.countryCode?.trim() || "US";
  const registrantOrganization = application.brandName?.trim() || undefined;

  const payload = {
    domain_name: domain,
    auto_renew: true,
    privacy: true,
    registrant_contact: {
      name: registrantName,
      organization: registrantOrganization,
      email: registrantEmail,
      country: registrantCountry,
    },
  };

  console.log("Cloudflare Registrar register payload:", payload);

  return cloudflareRequest("/registrar/registrations", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export async function rawDomainCheck(domain: string) {
  if (!domain.toLowerCase().endsWith(".com")) {
    throw new Error("Only .com domains are allowed.");
  }

  return cloudflareRequest("/registrar/domain-check", {
    method: "POST",
    body: JSON.stringify({
      domains: [domain],
    }),
  });
}
