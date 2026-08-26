import { createTransport } from "nodemailer";
import { ResultadoPresupuesto } from "../lib/budgetCalculation";

const EMAIL         = process.env.EMAIL;
const MAIL_PASS     = process.env.MAILPASS;
const EMAIL_TO_SEND = process.env.EMAIL_TO_SEND;
const BASE_URL      = process.env.NEXT_PUBLIC_BASE_URL ?? "http://localhost:3000";

const transporter = createTransport({
  service: "gmail",
  port: 587,
  auth: { user: EMAIL, pass: MAIL_PASS },
  tls: { rejectUnauthorized: false },
});

const fmt = (n: number) =>
  n.toLocaleString("es-AR", { style: "currency", currency: "ARS", maximumFractionDigits: 0 });

// ─── Mail al CLIENTE ──────────────────────────────────────────────────────────

const mailClienteHtml = (
  data: Record<string, FormDataEntryValue>,
  presupuesto: ResultadoPresupuesto,
  presupuestoId: string | null
) => {
  const confirmUrl = presupuestoId
    ? `${BASE_URL}/api/presupuesto/confirmar/${presupuestoId}`
    : null;

  return `
<!DOCTYPE html>
<html lang="es">
<body style="font-family: Arial, sans-serif; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">

  <p>Hola <strong>${data.nombre}</strong>!</p>
  <p>Gracias por contactarnos. Analizamos tu consulta y te acercamos un presupuesto:</p>

  <table style="width: 100%; border-collapse: collapse; margin: 20px 0; background: #f9f9f9;">
    <tr><td colspan="2" style="padding: 10px; font-weight: bold; border-bottom: 2px solid #ddd;">Detalle del trabajo</td></tr>
    <tr>
      <td style="padding: 8px 10px; color: #666;">Soporte</td>
      <td style="padding: 8px 10px;">${data.soporte}</td>
    </tr>
    <tr style="background: #fff;">
      <td style="padding: 8px 10px; color: #666;">Medida</td>
      <td style="padding: 8px 10px;">${data.medida} cm (${presupuesto.desglose.labelTamanio})</td>
    </tr>
    <tr>
      <td style="padding: 8px 10px; color: #666;">Colores</td>
      <td style="padding: 8px 10px;">${presupuesto.desglose.colores}</td>
    </tr>
    <tr style="background: #fff;">
      <td style="padding: 8px 10px; color: #666;">Copias</td>
      <td style="padding: 8px 10px;">${presupuesto.desglose.copias}</td>
    </tr>
    <tr>
      <td style="padding: 12px 10px; font-weight: bold; font-size: 16px;">Total estimado</td>
      <td style="padding: 12px 10px; font-weight: bold; font-size: 16px;">${fmt(presupuesto.total)}</td>
    </tr>
  </table>

  <p style="font-size: 13px; color: #888;">
    ⚠️ Este presupuesto es orientativo. El valor final puede variar según la complejidad del diseño y los materiales específicos.
  </p>

  ${confirmUrl ? `
  <p>¿Querés aceptar este presupuesto?</p>
  <a href="${confirmUrl}" style="display: inline-block; background: #000; color: #fff; padding: 12px 24px; text-decoration: none; font-weight: bold; border-radius: 4px; margin: 8px 0;">
    Aceptar presupuesto
  </a>
  <p style="font-size: 12px; color: #aaa;">
    Al hacer click quedará registrada tu confirmación y el taller se pondrá en contacto con vos para coordinar los detalles.
  </p>
  ` : `
  <p>Nos pondremos en contacto a la brevedad para confirmar los detalles.</p>
  `}

  <p>Saludos,<br/><strong>El equipo del taller</strong></p>

</body>
</html>
  `.trim();
};

// ─── Mail al TALLER ───────────────────────────────────────────────────────────

