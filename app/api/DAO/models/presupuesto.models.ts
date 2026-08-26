import mongoose, { Schema, models } from "mongoose";

const presupuestoSchema = new Schema(
  {
    // ── Datos del cliente ──────────────────────────────────────────────────
    nombre:   { type: String, required: true },
    apellido: { type: String, required: true },
    telefono: { type: String, required: true },
    email:    { type: String, required: true },

    // ── Datos del trabajo ──────────────────────────────────────────────────
    soporte:         { type: String, required: true },
    medida:          { type: String, required: true },
    cantidadColores: { type: Number, required: true },
    cantidad:        { type: Number, required: true },
    descripcion:     { type: String, required: true },

    // ── Resultado del cálculo ──────────────────────────────────────────────
    costoPantallas:  { type: Number, required: true },
    costoTintaTotal: { type: Number, required: true },
    subtotal:        { type: Number, required: true },
    total:           { type: Number, required: true },

    // ── Snapshot de precios usados al momento del cálculo ─────────────────
    // (útil para auditoría: si los precios cambian, sabemos con qué valores
    //  se calculó este presupuesto)
    preciosSnapshot: {
      costoPantallaPorColor:  { type: Number, required: true },
      costoPorColorPorCopia:  { type: Number, required: true },
      margenGanancia:         { type: Number, required: true },
    },
    estado: {
      type: String,
      enum: ["Pendiente", "Aceptado", "Rechazado"],
      default: "Pendiente",
    },
  },
  { timestamps: true } // agrega createdAt y updatedAt automáticamente
);

const Presupuesto =
  models.presupuesto || mongoose.model("presupuesto", presupuestoSchema);

export default Presupuesto;