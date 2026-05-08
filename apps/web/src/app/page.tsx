"use client";

import { Hero } from "@/components/Hero";
import {
  ApplicationForm,
  defaultCopy,
  type ApplicationFormCopy,
} from "@/features/application-form/components/ApplicationForm";
import { useIsSpanishBrowser } from "../lib/useIsSpanishBrowser";

type HomePageCopy = {
  trustBandAriaLabel: string;
  trustBandItems: [string, string, string, string, string];
  metrics: [
    { number: string; title: string; description: string },
    { number: string; title: string; description: string },
    { number: string; title: string; description: string },
    { kicker: string; title: string; description: string },
  ];
  overview: {
    eyebrow: string;
    title: string;
    description: string;
    cards: [
      { number: string; title: string; description: string },
      { number: string; title: string; description: string },
      { number: string; title: string; description: string },
    ];
  };
  featureBand: {
    eyebrow: string;
    title: string;
    description: string;
    cards: [
      { title: string; description: string },
      { title: string; description: string },
      { title: string; description: string },
    ];
  };
  ctaBand: {
    eyebrow: string;
    title: string;
    description: string;
    buttonLabel: string;
  };
};

const spanishCopy: ApplicationFormCopy = {
  eyebrow: "Solicitud",
  title: "Solicita tu solución digital",
  description:
    "Comparte los datos principales de tu negocio para valorar una propuesta orientada a presencia digital profesional, privacidad y confidencialidad.",
  summaryTitle: "Lo que esta solución te ayuda a conseguir",
  summaryItems: [
    "Presentar tu negocio con una imagen online más profesional, sólida y creíble.",
    "Alinear dominio, marca y presencia pública con una dirección más clara.",
    "Avanzar con un enfoque más cuidadoso en privacidad, confidencialidad y exposición mínima de datos.",
  ],
  formLegend: "Selecciona tu paquete",
  fullNameLabel: "Nombre completo",
  fullNamePlaceholder: "Nombre y apellidos",
  emailLabel: "Correo electrónico",
  emailPlaceholder: "tu@email.com",
  brandNameLabel: "Nombre de marca o empresa",
  brandNamePlaceholder: "Tu futura marca o empresa",
  desiredDomainLabel: "Dominio preferido",
  desiredDomainPlaceholder: "tuempresa.com",
  activityTypeLabel: "Actividad del negocio",
  activityTypePlaceholder: "Ejemplo: Promociones Comerciales online",
  activityDescriptionLabel: "Descripción de la actividad",
  activityDescriptionPlaceholder:
    "Describe los productos o servicios de tu negocio, así como cualquier detalle relevante sobre tu actividad, clientes o necesidades específicas que quieras compartir para producir una web corporativa y un mensaje de mercado adecuado.",
  helperText:
    "Completa el formulario para solicitar una propuesta y recibir una respuesta de nuestro equipo.",
  submitButton: "Enviar solicitud",
  submittingButton: "Enviando...",
  successEyebrow: "Solicitud enviada",
  successTitle: "Hemos recibido tu solicitud",
  successLockedText:
    "Esta página queda bloqueada tras el envío para evitar solicitudes duplicadas. Recarga la página si necesitas iniciar una nueva solicitud.",
  referenceLabel: "Referencia",
  errorPrefix: "Error de envío:",
};

