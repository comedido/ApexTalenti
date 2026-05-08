import { Resend } from "resend";
import { config } from "../config.js";

const resend = new Resend(config.resendApiKey);

type ApplicationEmailInput = {
  applicationId: string;
  customerId: string;
  submittedAt: string;
  submissionSource: string;
  language: string;
  brandName: string;
  desiredDomain: string;
  activityType: string;
  activityDescription: string;
  primaryContactName: string;
  primaryContactEmail: string;
};

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function nl2br(value: string) {
  return escapeHtml(value).replace(/\n/g, "<br />");
}

export async function sendApplicationEmails(input: ApplicationEmailInput) {
  const isSpanish = input.language.toLowerCase().startsWith("es");

  const adminSubject = isSpanish
    ? `Nueva solicitud · ${input.brandName}`
    : `New application · ${input.brandName}`;

  const customerSubject = isSpanish
    ? `Solicitud recibida · ${input.brandName}`
    : `Request received · ${input.brandName}`;

  const adminText = isSpanish
    ? `
Nueva solicitud recibida

Referencia: ${input.applicationId}
Cliente: ${input.customerId}
Fecha: ${input.submittedAt}
Origen: ${input.submissionSource}

Marca: ${input.brandName}
Dominio solicitado: ${input.desiredDomain}
Actividad: ${input.activityType}

Descripción:
${input.activityDescription}

Contacto principal: ${input.primaryContactName}
Email: ${input.primaryContactEmail}
Idioma: ${input.language}
    `.trim()
    : `
New application received

Reference: ${input.applicationId}
Customer: ${input.customerId}
Date: ${input.submittedAt}
Source: ${input.submissionSource}

Brand: ${input.brandName}
Requested domain: ${input.desiredDomain}
Business activity: ${input.activityType}

Description:
${input.activityDescription}

Primary contact: ${input.primaryContactName}
Email: ${input.primaryContactEmail}
Language: ${input.language}
    `.trim();

  const customerText = isSpanish
    ? `
Hola ${input.primaryContactName},

Hemos recibido correctamente tu solicitud para ${input.brandName}.

Referencia: ${input.applicationId}
Dominio solicitado: ${input.desiredDomain}
Actividad: ${input.activityType}

Revisaremos la información enviada y te contactaremos con los siguientes pasos lo antes posible.

Este correo confirma únicamente la recepción de tu solicitud.

Transformaciones Digitales
    `.trim()
    : `
Hello ${input.primaryContactName},

We have received your request for ${input.brandName} successfully.

Reference: ${input.applicationId}
Requested domain: ${input.desiredDomain}
Business activity: ${input.activityType}

We will review the submitted information and contact you with the next steps as soon as possible.

This email only confirms receipt of your request.

Transformaciones Digitales
    `.trim();

  const adminHtml = isSpanish
    ? `
      <div style="font-family:Arial,Helvetica,sans-serif;color:#111827;line-height:1.6;max-width:640px">
        <h2 style="margin:0 0 16px">Nueva solicitud recibida</h2>
        <p style="margin:0 0 16px">Se ha registrado una nueva solicitud desde el formulario web.</p>

        <table style="border-collapse:collapse;width:100%;margin:0 0 20px">
          <tr><td style="padding:6px 0"><strong>Referencia</strong></td><td style="padding:6px 0">${escapeHtml(input.applicationId)}</td></tr>
          <tr><td style="padding:6px 0"><strong>Cliente</strong></td><td style="padding:6px 0">${escapeHtml(input.customerId)}</td></tr>
          <tr><td style="padding:6px 0"><strong>Fecha</strong></td><td style="padding:6px 0">${escapeHtml(input.submittedAt)}</td></tr>
          <tr><td style="padding:6px 0"><strong>Origen</strong></td><td style="padding:6px 0">${escapeHtml(input.submissionSource)}</td></tr>
        </table>

        <h3 style="margin:24px 0 12px">Datos del negocio</h3>
        <table style="border-collapse:collapse;width:100%;margin:0 0 20px">
          <tr><td style="padding:6px 0"><strong>Marca</strong></td><td style="padding:6px 0">${escapeHtml(input.brandName)}</td></tr>
          <tr><td style="padding:6px 0"><strong>Dominio solicitado</strong></td><td style="padding:6px 0">${escapeHtml(input.desiredDomain)}</td></tr>
          <tr><td style="padding:6px 0"><strong>Actividad</strong></td><td style="padding:6px 0">${escapeHtml(input.activityType)}</td></tr>
        </table>

        <h3 style="margin:24px 0 12px">Descripción</h3>
        <p style="margin:0 0 20px">${nl2br(input.activityDescription)}</p>

        <h3 style="margin:24px 0 12px">Contacto</h3>
        <table style="border-collapse:collapse;width:100%">
          <tr><td style="padding:6px 0"><strong>Nombre</strong></td><td style="padding:6px 0">${escapeHtml(input.primaryContactName)}</td></tr>
          <tr><td style="padding:6px 0"><strong>Email</strong></td><td style="padding:6px 0">${escapeHtml(input.primaryContactEmail)}</td></tr>
          <tr><td style="padding:6px 0"><strong>Idioma</strong></td><td style="padding:6px 0">${escapeHtml(input.language)}</td></tr>
        </table>
      </div>
    `
    : `
      <div style="font-family:Arial,Helvetica,sans-serif;color:#111827;line-height:1.6;max-width:640px">
        <h2 style="margin:0 0 16px">New application received</h2>
        <p style="margin:0 0 16px">A new application has been submitted through the public web form.</p>

        <table style="border-collapse:collapse;width:100%;margin:0 0 20px">
          <tr><td style="padding:6px 0"><strong>Reference</strong></td><td style="padding:6px 0">${escapeHtml(input.applicationId)}</td></tr>
          <tr><td style="padding:6px 0"><strong>Customer</strong></td><td style="padding:6px 0">${escapeHtml(input.customerId)}</td></tr>
          <tr><td style="padding:6px 0"><strong>Date</strong></td><td style="padding:6px 0">${escapeHtml(input.submittedAt)}</td></tr>
          <tr><td style="padding:6px 0"><strong>Source</strong></td><td style="padding:6px 0">${escapeHtml(input.submissionSource)}</td></tr>
        </table>

        <h3 style="margin:24px 0 12px">Business details</h3>
        <table style="border-collapse:collapse;width:100%;margin:0 0 20px">
          <tr><td style="padding:6px 0"><strong>Brand</strong></td><td style="padding:6px 0">${escapeHtml(input.brandName)}</td></tr>
          <tr><td style="padding:6px 0"><strong>Requested domain</strong></td><td style="padding:6px 0">${escapeHtml(input.desiredDomain)}</td></tr>
          <tr><td style="padding:6px 0"><strong>Business activity</strong></td><td style="padding:6px 0">${escapeHtml(input.activityType)}</td></tr>
        </table>

        <h3 style="margin:24px 0 12px">Description</h3>
        <p style="margin:0 0 20px">${nl2br(input.activityDescription)}</p>

        <h3 style="margin:24px 0 12px">Contact</h3>
        <table style="border-collapse:collapse;width:100%">
          <tr><td style="padding:6px 0"><strong>Name</strong></td><td style="padding:6px 0">${escapeHtml(input.primaryContactName)}</td></tr>
          <tr><td style="padding:6px 0"><strong>Email</strong></td><td style="padding:6px 0">${escapeHtml(input.primaryContactEmail)}</td></tr>
          <tr><td style="padding:6px 0"><strong>Language</strong></td><td style="padding:6px 0">${escapeHtml(input.language)}</td></tr>
        </table>
      </div>
    `;

  const customerHtml = isSpanish
    ? `
      <div style="font-family:Arial,Helvetica,sans-serif;color:#111827;line-height:1.6;max-width:640px">
        <h2 style="margin:0 0 16px">Hemos recibido tu solicitud</h2>
        <p style="margin:0 0 16px">Hola ${escapeHtml(input.primaryContactName)},</p>
        <p style="margin:0 0 16px">
          Hemos recibido correctamente tu solicitud para <strong>${escapeHtml(input.brandName)}</strong>.
        </p>

        <table style="border-collapse:collapse;width:100%;margin:0 0 20px">
          <tr><td style="padding:6px 0"><strong>Referencia</strong></td><td style="padding:6px 0">${escapeHtml(input.applicationId)}</td></tr>
          <tr><td style="padding:6px 0"><strong>Dominio solicitado</strong></td><td style="padding:6px 0">${escapeHtml(input.desiredDomain)}</td></tr>
          <tr><td style="padding:6px 0"><strong>Actividad</strong></td><td style="padding:6px 0">${escapeHtml(input.activityType)}</td></tr>
        </table>

        <p style="margin:0 0 16px">
          Revisaremos la información enviada y te contactaremos con los siguientes pasos lo antes posible.
        </p>
        <p style="margin:0 0 16px">
          Este correo confirma únicamente la recepción de tu solicitud.
        </p>
        <p style="margin:24px 0 0">Transformaciones Digitales</p>
      </div>
    `
    : `
      <div style="font-family:Arial,Helvetica,sans-serif;color:#111827;line-height:1.6;max-width:640px">
        <h2 style="margin:0 0 16px">We have received your request</h2>
        <p style="margin:0 0 16px">Hello ${escapeHtml(input.primaryContactName)},</p>
        <p style="margin:0 0 16px">
          We have received your request for <strong>${escapeHtml(input.brandName)}</strong> successfully.
        </p>

        <table style="border-collapse:collapse;width:100%;margin:0 0 20px">
          <tr><td style="padding:6px 0"><strong>Reference</strong></td><td style="padding:6px 0">${escapeHtml(input.applicationId)}</td></tr>
          <tr><td style="padding:6px 0"><strong>Requested domain</strong></td><td style="padding:6px 0">${escapeHtml(input.desiredDomain)}</td></tr>
          <tr><td style="padding:6px 0"><strong>Business activity</strong></td><td style="padding:6px 0">${escapeHtml(input.activityType)}</td></tr>
        </table>

        <p style="margin:0 0 16px">
          We will review the submitted information and contact you with the next steps as soon as possible.
        </p>
        <p style="margin:0 0 16px">
          This email only confirms receipt of your request.
        </p>
        <p style="margin:24px 0 0">Transformaciones Digitales</p>
      </div>
    `;

  await Promise.all([
    resend.emails.send({
      from: config.emailFrom,
      to: [config.emailAdminTo],
      replyTo: input.primaryContactEmail,
      subject: adminSubject,
      html: adminHtml,
      text: adminText,
    }),
    resend.emails.send({
      from: config.emailFrom,
      to: [input.primaryContactEmail],
      replyTo: config.emailAdminTo,
      subject: customerSubject,
      html: customerHtml,
      text: customerText,
    }),
  ]);
}
