/**
 * Quita `/comision` del sitio publicado.
 *
 * La página lleva `robots: { index: false }`, pero eso solo le pide a los
 * buscadores que no la listen: cualquiera con el enlace la abre igual, y ahí
 * está el desglose cotizado hotel por hotel. En un sitio estático no hay
 * sesión que la proteja, así que la única forma real de cerrarla es que no
 * salga en el build.
 *
 * Sigue disponible en local con `pnpm dev`, que no toca `out/`.
 *
 * Para publicarla a propósito —una revisión con la comisión, por ejemplo—:
 *
 *   INCLUIR_COMISION=1 pnpm build
 */

import { existsSync, rmSync } from "node:fs";
import { join } from "node:path";

const RAIZ = new URL("..", import.meta.url).pathname;
const SALIDA = join(RAIZ, "out");

if (process.env.INCLUIR_COMISION === "1") {
  console.log("comision: se publica (INCLUIR_COMISION=1)");
  process.exit(0);
}

if (!existsSync(SALIDA)) {
  console.error(`comision: no existe ${SALIDA}. ¿Corrió \`next build\`?`);
  process.exit(1);
}

const objetivos = ["comision.html", "comision.txt", "comision"];
const quitados = [];

for (const nombre of objetivos) {
  const ruta = join(SALIDA, nombre);
  if (existsSync(ruta)) {
    rmSync(ruta, { recursive: true, force: true });
    quitados.push(nombre);
  }
}

if (quitados.length === 0) {
  // Si Next cambia cómo nombra las rutas exportadas, esto deja de borrar sin
  // avisar y la página se publica. Mejor romper el build que publicarla.
  console.error(
    "comision: no se encontró ninguna ruta que quitar. Revisar cómo quedó " +
      "nombrada en `out/` antes de publicar.",
  );
  process.exit(1);
}

console.log(`comision: fuera del build (${quitados.join(", ")})`);
