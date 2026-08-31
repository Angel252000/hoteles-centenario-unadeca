"use client";

import { useEffect } from "react";

/**
 * Un solo `IntersectionObserver` para todos los `[data-reveal]` de la página.
 *
 * Va montado una vez en el layout. Marcar cada elemento con su propio
 * observador costaría un componente de cliente por ficha; así el JavaScript
 * que viaja es este archivo y nada más.
 */
export function ObservadorReveal() {
  useEffect(() => {
    const elementos = document.querySelectorAll<HTMLElement>("[data-reveal]");

    // Si el navegador no trae `IntersectionObserver`, mostrar todo de una:
    // el contenido manda sobre la animación.
    if (typeof IntersectionObserver === "undefined") {
      elementos.forEach((el) => el.setAttribute("data-reveal", "visible"));
      return;
    }

    const observador = new IntersectionObserver(
      (entradas) => {
        for (const entrada of entradas) {
          if (!entrada.isIntersecting) continue;
          entrada.target.setAttribute("data-reveal", "visible");
          // No se repite al volver a subir: una vez visto, queda visto.
          observador.unobserve(entrada.target);
        }
      },
      {
        /*
          Márgenes asimétricos, y el de arriba es enorme a propósito.

          Con un margen simétrico, saltar al pie de la página —un ancla,
          Cmd+↓, o el navegador restaurando el scroll— deja atrás elementos
          que el observador nunca vio, y se quedarían invisibles para siempre.
          Extender el borde superior hace que todo lo que ya quedó arriba
          cuente como visible y aparezca de una. Abajo se mantiene el -60px,
          que es lo que adelanta la entrada al acercarse.
        */
        rootMargin: "9999px 0px -60px 0px",
      },
    );

    elementos.forEach((el) => observador.observe(el));
    return () => observador.disconnect();
  }, []);

  return null;
}
