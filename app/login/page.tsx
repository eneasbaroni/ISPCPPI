"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Grill from "../(index)/_components/grill/Grill";

export default function LoginPage() {
  const router = useRouter();
  const [form, setForm] = useState({ user: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        router.push("/admin");
      } else {
        setError("Usuario o contraseña incorrectos");
      }
    } catch {
      setError("Error al conectar con el servidor");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center">
      <Grill />
      <div className="w-full max-w-sm border bg-white p-8 shadow-md">
        <p className="text-xs text-gray-400 uppercase tracking-widest mb-1">Panel de administración</p>
        <h1 className="text-2xl font-bold uppercase mb-8">Iniciar sesión</h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <label className="text-xs text-gray-500 uppercase tracking-wide" htmlFor="user">
              Usuario
            </label>
            <input
              id="user"
              type="text"
              autoComplete="username"
              className="border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:border-black"
              value={form.user}
              onChange={(e) => setForm((f) => ({ ...f, user: e.target.value }))}
              required
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-xs text-gray-500 uppercase tracking-wide" htmlFor="password">
              Contraseña
            </label>
            <input
              id="password"
              type="password"
              autoComplete="current-password"
              className="border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:border-black"
              value={form.password}
              onChange={(e) => setForm((f) => ({ ...f, password: e.target.value }))}
              required
            />
          </div>

          {error && (
            <p className="text-xs text-red-600">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="mt-2 border border-black bg-black text-white! uppercase text-sm py-2 cursor-pointer hover:bg-greeny! transition-colors disabled:bg-gray-400 disabled:border-gray-400"
          >
            {loading ? "Ingresando..." : "Ingresar"}
          </button>
        </form>
      </div>
    </main>
  );
}