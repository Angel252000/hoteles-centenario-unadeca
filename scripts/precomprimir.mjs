/**
 * Escribe una copia `.br` y `.gz` de cada archivo de texto de `out/`.
 *
 * Netlify comprimía solo; un servidor propio no. La diferencia no es menor:
 * la portada pesa 189 KB en crudo y 10.8 KB con Brotli. Servirla sin
 * comprimir son diecisiete veces más datos móviles por visita, y en la
 * pantalla se ve exactamente igual, así que nadie lo nota.
 *
 * Se comprime acá, una vez al publicar, y no en cada pedido: los tres
 * servidores saben servir el archivo ya comprimido sin gastar CPU
 * (`brotli_static` y `gzip_static` en nginx, `precompressed` en Caddy,
 * `mod_rewrite` en Apache). Ver `deploy/`.
 *
 *   node scripts/precomprimir.mjs
 *
 * Corre solo, al final de `pnpm build`.
 */

import { brotliCompressSync, gzipSync, constants } from "node:zlib";
import {
  readdirSync,
  readFileSync,
  rmSync,
  statSync,
  writeFileSync,
} from "node:fs";
import { extname, join } from "node:path";

const RAIZ = new URL("..", import.meta.url).pathname;
const SALIDA = join(RAIZ, "out");

/*
  Basura de macOS que no tiene por que viajar al servidor.

  `.DS_Store` guarda como se ven las carpetas en el Finder, y de paso la lista
  de archivos que hay dentro. Publicado, le regala a cualquiera el inventario
  de un directorio —incluidos archivos que no estan enlazados desde ninguna
  pagina—. No es un agujero, pero es informacion que se da gratis y no cuesta
  nada no darla. Ver §21 de docs/MEJORAS.md.
*/
const BASURA = new Set([".DS_Store", "Thumbs.db", "desktop.ini"]);

/** Lo que comprime bien. Las fotos ya vienen comprimidas: volver a pasarlas
 *  las deja más grandes. */
const EXTENSIONES = new Set([
  ".html",
  ".css",
  ".js",
  ".mjs",
  ".json",
  ".svg",
  ".txt",
  ".xml",
  ".webmanifest",
  ".map",
]);

/** Debajo de 1 KB el ahorro es de bytes y el archivo extra cuesta un `stat`
 *  por pedido. No vale la pena. */
const MINIMO = 1024;

function* recorrer(dir) {
  for (const entrada of readdirSync(dir)) {
    const ruta = join(dir, entrada);
    // Se borra al pasar, no en una segunda vuelta: ya estamos parados encima.
    if (BASURA.has(entrada)) {
      rmSync(ruta, { force: true });
      borrados += 1;
      continue;
    }
    if (statSync(ruta).isDirectory()) yield* recorrer(ruta);
    else yield ruta;
  }
}

let borrados = 0;
let archivos = 0;
let crudo = 0;
let comprimido = 0;

for (const ruta of recorrer(SALIDA)) {
  const ext = extname(ruta);
  if (!EXTENSIONES.has(ext)) continue;
  if (ext === ".br" || ext === ".gz") continue;

  const datos = readFileSync(ruta);
  if (datos.length < MINIMO) continue;

  const br = brotliCompressSync(datos, {
    params: {
      [constants.BROTLI_PARAM_QUALITY]: 11,
      [constants.BROTLI_PARAM_SIZE_HINT]: datos.length,
    },
  });
  const gz = gzipSync(datos, { level: 9 });

  writeFileSync(`${ruta}.br`, br);
  writeFileSync(`${ruta}.gz`, gz);

  archivos += 1;
  crudo += datos.length;
  comprimido += br.length;
}

const kb = (n) => `${(n / 1024).toFixed(0)} KB`;

if (archivos === 0) {
  console.error("precomprimir: no se encontró ningún archivo de texto en out/");
  process.exit(1);
}

console.log(
  (borrados ? `precomprimir: ${borrados} archivo(s) de basura del sistema borrados\n` : "") +
  `precomprimir: ${archivos} archivos, ${kb(crudo)} a ${kb(comprimido)} ` +
    `con Brotli (${((1 - comprimido / crudo) * 100).toFixed(0)}% menos)`,
);
