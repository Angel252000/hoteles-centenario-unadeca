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
import { mkdirSync, readdirSync, rmSync, statSync, writeFileSync } from "node:fs";
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
  /*
    Las fotos de hotel suben de q50/q75 a q65/q82 el 19 de septiembre de 2026.

    Razon: nueve de los diez hoteles mandaron originales de menos de 800 px
    —hay varios de 375—, y en una imagen chica los artefactos de compresion se
    notan MAS, porque hay menos pixeles donde esconderlos. Aplicarles q50, que
    esta pensado para fotos grandes, era el peor caso posible.

    Cuesta unos 8 KB por foto chica, sobre originales que pesan 36 KB enteros.
    Barato justamente porque son chicas.

    No se sube a q72: la diferencia a ojo con q65 es minima y casi duplica el
    peso de Hampton Inn, el unico que si mando fotos de 1600 px.

    Esto NO arregla la resolucion. Una foto de 375 px se vera blanda en una
    pantalla retina haga lo que haga el compresor. La mejora de verdad es
    pedir fotos nuevas. Ver §22 de docs/MEJORAS.md.
  */
  "public/hoteles": { avif: 65, webp: 82 },
};

const calidadDe = (ruta) =>
  Object.entries(CALIDAD_POR_CARPETA).find(([c]) => ruta.startsWith(c))?.[1] ??
  CALIDAD;

/**
 * `effort` es cuanto piensa el compresor antes de escribir. AVIF trae 4 de 9
 * por defecto y WebP 4 de 6; subirlos entrega el mismo pixel en menos bytes.
 *
 * Se paga en tiempo de build, no en el navegador, y este script se corre a
 * mano cuando llegan fotos nuevas. Es el intercambio mas barato que hay acá:
 * es lo que financia la variante de ancho nativo que agrega §25.
 */
const opcionesDe = (formato, quality) =>
  formato === "avif" ? { quality, effort: 7 } : { quality, effort: 6 };

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

    /*
      Nunca ampliar: una foto de 375px no gana nada estirada a 800, y el
      archivo resultante pesa más que el original para verse peor.

      Pero tampoco desperdiciar. Hasta §25 esto era solo el `filter`, y un
      original de 750 px —que no llega al escalón de 800— salía publicado con
      una unica variante de 400: se tiraban 350 px que el hotel si habia
      mandado. En la parrilla esa foto se pide a ~860 px en pantalla retina y
      se ampliaba al doble desde 400. De ahi el aspecto blando, que ninguna
      calidad de compresion arregla porque los pixeles no estan en el archivo.

      Ahora el ancho nativo entra en la escala siempre que no coincida ya con
      un escalon. El `srcset` sigue dejando que el telefono baje la de 400.
    */
    const anchos = anchosDe(ruta).filter((a) => a <= meta.width);
    /*
      Un 15% de margen antes de agregar el nativo. `tucan/06` mide 402 px:
      una variante de 402 al lado de la de 400 son dos archivos mas para dos
      pixeles de diferencia, que nadie ve. Con originales de 500 px o mas —el
      resto— la diferencia si se nota.
    */
    const mayor = anchos.at(-1) ?? 0;
    if (meta.width >= mayor * 1.15) anchos.push(meta.width);
    if (anchos.length === 0) anchos.push(meta.width);
    anchos.sort((a, b) => a - b);

    // `public/hoteles/tucan/03.jpg` -> `/opt/hoteles/tucan/03`
    const base = relative("public", ruta).replace(extname(ruta), "");
    mkdirSync(join(RAIZ, SALIDA, dirname(base)), { recursive: true });

    for (const ancho of anchos) {
      for (const [formato, calidad] of Object.entries(calidadDe(ruta))) {
        const destino = join(RAIZ, SALIDA, `${base}-${ancho}.${formato}`);
        /*
          Enfoque suave, y solo donde hubo reduccion de verdad.

          Bajar de 750 a 400 remuestrea y eso ablanda los bordes; medio punto
          de `sharpen` lo compensa sin que se note el filtro. En la variante de
          ancho nativo no se toca: no hubo remuestreo, y enfocar una foto que
          no se redujo solo agrega halo alrededor de los contornos y ruido en
          las paredes lisas —que ademas pesa mas—. Ver §25 de MEJORAS.md.
        */
        const reduce = ancho < meta.width;
        const pipeline = sharp(absoluta).resize({
          width: ancho,
          withoutEnlargement: true,
        });
        if (reduce) pipeline.sharpen({ sigma: 0.6 });
        const buffer = await pipeline[formato](opcionesDe(formato, calidad)).toBuffer();
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

/*
  Barrido de huerfanas.

  Las variantes se escriben por nombre, asi que cambiar la escala de anchos no
  borra lo anterior: queda un archivo que ya nadie declara en el `srcset` pero
  que igual viaja al servidor y aparece en los respaldos. Paso con §25, que
  agrego y despues quito el ancho de `tucan/06`.
*/
const declaradas = new Set(
  Object.entries(variantes).flatMap(([src, v]) =>
    v.anchos.flatMap((a) =>
      Object.keys(CALIDAD).map((f) =>
        join(RAIZ, SALIDA, `${src.replace(/\.[^.]+$/, "")}-${a}.${f}`),
      ),
    ),
  ),
);

let huerfanas = 0;
function barrer(dir) {
  for (const entrada of readdirSync(dir)) {
    const ruta = join(dir, entrada);
    if (statSync(ruta).isDirectory()) barrer(ruta);
    else if (/\.(avif|webp)$/.test(entrada) && !declaradas.has(ruta)) {
      rmSync(ruta);
      huerfanas++;
    }
  }
}
barrer(join(RAIZ, SALIDA));
if (huerfanas) console.log(`${huerfanas} variantes huerfanas borradas`);

const mb = (b) => (b / 1048576).toFixed(2);
console.log(`${Object.keys(variantes).length} fotos, ${generados} variantes generadas`);
console.log(`originales: ${mb(pesoOriginal)} MB   variantes: ${mb(pesoGenerado)} MB`);
console.log("manifiesto: src/lib/imagen-variantes.ts");
