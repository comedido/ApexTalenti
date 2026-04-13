import { ApplicationForm } from "@/features/application-form/components/ApplicationForm";

export default function FormPage() {
  return (
    <main className="td-page">
      <section className="td-hero">
        <div className="td-hero__overlay" aria-hidden="true" />
        <div className="container td-hero__content">
          <p className="td-eyebrow">Transformaciones Digitales</p>
          <h1>
            Transformación digital con foco en privacidad y confidencialidad
          </h1>
          <p className="td-hero__description">
            Solicita una solución digital orientada a reforzar la presencia de
            tu negocio con un enfoque claro en confidencialidad, privacidad
            operativa y selección de proveedores con políticas de retención cero
            de datos siempre que sea viable.
          </p>
          <a href="#application" className="td-primary-link">
            Iniciar solicitud
          </a>
        </div>
      </section>

      <div className="container td-page__body">
        <section className="td-intro">
          <div className="td-intro__grid">
            <article className="td-info-card">
              <h3>Enfoque empresarial</h3>
              <p>
                Una presentación más corporativa para negocios que necesitan una
                presencia digital profesional, clara y bien estructurada.
              </p>
            </article>

            <article className="td-info-card">
              <h3>Privacidad como criterio principal</h3>
              <p>
                La prioridad número uno es proteger la información del negocio y
                reducir al mínimo la exposición innecesaria de datos.
              </p>
            </article>

            <article className="td-info-card">
              <h3>Proveedores con retención cero</h3>
              <p>
                Siempre que sea posible, se priorizan servicios y proveedores
                con políticas de retención cero o minimización estricta de
                datos.
              </p>
            </article>
          </div>
        </section>

        <section className="td-band">
          <div className="td-band__content">
            <div>
              <p className="td-eyebrow">Solicitud</p>
              <h2>Cuéntanos qué necesitas para tu presencia digital</h2>
              <p>
                Comparte la información principal de tu negocio para evaluar una
                propuesta orientada a imagen profesional, discreción operativa y
                una base digital más sólida.
              </p>
            </div>
            <a
              href="#application"
              className="td-primary-link td-primary-link--small"
            >
              Ir al formulario
            </a>
          </div>
        </section>

        <section id="application">
          <ApplicationForm
            submissionSource="transformacionesdigitales-web-form"
            copy={{
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
              formLegend: "Selecciona tu modalidad",
              fullNameLabel: "Nombre completo",
              fullNamePlaceholder: "Nombre y apellidos",
              emailLabel: "Correo electrónico",
              emailPlaceholder: "nombre@empresa.com",
              brandNameLabel: "Nombre de marca o empresa",
              brandNamePlaceholder: "Nombre de tu empresa",
              desiredDomainLabel: "Dominio preferido",
              desiredDomainPlaceholder: "tuempresa.com",
              activityTypeLabel: "Actividad del negocio",
              activityTypePlaceholder: "Clínica dental",
              activityDescriptionLabel: "Descripción de la actividad",
              activityDescriptionPlaceholder:
                "Describe brevemente los productos o servicios de tu negocio",
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
            }}
            skuOptions={[
              {
                value: "basic",
                title: "Esencial",
                description:
                  "Una modalidad orientada al lanzamiento que combina planificación del dominio, una presencia web profesional y una base de comunicación alineada con tu negocio.",
                pill: "Disponible ahora",
                available: true,
              },
              {
                value: "premium",
                title: "Avanzado",
                description:
                  "Una modalidad ampliada para negocios que requieren mayor alcance, mejor presentación y soporte adicional en su despliegue digital.",
                pill: "Próximamente",
                available: false,
              },
              {
                value: "enterprise",
                title: "Corporativo",
                description:
                  "Un enfoque más personalizado para organizaciones que necesitan una presencia digital más exigente, mayor alcance operativo y criterios reforzados de confidencialidad.",
                pill: "Próximamente",
                available: false,
              },
            ]}
          />
        </section>
      </div>
    </main>
  );
}
