"use client";

import { motion, useReducedMotion } from "framer-motion";

/**
 * Entrada al entrar en pantalla: sube unos píxeles y aparece.
 *
 * Es lo único del sitio que necesita JavaScript, así que se mantiene mínimo:
 * recibe el contenido ya renderizado en el servidor como `children`, de modo
 * que las fichas siguen siendo componentes de servidor y no viajan sus datos
 * al navegador.
 *
 * El recorrido es corto (14px) y la curva es la misma del resto del sitio:
 * la idea es que la parrilla se asiente, no que haga una entrada.
 */
export function Reveal({
  children,
  className,
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const sinMovimiento = useReducedMotion();

  // Quien pidió menos movimiento recibe el contenido tal cual, sin envoltorio
  // animado ni estado inicial invisible.
  if (sinMovimiento) return <div className={className}>{children}</div>;

  return (
    <motion.div
      className={className}
      data-reveal
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{
        // No se repite al volver a subir.
        once: true,
        /*
          Márgenes asimétricos, y el de arriba es enorme a propósito.

          Con un margen simétrico, saltar al pie de la página —un ancla, Cmd+↓,
          o el navegador restaurando el scroll— deja atrás elementos que el
          observador nunca vio: con `once` se quedan invisibles para siempre.
          Extender el borde superior del root hace que todo lo que ya quedó
          arriba cuente como visible y aparezca de una. Abajo se mantiene el
          -60px, que es lo que adelanta la entrada al acercarse.
        */
        margin: "9999px 0px -60px 0px",
      }}
      transition={{ duration: 0.45, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
