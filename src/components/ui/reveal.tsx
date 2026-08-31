/**
 * Entrada al entrar en pantalla: sube unos píxeles y aparece.
 *
 * Esto es un componente de servidor: no manda ni un byte de JavaScript por
 * cada ficha. Solo escribe `data-reveal` y el retraso; el estado inicial y la
 * transición viven en `globals.css`, y un único observador para toda la
 * página —`<ObservadorReveal>`, montado en el layout— es el que va marcando
 * los elementos como vistos.
 *
 * Antes esto lo hacía framer-motion. Se cambió porque la librería completa
 * pesaba unos 180 KB comprimidos para hacer una aparición de 14 px que en CSS
 * son cuatro líneas. Ver la sección 15 de `docs/MEJORAS.md`.
 *
 * `prefers-reduced-motion` se atiende en CSS, no acá: quien pidió menos
 * movimiento ve el contenido de una, aunque el JavaScript nunca cargue.
 */
export function Reveal({
  children,
  className,
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  /** Segundos. Sirve para escalonar una fila de fichas. */
  delay?: number;
}) {
  return (
    <div
      data-reveal
      className={className}
      style={delay ? { transitionDelay: `${delay}s` } : undefined}
    >
      {children}
    </div>
  );
}
