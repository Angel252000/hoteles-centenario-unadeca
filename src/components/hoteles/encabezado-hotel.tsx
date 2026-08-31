import { Estrellas } from "@/components/ui/estrellas";
import {
  Cama,
  Clima,
  Elevador,
  Escalera,
  Personas,
  Pin,
  Taza,
} from "@/components/ui/iconos";
import { Spec } from "@/components/ui/spec";
import {
  costoDosPersonas,
  dinero,
  evento,
  nivelDe,
  type Hotel,
} from "@/lib/datos";

/**
 * Lo que se lee al llegar a la ficha: el precio, el nivel, el nombre y la
 * fila de datos duros.
 *
 * `null` no es `false`. Cuando el hotel no informó el clima o el acceso, el
 * texto lo dice —«Clima sin dato»— en vez de afirmar que no lo tiene. Ver la
 * regla 1 de `docs/ARQUITECTURA.md`.
 */
const textoAire = {
  si: "Aire acondicionado",
  parcial: "A/C en parte del hotel",
  no: "Solo ventilador",
  // El hotel no lo informó. No es lo mismo que "no tiene".
  null: "Clima sin dato",
} as const;

export function EncabezadoHotel({ hotel }: { hotel: Hotel }) {
  const dosPersonas = costoDosPersonas(hotel);
  const nivel = nivelDe(hotel);
  const tiposHabitacion = hotel.habitaciones.length;

  return (
    <>
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
                  {dinero(dosPersonas.tarifa.precio)} por persona y por noche,
                  en «{dosPersonas.tarifa.nombre}», por 2 personas y{" "}
                  {evento.noches} noches.
                </>
              ) : dosPersonas.tarifa.personas >= 2 ? (
                <>
                  Una «{dosPersonas.tarifa.nombre}» a{" "}
                  {dinero(dosPersonas.tarifa.precio)} la noche, que cubre{" "}
                  {dosPersonas.tarifa.personas} personas, por {evento.noches}{" "}
                  noches.
                </>
              ) : (
                <>
                  Dos «{dosPersonas.tarifa.nombre}» a{" "}
                  {dinero(dosPersonas.tarifa.precio)} la noche cada una —esta
                  tarifa cubre una sola persona—, por {evento.noches} noches.
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
        <span className="font-normal text-graphite"> — {hotel.resumen}</span>
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
    </>
  );
}
