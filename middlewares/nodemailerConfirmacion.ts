import { createTransport } from "nodemailer";

const EMAIL         = process.env.EMAIL;
const MAIL_PASS     = process.env.MAILPASS;
const EMAIL_TO_SEND = process.env.EMAIL_TO_SEND;

const transporter = createTransport({
  service: "gmail",
  port: 587,
  auth: { user: EMAIL, pass: MAIL_PASS },
  tls: { rejectUnauthorized: false },
});

const fmt = (n: number) =>
  n.toLocaleString("es-AR", { style: "currency", currency: "ARS", maximumFractionDigits: 0 });

interface ConfirmacionData {
  id: string;
  nombre: string;
  apellido: string;
  email: string;
  telefono: string;
  total: number;
}

const sendMailConfirmacion = async (data: ConfirmacionData) => {
  try {
    await transporter.sendMail({
      from: EMAIL,
      to: EMAIL_TO_SEND,
      subject: `✅ Presupuesto aceptado — ${data.nombre} ${data.apellido}`,
      text: `
El cliente aceptó su presupuesto.

────────────────────────────
  DATOS DEL CLIENTE
────────────────────────────
  Nombre:     ${data.nombre} ${data.apellido}
  Email:      ${data.email}
  Teléfono:   ${data.telefono}

────────────────────────────
  PRESUPUESTO
────────────────────────────
  ID:         ${data.id}
  Total:      ${fmt(data.total)}
────────────────────────────

Podés ver el detalle completo en el panel de administración.
      `.trim(),
    });
    return true;
  } catch (error) {
    console.error("Error al enviar mail de confirmación:", error);
    return false;
  }
};

export default sendMailConfirmacion;