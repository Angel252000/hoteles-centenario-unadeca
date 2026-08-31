import type { Metadata } from "next";
import { Foto } from "@/components/ui/foto";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Galeria } from "@/components/hoteles/galeria";
import { Estrellas } from "@/components/ui/estrellas";
import {
  Cama,
  Clima,
  Elevador,
  Escalera,
  FlechaIzquierda,
  Personas,
  Pin,
  Taza,
} from "@/components/ui/iconos";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import {
  costoDosPersonas,
  totalTarifa,
  dinero,
  evento,
  hoteles,
  niveles,
} from "@/lib/datos";

const nivelPorId = new Map(niveles.map((n) => [n.id, n]));

const textoAire = {
  si: "Aire acondicionado",
  parcial: "A/C en parte del hotel",
  no: "Solo ventilador",
  // El hotel no lo informó. No es lo mismo que "no tiene".
  null: "Clima sin dato",
} as const;

export function generateStaticParams() {
  return hoteles.map((hotel) => ({ slug: hotel.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/hoteles/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const hotel = hoteles.find((h) => h.slug === slug);
  if (!hotel) return {};

  return {
    title: `${hotel.nombre} — hospedaje en Alajuela`,
    description: hotel.resumen,
  };
}

function Check() {
  return (
    <svg viewBox="0 0 16 16" aria-hidden className="mt-1.5 h-3 w-3 shrink-0">
      <path
        d="M2 8.5 6 12.5 14 3.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="square"
      />
    </svg>
  );
}

/** Un dato de la fila de specs: icono + valor, como en las fichas de propiedad. */
function Spec({
  icono,
  children,
}: {
  icono: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <li className="flex items-center gap-2.5 text-graphite">
      <span className="text-mute">{icono}</span>
      <span className="text-sm">{children}</span>
    </li>
  );
}

export default async function HotelPage({ params }: PageProps<"/hoteles/[slug]">) {
  const { slug } = await params;
  const hotel = hoteles.find((h) => h.slug === slug);
  if (!hotel) notFound();

  const dosPersonas = costoDosPersonas(hotel);
  // `filter`: clima y acceso son `null` cuando el hotel no los informó, y una
  // viñeta con visto que diga «El hotel no lo indicó» se lee como un servicio.
  const incluye = [
    hotel.desayuno,
    hotel.clima,
    hotel.acceso,
    ...hotel.servicios,
  ].filter((item): item is string => Boolean(item));
  const otros = hoteles.filter((h) => h.slug !== hotel.slug).slice(0, 3);
  const tiposHabitacion = hotel.habitaciones.length;
  const nivel = nivelPorId.get(hotel.nivel);

  return (
    <>
      <SiteHeader />

      <main className="flex-1">
        {/*
          Vuelta a la parrilla. Va arriba de la galería, que es donde se busca
          la salida: hasta ahora la ficha era un camino sin vuelta marcada —se
          podía volver con el botón del navegador o tocando el logo, que lleva
          a la portada y no a la lista, pero nada en la página lo decía—, y la
          única vuelta visible era «Otros hoteles», al final de todo.

          Apunta a `/#hoteles`, el `id` de la sección en `listado.tsx`. Si ese
          `id` se renombra, este enlace deja de llevar donde dice sin dar
          error.

          La flecha se corre en hover, como la de la portada: es `transform`,
          así que no reacomoda nada alrededor.
        */}
        <div className="mx-auto max-w-[92rem] px-5 pt-6 sm:px-8">
          <Link
            href="/#hoteles"
            className="group inline-flex cursor-pointer items-center gap-2.5 text-sm text-graphite transition-colors duration-200 hover:text-ink"
          >
            <span className="ease-out-soft transition-transform duration-300 group-hover:-translate-x-1">
              <FlechaIzquierda className="h-4 w-4 shrink-0" />
            </span>
            Ver todos los hoteles
          </Link>
        </div>

        {/* Galería a lo ancho */}
        <div className="mx-auto max-w-[92rem] px-3 pt-4 sm:px-4">
          <Galeria fotos={hotel.imagenes} hotel={hotel.nombre} />
        </div>

        <div className="mx-auto max-w-[92rem] px-5 py-10 sm:px-8 sm:py-12">
          {/* Precio + insignia */}
          <div className="flex flex-wrap items-start justify-between gap-6">
            <div>
              <p className="font-display text-4xl text-ink tabular-nums sm:text-5xl">
                {dosPersonas === null ? "—" : dinero(dosPersonas.total)}
                <span className="ml-3 font-sans text-base font-normal text-mute">
                  las {evento.noches} noches, 2 personas
                </span>
              </p>

              {/*
                La explicación de dónde sale la cifra. Es la parte que hace que
                el número grande no sea una afirmación suelta: dice con qué
                tarifa se armó, cuántas veces hay que pagarla y cuánto queda por
                cabeza. Sin esto, dos hoteles con el mismo total parecerían
                equivalentes aunque uno lo logre con un dormitorio compartido.
              */}
              {dosPersonas && (
                <p className="mt-3 max-w-[52ch] text-sm leading-relaxed text-graphite">
                  {dosPersonas.tarifa.unidad === "persona-noche" ? (
                    <>
                      {dinero(dosPersonas.tarifa.precio)} por persona y por
                      noche, en «{dosPersonas.tarifa.nombre}», por 2 personas y{" "}
                      {evento.noches} noches.
                    </>
                  ) : dosPersonas.tarifa.personas >= 2 ? (
                    <>
                      Una «{dosPersonas.tarifa.nombre}» a{" "}
                      {dinero(dosPersonas.tarifa.precio)} la noche, que cubre{" "}
                      {dosPersonas.tarifa.personas} personas, por{" "}
                      {evento.noches} noches.
                    </>
                  ) : (
                    <>
                      Dos «{dosPersonas.tarifa.nombre}» a{" "}
                      {dinero(dosPersonas.tarifa.precio)} la noche cada una
                      —esta tarifa cubre una sola persona—, por {evento.noches}{" "}
                      noches.
                    </>
                  )}{" "}
                  Son {dinero(dosPersonas.total / 2)} por persona.
                  {dosPersonas.tarifa.camas
                    ? ` Camas: ${dosPersonas.tarifa.camas.toLowerCase()}.`
                    : ""}
                </p>
              )}

              <p className="mt-3 flex items-center gap-2 text-graphite">
                <Pin className="h-[1.15rem] w-[1.15rem] shrink-0 text-mute" />
                Alajuela, Costa Rica
              </p>
            </div>

            {/*
              Acá el chip vive sobre papel, no sobre foto: las estrellas van en
              `brass` —el oro oscurecido, 6.77:1 sobre blanco— y no en
              `brass-bright`, que es el oro de marca y solo pasa contraste
              sobre tinta. La leyenda se escribe al lado porque en la ficha hay
              lugar y un rango («4 a 5 de 6») se entiende antes leído que
              contado.
            */}
            <span className="flex items-center gap-3 bg-bone-dim px-6 py-3">
              {nivel && (
                <>
                  <Estrellas
                    rango={nivel.estrellas}
                    leyenda={nivel.leyenda}
                    className="text-brass"
                  />
                  <span className="text-sm tracking-wide text-graphite">
                    Nivel {nivel.leyenda}
                  </span>
                </>
              )}
            </span>
          </div>

          {/* Nombre + bajada */}
          <h1 className="mt-8 font-display text-2xl leading-snug text-ink sm:text-3xl lg:text-4xl">
            <span className="font-semibold">{hotel.nombre}</span>
            <span className="font-normal text-graphite">
              {" "}
              — {hotel.resumen}
            </span>
          </h1>

          {/* Fila de specs con iconos */}
          <ul className="mt-7 flex flex-wrap items-center gap-x-8 gap-y-3">
            <Spec icono={<Personas />}>
              {hotel.capacidad === null
                ? "Capacidad sin dato"
                : `${hotel.capacidad} personas`}
            </Spec>
            <Spec icono={<Cama />}>
              {tiposHabitacion}{" "}
              {tiposHabitacion === 1 ? "tipo de tarifa" : "tipos de habitación"}
            </Spec>
            <Spec icono={<Taza />}>
              {hotel.caracteristicas.desayunoIncluido
                ? "Desayuno incluido"
                : "Desayuno $6 aparte"}
            </Spec>
            <Spec icono={<Clima />}>
              {textoAire[hotel.caracteristicas.aire ?? "null"]}
            </Spec>
            <Spec
              icono={
                hotel.caracteristicas.elevador === true ? <Elevador /> : <Escalera />
              }
            >
              {hotel.caracteristicas.elevador === true
                ? "Con elevador"
                : hotel.caracteristicas.elevador === false
                  ? "Solo gradas"
                  : "Acceso sin dato"}
            </Spec>
          </ul>

          <div className="mt-10 h-px w-full max-w-[18rem] bg-line" />

          {/* Descripción y tarifas */}
          <div className="mt-10 grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,22rem)] lg:gap-16">
            <div>
              <h2 className="font-display text-2xl text-ink">Descripción</h2>
              <p className="mt-5 max-w-[64ch] text-lg leading-relaxed text-graphite">
                {/* `replace`: las notas se escriben sin punto final, pero una
                    que lo traiga no debe terminar en dos puntos seguidos. */}
                {hotel.resumen}{" "}
                {hotel.capacidadNota &&
                  `${hotel.capacidadNota.replace(/\.$/, "")}.`}
              </p>

              <h2 className="mt-12 font-display text-2xl text-ink">Tarifas</h2>
              <ul className="mt-5 divide-y divide-line border-y border-line">
                {hotel.habitaciones.map((habitacion) => (
                  <li key={habitacion.nombre} className="py-6">
                    <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
                      <div className="max-w-[38ch]">
                        <p className="text-ink">{habitacion.nombre}</p>
                        {/*
                          Las camas van en su propio renglón y antes que el
                          resto del detalle. Es el dato que decide si una
                          habitación «para 4» sirve o no —cuatro adultos en dos
                          camas full es de a dos por cama—, y hasta el 26 de
                          agosto vivía enterrado a mitad de la frase de
                          `detalle`. Las 18 tarifas cuya fuente no dice nada de
                          camas no muestran renglón: callar no es decir «no
                          tiene».
                        */}
                        {habitacion.camas && (
                          <p className="mt-1 text-sm text-cobalt-deep">
                            {habitacion.camas}
                          </p>
                        )}
                        {habitacion.detalle && (
                          <p className="mt-0.5 text-sm text-mute">
                            {habitacion.detalle}
                          </p>
                        )}
                      </div>

                      <p className="text-right">
                        <span className="font-display text-2xl text-ink tabular-nums">
                          {dinero(totalTarifa(habitacion))}
                        </span>
                        <span className="block text-xs text-mute">
                          {habitacion.unidad === "persona-noche"
                            ? `una persona, ${evento.noches} noches`
                            : `la habitación, ${evento.noches} noches`}
                        </span>
                        <span className="block text-xs text-mute">
                          {dinero(habitacion.precio)}{" "}
                          {habitacion.unidad === "persona-noche"
                            ? "por persona / noche"
                            : "por noche"}
                        </span>
                      </p>
                    </div>

                    {/*
                      El reparto: lo mismo dividido según cuánta gente comparta
                      la habitación, porque una tarifa por habitación no cuesta
                      lo mismo por cabeza si la ocupa una persona sola que si
                      la ocupan cuatro. Se llega hasta `personas` y ni una más:
                      ese es el tope que cubre la tarifa según la fuente, no la
                      cantidad de camas.

                      Las tarifas por persona-noche no llevan reparto: el
                      precio ya es por cabeza y no cambia con la ocupación.
                    */}
                    {habitacion.unidad === "habitacion-noche" && (
                      <div className="mt-4 border-t border-line pt-3">
                        {/*
                          El tope se dice, no se deja adivinar. Sin esta
                          aclaración, una «Cuádruple» que muestra «2 camas
                          dobles» y un reparto que se corta en dos parece un
                          error de la página. No lo es: en La Guaria el
                          documento cotiza TODOS los tipos en ocupación doble y
                          no dice cuánto cuesta la persona adicional —está
                          anotado en los pendientes del hotel—. El límite sale
                          de la fuente, no de las camas.
                        */}
                        <p className="text-xs tracking-wide text-mute uppercase">
                          Por persona, según cuántos la compartan · la tarifa
                          cubre hasta {habitacion.personas}
                        </p>
                        <ul className="mt-2 flex flex-wrap gap-x-6 gap-y-1.5">
                          {Array.from(
                            { length: habitacion.personas },
                            (_, i) => i + 1,
                          ).map((ocupantes) => (
                            <li
                              key={ocupantes}
                              className="text-sm text-graphite tabular-nums"
                            >
                              {ocupantes === 1
                                ? "Sola"
                                : `Entre ${ocupantes}`}
                              <span className="ml-1.5 font-display text-ink">
                                {dinero(totalTarifa(habitacion) / ocupantes)}
                              </span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </li>
                ))}
              </ul>
            </div>

            <aside className="lg:sticky lg:top-24 lg:self-start">
              <div className="border border-line p-6">
                <p className="text-[0.65rem] tracking-wider text-mute uppercase">
                  Estadía de {evento.noches} noches
                </p>
                <p className="mt-1.5 font-display text-4xl text-brass tabular-nums">
                  {dosPersonas === null ? "—" : dinero(dosPersonas.total / 2)}
                </p>
                <p className="mt-1.5 text-xs leading-relaxed text-mute">
                  Por persona, compartiendo de a dos con la opción más barata
                  del hotel. La tabla de tarifas dice cuánto cambia si la
                  habitación se comparte entre más o se ocupa sola.
                </p>

                <h2 className="mt-8 border-t border-line pt-6 font-display text-xl text-ink">
                  Qué incluye
                </h2>
                <ul className="mt-4 space-y-2.5 text-sm">
                  {incluye.map((item) => (
                    <li key={item} className="flex gap-3 text-cobalt">
                      <Check />
                      <span className="text-graphite">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {hotel.contacto && (
                <div className="mt-4 border border-line p-6">
                  <h2 className="font-display text-xl text-ink">Reservas</h2>

                  {hotel.contacto.telefonos && (
                    <ul className="mt-4 space-y-1.5">
                      {hotel.contacto.telefonos.map((tel) => (
                        <li key={tel}>
                          <a
                            href={`tel:${tel.replace(/[^\d+]/g, "")}`}
                            className="cursor-pointer text-sm text-ink tabular-nums underline decoration-line underline-offset-4 transition-colors duration-200 hover:text-cobalt-deep"
                          >
                            {tel}
                          </a>
                        </li>
                      ))}
                    </ul>
                  )}

                  {hotel.contacto.correos && (
                    <ul className="mt-3 space-y-1.5">
                      {hotel.contacto.correos.map((correo) => (
                        <li key={correo}>
                          <a
                            href={`mailto:${correo}`}
                            className="cursor-pointer text-sm break-all text-ink underline decoration-line underline-offset-4 transition-colors duration-200 hover:text-cobalt-deep"
                          >
                            {correo}
                          </a>
                        </li>
                      ))}
                    </ul>
                  )}

                  {hotel.contacto.nota && (
                    <p className="mt-4 border-t border-line pt-4 text-xs leading-relaxed text-mute">
                      {hotel.contacto.nota}
                    </p>
                  )}
                </div>
              )}

              <Link
                href="/#hoteles"
                className="mt-4 block cursor-pointer border border-ink px-6 py-3.5 text-center text-sm font-medium text-ink transition-colors duration-200 hover:bg-ink hover:text-bone"
              >
                Ver todos los hoteles
              </Link>
            </aside>
          </div>

          {/* Otros hoteles */}
          <section className="mt-20 border-t border-line pt-12">
            <h2 className="font-display text-2xl text-ink">Otros hoteles</h2>
            <ul className="mt-6 grid gap-6 sm:grid-cols-3">
              {otros.map((otro) => (
                <li key={otro.slug}>
                  <Link
                    href={`/hoteles/${otro.slug}`}
                    className="group block cursor-pointer border border-line transition-colors duration-200 hover:border-ink"
                  >
                    <div className="relative aspect-16/10 overflow-hidden">
                      {otro.imagenes[0] ? (
                        <Foto
                          src={otro.imagenes[0].src}
                          alt={otro.imagenes[0].alt}
                          fill
                          sizes="(min-width: 640px) 30vw, 100vw"
                          className="object-cover transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105 motion-reduce:transition-none motion-reduce:group-hover:scale-100"
                        />
                      ) : (
                        <span className="flex h-full w-full items-center justify-center bg-bone-dim text-xs tracking-wider text-mute uppercase">
                          Fotos pendientes
                        </span>
                      )}
                    </div>
                    <div className="p-4">
                      {(() => {
                        const suNivel = nivelPorId.get(otro.nivel);
                        return (
                          suNivel && (
                            <Estrellas
                              rango={suNivel.estrellas}
                              leyenda={suNivel.leyenda}
                              className="text-brass"
                            />
                          )
                        );
                      })()}
                      <p className="mt-2 font-display text-lg text-ink">
                        {otro.nombre}
                      </p>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </main>

      <SiteFooter />
    </>
  );
}
