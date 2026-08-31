/**
 * Dimensiones nativas de cada foto, generadas con `sips` desde public/hoteles.
 * Sirven para no mostrar nunca una imagen por encima de su resolución real,
 * que es lo que la vuelve borrosa. Regenerar si se reemplazan las fotos.
 */
export const tamanos: Record<string, { ancho: number; alto: number }> = {
  "/hoteles/alajuela-airport/01.jpg": { ancho: 616, alto: 458 },
  "/hoteles/alajuela-airport/02.jpg": { ancho: 615, alto: 465 },
  "/hoteles/alajuela-airport/03.jpg": { ancho: 698, alto: 524 },
  "/hoteles/backpackers/01.jpg": { ancho: 375, alto: 500 },
  "/hoteles/backpackers/02.jpg": { ancho: 500, alto: 375 },
  "/hoteles/backpackers/03.jpg": { ancho: 375, alto: 471 },
  "/hoteles/courtyard-alajuela/01.jpg": { ancho: 750, alto: 422 },
  "/hoteles/courtyard-alajuela/02.jpg": { ancho: 750, alto: 422 },
  "/hoteles/courtyard-alajuela/03.jpg": { ancho: 750, alto: 423 },
  "/hoteles/courtyard-alajuela/04.jpg": { ancho: 375, alto: 210 },
  "/hoteles/courtyard-alajuela/05.jpg": { ancho: 375, alto: 211 },
  "/hoteles/fairfield-alajuela/01.jpg": { ancho: 750, alto: 422 },
  "/hoteles/fairfield-alajuela/02.jpg": { ancho: 750, alto: 422 },
  "/hoteles/fairfield-alajuela/03.jpg": { ancho: 375, alto: 211 },
  "/hoteles/fairfield-alajuela/04.jpg": { ancho: 375, alto: 211 },
  "/hoteles/fairfield-alajuela/05.jpg": { ancho: 375, alto: 211 },
  "/hoteles/hampton-inn/01.jpg": { ancho: 1600, alto: 1067 },
  "/hoteles/hampton-inn/02.jpg": { ancho: 1600, alto: 1067 },
  "/hoteles/hampton-inn/03.jpg": { ancho: 1600, alto: 1067 },
  "/hoteles/hilton-garden-inn/01.jpg": { ancho: 640, alto: 427 },
  "/hoteles/hilton-garden-inn/02.jpg": { ancho: 640, alto: 427 },
  "/hoteles/hilton-garden-inn/03.jpg": { ancho: 640, alto: 427 },
  "/hoteles/hilton-garden-inn/04.jpg": { ancho: 640, alto: 427 },
  "/hoteles/hotel-1915/01.jpg": { ancho: 1024, alto: 768 },
  "/hoteles/hotel-1915/02.jpg": { ancho: 516, alto: 387 },
  "/hoteles/hotel-1915/03.jpg": { ancho: 478, alto: 359 },
  "/hoteles/hotel-1915/04.jpg": { ancho: 565, alto: 423 },
  "/hoteles/hotel-1915/05.jpg": { ancho: 561, alto: 430 },
  "/hoteles/hotel-1915/06.jpg": { ancho: 558, alto: 418 },
  "/hoteles/hotel-1915/07.jpg": { ancho: 1600, alto: 1067 },
  "/hoteles/hotel-1915/08.jpg": { ancho: 800, alto: 1200 },
  "/hoteles/hotel-1915/09.jpg": { ancho: 800, alto: 1200 },
  "/hoteles/la-guaria/01.jpg": { ancho: 554, alto: 416 },
  "/hoteles/la-guaria/02.jpg": { ancho: 558, alto: 418 },
  "/hoteles/la-guaria/03.jpg": { ancho: 635, alto: 476 },
  "/hoteles/park-view/01.jpg": { ancho: 722, alto: 538 },
  "/hoteles/park-view/02.jpg": { ancho: 619, alto: 486 },
  "/hoteles/park-view/03.jpg": { ancho: 515, alto: 788 },
  "/hoteles/park-view/04.jpg": { ancho: 585, alto: 488 },
  "/hoteles/tucan/01.jpg": { ancho: 391, alto: 522 },
  "/hoteles/tucan/02.jpg": { ancho: 576, alto: 768 },
  "/hoteles/tucan/03.jpg": { ancho: 574, alto: 768 },
  "/hoteles/tucan/04.jpg": { ancho: 576, alto: 768 },
  "/hoteles/tucan/05.jpg": { ancho: 666, alto: 444 },
  "/hoteles/tucan/06.jpg": { ancho: 402, alto: 536 },
};

/** Ancho nativo de una foto, o 0 si no está registrada. */
export function anchoNativo(src: string): number {
  return tamanos[src]?.ancho ?? 0;
}
