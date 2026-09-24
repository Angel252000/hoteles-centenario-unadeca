/** Cálculos derivados de las tarifas. No contienen datos: solo los operan. */

import { evento, niveles } from "./contenido";
import type { Habitacion, Hotel, Nivel } from "./tipos";

/**
 * Lo que cuesta una tarifa por toda la estadía, en su propia unidad.
 *
 * Ojo con qué devuelve: para `habitacion-noche` es la habitación entera las
 * cuatro noches; para `persona-noche` es UNA persona las cuatro noches. Son
 * dos cosas distintas y no se comparan entre sí — para comparar hoteles está
 * `costoDosPersonas`.
 */
export function totalTarifa(habitacion: Habitacion): number {
  return habitacion.precio * evento.noches;
}

/**
 * Las dos cifras que toda tarifa muestra desde el 22 de septiembre de 2026:
 * cuanto cuesta por noche y cuanto por las cuatro noches.
 *
 * Antes cada hotel se leia en su propia unidad y no habia forma de comparar
 * de un vistazo: seis cotizan por habitacion y cuatro por persona.
 *
 * Que hace con cada una:
 *
 * - `habitacion-noche`: la habitacion tal como el hotel la vende. No se
 *   multiplica nada. Una sencilla cuesta lo que cuesta una sencilla; decir
 *   que «por habitacion» son dos sencillas seria mentir sobre lo que se
 *   reserva.
 * - `persona-noche`: se muestra para DOS personas —dos veces la tarifa—,
 *   que es la canasta con la que el sitio compara hoteles desde §11. Un
 *   precio por cabeza al lado del total de una habitacion no se puede leer.
 *
 * La etiqueta viaja con las cifras a proposito: un numero sin decir a que
 * ocupacion corresponde es justo el error que esto viene a arreglar.
 */
export function tarifaMostrada(habitacion: Habitacion): {
  porNoche: number;
  total: number;
  etiqueta: string;
} {
  const veces = habitacion.unidad === "persona-noche" ? 2 : 1;
  const porNoche = habitacion.precio * veces;

  return {
    porNoche,
    total: porNoche * evento.noches,
    etiqueta:
      habitacion.unidad === "persona-noche"
        ? `2 personas, ${evento.noches} noches`
        : `la habitación, ${evento.noches} noches`,
  };
}

/**
 * Lo más barato que sale alojar a dos personas toda la estadía.
 *
 * Es la canasta con la que se comparan los hoteles entre sí, y existe porque
 * un «total de 4 noches» a secas no significa lo mismo en todos: cuatro
 * hoteles cobran por persona-noche y seis por habitación-noche. Sin
 * normalizar, los $240 de una habitación de La Guaria —que cubre dos
 * personas— quedarían al lado de los $112 de UNA persona en Park View como si
 * fueran lo mismo.
 *
 * Dos personas y no 84: el grupo real es de 84 y nadie reserva de a dos, pero
 * hace falta una canasta fija para que la comparación signifique algo, y el
 * reparto de las 84 todavía no está decidido. Ver la contra en `MEJORAS.md`.
 *
 * Devuelve también de qué tarifa salió: el mínimo a veces es un camarote en
 * dormitorio compartido —en Backpackers, $128 contra $240 de la privada—, y
 * el número solo, sin decir de dónde sale, engaña.
 */
export function costoDosPersonas(
  hotel: Hotel,
): { total: number; tarifa: Habitacion } | null {
  let mejor: { total: number; tarifa: Habitacion } | null = null;

  for (const h of hotel.habitaciones) {
    // Cuántas veces hay que pagar esta tarifa para sentar a dos personas: una
    // habitación que ya cubre dos alcanza sola; una sencilla o una tarifa por
    // persona se paga dos veces.
    const veces = h.unidad === "persona-noche" || h.personas < 2 ? 2 : 1;
    const total = h.precio * veces * evento.noches;

    if (!mejor || total < mejor.total) mejor = { total, tarifa: h };
  }

  return mejor;
}

/*
  Acá vivían `costoPorPersonaNoche` y `costoEstadia`, que normalizaban todo a
  «una persona, una noche» y a «una persona, la estadía». Se eliminaron el 26
  de agosto de 2026, cuando el precio pasó a mostrarse como la estadía de dos
  personas: quedaron sin un solo uso en las pantallas.

  Con ellas se cierra de otra forma la tarea 4 del plan —«corregir el precio
  desde que sesga la comparación»—. El sesgo era de la división: repartir una
  habitación entre las personas que cubre daba el número más chico posible y
  hacía parecer barato a cualquier hotel con habitaciones grandes, sin decir
  que había que llenarlas. `costoDosPersonas` fija la ocupación en vez de
  suponer la más conveniente.
*/

/** Total del desglose ya cotizado en el documento, si lo trae. */
export function totalCotizado(hotel: Hotel): number | null {
  const partes = hotel.habitaciones
    .map((h) => h.cotizado?.total)
    .filter((t): t is number => typeof t === "number");
  return partes.length ? partes.reduce((a, b) => a + b, 0) : null;
}

export function dinero(valor: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(valor);
}


/*
  Buscar el nivel de un hotel.

  El `Map` se arma una vez al cargar el módulo, no en cada render. Estaba
  duplicado como constante suelta en la ficha de detalle; acá vive al lado del
  resto de lo que se deriva de los datos, que es lo que es.
*/
const porId = new Map(niveles.map((n) => [n.id, n]));

/** El nivel de un hotel, o `undefined` si su `nivel` no existe en `niveles`. */
export function nivelDe(hotel: Hotel): Nivel | undefined {
  return porId.get(hotel.nivel);
}
