"use client";

import Grill from "@/app/(index)/_components/grill/Grill";
import { PricesConfig } from "@/lib/budgetCalculation";
import { updatePrices } from "@/lib/pricesActions";
import Link from "next/link";
import { useState } from "react";
import LogoutButton from "./LogoutButton";


export default function PricesForm({ prices }: { prices: PricesConfig }) {
  const [form, setForm] = useState<PricesConfig>(structuredClone(prices));
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState<{ text: string; ok: boolean } | null>(null);

  const showMsg = (text: string, ok: boolean) => {
    setMsg({ text, ok });
    setTimeout(() => setMsg(null), 3000);
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      await updatePrices(form);
      setEditing(false);
      showMsg("Precios actualizados correctamente", true);
    } catch {
      showMsg("Error al guardar los cambios", false);
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    setForm(structuredClone(prices));
    setEditing(false);
  };

  const setBase = (key: keyof PricesConfig, value: number) =>
    setForm((f) => ({ ...f, [key]: value }));

  const setSoporte = (i: number, value: number) =>
    setForm((f) => {
      const soportes = [...f.soportes];
      soportes[i] = { ...soportes[i], multiplicador: value };
      return { ...f, soportes };
    });

  const setRango = (i: number, field: "hastaCm2" | "factor", value: number) =>
    setForm((f) => {
      const factoresTamanio = [...f.factoresTamanio];
      factoresTamanio[i] = { ...factoresTamanio[i], [field]: value };
      return { ...f, factoresTamanio };
    });

  const fmt = (n: number) =>
    n.toLocaleString("es-AR", { style: "currency", currency: "ARS", maximumFractionDigits: 0 });

  const data = editing ? form : prices;

  return (
    <main className="px-40 tablet:px-20 mobile:px-10 mobile:pt-12 flex flex-col items-center mt-[6vw]">

      {msg && (
        <div className={`admin-toast ${msg.ok ? "admin-toast--ok" : "admin-toast--err"}`}>
          {msg.text}
        </div>
      )}

      <header className="w-full flex justify-between items-center  pb-4">
        <div>
          <p className="text-sm mobile:text-xs text-gray-500">Panel de administración</p>
          <h1 className="text-2xl mobile:text-xl font-bold uppercase">Configuración de Precios</h1>
        </div>
        <div className="w-1/4 flex justify-end gap-4">
          {!editing ? (
            <button className="w-1/2 mobile:w-full uppercase border cursor-pointer h-12 hover:bg-pinky!  transition-all duration-300" onClick={() => setEditing(true)}>
              Editar precios
            </button>
          ) : (
            <>
              <button className="w-1/2 mobile:w-full uppercase bg-black text-white! border cursor-pointer h-12 hover:bg-pinky!  transition-all duration-300" onClick={handleCancel} disabled={saving}>
                Cancelar
              </button>
              <button className="w-1/2 mobile:w-full uppercase border cursor-pointer h-12 hover:bg-pinky!  transition-all duration-300" onClick={handleSave} disabled={saving}>
                {saving ? "Guardando..." : "Guardar cambios"}
              </button>
            </>
          )}
        </div>
      </header>

      {/* Valores base */}
      <section className="mt-4 w-full flex flex-col gap-4 border bg-white p-4 shadow-md">
        <h2 className="text-lg! font-bold uppercase">Valores base</h2>
        <div className="w-full flex mobile:flex-col mobile:gap-4 justify-between">

          <div className="flex-1 flex flex-col gap-1 mobile:gap-0 mobile:border-b mobile:border-main/20 mobile:pb-4">
            <label className="text-sm! mobile:text-xs text-gray-500 uppercase">Costo pantalla por color</label>
            {editing ? (
              <input type="number"
                value={form.costoPantallaPorColor}
                onChange={(e) => setBase("costoPantallaPorColor", Number(e.target.value))} />
            ) : (
              <p className="text-lg! mobile:text-base! font-bold">{fmt(data.costoPantallaPorColor)}</p>
            )}
            <span className="text-xs! text-gray-500">Costo fijo por color, por trabajo</span>
          </div>

          <div className="flex-1 flex flex-col gap-1 mobile:gap-0 mobile:border-b mobile:border-main/20 mobile:">
            <label className="text-sm! mobile:text-xs text-gray-500 uppercase">Costo tinta por color por copia</label>
            {editing ? (
              <input type="number"
                value={form.costoPorColorPorCopia}
                onChange={(e) => setBase("costoPorColorPorCopia", Number(e.target.value))} />
            ) : (
              <p className="text-lg! mobile:text-base! font-bold">{fmt(data.costoPorColorPorCopia)}</p>
            )}
            <span className="text-xs! text-gray-500">Base sobre superficie ≤100 cm²</span>
          </div>

          <div className="flex-1 flex flex-col gap-1 mobile:gap-0">
            <label className="text-sm! mobile:text-xs text-gray-500 uppercase">Margen de ganancia</label>
            {editing ? (
              <input type="number" step="0.01"
                value={form.margenGanancia}
                onChange={(e) => setBase("margenGanancia", Number(e.target.value))} />
            ) : (
              <p className="text-lg! mobile:text-base! font-bold">
                ×{data.margenGanancia}{" "}
                <span className="text-xs! text-gray-500 bg-greeny px-2 py-1 rounded-md">
                  {Math.round((data.margenGanancia - 1) * 100)}% ganancia
                </span>
              </p>
            )}
            <span className="text-xs! text-gray-500">Factor sobre el subtotal (1.4 = 40%)</span>
          </div>

        </div>
      </section>

      {/* Soportes */}
      <section className="mt-4 w-full flex flex-col gap-0 border bg-white p-4 shadow-md">
        <h2 className="text-lg! font-bold uppercase">Multiplicadores por soporte</h2>
        <p className="text-xs! text-gray-500">Tela es la base (×1.0).</p>
        <table className="w-full mt-2">
          <thead className="border-b border-main/20">
            <tr>
              <th className="text-left text-gray-500! uppercase font-normal py-3 px-2 mobile:text-xs">Material</th>
              <th className="text-left text-gray-500! uppercase font-normal py-3 px-2 mobile:text-xs">Multiplicador</th>
            </tr>
          </thead>
          <tbody>
            {data.soportes.map((s, i) => (
              <tr key={s.nombre} className="border-b border-main/20 last:border-b-0">
                <td className="text-left p-2 mobile:text-xs">{s.nombre}</td>
                <td className="p-2">
                  {editing ? (
                    <input
                      type="number"
                      step="0.1"
                      value={form.soportes[i].multiplicador}
                      onChange={(e) => setSoporte(i, Number(e.target.value))}
                      className="w-28 mobile:w-20"
                    />
                  ) : (
                    <span className="mobile:text-xs font-medium">×{s.multiplicador.toFixed(1)}</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {/* Factores tamaño */}
      <section className="mt-4 w-full flex flex-col gap-0 border bg-white p-4 shadow-md">
        <h2 className="text-lg! font-bold uppercase">Factores por tamaño</h2>
        <p className="text-xs! text-gray-500">Escalan el costo de tinta según la superficie en cm².</p>
        <table className="w-full mt-2">
          <thead className="border-b border-main/20">
            <tr>
              <th className="text-left text-gray-500! uppercase font-normal py-3 px-2 mobile:text-xs">Rango</th>
              <th className="text-left text-gray-500! uppercase font-normal py-3 px-2 mobile:text-xs">Hasta cm²</th>
              <th className="text-left text-gray-500! uppercase font-normal py-3 px-2 mobile:text-xs">Factor</th>
            </tr>
          </thead>
          <tbody>
            {data.factoresTamanio.map((r, i) => (
              <tr key={i} className="border-b border-main/20 last:border-b-0">
                <td className="text-left p-2 mobile:text-xs">{r.label}</td>
                <td className="p-2">
                  {editing ? (
                    <input
                      type="number"
                      value={form.factoresTamanio[i].hastaCm2}
                      onChange={(e) => setRango(i, "hastaCm2", Number(e.target.value))}
                      className="w-24 mobile:w-16"
                    />
                  ) : (
                    <span className="mobile:text-xs">{r.hastaCm2 >= 99999 ? "∞" : r.hastaCm2}</span>
                  )}
                </td>
                <td className="p-2">
                  {editing ? (
                    <input
                      type="number"
                      step="0.1"
                      value={form.factoresTamanio[i].factor}
                      onChange={(e) => setRango(i, "factor", Number(e.target.value))}
                      className="w-24 mobile:w-16"
                    />
                  ) : (
                    <span className="mobile:text-xs">×{r.factor.toFixed(1)}</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
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