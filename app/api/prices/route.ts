import { connectMongoDB } from "@/lib/mongodb";
import Prices from "../DAO/models/prices.models"; 
import { NextResponse, NextRequest } from "next/server";

/**
 * GET /api/prices
 * Devuelve el documento de precios activo (siempre hay uno solo).
 */
export async function GET() {
  try {
    await connectMongoDB();
    const prices = await Prices.findOne().sort({ updatedAt: -1 }).lean();
    if (!prices) {
      return NextResponse.json({ message: "No prices found" }, { status: 404 });
    }
    return NextResponse.json(prices);
  } catch (error: unknown) {
    return NextResponse.json({ message: error instanceof Error ? error.message : 'Unknown error' }, { status: 500 });
  }
}

/**
 * PUT /api/prices
 * Actualiza el documento de precios.
 * Body esperado:
 * {
 *   costoPantallaPorColor: number,
 *   costoPorColorPorCopia: number,
 *   margenGanancia: number,
 *   soportes: [{ nombre: string, multiplicador: number }],
 *   factoresTamanio: [{ hastaCm2: number, factor: number, label: string }]
 * }
 */
export async function PUT(req: NextRequest) {
  try {
    await connectMongoDB();
    const body = await req.json();

    const updated = await Prices.findOneAndUpdate(
      {}, // siempre actualiza el único documento
      { $set: body },
      { new: true, runValidators: true }
    ).lean();

    if (!updated) {
      return NextResponse.json({ message: "No prices document to update" }, { status: 404 });
    }

    return NextResponse.json(updated);
  } catch (error: unknown) {
    return NextResponse.json({ message: error instanceof Error ? error.message : 'Unknown error' }, { status: 500 });
  }
}