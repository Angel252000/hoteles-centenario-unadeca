import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { EncabezadoHotel } from "@/components/hoteles/encabezado-hotel";
import { Galeria } from "@/components/hoteles/galeria";
import { OtrosHoteles } from "@/components/hoteles/otros-hoteles";
import { PanelReservas } from "@/components/hoteles/panel-reservas";
import { TablaTarifas } from "@/components/hoteles/tabla-tarifas";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { FlechaIzquierda } from "@/components/ui/iconos";
import { hoteles } from "@/lib/datos";

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

/**
 * Ficha de un hotel. Solo ensambla, igual que la portada.
 *
 * Era una función de 417 líneas con todo el JSX adentro. Las secciones ya
 * estaban ahí —las marcaban los `<h2>`— pero ninguna tenía nombre, así que
 * para cambiar la tabla de tarifas había que barrer el archivo buscando dónde
 * empezaba. Ahora cada una es un componente y este archivo dice, de un
 * vistazo, qué trae la página y en qué orden.
 */
export default async function HotelPage({
  params,
}: PageProps<"/hoteles/[slug]">) {
  const { slug } = await params;
  const hotel = hoteles.find((h) => h.slug === slug);
  if (!hotel) notFound();

  const otros = hoteles.filter((h) => h.slug !== hotel.slug).slice(0, 3);

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
          <EncabezadoHotel hotel={hotel} />

          <div className="mt-10 h-px w-full max-w-[18rem] bg-line" />

          {/*
            Dos columnas: la descripción y las tarifas a la izquierda, el
            panel de reservas a la derecha. En pantalla angosta se apilan y el
            panel queda abajo, después de las tarifas, que es el orden en que
            se leen.
          */}
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

              <TablaTarifas hotel={hotel} />
            </div>

            <PanelReservas hotel={hotel} />
          </div>

          <OtrosHoteles hoteles={otros} />
        </div>
      </main>

      <SiteFooter />
    </>
  );
}
