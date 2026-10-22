// ── Tipos ────────────────────────────────────────────────────────────────────

export interface PricesConfig {
    costoPantallaPorColor: number;
    costoPorColorPorCopia: number;
    margenGanancia: number;
    soportes: { nombre: string; multiplicador: number }[];
    factoresTamanio: { hastaCm2: number; factor: number; label: string }[];
  }
  
  export interface DatosFormulario {
    soporte: string;
    medida: string;
    cantidadColores: string;
    cantidad: string;
  }
  
  export interface ResultadoPresupuesto {
    costoPantallas: number;
    costoTintaTotal: number;
    subtotal: number;
    total: number;
    desglose: {
      copias: number;
      colores: number;
      areaCm2: number;
      labelTamanio: string;
      soporte: string;
      multiplicadorSoporte: number;
      factorTamanio: number;
      costoPorPantalla: number;
      costoPorColorPorCopia: number;
    };
  }
  
  // ── Helpers ──────────────────────────────────────────────────────────────────
  
  function parsearAreaCm2(medida: string): number {
    const str = medida.trim().toLowerCase().replace(/\s/g, "");
  
    const matchDim = str.match(/^(\d+(?:\.\d+)?)x(\d+(?:\.\d+)?)$/);
    if (matchDim) return parseFloat(matchDim[1]) * parseFloat(matchDim[2]);
  
    const matchArea = str.match(/^(\d+(?:\.\d+)?)$/);
    if (matchArea) return parseFloat(matchArea[1]);
  
    throw new Error(
      `Formato de medida no reconocido: "${medida}". Usá "20x30" o el área en cm².`
    );
  }
  
  function obtenerFactorTamanio(
    areaCm2: number,
    rangos: PricesConfig["factoresTamanio"]
  ): { factor: number; label: string } {
    const rango = rangos.find((r) => areaCm2 <= r.hastaCm2);
    const fallback = rangos[rangos.length - 1];
    return rango ?? fallback;
  }
  
  // ── Cálculo principal ────────────────────────────────────────────────────────
  
  /**
   * Calcula el presupuesto total.
   * @param datos  - Datos del formulario
   * @param prices - Configuración de precios obtenida desde la DB (ver lib/pricesActions.ts)
   */
  export function budgetCalculation(
    datos: DatosFormulario,
    prices: PricesConfig
  ): ResultadoPresupuesto {
    const colores = parseInt(datos.cantidadColores, 10);
    const copias = parseInt(datos.cantidad, 10);
  
    if (isNaN(colores) || colores < 1 || colores > 5)
      throw new Error("La cantidad de colores debe ser un número entre 1 y 5.");
    if (isNaN(copias) || copias < 1)
      throw new Error("La cantidad de copias debe ser un número mayor a 0.");
  
    const areaCm2 = parsearAreaCm2(datos.medida);
    const { factor: factorTamanio, label: labelTamanio } = obtenerFactorTamanio(
      areaCm2,
      prices.factoresTamanio
    );
  
    const soporteConfig = prices.soportes.find((s) => s.nombre === datos.soporte);
    if (!soporteConfig)
      throw new Error(`Soporte no reconocido: "${datos.soporte}".`);
  
    const { multiplicador: multiplicadorSoporte } = soporteConfig;
  
    const costoPantallas = prices.costoPantallaPorColor * colores;
    const costoTintaTotal =
      prices.costoPorColorPorCopia * colores * factorTamanio * multiplicadorSoporte * copias;
  
    const subtotal = costoPantallas + costoTintaTotal;
    const total = Math.ceil(subtotal * prices.margenGanancia);
  
    return {
      costoPantallas,
      costoTintaTotal: Math.ceil(costoTintaTotal),
      subtotal: Math.ceil(subtotal),
      total,
      desglose: {
        copias,
        colores,
        areaCm2,
        labelTamanio,
        soporte: datos.soporte,
        multiplicadorSoporte,
        factorTamanio,
        costoPorPantalla: prices.costoPantallaPorColor,
        costoPorColorPorCopia: prices.costoPorColorPorCopia,
      },
    };
  }