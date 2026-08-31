/**
 * Genera las variantes de cada foto: AVIF y WebP en varios anchos.
 *
 * El export estático apaga el optimizador de imágenes de Next, así que el
 * sitio no tiene quién le genere `srcset`. Esto lo hace acá, una vez, y deja
 * los archivos en `public/opt/` para que el build no dependa de `sharp`.
 *
 *   node scripts/optimizar-imagenes.mjs
 *
 * Se corre a mano cuando llegan fotos nuevas, no en cada publicación. Al
 * terminar reescribe `src/lib/imagen-variantes.ts`, que es de donde el
 * componente `<Foto>` saca qué anchos existen para cada foto: declarar en un
 * `srcset` una variante que no se generó es peor que no declarar ninguna.
 */

import sharp from "sharp";
import { mkdirSync, readdirSync, statSync, writeFileSync } from "node:fs";
import { dirname, extname, join, relative } from "node:path";

const RAIZ = new URL("..", import.meta.url).pathname;
const ORIGEN = ["public/hoteles", "public/marca"];
const SALIDA = "public/opt";

/**
 * Tres anchos, no cinco. Cubren teléfono (400), tablet y la mitad del mosaico
 * en escritorio (800), y el visor a pantalla completa (1600). Más escalones
 * multiplican archivos para ahorrar kilobytes que nadie nota.
 */
const ANCHOS = [400, 800, 1600];

/**
 * AVIF a 50 y WebP a 75 dan calidades parecidas a ojo. Si alguna foto muestra
 * bandeo en una pared lisa, subir la suya a 60 antes que mover el número de
 * todas.
 */
const CALIDAD = { avif: 50, webp: 75 };

const esImagen = (f) => /\.(jpe?g|png)$/i.test(f);

function* recorrer(dir) {
  for (const entrada of readdirSync(join(RAIZ, dir))) {
    const ruta = join(dir, entrada);
    if (statSync(join(RAIZ, ruta)).isDirectory()) yield* recorrer(ruta);
    else if (esImagen(entrada)) yield ruta;
  }
}

const variantes = {};
let pesoOriginal = 0;
let pesoGenerado = 0;
let generados = 0;

for (const dir of ORIGEN) {
  for (const ruta of recorrer(dir)) {
    const absoluta = join(RAIZ, ruta);
    const meta = await sharp(absoluta).metadata();
    pesoOriginal += statSync(absoluta).size;

    // Nunca ampliar: una foto de 375px no gana nada estirada a 800, y el
    // archivo resultante pesa más que el original para verse peor.
    const anchos = ANCHOS.filter((a) => a <= meta.width);
    if (anchos.length === 0) anchos.push(meta.width);

    // `public/hoteles/tucan/03.jpg` -> `/opt/hoteles/tucan/03`
    const base = relative("public", ruta).replace(extname(ruta), "");
    mkdirSync(join(RAIZ, SALIDA, dirname(base)), { recursive: true });

    for (const ancho of anchos) {
      for (const [formato, calidad] of Object.entries(CALIDAD)) {
        const destino = join(RAIZ, SALIDA, `${base}-${ancho}.${formato}`);
        const buffer = await sharp(absoluta)
          .resize({ width: ancho, withoutEnlargement: true })
          [formato]({ quality: calidad })
          .toBuffer();
        writeFileSync(destino, buffer);
        pesoGenerado += buffer.length;
        generados++;
      }
    }

    variantes[`/${relative("public", ruta)}`] = {
      ancho: meta.width,
      alto: meta.height,
      anchos,
    };
  }
}

const manifiesto = `/**
 * Generado por \`scripts/optimizar-imagenes.mjs\`. No editar a mano.
 *
 * Para cada foto: sus dimensiones nativas y los anchos que existen de verdad
 * en \`public/opt\`. El componente \`<Foto>\` arma el \`srcset\` con esto.
 */
export type Variante = { ancho: number; alto: number; anchos: number[] };

export const variantes: Record<string, Variante> = ${JSON.stringify(variantes, null, 2)};

/** Datos de variantes de una foto, o \`null\` si nunca se optimizó. */
export function varianteDe(src: string): Variante | null {
  return variantes[src] ?? null;
}
`;

writeFileSync(join(RAIZ, "src/lib/imagen-variantes.ts"), manifiesto);

const mb = (b) => (b / 1048576).toFixed(2);
console.log(`${Object.keys(variantes).length} fotos, ${generados} variantes generadas`);
console.log(`originales: ${mb(pesoOriginal)} MB   variantes: ${mb(pesoGenerado)} MB`);
console.log("manifiesto: src/lib/imagen-variantes.ts");
