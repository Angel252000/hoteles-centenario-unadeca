import { Foto } from "@/components/ui/foto";
import Link from "next/link";
import { Estrellas } from "@/components/ui/estrellas";
import { Clima, Personas, Pin, Taza } from "@/components/ui/iconos";
import { costoDosPersonas, dinero, niveles, type Hotel } from "@/lib/datos";
import { Spec } from "@/components/ui/spec";

const nivelPorId = new Map(niveles.map((n) => [n.id, n]));

// Cortos a propósito: comparten fila con otros dos datos.
const textoAire = {
  si: "A/C",
  parcial: "A/C parcial",
  no: "Ventilador",
  // El hotel no lo informó. No es lo mismo que "no tiene".
  null: "Clima sin dato",
} as const;

const icono = "h-4 w-4 shrink-0";

/** Ficha al estilo de las tarjetas de propiedad: precio primero, luego todo. */
export function HotelCard({ hotel }: { hotel: Hotel }) {
  const dosPersonas = costoDosPersonas(hotel);
  const url = `/hoteles/${hotel.slug}`;
  // Un hotel puede no haber mandado fotos todavía. Antes esto reventaba el
  // build entero al leer `.src` de un `undefined`.
  const portada = hotel.imagenes[0];
  // `NivelId` es una unión cerrada y `niveles` trae los tres, así que esto
  // siempre resuelve. Aun así no lleva `!`: si algún día se agrega un id al
  // tipo y se olvida cargarlo acá, preferimos que la insignia no salga a que
  // el build reviente en tiempo de ejecución.
  const nivel = nivelPorId.get(hotel.nivel);

  return (
    // `h-full`: dentro de <Reveal> la ficha ya no es el elemento de la
    // parrilla, así que sin esto las fichas de una misma fila pierden el
    // alto parejo y los pies dejan de alinearse.
    <article className="ficha group flex h-full flex-col">
      <Link
        href={url}
        className="relative block aspect-4/3 cursor-pointer overflow-hidden"
      >
        {portada ? (
          <Foto
            src={portada.src}
            alt={portada.alt}
            fill
            sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 100vw"
            className="object-cover transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105 motion-reduce:transition-none motion-reduce:group-hover:scale-100"
          />
        ) : (
          <span className="flex h-full w-full items-center justify-center bg-bone-dim text-xs tracking-wider text-mute uppercase">
            Fotos pendientes
          </span>
        )}
        {/*
          Las estrellas van en oro claro y no en blanco: sobre `ink` dan
          7.07:1, y el oro es el color que este sitio reserva para lo que
          jerarquiza —precio y nivel—. La insignia sigue en `bg-ink` porque
          tiene que aguantar encima de fotos claras y oscuras por igual.
        */}
        {nivel && (
          <span className="absolute top-3 left-3 flex items-center bg-ink px-3 py-2 shadow-lift">
            <Estrellas
              rango={nivel.estrellas}
              leyenda={nivel.leyenda}
              className="text-brass-bright"
            />
          </span>
        )}
        {hotel.caracteristicas.elevador === true && (
          /* Cobalto, no oro: es una característica, no un precio ni la
             etiqueta de nivel —esa sigue en `bg-ink`—. */
          <span className="absolute top-3 right-3 bg-cobalt-deep px-3 py-1.5 text-[0.65rem] font-semibold tracking-wider text-bone uppercase shadow-lift">
            Con elevador
          </span>
        )}
      </Link>

      <div className="flex flex-1 flex-col p-6">
        {/*
          El nombre manda y el precio lo acompaña. Antes iba al revés: seis
          fichas abriendo con la cifra hacían que la parrilla se leyera como
          una lista de precios en vez de una de hoteles.
        */}
        {/*
          Reserva dos líneas desde que la parrilla es de varias columnas: sin
          esto, el único nombre que parte en dos ("Hotel Alajuela Costa Rica
          Airport") empuja su precio y su resumen fuera de línea con los de las
          fichas vecinas.
        */}
        <h3 className="display-md sm:flex sm:min-h-[2.24em] sm:items-start">
          <Link
            href={url}
            className="cursor-pointer text-ink transition-colors duration-200 hover:text-cobalt-deep"
          >
            {hotel.nombre}
          </Link>
        </h3>

        <p className="mt-2 flex items-center gap-1.5 text-sm text-mute">
          <Pin className="h-3.5 w-3.5 shrink-0" />
          Alajuela, Costa Rica
        </p>

        {/*
          El precio grande es la estadía completa de dos personas, no la
          persona-noche que se mostraba antes. La persona-noche era comparable
          pero nadie reserva esa unidad: obligaba a multiplicar por cuatro y
          por la cantidad de gente antes de saber si el hotel entraba en el
          presupuesto.

          Debajo va de qué tarifa sale, y no es adorno: en Backpackers lo más
          barato para dos son dos camarotes en dormitorio compartido, así que
          la cifra sin esa línea haría parecer que el hotel entero cuesta eso.
        */}
        <p className="mt-4 flex items-baseline gap-2">
          <span className="font-display text-[1.875rem] leading-none text-brass tabular-nums">
            {dosPersonas === null ? "—" : dinero(dosPersonas.total)}
          </span>
          <span className="text-xs leading-none text-mute">
            4 noches · 2 personas
          </span>
        </p>

        {dosPersonas && (
          <p className="mt-1.5 text-xs text-mute">
            En {dosPersonas.tarifa.nombre.toLowerCase()}
            {dosPersonas.tarifa.camas ? ` · ${dosPersonas.tarifa.camas.toLowerCase()}` : ""}
          </p>
        )}

        <p className="mt-4 line-clamp-2 text-sm leading-relaxed text-graphite">
          {hotel.resumen}
        </p>

        <ul className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2.5 border-t border-line pt-5">
          <Spec denso icono={<Personas className={icono} />}>
            {hotel.capacidad === null ? "Sin dato" : `${hotel.capacidad} pers.`}
          </Spec>
          <Spec denso icono={<Taza className={icono} />}>
            {hotel.caracteristicas.desayunoIncluido ? "Desayuno" : "$6 aparte"}
          </Spec>
          <Spec denso icono={<Clima className={icono} />}>
            {textoAire[hotel.caracteristicas.aire ?? "null"]}
          </Spec>
        </ul>

        {/*
          La mitad de la canasta de arriba, no un cálculo aparte. Antes acá iba
          `costoEstadia` —las 4 noches de UNA persona con la tarifa más barata—,
          que era un segundo total de 4 noches al lado del primero: dos cifras
          del mismo período, con bases distintas, en la misma ficha.
        */}
        <div className="mt-auto flex items-end justify-between gap-4 border-t border-line pt-5">
          <p className="text-xs text-mute">
            Por persona
            <span className="ml-1.5 font-display text-base text-ink tabular-nums">
              {dosPersonas === null ? "—" : dinero(dosPersonas.total / 2)}
            </span>
          </p>
          <Link
            href={url}
            className="cursor-pointer border border-ink px-4 py-2.5 text-xs font-medium text-ink transition-colors duration-200 hover:bg-ink hover:text-bone"
          >
            Ver hotel
          </Link>
        </div>
      </div>
    </article>
  );
}
