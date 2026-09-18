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
const ORIGEN = ["public/hoteles", "public/marca", "public/centenario"];
const SALIDA = "public/opt";

/**
 * Tres anchos, no cinco. Cubren teléfono (400), tablet y la mitad del mosaico
 * en escritorio (800), y el visor a pantalla completa (1600). Más escalones
 * multiplican archivos para ahorrar kilobytes que nadie nota.
 */
const ANCHOS = [400, 800, 1600];

/**
 * Las piezas del Centenario llevan un cuarto escalón, 1999. Miden exactamente
 * eso y van a ancho completo de pantalla, así que en un monitor grande —o en
 * cualquier pantalla retina— el 1600 se tiene que ampliar y el titular, que
 * está quemado en la imagen, se ve blando.
 *
 * Va por carpeta y no global porque el logo de UNADECA mide 3088 px y también
 * alcanzaría el escalón, pero nunca lo baja: su `sizes` lo topa en 282 px de
 * ancho. Serían 155 KB versionados que ningún navegador pide.
 */
const ANCHOS_POR_CARPETA = {
  "public/centenario": [400, 800, 1600, 1999],
};

const anchosDe = (ruta) =>
  Object.entries(ANCHOS_POR_CARPETA).find(([c]) => ruta.startsWith(c))?.[1] ??
  ANCHOS;

/**
 * AVIF a 50 y WebP a 75 dan calidades parecidas a ojo. Si alguna foto muestra
 * bandeo en una pared lisa, subir la suya a 60 antes que mover el número de
 * todas.
 */
const CALIDAD = { avif: 50, webp: 75 };

/**
 * Las piezas del Centenario van más arriba, y no es capricho: son las únicas
 * que llevan **texto quemado en el pixel**. Una foto de hotel a q50 pierde
 * detalle en una pared lisa y nadie lo nota; una letra a q50 agarra el halo
 * típico de la compresión con pérdida alrededor del contorno, y ahí sí se ve,
 * porque el ojo sabe exactamente qué forma tendría que tener una A.
 *
 * Suben de q50/q75 a q72/q88. Cuesta unos 40 KB por variante —de 42 a 83 KB en
 * AVIF— sobre un original de 690 KB; son las cinco imágenes de la primera
 * pantalla del sitio y valen ese presupuesto.
 *
 * La clave es el prefijo de la carpeta, no el archivo: si mañana entra una
 * pieza nueva a `public/centenario`, hereda la calidad sin tocar nada.
 */
const CALIDAD_POR_CARPETA = {
  "public/centenario": { avif: 72, webp: 88 },
};

const calidadDe = (ruta) =>
  Object.entries(CALIDAD_POR_CARPETA).find(([c]) => ruta.startsWith(c))?.[1] ??
  CALIDAD;

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
    const anchos = anchosDe(ruta).filter((a) => a <= meta.width);
    if (anchos.length === 0) anchos.push(meta.width);

    // `public/hoteles/tucan/03.jpg` -> `/opt/hoteles/tucan/03`
    const base = relative("public", ruta).replace(extname(ruta), "");
    mkdirSync(join(RAIZ, SALIDA, dirname(base)), { recursive: true });

    for (const ancho of anchos) {
      for (const [formato, calidad] of Object.entries(calidadDe(ruta))) {
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
