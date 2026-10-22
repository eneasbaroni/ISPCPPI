import { readFile } from "fs/promises";
import path from "path";
import { SOPORTES } from "@/app/presupuesto/constants";

// ── Tipos ────────────────────────────────────────────────────────────────────

interface CotizacionRow {
  insumo: string;
  categoria: string;
  parametroRelacionado: string;
  precioArs: number;
  proveedor: string;
}

export interface Agregado {
  valor: number;
  metodo: "media" | "mediana";
  cotizaciones: number;
}

export interface SugerenciasPrecios {
  costoPantallaPorColor: Agregado;
  costoPorColorPorCopia: Agregado;
  soportes: Record<string, Agregado & { multiplicadorSugerido: number }>;
  fuente: string;
}

// ── Helpers estadísticos (misma lógica que la Evidencia 2) ────────────────────

function media(valores: number[]): number {
  return valores.reduce((a, b) => a + b, 0) / valores.length;
}

function mediana(valores: number[]): number {
  const ordenado = [...valores].sort((a, b) => a - b);
  const mid = Math.floor(ordenado.length / 2);
  return ordenado.length % 2 === 0
    ? (ordenado[mid - 1] + ordenado[mid]) / 2
    : ordenado[mid];
}

function desvioEstandar(valores: number[], prom: number): number {
  const varianza = valores.reduce((acc, v) => acc + (v - prom) ** 2, 0) / valores.length;
  return Math.sqrt(varianza);
}

/**
 * Igual que en la Evidencia 2: si el coeficiente de variación (desvío/promedio)
 * supera el 50%, se usa la mediana en vez del promedio para no dejar que un
 * solo proveedor (típicamente uno importador, en USD) distorsione la sugerencia.
 */
function agregar(valores: number[]): Agregado {
  const prom = media(valores);
  const desvio = desvioEstandar(valores, prom);
  const coefVariacion = prom === 0 ? 0 : desvio / prom;
  const altaDispersion = coefVariacion > 0.5;
  return {
    valor: Math.round(altaDispersion ? mediana(valores) : prom),
    metodo: altaDispersion ? "mediana" : "media",
    cotizaciones: valores.length,
  };
}

// ── Parseo del CSV limpio de proveedores ───────────────────────────────────────

function parseCsv(contenido: string): CotizacionRow[] {
  const [headerLine, ...lines] = contenido.trim().split(/\r?\n/);
  const headers = headerLine.split(",");
  const idx = (col: string) => headers.indexOf(col);

  return lines
    .filter((l) => l.trim().length > 0)
    .map((line) => {
      const cols = line.split(",");
      return {
        insumo: cols[idx("insumo")],
        categoria: cols[idx("categoria")],
        parametroRelacionado: cols[idx("parametro_relacionado")],
        precioArs: Number(cols[idx("precio_ars")]),
        proveedor: cols[idx("proveedor")],
      };
    });
}

// Tag usado en el CSV ("DTF") -> nombre real del soporte en el sistema
// ("DTF (Direct transfer to film)"), definido en app/presupuesto/constants.ts
function resolverNombreSoporte(tag: string): string | undefined {
  return SOPORTES.find((s) => s === tag || s.startsWith(tag));
}

// ── Cálculo de sugerencias ──────────────────────────────────────────────────

export async function calcularSugerenciasPrecios(): Promise<SugerenciasPrecios> {
  const ruta = path.join(process.cwd(), "lib", "data", "proveedores_insumos.csv");
  const contenido = await readFile(ruta, "utf-8");
  const filas = parseCsv(contenido);

  // costoPantallaPorColor: suma de los promedios de cada insumo de pantalla
  // (emulsión, marco, revelador — son tres consumibles que se usan en conjunto)
  const filasPantalla = filas.filter((f) => f.parametroRelacionado === "costoPantallaPorColor");
  const insumosPantalla = [...new Set(filasPantalla.map((f) => f.insumo))];
  const promedioPorInsumoPantalla = insumosPantalla.map((insumo) =>
    media(filasPantalla.filter((f) => f.insumo === insumo).map((f) => f.precioArs))
  );
  const costoPantallaPorColor: Agregado = {
    valor: Math.round(promedioPorInsumoPantalla.reduce((a, b) => a + b, 0)),
    metodo: "media",
    cotizaciones: filasPantalla.length,
  };

  // costoPorColorPorCopia: mediana de las tintas de aplicación (se excluye el
  // solvente/removedor, que no es un insumo de aplicación directa)
  const filasTinta = filas.filter(
    (f) => f.parametroRelacionado === "costoPorColorPorCopia" && f.insumo !== "Solvente / removedor de tinta"
  );
  const costoPorColorPorCopia = agregar(filasTinta.map((f) => f.precioArs));

  // multiplicador por soporte: agregado propio / agregado de Tela (la base, ×1.0)
  const tags = [...new Set(
    filas
      .filter((f) => f.parametroRelacionado.startsWith("multiplicador_soporte:"))
      .map((f) => f.parametroRelacionado.split(":")[1])
  )];

  const agregadosPorTag = new Map<string, Agregado>();
  for (const tag of tags) {
    const valores = filas
      .filter((f) => f.parametroRelacionado === `multiplicador_soporte:${tag}`)
      .map((f) => f.precioArs);
    agregadosPorTag.set(tag, agregar(valores));
  }
  const baseTela = agregadosPorTag.get("Tela")?.valor ?? 1;

  const soportes: SugerenciasPrecios["soportes"] = {};
  for (const tag of tags) {
    const nombre = resolverNombreSoporte(tag);
    if (!nombre) continue;
    const agregado = agregadosPorTag.get(tag)!;
    soportes[nombre] = {
      ...agregado,
      multiplicadorSugerido: Math.round((agregado.valor / baseTela) * 100) / 100,
    };
  }

  return {
    costoPantallaPorColor,
    costoPorColorPorCopia,
    soportes,
    fuente: "Cotizaciones de 5 proveedores (dataset de la Evidencia 2 — Práctica Profesionalizante)",
  };
}
