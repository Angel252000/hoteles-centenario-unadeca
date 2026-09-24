"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

/**
 * Un solo `IntersectionObserver` para todo lo que solo debe animarse mientras
 * se ve: hoy, la banda del Centenario.
 *
 * Va montado una vez en el layout, igual que `<ObservadorReveal>`. Marcar cada
 * elemento con su propio observador costaría un componente de cliente por
 * bloque; así el JavaScript que viaja es este archivo y nada más.
 *
 * La diferencia con el de reveal es que este NO deja de observar: reveal marca
 * «ya se vio» una vez y se desentiende, mientras que acá el estado va y viene
 * cada vez que el bloque entra y sale de pantalla.
 *
 * **Falla abierto, a propósito.** El servidor dibuja `data-en-vista="si"`, y
 * esto solo lo cambia a `"no"` cuando el elemento está de verdad fuera de
 * cuadro. Si el navegador no trae `IntersectionObserver`, o si el JavaScript
 * nunca llega, el atributo se queda en `"si"` y la animación anda siempre —que
 * es exactamente como se comportaba antes de que esto existiera—. Al revés
 * —empezar en `"no"` y encender por JavaScript— una falla dejaría la banda
 * congelada en la primera foto y nadie sabría por qué.
 *
 * Tambien atado a `usePathname()`, por la misma razon que
 * `<ObservadorReveal>`: el layout no se remonta al navegar. Aca el sintoma es
 * mas leve porque falla abierto —la banda se queda animando siempre en vez de
 * pararse fuera de pantalla—, pero es gasto de bateria sin motivo.
 */
export function ObservadorEnVista() {
  const ruta = usePathname();

  useEffect(() => {
    if (typeof IntersectionObserver === "undefined") return;

    const elementos = document.querySelectorAll<HTMLElement>("[data-en-vista]");
    if (elementos.length === 0) return;

    const observador = new IntersectionObserver(
      (entradas) => {
        for (const entrada of entradas) {
          entrada.target.setAttribute(
            "data-en-vista",
            entrada.isIntersecting ? "si" : "no",
          );
        }
      },
      /*
        Sin `rootMargin`: el umbral es el borde de la pantalla y nada más. Y
        `threshold: 0`, que es el valor por omisión: alcanza con que asome un
        píxel para que cuente como visible. Pedir más —un 25%, digamos— haría
        que la banda arrancara recién cuando ya se ve media, y el primer paso
        se perdería justo cuando la persona está mirando.
      */
      { threshold: 0 },
    );

    elementos.forEach((el) => observador.observe(el));
    return () => observador.disconnect();
  }, [ruta]);

  return null;
}
