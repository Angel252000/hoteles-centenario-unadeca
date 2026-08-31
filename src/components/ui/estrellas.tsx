import { ESTRELLAS_TOTAL, type RangoEstrellas } from "@/lib/datos";

/**
 * Una estrella. `estado` decide el relleno:
 *
 * - `llena` — el hotel la tiene.
 * - `posible` — solo contorno. Es el tramo «hasta» de un rango («4 a 5»):
 *   ni ganada ni descartada. Se dibuja con el trazo del acento para que se
 *   distinga de una vacía, que va apagada.
 * - `vacia` — el resto de la escala.
 */
function Estrella({ estado }: { estado: "llena" | "posible" | "vacia" }) {
  const d =
    "M8 1.6l1.9 4.1 4.5.6-3.3 3.1.85 4.4L8 11.7l-3.95 2.1.85-4.4L1.6 6.3l4.5-.6z";

  return (
    <svg viewBox="0 0 16 16" aria-hidden className="h-3.5 w-3.5 shrink-0">
      <path
        d={d}
        fill={estado === "llena" ? "currentColor" : "none"}
        stroke="currentColor"
        strokeWidth="1.15"
        strokeLinejoin="round"
        opacity={estado === "vacia" ? 0.3 : 1}
      />
    </svg>
  );
}

/**
 * Nivel del hotel, como estrellas sobre un total de 6.
 *
 * Reemplaza las etiquetas «Básico», «Medio» y «Premium». El total sale de
 * `ESTRELLAS_TOTAL`, no de un 6 escrito acá: si la comisión decide volver a
 * una escala de 5, se cambia en un solo lugar.
 *
 * El rótulo dice «nivel», no «estrellas». No es un detalle de redacción: la
 * escala de estrellas de hotel del mundo real llega a 5 y es una
 * clasificación oficial, y estos son hoteles de marca reales. Escrito
 * «estrellas» sobre 6, un Courtyard parecería tener una categoría oficial que
 * no tiene. Ver la advertencia larga en `contenido.ts`.
 *
 * Accesibilidad: una sola etiqueta en el contenedor y las estrellas en
 * `aria-hidden`. Sin eso el lector de pantalla cantaría seis formas sueltas
 * en vez de un dato.
 */
export function Estrellas({
  rango,
  leyenda,
  className,
}: {
  rango: RangoEstrellas;
  leyenda: string;
  className?: string;
}) {
  return (
    <span
      role="img"
      aria-label={`Nivel ${leyenda}`}
      className={`flex items-center gap-0.5 ${className ?? ""}`}
    >
      {Array.from({ length: ESTRELLAS_TOTAL }, (_, i) => {
        const puesto = i + 1;
        const estado =
          puesto <= rango.min
            ? "llena"
            : puesto <= rango.max
              ? "posible"
              : "vacia";

        return <Estrella key={puesto} estado={estado} />;
      })}
    </span>
  );
}
