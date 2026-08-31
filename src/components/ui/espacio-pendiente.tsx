/**
 * Espacio reservado para una pieza que todavía no llegó —el logo, la imagen de
 * portada, el video—.
 *
 * Ocupa exactamente el lugar que va a ocupar la pieza real, así que el diseño
 * se puede mirar completo antes de tenerla y después no se mueve nada. Dice qué
 * falta y con qué medida, para que quien la consiga sepa qué mandar.
 *
 * Es decoración informativa: `aria-hidden` lo saca del lector de pantalla,
 * porque anunciar "logo pendiente" no le sirve a nadie que esté navegando.
 */
export function EspacioPendiente({
  titulo,
  detalle,
  tono = "papel",
  className = "",
}: {
  titulo: string;
  detalle?: string;
  /**
   * `tinta` para bloques chicos sobre fondo oscuro (los logos del header).
   * `marca` para los bloques grandes de foto y video: lleva el degradé de
   * marca en vez de un panel plano, así el hueco se ve de marca mientras
   * espera el archivo real. `papel` para el resto.
   */
  tono?: "papel" | "tinta" | "marca";
  className?: string;
}) {
  const superficie =
    tono === "marca"
      ? "fondo-degradado-marca border-line-invert text-mute-invert"
      : tono === "tinta"
        ? "border-line-invert bg-ink-soft text-mute-invert"
        : "border-line-strong bg-bone-dim/60 text-mute";

  return (
    <div
      aria-hidden
      className={`flex flex-col items-center justify-center gap-2 border border-dashed px-6 text-center ${superficie} ${className}`}
    >
      <p className="eyebrow">{titulo}</p>
      {detalle && (
        <p className="max-w-[34ch] text-xs leading-relaxed">{detalle}</p>
      )}
    </div>
  );
}
