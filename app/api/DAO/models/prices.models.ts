import mongoose, { Schema, models } from "mongoose";

const pricesCollection = "prices";

// ── Sub-schemas ──────────────────────────────────────────────────────────────

const soporteSchema = new Schema(
  {
    nombre: { type: String, required: true },
    multiplicador: { type: Number, required: true },
  },
  { _id: false }
);

const rangoTamanioSchema = new Schema(
  {
    hastaCm2: { type: Number, required: true },
    factor: { type: Number, required: true },
    label: { type: String, required: true },
  },
  { _id: false }
);

// ── Main schema ──────────────────────────────────────────────────────────────

const pricesSchema = new Schema(
  {
    costoPantallaPorColor: { type: Number, required: true },
    costoPorColorPorCopia: { type: Number, required: true },
    margenGanancia: { type: Number, required: true },
    soportes: { type: [soporteSchema], required: true },
    factoresTamanio: { type: [rangoTamanioSchema], required: true },
  },
  { timestamps: true }
);

const Prices = models.prices || mongoose.model(pricesCollection, pricesSchema);

export default Prices;