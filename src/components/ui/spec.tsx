/**
 * Un dato con icono: «2 camas matrimoniales», «Aire acondicionado», «Elevador».
 *
 * Va siempre dentro de un `<ul>`. Se usa en dos lugares con densidades
 * distintas —la ficha de la parrilla aprieta, la de detalle respira— y esa
 * diferencia estaba antes duplicada en dos componentes con el mismo nombre,
 * uno en `hotel-card.tsx` y otro en la página de detalle. Eran casi iguales:
 * dos píxeles de separación y el `text-sm` en distinto elemento. Casi iguales
 * y con el mismo nombre es lo peor de los dos mundos, porque quien arregla
 * uno cree que arregló los dos.
 *
 * Ahora es uno solo y la diferencia tiene nombre: `denso`.
 */
export function Spec({
  icono,
  denso,
  children,
}: {
  icono: React.ReactNode;
  /** Para la parrilla, donde entran seis en una tarjeta. */
  denso?: boolean;
  children: React.ReactNode;
}) {
  return (
    <li
      className={`flex items-center text-graphite ${denso ? "gap-2" : "gap-2.5"}`}
    >
      <span className="text-mute">{icono}</span>
      <span className="text-sm">{children}</span>
    </li>
  );
}
