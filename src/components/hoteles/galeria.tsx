"use client";

import { Foto } from "@/components/ui/foto";
import type { Imagen } from "@/lib/datos";
import { useCallback, useRef, useState } from "react";
import { IconoFotos } from "@/components/ui/iconos";
import { VisorFotos } from "@/components/hoteles/visor-fotos";
import { anchoNativo } from "@/lib/imagen-tamanos";

/**
 * Hueco honesto para un hotel que todavía no mandó fotos. Preferimos decirlo
 * a llenar el espacio con la foto de otra sede.
 */
function SinFotos() {
  return (
    // Alto fijo y contenido: un hueco proporcional al mosaico dejaría medio
    // viewport en blanco, y el aviso pesaría más que la ficha.
    <div className="flex h-52 w-full flex-col items-center justify-center gap-3 border border-line bg-bone-dim/60 px-6 text-center sm:h-64">
      <span className="text-mute">
        <IconoFotos />
      </span>
      <p className="font-display text-xl text-ink">Fotos pendientes</p>
      <p className="max-w-[42ch] text-sm text-mute">
        El hotel todavía no envió imágenes de esta sede.
      </p>
    </div>
  );
}

/**
 * Mosaico 1 + 4 al estilo de las fichas de propiedad: la foto grande manda,
 * cuatro acompañan, y una píldora «+N fotos» abre la galería completa.
 * Cualquier foto del mosaico abre el visor en ella.
 *
 * Este archivo es solo el mosaico y la decisión de abrir. El visor a pantalla
 * completa —teclado, trampa de foco, bloqueo de scroll, gestos, precarga—
 * vive en `visor-fotos.tsx`.
 */
