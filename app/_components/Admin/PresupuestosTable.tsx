"use client";

import { useState } from "react";
import { PresupuestoDoc } from "@/lib/pricesActions";
import { ESTADO_STYLES } from "./constants";
import PresupuestoModal from "./PresupuestoModal";
import { fmt, fmtDate } from "./helpers";
import { AnimatePresence } from 'motion/react'
import LogoutButton from "./LogoutButton";
import Link from "next/link";


export default function PresupuestosTable({ presupuestos }: { presupuestos: PresupuestoDoc[] }) {
  const [selected, setSelected] = useState<PresupuestoDoc | null>(null);

  return (
    <main className="px-40 tablet:px-20 pb-20 mobile:px-10 flex flex-col items-center mt-[6vw]">
      <header className="w-full flex justify-between items-center  pb-4 mobile:mt-10">
        <div>
          <p className="text-sm mobile:text-xs text-gray-500">Panel de administración</p>
          <h1 className="text-2xl mobile:text-xl font-bold uppercase">Gestión de Presupuestos</h1>
        </div>
        
      </header>
      <section className="mt-4 w-full flex flex-col gap-0 border bg-white p-4 mobile:p-3 shadow-md">
        <h2 className="text-lg! font-bold uppercase">Presupuestos</h2>
        <p className="text-xs! text-gray-500 mb-4">
          {presupuestos.length} presupuesto{presupuestos.length !== 1 ? "s" : ""} registrado{presupuestos.length !== 1 ? "s" : ""}
        </p>

        {presupuestos.length === 0 ? (
          <p className="text-sm text-gray-400 py-4">Todavía no hay presupuestos cargados.</p>
        ) : (
          <>
            {/* Tabla — solo desktop */}
            <table className="w-full mobile:hidden">
              <thead className="border-b border-gray-200">
                <tr>
                  <th className="text-left text-xs text-gray-500 uppercase font-normal py-3 px-2">Fecha</th>
                  <th className="text-left text-xs text-gray-500 uppercase font-normal py-3 px-2">Cliente</th>
                  <th className="text-left text-xs text-gray-500 uppercase font-normal py-3 px-2">Email</th>
                  <th className="text-left text-xs text-gray-500 uppercase font-normal py-3 px-2">Total</th>
                  <th className="text-left text-xs text-gray-500 uppercase font-normal py-3 px-2">Estado</th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {presupuestos.map((p) => (
                  <tr
                    key={p._id}
                    className="border-b border-gray-100 last:border-b-0 hover:bg-gray-50 transition-colors cursor-pointer"
                    onClick={() => setSelected(p)}
                  >
                    <td className="text-sm py-3 px-2 text-gray-500">{fmtDate(p.createdAt)}</td>
                    <td className="text-sm py-3 px-2 font-medium">{p.nombre} {p.apellido}</td>
                    <td className="text-sm py-3 px-2 text-gray-500">{p.email}</td>
                    <td className="text-sm py-3 px-2 font-mono">{fmt(p.total)}</td>
                    <td className="py-3 px-2">
                      <span className={`text-xs px-2 py-1 rounded-sm font-medium ${ESTADO_STYLES[p.estado]}`}>
                        {p.estado}
                      </span>
                    </td>
                    <td className="py-3 px-2 text-right">
                      <button
                        onClick={() => setSelected(p)}
                        className="text-xs uppercase underline text-gray-400 hover:text-black cursor-pointer transition-colors"
                      >
                        Ver detalle
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Cards — solo mobile */}
            <div className="flex flex-col gap-2 sm:hidden">
              {presupuestos.map((p) => (
                <div
                  key={p._id}
                  className="border border-gray-100 p-3 flex flex-col gap-2 cursor-pointer active:bg-gray-50 transition-colors"
                  onClick={() => setSelected(p)}
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-sm font-medium">{p.nombre} {p.apellido}</span>
                    <span className={`text-xs px-2 py-1 rounded-sm font-medium ${ESTADO_STYLES[p.estado]}`}>
                      {p.estado}
                    </span>
                  </div>
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs text-gray-400">{fmtDate(p.createdAt)}</span>
                    <span className="text-sm font-mono font-medium">{fmt(p.total)}</span>
                  </div>
                  <span className="text-xs text-gray-400 truncate">{p.email}</span>
                </div>
              ))}
            </div>
          </>
        )}

        <AnimatePresence>
          {selected && (
            <PresupuestoModal doc={selected} onClose={() => setSelected(null)} />
          )}
        </AnimatePresence>
      </section>
      <div className="w-full flex mobile:flex-col mobile:gap-4 justify-center items-center mt-8">
        <Link href="/admin" className="w-1/2 mobile:w-full" >
          <button
            className="w-full! text-md uppercase bg-white outline outline-gray-300 px-4 h-10 mobile:w-full hover:bg-gray-100 cursor-pointer transition-colors"
          >
            Panel Admin
          </button>
        </Link>
        <LogoutButton />
      </div>
    </main>
  );
}