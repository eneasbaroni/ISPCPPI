"use server";

import sendMail from "@/middlewares/nodemailer";
import { budgetCalculation, PricesConfig } from "@/lib/budgetCalculation";
import { connectMongoDB } from "@/lib/mongodb";
import Prices from "@/app/api/DAO/models/prices.models";
import Presupuesto from "@/app/api/DAO/models/presupuesto.models";

const handleSubmit = async (formData: FormData) => {
  const data = Object.fromEntries(formData.entries());

  const file = formData.get("file") as unknown as File;
  if (!file) throw new Error("No file uploaded");

  await connectMongoDB();

  // ── 1. Obtener precios desde Mongo ────────────────────────────────────────
  let prices: PricesConfig;
  try {
    const pricesDoc = await Prices.findOne().lean();
    if (!pricesDoc) throw new Error("No prices found");
    prices = pricesDoc as unknown as PricesConfig;
  } catch (error) {
    console.error("Error al obtener precios:", error);
    return "error";
  }

  // ── 2. Calcular presupuesto ───────────────────────────────────────────────
  let presupuesto;
  try {
    presupuesto = budgetCalculation(
      {
        soporte:         data.soporte as string,
        medida:          data.medida as string,
        cantidadColores: data.cantidadColores as string,
        cantidad:        data.cantidad as string,
      },
      prices
    );
  } catch (calcError) {
    console.error("Error al calcular presupuesto:", calcError);
    return "error";
  }

  // ── 3. Guardar en Mongo y capturar el _id ─────────────────────────────────
  let presupuestoId: string | null = null;
  try {
    const doc = await Presupuesto.create({
      nombre:          data.nombre,
      apellido:        data.apellido,
      telefono:        data.telefono,
      email:           data.email,
      soporte:         data.soporte,
      medida:          data.medida,
      cantidadColores: presupuesto.desglose.colores,
      cantidad:        presupuesto.desglose.copias,
      descripcion:     data.descripcion,
      costoPantallas:  presupuesto.costoPantallas,
      costoTintaTotal: presupuesto.costoTintaTotal,
      subtotal:        presupuesto.subtotal,
      total:           presupuesto.total,
      preciosSnapshot: {
        costoPantallaPorColor: prices.costoPantallaPorColor,
        costoPorColorPorCopia: prices.costoPorColorPorCopia,
        margenGanancia:        prices.margenGanancia,
      },
    });
    presupuestoId = doc._id.toString();
  } catch (dbError) {
    console.error("Error al guardar presupuesto en DB:", dbError);
  }

  // ── 4. Enviar mails ───────────────────────────────────────────────────────
  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  try {
    const res = await sendMail(data, buffer, presupuesto, presupuestoId);
    return res ? "ok" : "error";
  } catch (error) {
    console.error(error);
    return "error";
  }
};

export { handleSubmit };