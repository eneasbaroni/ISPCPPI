import Grill from "@/app/(index)/_components/grill/Grill";
import Link from "next/link";

type Status = "ok" | "already" | "not_found" | "error" | string;

const MESSAGES: Record<string, { title: string; body: string; ok: boolean }> = {
    ok: {
        title: "¡Presupuesto confirmado!",
        body: "Tu confirmación fue registrada correctamente. En breve el equipo del taller se pondrá en contacto con vos para coordinar los detalles del trabajo.",
        ok: true,
    },
    already: {
        title: "Ya confirmado",
        body: "Este presupuesto ya había sido aceptado anteriormente. El taller ya tiene registro de tu confirmación.",
        ok: true,
    },
    not_found: {
        title: "Presupuesto no encontrado",
        body: "No encontramos un presupuesto con ese identificador. Si creés que es un error, contactate con el taller.",
        ok: false,
    },
    error: {
        title: "Algo salió mal",
        body: "Ocurrió un error al procesar tu confirmación. Por favor intentá nuevamente o contactate con el taller.",
        ok: false,
    },
};

export default async function ConfirmarPage({
    params,
    searchParams,
}: {
    params: Promise<{ id: string }>;
    searchParams: Promise<{ status?: string }>;
}) {
    const { id } = await params;
    const { status = "error" } = await searchParams;

    const msg = MESSAGES[status] ?? MESSAGES.error;

    return (
        <main className="px-40 tablet:px-20 pb-20 mobile:px-10 flex flex-col items-center mt-[6vw] mobile:mt-16">
            <Grill />
            <div className="w-full max-w-md border bg-white p-8 shadow-md text-center">

                {/* Ícono */}
                <div className={`text-5xl mb-4 ${msg.ok ? "text-green-500" : "text-red-400"}`}>
                    {msg.ok ? "✓" : "✕"}
                </div>

                <h1 className="text-xl font-bold uppercase mb-3">{msg.title}</h1>
                <p className="text-sm text-gray-600 leading-relaxed mb-6">{msg.body}</p>

                {status === "ok" && (
                    <p className="text-xs text-gray-400 font-mono">
                        ID de presupuesto: {id}
                    </p>
                )}

                <div className="flex w-auto mt-6 bg-black ">
                    <Link
                        href="/"
                        className="p-4 w-full bg-white border border-black font-anton uppercase hover:translate-1! transition-all duration-300 "
                    >
                        Volver al inicio
                    </Link>
                </div>


            </div>
        </main>
    );
}