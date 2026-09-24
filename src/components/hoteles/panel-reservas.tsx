import Link from "next/link";
import { Check } from "@/components/ui/iconos";
import { costoDosPersonas, dinero, evento, type Hotel } from "@/lib/datos";

/**
 * La columna que acompaña a la tabla de tarifas: el precio por cabeza, qué
 * incluye, y con quién hablar para reservar.
 *
 * Queda pegada al hacer scroll (`lg:sticky`) porque la tabla de tarifas es
 * larga y el teléfono del hotel es lo que se busca justo después de mirarla.
 */
export function PanelReservas({ hotel }: { hotel: Hotel }) {
  const dosPersonas = costoDosPersonas(hotel);

  /*
    Qué incluye.

    `filter`: clima y acceso son `null` cuando el hotel no los informó, y una
    viñeta con visto que diga «El hotel no lo indicó» se lee como un servicio.
  */
  const incluye = [
    hotel.desayuno,
    hotel.clima,
    hotel.acceso,
    ...hotel.servicios,
  ].filter((item): item is string => Boolean(item));

  return (
    <aside className="lg:sticky lg:top-24 lg:self-start">
      <div className="border border-line p-6">
        <p className="text-[0.65rem] tracking-wider text-mute uppercase">
          Estadía de {evento.noches} noches
        </p>
        <p className="mt-1.5 font-display text-4xl text-brass tabular-nums">
          {dosPersonas === null ? "—" : dinero(dosPersonas.total / 2)}
        </p>
        <p className="mt-1.5 text-xs leading-relaxed text-mute">
          Por persona, compartiendo de a dos con la opción más barata del
          hotel. La tabla de tarifas dice cuánto cambia si la habitación se
          comparte entre más o se ocupa sola.
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
  );
}
