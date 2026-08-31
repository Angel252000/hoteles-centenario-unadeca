import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Sitio estático: `pnpm build` deja HTML/CSS/JS listos en `out/`.
  output: "export",
  images: {
    // El export estático no lleva servidor de optimización de imágenes.
    unoptimized: true,
    // Calidades que usan la galería (90) y el visor a pantalla completa (95).
    qualities: [75, 90, 95],
  },
};

export default nextConfig;
