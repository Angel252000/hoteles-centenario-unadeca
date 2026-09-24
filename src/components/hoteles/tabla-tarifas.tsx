import { dinero, evento, tarifaMostrada, totalTarifa, type Hotel } from "@/lib/datos";

/**
 * Todas las tarifas del hotel, con lo que sale cada una por la estadía
 * completa y cuánto queda por cabeza según cuánta gente comparta.
 *
 * Es la parte de la ficha que más reglas del dominio lleva encima, y por eso
 * es la que más comentarios tiene: qué se calla, hasta dónde llega el reparto,
 * y por qué las tarifas por persona no lo muestran.
 */
export function TablaTarifas({ hotel }: { hotel: Hotel }) {
  const hayPorHabitacion = hotel.habitaciones.some(
    (h) => h.unidad === "habitacion-noche",
  );
  const hayPorPersona = hotel.habitaciones.some(
    (h) => h.unidad === "persona-noche",
  );

  return (
    <>
      <h2 className="mt-12 font-display text-2xl text-ink">Tarifas</h2>

      {/*
        Como se lee la tabla, antes de la tabla.

        Un hotel puede traer seis filas que cuestan distinto por tres razones
        que no se parecen: el tipo de habitacion, cuanta gente cubre la tarifa
        y si el hotel cobra por habitacion o por cabeza. Sin decirlo, el que
        mira seis cifras distintas no sabe cual le toca.

        El texto se arma con los datos del hotel y no es el mismo para todos:
        decirle «algunas tarifas son por persona» a un hotel que no tiene
        ninguna es ruido. Ver §27 de docs/MEJORAS.md.
      */}
      <div className="mt-4 max-w-[64ch] space-y-2 text-sm leading-relaxed text-graphite">
        <p>
          <span className="font-medium text-ink">Cómo leer esta tabla.</span> De
          cada tarifa se muestran dos cifras: la grande es lo que cuesta{" "}
          <span className="text-ink">
            toda la estadía de {evento.noches} noches
          </span>
          , y debajo va la misma tarifa{" "}
          <span className="text-ink">por noche</span>, que es la que sirve para
          contrastarla con lo que cotizó el hotel.
        </p>

        {hayPorHabitacion && (
          <p>
            {hayPorPersona ? "Algunas tarifas se cobran" : "Las tarifas se cobran"}{" "}
            <span className="text-ink">por habitación</span>: el precio es la
            habitación entera y no cambia si la ocupa una persona o las que
            quepan. Por eso cada fila dice hasta cuántas personas cubre, y
            debajo se reparte esa cifra entre uno, dos o más ocupantes: el
            precio no baja, se divide.
          </p>
        )}

        {hayPorPersona && (
          <p>
            {hayPorHabitacion ? "Otras se cobran" : "Las tarifas se cobran"}{" "}
            <span className="text-ink">por persona</span>: ahí el precio grande
            corresponde a <span className="text-ink">dos personas</span>, para
            que se pueda comparar con los hoteles que cobran por habitación.
            Debajo de cada una va lo que sale una sola persona.
          </p>
        )}

        <p>
          Las diferencias entre filas son de{" "}
          <span className="text-ink">tipo de habitación</span> y de{" "}
          <span className="text-ink">cuánta gente cubre</span> cada tarifa. Los
          precios salen de lo que cada hotel cotizó para el {evento.nombre};
          conviene confirmarlos al reservar.
        </p>
      </div>

      <ul className="mt-6 divide-y divide-line border-y border-line">
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

              {/*
                Las dos cifras, en el mismo orden en las diez fichas: lo que
                cuesta por noche y lo que cuesta la estadia entera. La grande
                es el total, que es lo que se compara contra el presupuesto;
                la de por noche va debajo porque es la que deja verificar el
                total contra la hoja del hotel.

                `tarifaMostrada` decide la ocupacion: la habitacion tal cual
                si el hotel cotiza por habitacion, dos personas si cotiza por
                persona. Ver §27 de docs/MEJORAS.md.
              */}
              <p className="text-right">
                <span className="font-display text-2xl text-ink tabular-nums">
                  {dinero(tarifaMostrada(habitacion).total)}
                </span>
                <span className="block text-xs text-mute">
                  {tarifaMostrada(habitacion).etiqueta}
                </span>
                <span className="mt-0.5 block text-sm text-graphite tabular-nums">
                  {dinero(tarifaMostrada(habitacion).porNoche)} por noche
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
            {/*
              Las por persona no llevan el reparto de arriba —el precio ya es
              por cabeza y no cambia con la ocupacion—, pero desde §27 la
              cifra grande es la de dos personas, asi que hay que decir cuanto
              es una. Sin esto el total se lee como si fuera por cabeza.
            */}
            {habitacion.unidad === "persona-noche" && (
              <div className="mt-4 border-t border-line pt-3">
                <p className="text-xs tracking-wide text-mute uppercase">
                  Por persona
                </p>
                <p className="mt-2 text-sm text-graphite tabular-nums">
                  {dinero(habitacion.precio)} por noche
                  <span className="ml-1.5 font-display text-ink">
                    {dinero(totalTarifa(habitacion))}
                  </span>
                  <span className="ml-1.5 text-mute">
                    las {evento.noches} noches
                  </span>
                </p>
              </div>
            )}

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
                  Por persona, según cuántos la compartan · la tarifa cubre
                  hasta {habitacion.personas}
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
                      {ocupantes === 1 ? "Sola" : `Entre ${ocupantes}`}
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
    </>
  );
}
