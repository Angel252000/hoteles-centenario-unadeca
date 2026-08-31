import { dinero, evento, totalTarifa, type Hotel } from "@/lib/datos";

/**
 * Todas las tarifas del hotel, con lo que sale cada una por la estadía
 * completa y cuánto queda por cabeza según cuánta gente comparta.
 *
 * Es la parte de la ficha que más reglas del dominio lleva encima, y por eso
 * es la que más comentarios tiene: qué se calla, hasta dónde llega el reparto,
 * y por qué las tarifas por persona no lo muestran.
 */
export function TablaTarifas({ hotel }: { hotel: Hotel }) {
  return (
    <>
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
