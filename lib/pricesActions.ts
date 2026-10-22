"use server";

import { connectMongoDB } from "@/lib/mongodb";
import Prices from "@/app/api/DAO/models/prices.models";
import Presupuesto from "@/app/api/DAO/models/presupuesto.models";
import { revalidatePath } from "next/cache";
import { PricesConfig } from "@/lib/budgetCalculation";
import { calcularSugerenciasPrecios, SugerenciasPrecios } from "@/lib/priceSuggestions";

// ── Tipos ─────────────────────────────────────────────────────────────────────

export interface PresupuestoDoc {
  _id: string;
  nombre: string;
  apellido: string;
  telefono: string;
  email: string;
  soporte: string;
  medida: string;
  cantidadColores: number;
  cantidad: number;
  descripcion: string;
  costoPantallas: number;
  costoTintaTotal: number;
  subtotal: number;
  total: number;
  preciosSnapshot: {
    costoPantallaPorColor: number;
    costoPorColorPorCopia: number;
    margenGanancia: number;
  };
  estado: "Pendiente" | "Aceptado" | "Rechazado";
  createdAt: string;
}

// ── Prices ────────────────────────────────────────────────────────────────────

export async function getPrices(): Promise<PricesConfig> {
  await connectMongoDB();
  const prices = await Prices.findOne().lean();
  if (!prices) throw new Error("No se encontró configuración de precios");
  return JSON.parse(JSON.stringify(prices)) as PricesConfig;
}

export async function updatePrices(data: PricesConfig): Promise<void> {
  await connectMongoDB();
  await Prices.findOneAndUpdate({}, { $set: data }, { runValidators: true });
  revalidatePath("/admin");
}

export async function getSugerenciasPrecios(): Promise<SugerenciasPrecios> {
  return calcularSugerenciasPrecios();
}

// ── Presupuestos ──────────────────────────────────────────────────────────────

export async function getPresupuestos(): Promise<PresupuestoDoc[]> {
  await connectMongoDB();
  const docs = await Presupuesto.find().sort({ createdAt: -1 }).lean();
  return JSON.parse(JSON.stringify(docs)) as PresupuestoDoc[];
}

export async function updateEstado(
  id: string,
  estado: "Pendiente" | "Aceptado" | "Rechazado"
): Promise<void> {
  await connectMongoDB();
  await Presupuesto.findByIdAndUpdate(id, { $set: { estado } });
  revalidatePath("/admin");
}