const englishPageCopy: HomePageCopy = {
  trustBandAriaLabel: "Business value highlights",
  trustBandItems: [
    "Professional brand presence",
    "Domain and website launch",
    "Business-facing communication",
    "Clear packaged scope",
    "Faster online credibility",
  ],
  metrics: [
    {
      number: "01",
      title: "Stronger first impression",
      description:
        "Present your business with a cleaner, more credible identity from the first visit.",
    },
    {
      number: "02",
      title: "Faster launch path",
      description:
        "Get the essentials in place without overcomplicating your first online presence.",
    },
    {
      number: "03",
      title: "Better customer trust",
      description:
        "Use branded assets that help your company look more mature and client-ready.",
    },
    {
      kicker: "Business value",
      title: "Your brand should not look temporary",
      description:
        "A polished domain, a modern landing page, and stronger business presentation help reduce hesitation and improve perceived quality.",
    },
  ],
  overview: {
    eyebrow: "Overview",
    title: "Everything you need to look ready",
    description:
      "The Basic package brings together the visible assets that shape how your company is perceived online: your domain, your public landing page, and your branded communication starting point.",
    cards: [
      {
        number: "01",
        title: "Modern web presence",
        description:
          "Show your business with a cleaner landing page that feels more polished, credible, and ready for customers.",
      },
      {
        number: "02",
        title: "Branded identity",
        description:
          "Strengthen recognition with a business domain aligned to your company name and positioning.",
      },
      {
        number: "03",
        title: "Clear communications base",
        description:
          "Start with a more professional communication setup that supports external trust and brand consistency.",
      },
    ],
  },
  featureBand: {
    eyebrow: "Why it works",
    title: "Be taken seriously earlier",
    description:
      "Customers often decide in seconds whether a business looks ready. A stronger digital presence helps your company feel more real, more trustworthy, and more prepared to serve.",
    cards: [
      {
        title: "Sharper presentation",
        description:
          "Replace improvised visuals with a more credible public presence.",
      },
      {
        title: "More brand consistency",
        description:
          "Align your visible business assets around one cleaner identity.",
      },
      {
        title: "Cleaner launch experience",
        description:
          "Start with the essentials that most new companies need first.",
      },
    ],
  },
  ctaBand: {
    eyebrow: "Start now",
    title: "Request your launch package",
    description:
      "Share your brand and business details to begin with a more polished online presence.",
    buttonLabel: "Start Request",
  },
};

const spanishPageCopy: HomePageCopy = {
  trustBandAriaLabel: "Aspectos clave del valor para el negocio",
  trustBandItems: [
    "Presencia de marca profesional",
    "Lanzamiento de dominio y web",
    "Comunicación orientada al negocio",
    "Alcance del paquete más claro",
    "Credibilidad online más rápida",
  ],
  metrics: [
    {
      number: "01",
      title: "Mejor primera impresión",
      description:
        "Presenta tu negocio con una identidad más limpia y creíble desde la primera visita.",
    },
    {
      number: "02",
      title: "Lanzamiento más rápido",
      description:
        "Pon en marcha lo esencial sin complicar en exceso tu primera presencia online.",
    },
    {
      number: "03",
      title: "Mayor confianza del cliente",
      description:
        "Utiliza activos de marca que ayuden a que tu empresa se vea más sólida y preparada para clientes.",
    },
    {
      kicker: "Valor para el negocio",
      title: "Tu marca no debería parecer temporal",
      description:
        "Un dominio más cuidado, una landing moderna y una mejor presentación empresarial ayudan a reducir dudas y mejorar la percepción de calidad.",
    },
  ],
  overview: {
    eyebrow: "Visión general",
    title: "Todo lo que necesitas para parecer listo",
    description:
      "El paquete Basic reúne los activos visibles que definen cómo se percibe tu empresa online: tu dominio, tu landing pública y tu base inicial de comunicación de marca.",
    cards: [
      {
        number: "01",
        title: "Presencia web moderna",
        description:
          "Muestra tu negocio con una landing más limpia, pulida, creíble y preparada para clientes.",
      },
      {
        number: "02",
        title: "Identidad de marca",
        description:
          "Refuerza el reconocimiento con un dominio alineado con el nombre y posicionamiento de tu empresa.",
      },
      {
        number: "03",
        title: "Base clara de comunicación",
        description:
          "Empieza con una configuración más profesional que apoye la confianza externa y la coherencia de marca.",
      },
    ],
  },
  featureBand: {
    eyebrow: "Por qué funciona",
    title: "Genera seriedad antes",
    description:
      "Los clientes suelen decidir en segundos si un negocio parece preparado. Una presencia digital más sólida ayuda a que tu empresa parezca más real, fiable y lista para atender.",
    cards: [
      {
        title: "Presentación más sólida",
        description:
          "Sustituye elementos improvisados por una presencia pública más creíble.",
      },
      {
        title: "Mayor coherencia de marca",
        description:
          "Alinea tus activos visibles alrededor de una identidad más clara.",
      },
      {
        title: "Lanzamiento más limpio",
        description:
          "Empieza con lo esencial que la mayoría de nuevas empresas necesita primero.",
      },
    ],
  },
  ctaBand: {
    eyebrow: "Empieza ahora",
    title: "Solicita tu paquete de lanzamiento",
    description:
      "Comparte los datos de tu marca y negocio para empezar con una presencia online más pulida y profesional.",
    buttonLabel: "Iniciar solicitud",
  },
};

