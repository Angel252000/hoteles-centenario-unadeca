import Link from "next/link";
import { Estrellas } from "@/components/ui/estrellas";
import { Foto } from "@/components/ui/foto";
import { nivelDe, type Hotel } from "@/lib/datos";

/**
 * Tres hoteles más al pie de la ficha, para que la página no sea un callejón
 * sin salida. La vuelta principal a la lista está arriba y en el panel
 * lateral; esto es para quien llegó hasta el final y todavía está comparando.
 */
export function OtrosHoteles({ hoteles }: { hoteles: Hotel[] }) {
  return (
    <section className="mt-20 border-t border-line pt-12">
      <h2 className="font-display text-2xl text-ink">Otros hoteles</h2>
      <ul className="mt-6 grid gap-6 sm:grid-cols-3">
        {hoteles.map((otro) => {
          const suNivel = nivelDe(otro);

          return (
            <li key={otro.slug}>
              <Link
                href={`/hoteles/${otro.slug}`}
                className="group block cursor-pointer border border-line transition-colors duration-200 hover:border-ink"
              >
                <div className="relative aspect-16/10 overflow-hidden">
                  {/* Un hotel puede no haber mandado fotos todavía. */}
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
                  {suNivel && (
                    <Estrellas
                      rango={suNivel.estrellas}
                      leyenda={suNivel.leyenda}
                      className="text-brass"
                    />
                  )}
                  <p className="mt-2 font-display text-lg text-ink">
                    {otro.nombre}
                  </p>
                </div>
              </Link>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