export function Galeria({
  fotos,
  hotel,
  lleno = false,
}: {
  fotos: Imagen[];
  hotel: string;
  /** Banda de «hotel lleno» sobre la foto grande. Ver §20 de MEJORAS.md. */
  lleno?: boolean;
}) {
  const [abierto, setAbierto] = useState(false);
  const [indiceInicial, setIndiceInicial] = useState(0);
  const [precargar, setPrecargar] = useState(false);
  const disparadorRef = useRef<HTMLElement | null>(null);

  const total = fotos.length;

  const abrir = (i: number, origen: HTMLElement) => {
    // De quién salió el clic, para devolverle el foco cuando el visor se
    // vaya. El visor no lo sabe ni tiene por qué.
    disparadorRef.current = origen;
    setIndiceInicial(i);
    setAbierto(true);

    /*
      Decidir acá si se precarga la foto siguiente, y no dentro del visor:
      esto corre por un clic, o sea siempre en el navegador, donde
      `navigator` existe de verdad.

      Adelantar la descarga hace que el paso se sienta inmediato, pero son
      datos que se gastan por una foto que quizá nadie mire. Con «ahorro de
      datos» activo, o en una red 2G, no se precarga nada: ahí el dato vale
      más que la espera.
    */
    const red = (
      navigator as Navigator & {
        connection?: { saveData?: boolean; effectiveType?: string };
      }
    ).connection;

    setPrecargar(
      red?.saveData !== true &&
        !(
          red?.effectiveType !== undefined &&
          /^(slow-)?2g$/.test(red.effectiveType)
        ),
    );
  };

  const cerrar = useCallback(() => setAbierto(false), []);

  // El visor la llama al desmontarse, con el scroll ya devuelto a su lugar.
  const devolverFoco = useCallback(
    () => disparadorRef.current?.focus({ preventScroll: true }),
    [],
  );

  if (total === 0) return <SinFotos />;

  /*
    Reparto de §26: una grande y DOS al lado, no cuatro.

    Con cuatro, cada foto secundaria quedaba en un cuarto del mosaico —unos
    300 px de ancho en escritorio— y se pedian a 25vw. Son fotos de 375 a 750
    px: mostrarlas chicas desperdicia lo unico que tienen. Con dos, cada una
    ocupa el doble y la tira de abajo se lleva el resto, que es como lo
    resuelven las paginas de hotel.
  */
  const [portada, ...resto] = fotos;
  const mosaico = resto.slice(0, 2);
  const tira = resto.slice(2, 8);
  const restantes = total - 1 - mosaico.length - tira.length;

  // La foto grande ocupa la mitad del mosaico: topando el ancho total al doble
  // de su resolución nativa, nunca se muestra ampliada ni se ve blanda.
  const nativo = anchoNativo(portada.src);
  const topeMosaico = nativo ? `${nativo * 2}px` : undefined;

  return (
    <>
      <div
        className="mx-auto grid gap-2 lg:grid-cols-[1.55fr_1fr]"
        style={topeMosaico ? { maxWidth: topeMosaico } : undefined}
      >
        <button
          type="button"
          onClick={(e) => abrir(0, e.currentTarget)}
          aria-label={`Ampliar: ${portada.alt}`}
          className="group relative aspect-4/3 w-full cursor-zoom-in overflow-hidden lg:aspect-3/2"
        >
          <Foto
            src={portada.src}
            alt={portada.alt}
            fill
            priority
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.02] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
          />

          {/*
            La banda de «lleno» va sobre la foto grande, igual que en la ficha
            de la parrilla. `pointer-events-none` para que el boton de ampliar
            siga respondiendo debajo: el hotel se lee entero, solo que sabiendo
            de entrada que no tiene lugar.
          */}
          {lleno && (
            <>
              <span
                aria-hidden
                className="pointer-events-none absolute inset-0 bg-ink/45"
              />
              <span className="pointer-events-none absolute inset-x-0 top-1/2 -translate-y-1/2 bg-ink/90 py-3 text-center text-base font-semibold tracking-[0.18em] text-bone uppercase shadow-lift sm:text-lg">
                Hotel lleno
              </span>
            </>
          )}

          {/* En teléfono la píldora vive sobre la foto grande: en las miniaturas
              no cabría sin taparlas. */}
          <span className="absolute right-3 bottom-3 flex items-center gap-2 rounded-full bg-bone px-4 py-2.5 text-xs font-medium text-ink shadow-lg lg:hidden">
            <IconoFotos />
            Ver las {total}
          </span>
        </button>

        <ul className="grid grid-cols-2 gap-2 lg:grid-cols-1 lg:grid-rows-2">
          {mosaico.map((foto, i) => {
            const esUltima = i === mosaico.length - 1;

            return (
              <li key={foto.src} className="relative">
                <button
                  type="button"
                  onClick={(e) => abrir(i + 1, e.currentTarget)}
                  aria-label={`Ampliar: ${foto.alt}`}
                  className="group relative block aspect-4/3 w-full cursor-zoom-in overflow-hidden lg:aspect-auto lg:h-full"
                >
                  <Foto
                    src={foto.src}
                    alt={foto.alt}
                    fill
                    sizes="(min-width: 1024px) 38vw, 50vw"
                    className="object-cover transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.03] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
                  />
                </button>

                {esUltima && (
                  <button
                    type="button"
                    onClick={(e) => abrir(0, e.currentTarget)}
                    className="absolute right-3 bottom-3 hidden cursor-pointer items-center gap-2 rounded-full bg-bone px-4 py-2.5 text-xs font-medium text-ink shadow-lg transition-colors duration-200 hover:bg-ink hover:text-bone lg:flex"
                  >
                    <IconoFotos />
                    {/* Desde §26 el sobrante lo dice la tira de abajo, en la
                        ultima miniatura. Aca basta con abrir la galeria. */}
                    Ver las {total}
                  </button>
                )}
              </li>
            );
          })}
        </ul>

        {/*
          Tira de miniaturas, como la de cualquier pagina de hotel.

          El mosaico muestra cinco fotos; los hoteles que mandaron mas —el 1915
          manda nueve— dejaban el resto detras de un boton que hay que
          descubrir. La tira las pone a la vista y cada una abre el visor en su
          foto, no en la primera.

          `lg:` a proposito: en telefono el mosaico ya ocupa la pantalla y una
          fila mas de fotos chicas empuja el precio fuera de vista. Ahi sigue
          mandando la pildora «Ver las N».

          Seis columnas fijas, no `auto-fit`: con `auto-fit` la tira del
          Courtyard —dos fotos sobrantes— las estiraba a media pantalla cada
          una y dejaban de ser miniaturas. Fijo, la miniatura mide lo mismo en
          las diez fichas, tenga el hotel cinco fotos o nueve.

          Ver §26 de docs/MEJORAS.md.
        */}
        {tira.length > 0 && (
          <ul className="hidden grid-cols-6 gap-2 lg:col-span-2 lg:grid">
            {tira.map((foto, i) => (
              <li key={foto.src} className="relative">
                <button
                  type="button"
                  onClick={(e) => abrir(i + 3, e.currentTarget)}
                  aria-label={`Ampliar: ${foto.alt}`}
                  className="group relative block aspect-4/3 w-full cursor-zoom-in overflow-hidden"
                >
                  <Foto
                    src={foto.src}
                    alt={foto.alt}
                    fill
                    sizes="12vw"
                    className="object-cover transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.05] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
                  />

                  {/* La ultima carga el resto, como en cualquier galeria de
                      hotel: se ve que hay mas sin gastar otra fila. */}
                  {i === tira.length - 1 && restantes > 0 && (
                    <span className="absolute inset-0 flex items-center justify-center bg-ink/70 text-sm font-medium text-bone">
                      {restantes} fotos más
                    </span>
                  )}
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      {abierto && (
        <VisorFotos
          fotos={fotos}
          hotel={hotel}
          lleno={lleno}
          indiceInicial={indiceInicial}
          precargar={precargar}
          alPedirCierre={cerrar}
          alSalir={devolverFoco}
        />
      )}
    </>
  );
}
