/** Iconos de línea, 24×24, heredan color y grosor uniforme. */

type Props = { className?: string };

const base = "h-[1.15rem] w-[1.15rem] shrink-0";

/**
 * Flecha de vuelta. Lleva el trazo del asta además de la punta: una punta
 * sola («‹») se lee como «anterior» dentro de una serie, y acá el gesto es
 * salir de la ficha hacia la lista, no retroceder un elemento.
 *
 * `galeria.tsx` tiene su propia `Flecha` para anterior/siguiente dentro del
 * visor, que sí es navegar la serie. Son dos gestos distintos a propósito.
 */
export function FlechaIzquierda({ className }: Props) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className={className ?? base}>
      <path
        d="M19 12H5m0 0 6-6m-6 6 6 6"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="square"
      />
    </svg>
  );
}

export function Pin({ className }: Props) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className={className ?? base}>
      <path
        d="M12 21s7-5.5 7-11a7 7 0 1 0-14 0c0 5.5 7 11 7 11Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <circle cx="12" cy="10" r="2.5" fill="none" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

export function Personas({ className }: Props) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className={className ?? base}>
      <circle cx="9" cy="8" r="3.25" fill="none" stroke="currentColor" strokeWidth="1.5" />
      <path
        d="M2.5 20a6.5 6.5 0 0 1 13 0"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <path
        d="M16 5.5a3.25 3.25 0 0 1 0 6M17.5 14.2A6.5 6.5 0 0 1 21.5 20"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      />
    </svg>
  );
}

export function Cama({ className }: Props) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className={className ?? base}>
      <path
        d="M2.5 18v-9M2.5 13h19v5M21.5 18v-4.5a3 3 0 0 0-3-3H11v2.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <circle cx="7" cy="11" r="2" fill="none" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

export function Taza({ className }: Props) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className={className ?? base}>
      <path
        d="M4 9h13v6.5a4.5 4.5 0 0 1-4.5 4.5h-4A4.5 4.5 0 0 1 4 15.5V9Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <path
        d="M17 11h1.5a2.5 2.5 0 0 1 0 5H17M8 3v2.5M12 3v2.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      />
    </svg>
  );
}

export function Clima({ className }: Props) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className={className ?? base}>
      <path
        d="M12 2.5v19M3.75 7.25l16.5 9.5M20.25 7.25l-16.5 9.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      />
    </svg>
  );
}

export function Escalera({ className }: Props) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className={className ?? base}>
      <path
        d="M3 20h4v-4h4v-4h4V8h4V4"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      />
    </svg>
  );
}

export function Elevador({ className }: Props) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className={className ?? base}>
      <rect
        x="4"
        y="3"
        width="16"
        height="18"
        rx="1.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <path
        d="M12 3v18M8.5 9.5 10 7.5l1.5 2M8.5 14.5 10 16.5l1.5-2"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      />
    </svg>
  );
}

export function Correo({ className }: Props) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className={className ?? base}>
      <rect
        x="3"
        y="5.5"
        width="18"
        height="13"
        rx="1.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <path
        d="m3.5 7 8.5 6 8.5-6"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      />
    </svg>
  );
}

export function Telefono({ className }: Props) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className={className ?? base}>
      <path
        d="M7.5 3.5h-2A2 2 0 0 0 3.5 5.7c.4 4 2 7.5 4.7 10.2s6.2 4.3 10.1 4.6a2 2 0 0 0 2.2-2v-2a1.5 1.5 0 0 0-1.2-1.5l-2.6-.5a1.5 1.5 0 0 0-1.5.7l-.8 1.3a13 13 0 0 1-5.4-5.4l1.3-.8a1.5 1.5 0 0 0 .7-1.5l-.5-2.6A1.5 1.5 0 0 0 7.5 3.5Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      />
    </svg>
  );
}

export function WhatsApp({ className }: Props) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className={className ?? base}>
      <path
        d="M3.5 20.5l1.2-4.2A8.2 8.2 0 1 1 7.9 19.3l-4.4 1.2Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path
        d="M9.1 8.2c.2-.5.5-.5.8-.5h.5c.2 0 .4 0 .6.5l.7 1.6c.1.2 0 .4-.1.5l-.4.5c-.1.2-.2.3 0 .6a6 6 0 0 0 2.6 2.3c.3.1.5.1.6 0l.5-.6c.2-.2.3-.2.5-.1l1.6.8c.2.1.4.2.4.4a1.8 1.8 0 0 1-1.2 1.7c-.5.2-1.2.3-3.3-.6a8.4 8.4 0 0 1-3.6-3.5c-.7-1.3-.7-2.2-.6-2.7a2 2 0 0 1 .4-.9Z"
        fill="currentColor"
      />
    </svg>
  );
}
