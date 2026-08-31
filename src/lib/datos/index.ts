/**
 * Punto de entrada único de los datos.
 *
 * Los componentes importan siempre desde `@/lib/datos`, nunca de los archivos
 * de adentro: así se puede reacomodar el contenido sin tocar ni una pantalla.
 *
 * - `contenido.ts` — lo que se edita: hoteles, tarifas, contactos, evento.
 * - `tipos.ts` — la forma que deben cumplir esos datos.
 * - `calculos.ts` — precios derivados; no guardan nada, solo operan.
 */

export * from "./calculos";
export * from "./contenido";
export * from "./tipos";
