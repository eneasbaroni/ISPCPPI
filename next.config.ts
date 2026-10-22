import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Default de Next: 1 MB. Vercel corta todo request a 4.5 MB (no configurable), así que 4 MB es el máximo útil.
  experimental: {
    serverActions: {
      bodySizeLimit: "4mb",
    },
  },
  // lib/priceSuggestions.ts lee el CSV con fs en runtime; sin esto no se incluye en el deploy
  outputFileTracingIncludes: {
    "/admin/prices": ["./lib/data/**/*"],
  },
};

export default nextConfig;
