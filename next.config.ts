import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // lib/priceSuggestions.ts lee el CSV con fs en runtime; sin esto no se incluye en el deploy
  outputFileTracingIncludes: {
    "/admin/prices": ["./lib/data/**/*"],
  },
};

export default nextConfig;
