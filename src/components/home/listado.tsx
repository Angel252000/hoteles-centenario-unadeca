import { HotelCard } from "@/components/hoteles/hotel-card";
import { Reveal } from "@/components/ui/reveal";
import { hoteles } from "@/lib/datos";

/**
 * Parrilla completa de hoteles. Antes traía filtros por categoría, precio y
 * servicios; se quitaron porque con la lista a la vista y una sola pantalla de
 * scroll, filtrar costaba más de lo que ahorraba. Al no quedar estado, esto
 * dejó de ser componente de cliente y ya no manda JavaScript al navegador.
 */
export function Listado() {
  return (
    <section
      id="hoteles"
      className="scroll-mt-20 border-b border-line py-20 sm:py-28"
    >
      <div className="mx-auto max-w-[88rem] px-5 sm:px-8">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="eyebrow text-brass">Alajuela, Costa Rica</p>
            <h2 className="display-lg mt-5 max-w-[18ch]">
              Hoteles recomendados
            </h2>
          </div>
          <p className="text-sm text-mute tabular-nums">
            {hoteles.length} hoteles
          </p>
        </div>

        <div className="mt-12 grid gap-7 border-t border-line pt-12 sm:grid-cols-2 lg:grid-cols-3">
          {hoteles.map((hotel, i) => (
            /*
              El retardo va por columna (`i % 3`), no por posición absoluta:
              así cada fila cae de izquierda a derecha y la décima ficha no
              tiene que esperar medio segundo para aparecer.
            */
            <Reveal key={hotel.slug} className="h-full" delay={(i % 3) * 0.08}>
              <HotelCard hotel={hotel} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
