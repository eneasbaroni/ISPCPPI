export type Estado = "Pendiente" | "Aceptado" | "Rechazado";

export const ESTADO_STYLES: Record<Estado, string> = {
  Pendiente:  "bg-yellow-100 text-yellow-800",
  Aceptado:   "bg-green-100  text-green-800",
  Rechazado:  "bg-red-100    text-red-800",
};