export default function HomePage() {
  const isSpanish = useIsSpanishBrowser();

  const formCopy = isSpanish ? spanishCopy : defaultCopy;
  const pageCopy = isSpanish ? spanishPageCopy : englishPageCopy;
  const language: "en" | "es" = isSpanish ? "es" : "en";

  return (
    <main>
      <div className="container">
        <Hero language={language} />

        <section
          className="trust-band"
          aria-label={pageCopy.trustBandAriaLabel}
        >
          <div className="trust-band__track">
            <span>{pageCopy.trustBandItems[0]}</span>
            <span>{pageCopy.trustBandItems[1]}</span>
            <span>{pageCopy.trustBandItems[2]}</span>
            <span>{pageCopy.trustBandItems[3]}</span>
            <span>{pageCopy.trustBandItems[4]}</span>
          </div>
        </section>

        <section className="metric-grid">
          <article className="metric-card">
            <strong>{pageCopy.metrics[0].number}</strong>
            <h3>{pageCopy.metrics[0].title}</h3>
            <p>{pageCopy.metrics[0].description}</p>
          </article>

          <article className="metric-card">
            <strong>{pageCopy.metrics[1].number}</strong>
            <h3>{pageCopy.metrics[1].title}</h3>
            <p>{pageCopy.metrics[1].description}</p>
          </article>

          <article className="metric-card">
            <strong>{pageCopy.metrics[2].number}</strong>
            <h3>{pageCopy.metrics[2].title}</h3>
            <p>{pageCopy.metrics[2].description}</p>
          </article>

          <article className="metric-card metric-card--highlight">
            <span className="metric-card__kicker">
              {pageCopy.metrics[3].kicker}
            </span>
            <h3>{pageCopy.metrics[3].title}</h3>
            <p>{pageCopy.metrics[3].description}</p>
          </article>
        </section>

        <section className="corporate-overview corporate-overview--enhanced">
          <div className="corporate-overview__intro">
            <p className="eyebrow">{pageCopy.overview.eyebrow}</p>
            <h2>{pageCopy.overview.title}</h2>
            <p>{pageCopy.overview.description}</p>
          </div>

          <div className="corporate-overview__grid">
            <article className="info-card info-card--accent">
              <div className="info-card__icon">
                {pageCopy.overview.cards[0].number}
              </div>
              <h3>{pageCopy.overview.cards[0].title}</h3>
              <p>{pageCopy.overview.cards[0].description}</p>
            </article>

            <article className="info-card info-card--accent">
              <div className="info-card__icon">
                {pageCopy.overview.cards[1].number}
              </div>
              <h3>{pageCopy.overview.cards[1].title}</h3>
              <p>{pageCopy.overview.cards[1].description}</p>
            </article>

            <article className="info-card info-card--accent">
              <div className="info-card__icon">
                {pageCopy.overview.cards[2].number}
              </div>
              <h3>{pageCopy.overview.cards[2].title}</h3>
              <p>{pageCopy.overview.cards[2].description}</p>
            </article>
          </div>
        </section>

        <section className="feature-band">
          <div className="feature-band__content">
            <div className="feature-band__left">
              <p className="eyebrow">{pageCopy.featureBand.eyebrow}</p>
              <h2>{pageCopy.featureBand.title}</h2>
              <p>{pageCopy.featureBand.description}</p>
            </div>

            <div className="feature-band__right">
              <div className="feature-band__card">
                <strong>{pageCopy.featureBand.cards[0].title}</strong>
                <span>{pageCopy.featureBand.cards[0].description}</span>
              </div>
              <div className="feature-band__card">
                <strong>{pageCopy.featureBand.cards[1].title}</strong>
                <span>{pageCopy.featureBand.cards[1].description}</span>
              </div>
              <div className="feature-band__card">
                <strong>{pageCopy.featureBand.cards[2].title}</strong>
                <span>{pageCopy.featureBand.cards[2].description}</span>
              </div>
            </div>
          </div>
        </section>

        <section className="cta-band">
          <div className="cta-band__content">
            <div>
              <p className="eyebrow">{pageCopy.ctaBand.eyebrow}</p>
              <h2>{pageCopy.ctaBand.title}</h2>
              <p>{pageCopy.ctaBand.description}</p>
            </div>
            <a href="#application" className="cta-band__link">
              {pageCopy.ctaBand.buttonLabel}
            </a>
          </div>
        </section>

        <section id="application">
          <ApplicationForm
            submissionSource="apextalenti-web-form"
            copy={formCopy}
            language={language}
          />
        </section>
      </div>
    </main>
  );
}
