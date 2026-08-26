import { connectMongoDB } from "@/lib/mongodb";
import Presupuesto from "@/app/api/DAO/models/presupuesto.models";
import { NextRequest, NextResponse } from "next/server";
import sendMailConfirmacion from "@/middlewares/nodemailerConfirmacion";


export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  try {
    await connectMongoDB();

    const doc = await Presupuesto.findById(id);
    if (!doc) {
      return NextResponse.redirect(new URL(`/confirmar/${id}?status=not_found`, _req.url));
    }

    if (doc.estado === "Aceptado") {
      return NextResponse.redirect(new URL(`/confirmar/${id}?status=already`, _req.url));
    }

    await Presupuesto.findByIdAndUpdate(id, { $set: { estado: "Aceptado" } });

    // Notificar al taller
    await sendMailConfirmacion({
      id,
      nombre:   doc.nombre,
      apellido: doc.apellido,
      email:    doc.email,
      telefono: doc.telefono,
      total:    doc.total,
    });

    return NextResponse.redirect(new URL(`/confirmar/${id}?status=ok`, _req.url));
  } catch (error) {
    console.error("Error al confirmar presupuesto:", error);
    return NextResponse.redirect(new URL(`/confirmar/${id}?status=error`, _req.url));
  }
}