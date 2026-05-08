import type { ApplicationRecord } from "./nocodb.js";

type TimelineState = "completed" | "current" | "upcoming";

type TimelineTemplate = {
  key: string;
  labelEn: string;
  labelEs: string;
  descriptionEn: string;
  descriptionEs: string;
};

const TIMELINE_TEMPLATE: TimelineTemplate[] = [
  {
    key: "submitted",
    labelEn: "Submitted",
    labelEs: "Enviada",
    descriptionEn: "Your application was received successfully.",
    descriptionEs: "Hemos recibido tu solicitud correctamente.",
  },
  {
    key: "under_review",
    labelEn: "Under review",
    labelEs: "En revisión",
    descriptionEn: "We are reviewing your business and domain details.",
    descriptionEs: "Estamos revisando los datos de tu negocio y dominio.",
  },
  {
    key: "preparation",
    labelEn: "In preparation",
    labelEs: "En preparación",
    descriptionEn: "Your setup is being prepared for delivery.",
    descriptionEs: "Estamos preparando la configuración de tu solución.",
  },
  {
    key: "provisioning",
    labelEn: "Provisioning in progress",
    labelEs: "Provisionando",
    descriptionEn: "We are configuring your requested digital assets.",
    descriptionEs: "Estamos configurando tus activos digitales solicitados.",
  },
  {
    key: "completed",
    labelEn: "Completed",
    labelEs: "Completada",
    descriptionEn: "Your requested package has been completed.",
    descriptionEs: "Tu paquete solicitado se ha completado.",
  },
];

function toBoolean(value: boolean | number | undefined | null): boolean {
  return value === true || value === 1;
}

export function buildApplicationTimeline(record: ApplicationRecord) {
  let currentStep = 0;

  const workflowStatus = record.workflowStatus?.toLowerCase().trim();
  const reviewDecision = record.reviewDecision?.toLowerCase().trim();
  const provisioningRequested = toBoolean(record.provisioningRequested);

  if (
    workflowStatus === "under_review" ||
    workflowStatus === "reviewing" ||
    reviewDecision === "pending"
  ) {
    currentStep = 1;
  }

  if (
    workflowStatus === "approved" ||
    workflowStatus === "preparing" ||
    workflowStatus === "in_preparation"
  ) {
    currentStep = 2;
  }

  if (provisioningRequested) {
    currentStep = 3;
  }

  if (record.siteUrl || record.registeredDomain) {
    currentStep = 4;
  }

  const isSpanish = record.language.toLowerCase().startsWith("es");

  return TIMELINE_TEMPLATE.map((item, index) => {
    const state: TimelineState =
      index < currentStep
        ? "completed"
        : index === currentStep
          ? "current"
          : "upcoming";

    return {
      key: item.key,
      label: isSpanish ? item.labelEs : item.labelEn,
      description: isSpanish ? item.descriptionEs : item.descriptionEn,
      state,
    };
  });
}
