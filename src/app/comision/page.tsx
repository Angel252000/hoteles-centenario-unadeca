import type { Metadata } from "next";
import Link from "next/link";
import { SiteFooter } from "@/components/layout/site-footer";
import {
  dinero,
  evento,
  hoteles,
  pendientesGenerales,
  totalCotizado,
} from "@/lib/datos";

export const metadata: Metadata = {
  title: "Pendientes de la cotización — uso interno",
  description:
    "Datos que faltan confirmar con cada hotel antes de cerrar el hospedaje del Centenario.",
  robots: { index: false, follow: false },
};

const porHotel = hoteles.flatMap((hotel) =>
  hotel.pendientes.map((punto) => ({ hotel: hotel.nombre, punto })),
);

/** Hoteles con desglose ya cotizado en el documento original. */
const cotizados = hoteles
  .map((hotel) => ({ hotel, total: totalCotizado(hotel) }))
  .filter((fila): fila is { hotel: (typeof hoteles)[number]; total: number } =>
    fila.total !== null,
  );

export default function Comision() {
  return (
    <>
      <header className="border-b border-line">
        <div className="mx-auto flex h-16 max-w-[70rem] items-center justify-between px-5 sm:px-8">
          <Link href="/" className="font-display text-lg text-ink">
            Hospedaje<span className="text-brass">.</span>
          </Link>
          <span className="text-sm text-mute">Uso interno</span>
        </div>
      </header>

      <main className="flex-1">
        <div className="mx-auto max-w-[70rem] px-5 py-16 sm:px-8 sm:py-24">
          <p className="eyebrow text-brass">Comisión de hospedaje</p>
          <h1 className="display-lg mt-5 max-w-[20ch]">
            Lo que falta confirmar con los hoteles
          </h1>
          <p className="mt-6 max-w-[60ch] text-lg leading-relaxed text-graphite">
            Esta página no aparece en el menú del sitio ni se indexa. Son los{" "}
            {pendientesGenerales.length + porHotel.length} puntos que el documento
            de cotizaciones deja abiertos.
          </p>

          {cotizados.length > 0 && (
            <>
              <h2 className="mt-16 font-display text-2xl text-ink">
                Desglose cotizado — {evento.personas} personas, {evento.noches}{" "}
                noches
              </h2>
              {cotizados.map(({ hotel, total }) => (
                <div key={hotel.slug} className="mt-6">
                  <h3 className="text-sm text-brass">{hotel.nombre}</h3>
                  <ul className="mt-3 divide-y divide-line border-y border-line">
                    {hotel.habitaciones
                      .filter((h) => h.cotizado)
                      .map((h) => (
                        <li
                          key={h.nombre}
                          className="flex items-baseline justify-between gap-4 py-3 text-sm"
                        >
                          <span>
                            {h.nombre}
                            <span className="ml-2 text-mute">
                              ×{h.cotizado!.unidades}
                            </span>
                          </span>
                          <span className="tabular-nums">
                            {dinero(h.cotizado!.total)}
                          </span>
                        </li>
                      ))}
                    <li className="flex items-baseline justify-between gap-4 py-3 text-sm font-medium text-ink">
                      <span>Total sin desayunos</span>
                      <span className="tabular-nums">{dinero(total)}</span>
                    </li>
                    <li className="flex items-baseline justify-between gap-4 py-3 text-sm">
                      <span className="text-mute">
                        Desayunos ({evento.personas} × $6 × {evento.noches})
                      </span>
                      <span className="tabular-nums">
                        {dinero(evento.personas * 6 * evento.noches)}
                      </span>
                    </li>
                    <li className="flex items-baseline justify-between gap-4 py-3 font-display text-lg text-ink">
                      <span>Total con desayunos</span>
                      <span className="tabular-nums">
                        {dinero(total + evento.personas * 6 * evento.noches)}
                      </span>
                    </li>
                  </ul>
                </div>
              ))}
            </>
          )}

          <h2 className="mt-16 font-display text-2xl text-ink">
            De toda la cotización
          </h2>
          <ul className="mt-5 divide-y divide-line border-y border-line">
            {pendientesGenerales.map((punto) => (
              <li key={punto} className="py-4 leading-relaxed">
                {punto}
              </li>
            ))}
          </ul>

          <h2 className="mt-16 font-display text-2xl text-ink">Por hotel</h2>
          <ul className="mt-5 divide-y divide-line border-y border-line">
            {porHotel.map((item) => (
              <li
                key={`${item.hotel}-${item.punto}`}
                className="flex flex-wrap items-baseline gap-x-5 gap-y-1 py-4"
              >
                <span className="w-full shrink-0 text-sm text-brass sm:w-56">
                  {item.hotel}
                </span>
                <span className="flex-1 leading-relaxed">{item.punto}</span>
              </li>
            ))}
          </ul>
        </div>
      </main>

      <SiteFooter />
    </>
  );
}
