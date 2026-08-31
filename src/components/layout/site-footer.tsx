import Link from "next/link";
import { evento, hoteles } from "@/lib/datos";

export function SiteFooter() {
  return (
    /*
      Bloque de cierre. Con el papel blanco, un pie sobre el mismo papel no
      terminaba la página: se quedaba sin contenido y nada más. El marino la
      cierra por cambio de superficie, que es lo que el ojo lee como final —no
      hace falta ni una línea ni un texto que lo diga.

      Todo lo de adentro se invierte con los tokens que el sistema ya traía
      para «sobre tinta» (`bone`, `mute-invert`, `brass-bright`,
      `line-invert`): ninguno es un color nuevo. Los de papel que había antes
      —`text-ink`, `text-graphite`, `text-mute`, `text-brass`— morían acá:
      `graphite` (#1e3160) sobre `ink` (#001841) da 1.28:1, ilegible.

      Se le quita el `border-t`: el borde del papel lo daba la hairline, pero
      ahora el corte de color ya es el límite y una línea encima lo repetiría.
    */
    <footer className="bg-ink py-14 text-bone">
      {/*
        La columna de la nav era `auto`: con seis hoteles cabía, con diez los
        nombres largos se comieron el ancho y dejaron el texto de la izquierda
        en una palabra por línea. Ahora la izquierda tiene ancho propio.
      */}
      <div className="mx-auto grid max-w-[88rem] gap-10 px-5 sm:px-8 md:grid-cols-[minmax(0,20rem)_minmax(0,1fr)]">
        <div>
          <p className="font-display text-lg text-bone">
            Hospedaje<span className="text-brass-bright">.</span>
          </p>
          <p className="mt-3 max-w-[46ch] text-sm leading-relaxed text-mute-invert">
            {evento.nombre} · Alajuela, Costa Rica. Tarifas tomadas del documento
            de cotizaciones original, en dólares y sin descuento de grupo salvo
            donde se indique.
          </p>
        </div>

        <nav aria-label="Hoteles">
          <ul className="flex flex-wrap gap-x-6 gap-y-2 text-sm md:justify-end">
            {hoteles.map((hotel) => (
              <li key={hotel.slug}>
                <Link
                  href={`/hoteles/${hotel.slug}`}
                  className="cursor-pointer text-mute-invert transition-colors duration-200 hover:text-bone"
                >
                  {hotel.nombre}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <div className="mx-auto mt-12 max-w-[88rem] px-5 sm:px-8">
        <div className="rule-invert" />
        <p className="pt-6 text-xs text-mute-invert">
          © {new Date().getFullYear()} — Documento interno de trabajo.
        </p>
      </div>
    </footer>
  );
}
