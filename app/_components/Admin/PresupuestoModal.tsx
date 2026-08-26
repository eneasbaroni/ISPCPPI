"use client";

import { useState } from "react";
import { updateEstado, PresupuestoDoc } from "@/lib/pricesActions";
import { Estado, ESTADO_STYLES } from "./constants";
import { fmt, fmtDate } from "./helpers";
import { motion } from "framer-motion";

// ── Helpers ───────────────────────────────────────────────────────────────────

const Field = ({ label, value }: { label: string; value: string }) => {
  return (
    <div>
      <p className="text-xs text-gray-400 uppercase">{label}</p>
      <p className="font-medium">{value}</p>
    </div>
  );
}

const Row = ({ label, value, bold }: { label: string; value: string; bold?: boolean }) => {
  return (
    <div className={`flex justify-between ${bold ? "font-bold text-base" : ""}`}>
      <span className="text-gray-600">{label}</span>
      <span>{value}</span>
    </div>
  );
}

const PresupuestoModal = ({
    doc,
    onClose,
  }: {
    doc: PresupuestoDoc;
    onClose: () => void;
  }) => {
    const [estado, setEstado] = useState<Estado>(doc.estado);
    const [saving, setSaving] = useState(false);
  
    const handleEstado = async (nuevoEstado: Estado) => {
      setSaving(true);
      setEstado(nuevoEstado);
      await updateEstado(doc._id, nuevoEstado);
      setSaving(false);
    };
  
    return (
      <div
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs"
        onClick={onClose}
      >
        <motion.div
          className="bg-white w-full max-w-2xl max-h-[90vh] overflow-y-auto p-8 shadow-xl"
          initial={{ scale: 0.7, y: '100dvh' }}
          animate={{ scale: 1, y: '0dvh' }}
          exit={{ scale: 0.7, y: '100dvh' }}
          transition={{ duration: 0.5, ease: [0.65, 0, 0.35, 1] }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header modal */}
          <div className="flex justify-between items-start mb-6">
            <div>
              <p className="text-xs text-gray-400 uppercase tracking-widest mb-1">Presupuesto</p>
              <h2 className="text-xl font-bold uppercase">
                {doc.nombre} {doc.apellido}
              </h2>
              <p className="text-sm text-gray-500">{fmtDate(doc.createdAt)}</p>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-black text-2xl leading-none cursor-pointer"
            >
              ✕
            </button>
          </div>
  
          {/* Estado */}
          <div className="mb-6">
            <p className="text-xs text-gray-500 uppercase tracking-widest mb-2">Estado</p>
            <div className="flex gap-2">
              {(["Pendiente", "Aceptado", "Rechazado"] as Estado[]).map((e) => (
                <button
                  key={e}
                  disabled={saving}
                  onClick={() => handleEstado(e)}
                  className={`px-4 py-1.5 text-sm border cursor-pointer transition-all duration-200 ${
                    estado === e
                      ? `${ESTADO_STYLES[e]} border-transparent font-semibold`
                      : "border-gray-300 text-gray-500 hover:border-gray-500"
                  }`}
                >
                  {e}
                </button>
              ))}
            </div>
          </div>
  
          <hr className="border-gray-200 mb-6" />
  
          {/* Datos del cliente */}
          <section className="mb-6">
            <p className="text-xs text-gray-500 uppercase tracking-widest mb-3">Datos del cliente</p>
            <div className="grid grid-cols-2 gap-3 text-sm">
              <Field label="Email"    value={doc.email} />
              <Field label="Teléfono" value={doc.telefono} />
            </div>
          </section>
  
          {/* Datos del trabajo */}
          <section className="mb-6">
            <p className="text-xs text-gray-500 uppercase tracking-widest mb-3">Trabajo</p>
            <div className="grid grid-cols-2 gap-3 text-sm">
              <Field label="Soporte"  value={doc.soporte} />
              <Field label="Medida"   value={`${doc.medida} cm`} />
              <Field label="Colores"  value={String(doc.cantidadColores)} />
              <Field label="Copias"   value={String(doc.cantidad)} />
            </div>
            <div className="mt-3">
              <Field label="Descripción" value={doc.descripcion} />
            </div>
          </section>
  
          {/* Desglose económico */}
          <section className="bg-gray-50 border border-gray-200 p-4">
            <p className="text-xs text-gray-500 uppercase tracking-widest mb-3">Desglose</p>
            <div className="flex flex-col gap-1 text-sm">
              <Row label="Pantallas"        value={fmt(doc.costoPantallas)} />
              <Row label="Tinta e impresión" value={fmt(doc.costoTintaTotal)} />
              <Row label="Subtotal"          value={fmt(doc.subtotal)} />
              <div className="border-t border-gray-300 mt-2 pt-2">
                <Row
                  label={`Total (margen ×${doc.preciosSnapshot.margenGanancia})`}
                  value={fmt(doc.total)}
                  bold
                />
              </div>
            </div>
          </section>
        </motion.div>
      </div>
    );
  }
  

export default PresupuestoModal