const mailTallerHtml = (
  data: Record<string, FormDataEntryValue>,
  presupuesto: ResultadoPresupuesto
) => `
<!DOCTYPE html>
<html lang="es">
<body style="font-family: Arial, sans-serif; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">

  <p style="font-size: 18px; font-weight: bold;">Nueva consulta de presupuesto</p>

  <table style="width: 100%; border-collapse: collapse; margin: 20px 0; background: #f9f9f9;">
    <tr><td colspan="2" style="padding: 10px; font-weight: bold; border-bottom: 2px solid #ddd;">Datos del cliente</td></tr>
    <tr>
      <td style="padding: 8px 10px; color: #666;">Nombre</td>
      <td style="padding: 8px 10px;">${data.nombre} ${data.apellido}</td>
    </tr>
    <tr style="background: #fff;">
      <td style="padding: 8px 10px; color: #666;">Teléfono</td>
      <td style="padding: 8px 10px;">${data.telefono}</td>
    </tr>
    <tr>
      <td style="padding: 8px 10px; color: #666;">Email</td>
      <td style="padding: 8px 10px;">${data.email}</td>
    </tr>
  </table>

  <table style="width: 100%; border-collapse: collapse; margin: 20px 0; background: #f9f9f9;">
    <tr><td colspan="2" style="padding: 10px; font-weight: bold; border-bottom: 2px solid #ddd;">Detalle del trabajo</td></tr>
    <tr>
      <td style="padding: 8px 10px; color: #666;">Soporte</td>
      <td style="padding: 8px 10px;">${data.soporte} (×${presupuesto.desglose.multiplicadorSoporte})</td>
    </tr>
    <tr style="background: #fff;">
      <td style="padding: 8px 10px; color: #666;">Medida</td>
      <td style="padding: 8px 10px;">${data.medida} cm → ${presupuesto.desglose.areaCm2} cm² (${presupuesto.desglose.labelTamanio})</td>
    </tr>
    <tr>
      <td style="padding: 8px 10px; color: #666;">Colores</td>
      <td style="padding: 8px 10px;">${presupuesto.desglose.colores}</td>
    </tr>
    <tr style="background: #fff;">
      <td style="padding: 8px 10px; color: #666;">Copias</td>
      <td style="padding: 8px 10px;">${presupuesto.desglose.copias}</td>
    </tr>
    <tr>
      <td style="padding: 8px 10px; color: #666;">Factor tamaño</td>
      <td style="padding: 8px 10px;">×${presupuesto.desglose.factorTamanio}</td>
    </tr>
    <tr style="background: #fff;">
      <td style="padding: 8px 10px; color: #666;">Descripción</td>
      <td style="padding: 8px 10px;">${data.descripcion}</td>
    </tr>
  </table>

  <table style="width: 100%; border-collapse: collapse; margin: 20px 0; background: #f9f9f9;">
    <tr><td colspan="2" style="padding: 10px; font-weight: bold; border-bottom: 2px solid #ddd;">Cálculo</td></tr>
    <tr>
      <td style="padding: 8px 10px; color: #666;">Pantallas (${presupuesto.desglose.colores} col × ${fmt(presupuesto.desglose.costoPorPantalla)})</td>
      <td style="padding: 8px 10px;">${fmt(presupuesto.costoPantallas)}</td>
    </tr>
    <tr style="background: #fff;">
      <td style="padding: 8px 10px; color: #666;">Tinta e impresión</td>
      <td style="padding: 8px 10px;">${fmt(presupuesto.costoTintaTotal)}</td>
    </tr>
    <tr>
      <td style="padding: 8px 10px; color: #666;">Subtotal (sin margen)</td>
      <td style="padding: 8px 10px;">${fmt(presupuesto.subtotal)}</td>
    </tr>
    <tr style="background: #000;">
      <td style="padding: 12px 10px; font-weight: bold; color: #fff;">Total (con margen)</td>
      <td style="padding: 12px 10px; font-weight: bold; color: #fff;">${fmt(presupuesto.total)}</td>
    </tr>
  </table>

</body>
</html>
`.trim();

const mailTaller = (
  data: Record<string, FormDataEntryValue>,
  presupuesto: ResultadoPresupuesto
) => `
Nueva consulta de presupuesto recibida.

────────────────────────────
  DATOS DEL CLIENTE
────────────────────────────
  Nombre:     ${data.nombre} ${data.apellido}
  Teléfono:   ${data.telefono}
  Email:      ${data.email}

────────────────────────────
  DETALLE DEL TRABAJO
────────────────────────────
  Soporte:          ${data.soporte}  (×${presupuesto.desglose.multiplicadorSoporte})
  Medida:           ${data.medida} cm  →  ${presupuesto.desglose.areaCm2} cm²  (${presupuesto.desglose.labelTamanio})
  Colores:          ${presupuesto.desglose.colores}
  Copias:           ${presupuesto.desglose.copias}
  Factor tamaño:    ×${presupuesto.desglose.factorTamanio}
  Descripción:      ${data.descripcion}

────────────────────────────
  CÁLCULO
────────────────────────────
  Pantallas (${presupuesto.desglose.colores} col × ${fmt(presupuesto.desglose.costoPorPantalla)}):   ${fmt(presupuesto.costoPantallas)}
  Tinta e impresión:                                   ${fmt(presupuesto.costoTintaTotal)}
  Subtotal (sin margen):                               ${fmt(presupuesto.subtotal)}
  TOTAL (con margen):                                  ${fmt(presupuesto.total)}
────────────────────────────
`.trim();

// ─── Función principal ────────────────────────────────────────────────────────

const sendMail = async (
  data: Record<string, FormDataEntryValue>,
  file: Buffer,
  presupuesto: ResultadoPresupuesto,
  presupuestoId: string | null = null
) => {
  const fileName = (data.file as unknown as File)?.name ?? "adjunto";

  try {
    await transporter.sendMail({
      from: EMAIL,
      to: EMAIL_TO_SEND,
      subject: `Nueva consulta — ${data.nombre} ${data.apellido}`,
      html: mailTallerHtml(data, presupuesto),
      attachments: [{ filename: fileName, content: file }],
    });

    await transporter.sendMail({
      from: EMAIL,
      to: data.email as string,
      subject: "Tu presupuesto de serigrafía",
      html: mailClienteHtml(data, presupuesto, presupuestoId),
    });

    return true;
  } catch (error) {
    console.error("Error al enviar correos:", error);
    return false;
  }
};

export default sendMail;