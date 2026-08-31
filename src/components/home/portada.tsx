import Link from "next/link";
import { CarruselCentenario } from "@/components/home/carrusel-centenario";
import { costoDosPersonas, dinero, evento, hoteles } from "@/lib/datos";

/**
 * El hotel más barato de la lista, medido con la misma canasta que las fichas:
 * cuatro noches para dos personas. Antes era la persona-noche más baja, que
 * daba un número mucho más chico y de una unidad que nadie reserva.
 */
const masBarato = Math.min(
  ...hoteles
    .map((h) => costoDosPersonas(h)?.total)
    .filter((t): t is number => t !== undefined),
);

/**
 * Portada: banda ancha del Centenario y la fila de cifras.
 *
 * Los dos logos ya no van acá: viven en el header, a los extremos de la barra
 * fija (`site-header.tsx`). Esta sección arranca directo con la banda —el
 * primer bloque grande del boceto, debajo de la fila de marca—.
 *
 * Esa banda ya no es una imagen fija sino el carrusel, que se quedó con su
 * caja: eran dos bloques de foto seguidos, los dos del Centenario, y el de
 * abajo se leía como la versión chica del de arriba.
 *
 * El titular y las cifras van *después* de la banda, no encima: la foto
 * definitiva todavía no existe y un titular sobrepuesto depende de que su
 * mitad inferior sea oscura. Así el bloque funciona con cualquier imagen.
 *
 * La fila de cifras abre con las fechas del evento, que hasta ahora estaban
 * cargadas en los datos y no se mostraban en ninguna pantalla.
 */
export function Portada() {
  const cifras = [
    { k: "Fechas", v: evento.fechas, ancho: true },
    { k: "Hoteles", v: String(hoteles.length) },
    { k: "Noches", v: String(evento.noches) },
    // El rótulo dice qué mide la cifra. «Desde» a secas, con un número que
    // ahora es una estadía entera y no una noche, se leería como el precio de
    // una noche. No repite «4 noches» porque la celda de al lado ya lo dice.
    { k: "Desde · las 4 noches, 2 personas", v: dinero(masBarato) },
  ];

  return (
    <section className="bg-ink text-bone">
      {/*
        1 · Banda del Centenario, a todo lo ancho — ahora es el carrusel.

        Antes acá había una imagen fija y el carrusel venía debajo, con
        tarjetas de 22rem. Eran dos bloques de foto seguidos, los dos del
        Centenario y los dos pendientes: el de abajo se leía como la versión
        chica del de arriba. El carrusel se quedó con esta caja —incluido el
        `max-h`, que es lo que evita que la banda se coma la pantalla: sin él,
        a 1440 la proporción 21/8 mide 540px y empuja el titular y las cifras
        abajo del pliegue— y `medios.portada` pasó a ser su primera
        diapositiva. Ver `carrusel-centenario.tsx`.
      */}
      <CarruselCentenario />

      {/*
        2 · Rótulo de la banda, como pie de foto.

        Va debajo y no encima por la misma razón que el titular tampoco se
        sobrepone: la foto definitiva no existe todavía, y un texto encima
        depende de que la mitad que le toca sea oscura. Así funciona con
        cualquier imagen que llegue.
      */}
      <div className="mx-auto max-w-[92rem] px-5 pt-5 sm:px-8">
        <p className="eyebrow text-brass-bright">Galería del Centenario</p>
      </div>

      {/* 3 · Titular, gancho y cifras */}
      <div className="mx-auto max-w-[92rem] px-5 py-14 sm:px-8 sm:py-20">
        <div className="lg:flex lg:items-end lg:justify-between lg:gap-16">
          <div>
            <p className="eyebrow text-brass-bright">
              {evento.nombre} · Alajuela, Costa Rica
            </p>

            <h1 className="display-xl mt-6 max-w-[14ch] text-bone">
              Encontrá dónde{" "}
              <em className="text-brass-bright not-italic">dormir</em>
            </h1>
          </div>

          <div className="mt-8 max-w-[46ch] lg:mt-0 lg:shrink-0 lg:text-right">
            <p className="text-lg leading-[1.7] text-mute-invert">
              {hoteles.length} hoteles del centro de Alajuela, cotizados para el
              Centenario. Compará precios, capacidad y servicios.
            </p>

            {/* Lleva a consultas, no a la parrilla: la lista se alcanza
                scrolleando, pero a quién preguntarle no se descubre solo. */}
            {/*
              La flecha se corre unos píxeles en hover. Es `transform`, así que
              no reacomoda nada alrededor, y usa la curva del sitio.
            */}
            <Link
              href="/#consultas"
              className="group mt-7 inline-flex cursor-pointer items-center gap-3 border border-bone bg-bone px-8 py-4 text-sm font-medium text-ink shadow-raise transition-colors duration-200 hover:bg-transparent hover:text-bone"
            >
              Consultar precios
              <span
                aria-hidden
                className="ease-out-soft transition-transform duration-300 group-hover:translate-x-1"
              >
                →
              </span>
            </Link>
          </div>
        </div>

        {/*
          Reglas verticales entre cifras, como en una ficha impresa. La primera
          no lleva —queda pegada al margen— y en móvil solo la llevan las de la
          columna derecha, que es donde la separación hace falta.
        */}
        <dl className="mt-14 grid grid-cols-2 gap-y-8 border-t border-line-invert pt-8 sm:grid-cols-4">
          {cifras.map((dato, i) => (
            <div
              key={dato.k}
              className={`pr-6 ${
                i % 2 === 1 ? "border-l border-line-invert pl-6" : ""
              } sm:pl-6 ${i > 0 ? "sm:border-l sm:border-line-invert" : "sm:border-l-0 sm:pl-0"}`}
            >
              <dt className="text-[0.65rem] tracking-wider text-mute-invert uppercase">
                {dato.k}
              </dt>
              {/*
                Las fechas son una frase, no una cifra: al mismo cuerpo que
                «10» ocuparían tres renglones y romperían la fila.
              */}
              <dd
                className={`mt-1.5 font-display text-bone tabular-nums ${
                  dato.ancho ? "text-lg leading-snug" : "text-3xl"
                }`}
              >
                {dato.v}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
