import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Sitio estático: `pnpm build` deja HTML/CSS/JS listos en `out/`.
  output: "export",
  images: {
    // El export estático no lleva servidor de optimización de imágenes. Desde
    // la sección 13 el sitio ya no usa `next/image` —las fotos van por
    // `<picture>` en `src/components/ui/foto.tsx`—, así que esto solo queda
    // como red por si alguien vuelve a importarlo por descuido.
    unoptimized: true,
  },
};

export default nextConfig;
