import { EspacioPendiente } from "@/components/ui/espacio-pendiente";
import { Reveal } from "@/components/ui/reveal";
import { evento, medios, puntosClave } from "@/lib/datos";

/**
 * El video, en cualquiera de sus tres estados.
 *
 * Mientras no haya archivo se reserva el espacio con la medida exacta. Cuando
 * llegue, `preload="none"` para el mp4 propio y `loading="lazy"` para el
 * incrustado: en ambos casos no se descarga nada hasta que alguien lo pida.
 */
function Video() {
  if (!medios.video) {
    return (
      <EspacioPendiente
        tono="marca"
        titulo="Video del Centenario"
        detalle="mp4 propio de hasta 30 MB, o enlace de incrustar de YouTube o Vimeo"
        className="aspect-video w-full"
      />
    );
  }

  if (medios.video.tipo === "archivo") {
    return (
      <video
        controls
        preload="none"
        poster={medios.video.poster}
        className="aspect-video w-full bg-ink object-cover shadow-plate"
      >
        <source src={medios.video.src} type="video/mp4" />
      </video>
    );
  }

  return (
    <iframe
      src={medios.video.src}
      title={medios.video.titulo}
      loading="lazy"
      allow="accelerometer; clipboard-write; encrypted-media; picture-in-picture"
      allowFullScreen
      className="aspect-video w-full border-0 bg-ink shadow-plate"
    />
  );
}

/**
 * Franja intermedia a dos columnas: los tres puntos del evento a la izquierda,
 * el video a la derecha.
 *
 * En móvil se apilan y el video queda arriba: es lo que se mira primero cuando
 * la pantalla es angosta, y deja los tres puntos como lectura de después.
 */
export function PuntosVideo() {
  return (
    <section
      id="evento"
      className="scroll-mt-20 border-b border-line py-20 sm:py-28"
    >
      <div className="mx-auto grid max-w-[88rem] items-center gap-12 px-5 sm:px-8 lg:grid-cols-2 lg:gap-16">
        <div className="order-2 lg:order-1">
          <p className="eyebrow text-brass">El encuentro</p>
          <h2 className="display-lg mt-5 max-w-[15ch]">
            {evento.noches} noches en Alajuela
          </h2>

          <ol className="mt-10 border-t border-line">
            {puntosClave.map((punto, i) => (
              <li
                key={punto.titulo}
                className="grid grid-cols-[2.25rem_1fr] gap-4 border-b border-line py-6"
              >
                {/* Cobalto: es un índice, no un precio ni la marca. */}
                <span className="pt-1.5 font-display text-sm text-cobalt-deep tabular-nums">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 className="display-md">{punto.titulo}</h3>
                  <p className="mt-2 max-w-[46ch] leading-relaxed text-graphite">
                    {punto.texto}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>

        {/*
          Marco doble: bandeja de papel apagado con una hairline, y el video
          adentro. Es lo que separa una pieza montada de un `<video>` tirado
          sobre el fondo — el mismo recurso de las láminas impresas. La
          hairline es cobalto, no la línea neutra: es el único bloque de
          medios de la franja, y el borde de color lo marca como tal.
        */}
        <Reveal className="order-1 lg:order-2">
          <div className="border border-cobalt bg-bone-dim/70 p-2 shadow-lift sm:p-3">
            <Video />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
