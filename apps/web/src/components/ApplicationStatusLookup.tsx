"use client";

import { FormEvent, useId, useMemo, useState } from "react";
import { config } from "@/lib/config";

type TimelineState = "completed" | "current" | "upcoming";

type TimelineItem = {
  key: string;
  label: string;
  description: string;
  state: TimelineState;
};

type ApplicationStatusResponse = {
  applicationId: string;
  brandName: string;
  currentStatus: string;
  submittedAt: string;
  language: string;
  timeline: TimelineItem[];
};

function getLocalizedCopy(language: string | null | undefined) {
  const isSpanish = language?.toLowerCase().startsWith("es") ?? false;

  if (isSpanish) {
    return {
      startRequest: "Iniciar solicitud",
      viewApplication: "Ver solicitud",
      panelLabel: "Consulta del estado de tu solicitud",
      inputLabel: "Número de solicitud",
      inputPlaceholder: "app_xxxxxxxx",
      hint: "Introduce la referencia que aparece en el correo de confirmación de tu solicitud.",
      checkButton: "Consultar estado",
      checkingButton: "Consultando...",
      statusEyebrow: "Estado de la solicitud",
      currentPill: "Actual",
      notConfiguredError: "La API de solicitudes no está configurada.",
      genericError:
        "No hemos podido encontrar una solicitud con esa referencia.",
      unexpectedError:
        "Se ha producido un error inesperado al consultar el estado.",
      referenceLabel: "Referencia",
      timelineAria: "Línea de tiempo del progreso de la solicitud",
    };
  }

  return {
    startRequest: "Start Request",
    viewApplication: "View Application",
    panelLabel: "Application status lookup",
    inputLabel: "Application number",
    inputPlaceholder: "app_xxxxxxxx",
    hint: "Enter the reference shown in your confirmation email.",
    checkButton: "Check status",
    checkingButton: "Checking...",
    statusEyebrow: "Application status",
    currentPill: "Current",
    notConfiguredError: "Application API base URL is not configured.",
    genericError: "We could not find an application with that reference.",
    unexpectedError: "Unexpected error while checking your application status.",
    referenceLabel: "Reference",
    timelineAria: "Application progress timeline",
  };
}

export function ApplicationStatusLookup({
  language = "en",
}: {
  language?: string;
}) {
  const panelId = useId();
  const [open, setOpen] = useState(false);
  const [applicationId, setApplicationId] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState<ApplicationStatusResponse | null>(null);

  const copy = getLocalizedCopy(language);
  const canSubmit = useMemo(
    () => applicationId.trim().length > 0,
    [applicationId],
  );

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!canSubmit || loading) return;

    try {
      setLoading(true);
      setError("");
      setResult(null);

      if (!config.applicationApiBaseUrl) {
        throw new Error(copy.notConfiguredError);
      }

      const response = await fetch(
        `${config.applicationApiBaseUrl}/api/applications/${encodeURIComponent(
          applicationId.trim(),
        )}/status`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Accept-Language": language,
          },
        },
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data?.error?.message || copy.genericError);
      }

      setResult(data as ApplicationStatusResponse);
    } catch (err) {
      setError(err instanceof Error ? err.message : copy.unexpectedError);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="application-status-block">
      <div className="hero__actions hero__actions--dual">
        <a href="#application" className="hero__primary-link">
          {copy.startRequest}
        </a>

        <button
          type="button"
          className="hero__secondary-button"
          aria-expanded={open}
          aria-controls={panelId}
          onClick={() => setOpen((current) => !current)}
        >
          {copy.viewApplication}
        </button>
      </div>

      {open ? (
        <section
          id={panelId}
          className="application-status-flyout"
          aria-label={copy.panelLabel}
        >
          <form className="application-status-form" onSubmit={handleSubmit}>
            <label
              htmlFor="applicationId"
              className="application-status-form__label"
            >
              {copy.inputLabel}
            </label>

            <div className="application-status-form__row">
              <input
                id="applicationId"
                type="text"
                name="applicationId"
                placeholder={copy.inputPlaceholder}
                value={applicationId}
                onChange={(event) => setApplicationId(event.target.value)}
              />
              <button
                type="submit"
                className="application-status-form__submit"
                disabled={!canSubmit || loading}
              >
                {loading ? copy.checkingButton : copy.checkButton}
              </button>
            </div>

            <p className="application-status-form__hint">{copy.hint}</p>
          </form>

          {error ? (
            <div
              className="application-status-feedback application-status-feedback--error"
              role="status"
            >
              {error}
            </div>
          ) : null}

          {result ? (
            <div className="application-status-result">
              <div className="application-status-result__header">
                <p className="eyebrow">{copy.statusEyebrow}</p>
                <h3>{result.brandName}</h3>
                <p>
                  {copy.referenceLabel}: <code>{result.applicationId}</code>
                </p>
              </div>

              <ol className="status-timeline" aria-label={copy.timelineAria}>
                {result.timeline.map((item) => (
                  <li
                    key={item.key}
                    className={[
                      "status-timeline__item",
                      `status-timeline__item--${item.state}`,
                    ].join(" ")}
                  >
                    <span
                      className="status-timeline__marker"
                      aria-hidden="true"
                    />
                    <div className="status-timeline__content">
                      <div className="status-timeline__header">
                        <strong>{item.label}</strong>
                        {item.state === "current" ? (
                          <span className="status-pill">
                            {copy.currentPill}
                          </span>
                        ) : null}
                      </div>
                      <p>{item.description}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          ) : null}
        </section>
      ) : null}
    </div>
  );
}
