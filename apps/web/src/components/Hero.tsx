import { ApplicationStatusLookup } from "@/components/ApplicationStatusLookup";

type HeroProps = {
  language?: "en" | "es";
};

export function Hero({ language = "en" }: HeroProps) {
  const isSpanish = language === "es";

  return (
    <section className="hero hero--enhanced">
      <div className="hero__bg" aria-hidden="true">
        <div className="hero__orb hero__orb--one" />
        <div className="hero__orb hero__orb--two" />
        <div className="hero__grid" />
      </div>

      <div className="hero__content">
        <div className="hero__badge-row">
          <p className="eyebrow">ApexTalenti</p>
          <span className="hero__mini-badge">
            {isSpanish ? "Paquete de lanzamiento" : "Business Launch Package"}
          </span>
        </div>

        <h1>
          {isSpanish ? (
            <>
              Lanza mejor.
              <br />
              Proyecta solidez.
            </>
          ) : (
            <>
              Launch smarter.
              <br />
              Look established.
            </>
          )}
        </h1>

        <p className="hero__description">
          {isSpanish
            ? "Construye una primera impresión más sólida con un dominio de marca, una landing más pulida y una base de comunicación profesional diseñada para que tu empresa inspire credibilidad desde el primer día."
            : "Build a stronger first impression with a branded domain, a polished landing page, and business-ready communication foundations designed to help your company look credible from day one."}
        </p>

        <ApplicationStatusLookup
          language={language}
          primaryLinkClassName="hero__primary-link"
          secondaryButtonClassName="hero__secondary-button"
          actionsClassName="hero__actions hero__actions--dual"
        />

        <div className="hero__highlights">
          <span>{isSpanish ? "Dominio de marca" : "Branded domain"}</span>
          <span>
            {isSpanish ? "Landing page moderna" : "Modern landing page"}
          </span>
          <span>
            {isSpanish ? "Base de email profesional" : "Business email base"}
          </span>
          <span>
            {isSpanish ? "Paquete listo para lanzar" : "Launch-ready package"}
          </span>
        </div>
      </div>
    </section>
  );
}
