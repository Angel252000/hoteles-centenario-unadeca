"use client";

import { Foto } from "@/components/ui/foto";
import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { FlechaIzquierda } from "@/components/ui/iconos";
import { anchoNativo } from "@/lib/imagen-tamanos";

export type Foto = { src: string; alt: string };

function Flecha({ hacia }: { hacia: "izquierda" | "derecha" }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className="h-5 w-5">
      <path
        d={hacia === "izquierda" ? "M15 4 7 12l8 8" : "M9 4l8 8-8 8"}
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      />
    </svg>
  );
}

function IconoFotos() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className="h-4 w-4">
      <rect
        x="3"
        y="5"
        width="18"
        height="14"
        rx="1.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <circle cx="8.5" cy="10" r="1.5" fill="currentColor" />
      <path
        d="m3.5 17 5-5 4 4 3-2.5 5 4"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      />
    </svg>
  );
}

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
 * Mosaico 1 + 4 con visor a pantalla completa, al estilo de las fichas de
 * propiedad: la foto grande manda, cuatro acompañan, y una píldora "+N fotos"
 * abre la galería completa. Cualquier foto del mosaico abre el visor en ella.
 */
export function Galeria({ fotos, hotel }: { fotos: Foto[]; hotel: string }) {
  const [abierto, setAbierto] = useState(false);
  const [indice, setIndice] = useState(0);
  const cerrarRef = useRef<HTMLButtonElement>(null);
  const disparadorRef = useRef<HTMLElement | null>(null);
  const dialogoRef = useRef<HTMLDivElement>(null);
  const inicioTactilRef = useRef<number | null>(null);
  const [precargar, setPrecargar] = useState(false);

  const total = fotos.length;
  const ir = useCallback(
    (paso: number) => setIndice((i) => (i + paso + total) % total),
    [total],
  );

  const abrir = (i: number, origen: HTMLElement) => {
    disparadorRef.current = origen;
    setIndice(i);
    setAbierto(true);

    /*
      Decidir acá si se precarga la foto siguiente, y no en un efecto: esto
      corre por un clic, o sea siempre en el navegador, donde `navigator`
      existe de verdad.

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

  // El foco no vuelve acá sino en la limpieza del efecto, después de
  // restaurar el scroll: enfocar con el `body` todavía en `position: fixed`
  // manda la página a otro lado.
  const cerrar = useCallback(() => setAbierto(false), []);

  /**
   * Deslizar para cambiar de foto. En un teléfono es el gesto que la gente
   * prueba antes que los botones.
   */
  const alTocar = (e: React.TouchEvent) => {
    inicioTactilRef.current = e.touches[0]?.clientX ?? null;
  };

  const alSoltar = (e: React.TouchEvent) => {
    const inicio = inicioTactilRef.current;
    inicioTactilRef.current = null;
    if (inicio === null) return;

    const recorrido = (e.changedTouches[0]?.clientX ?? inicio) - inicio;
    // Menos de 50px suele ser un toque con la mano temblando, no un gesto.
    if (Math.abs(recorrido) < 50) return;
    ir(recorrido < 0 ? 1 : -1);
  };

  useEffect(() => {
    if (!abierto) return;

    const alTeclear = (e: KeyboardEvent) => {
      if (e.key === "Escape") return cerrar();
      if (e.key === "ArrowRight") return ir(1);
      if (e.key === "ArrowLeft") return ir(-1);
      if (e.key !== "Tab") return;

      /*
        Trampa de foco.

        `aria-modal="true"` le dice al lector de pantalla que ignore lo de
        atrás, pero no toca el tabulador: sin esto, tabular sale del visor y
        sigue recorriendo los enlaces de la página tapada. Para quien navega
        con teclado el foco simplemente desaparece.

        Si se agrega un control al visor, entra solo en la lista: se consulta
        el DOM en cada pulsación en vez de mantener un arreglo aparte.
      */
      const dialogo = dialogoRef.current;
      if (!dialogo) return;

      const focos = dialogo.querySelectorAll<HTMLElement>(
        'button:not([disabled]), [href], [tabindex]:not([tabindex="-1"])',
      );
      if (focos.length === 0) return;

      const primero = focos[0];
      const ultimo = focos[focos.length - 1];
      const activo = document.activeElement;
      const adentro = activo instanceof Node && dialogo.contains(activo);

      if (e.shiftKey && (!adentro || activo === primero)) {
        e.preventDefault();
        ultimo.focus();
      } else if (!e.shiftKey && (!adentro || activo === ultimo)) {
        e.preventDefault();
        primero.focus();
      }
    };

    document.addEventListener("keydown", alTeclear);

    /*
      Bloqueo de scroll que aguanta iOS.

      `overflow: hidden` en el `body` alcanza en escritorio y en Android, pero
      Safari de iPhone lo ignora: la página de atrás se sigue moviendo con el
      dedo y al cerrar el visor quedó en otro lado. Fijar el `body` y
      compensar con `top` negativo sí lo detiene en todos lados; el precio es
      que hay que acordarse de la posición y devolverla al salir.
    */
    const desplazamiento = window.scrollY;
    const estilo = document.body.style;
    const previo = {
      position: estilo.position,
      top: estilo.top,
      left: estilo.left,
      right: estilo.right,
      overflow: estilo.overflow,
    };

    estilo.position = "fixed";
    estilo.top = `-${desplazamiento}px`;
    estilo.left = "0";
    estilo.right = "0";
    estilo.overflow = "hidden";

    cerrarRef.current?.focus();

    return () => {
      document.removeEventListener("keydown", alTeclear);
      Object.assign(estilo, previo);
      window.scrollTo(0, desplazamiento);
      // Recién ahora, con la página de vuelta en su sitio, el foco puede
      // volver a la miniatura sin arrastrar el scroll con él.
      disparadorRef.current?.focus({ preventScroll: true });
    };
  }, [abierto, cerrar, ir]);


  // Va después de todos los hooks: salir antes rompería el orden de llamada.
  if (total === 0) return <SinFotos />;

  const [portada, ...resto] = fotos;
  const mosaico = resto.slice(0, 4);
  const restantes = total - 1 - mosaico.length;
  const actual = fotos[indice];
  const siguiente = total > 1 ? fotos[(indice + 1) % total] : null;

  // La foto grande ocupa la mitad del mosaico: topando el ancho total al doble
  // de su resolución nativa, nunca se muestra ampliada ni se ve blanda.
  const nativo = anchoNativo(portada.src);
  const topeMosaico = nativo ? `${nativo * 2}px` : undefined;

  return (
    <>
      <div
        className="mx-auto grid gap-2 lg:grid-cols-2"
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

          {/* En teléfono la píldora vive sobre la foto grande: en las miniaturas
              no cabría sin taparlas. */}
          <span className="absolute right-3 bottom-3 flex items-center gap-2 rounded-full bg-bone px-4 py-2.5 text-xs font-medium text-ink shadow-lg lg:hidden">
            <IconoFotos />
            Ver las {total}
          </span>
        </button>

        <ul className="grid grid-cols-2 gap-2">
          {mosaico.map((foto, i) => {
            const esUltima = i === mosaico.length - 1;

            return (
              <li key={foto.src} className="relative">
                <button
                  type="button"
                  onClick={(e) => abrir(i + 1, e.currentTarget)}
                  aria-label={`Ampliar: ${foto.alt}`}
                  className="group relative block aspect-4/3 w-full cursor-zoom-in overflow-hidden"
                >
                  <Foto
                    src={foto.src}
                    alt={foto.alt}
                    fill
                    sizes="(min-width: 1024px) 25vw, 50vw"
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
                    {restantes > 0 ? `${restantes} más` : `Ver las ${total}`}
                  </button>
                )}
              </li>
            );
          })}
        </ul>
      </div>

      {/*
        El visor va por `createPortal` a `document.body`, no donde se declara.

        No es adorno: sin el portal quedaba TAPADO por el header. `globals.css`
        le da `position: relative; z-index: 1` a `body > *` —para que el
        contenido quede sobre el grano de papel—, y eso convierte a `<main>` en
        contexto de apilamiento. Adentro de ese contexto, el `z-50` del visor
        solo compite con sus hermanos: contra el `z-40` del header, que es
        hermano de `main` y no suyo, `main` entero vale 1 y pierde. El visor se
        abría abajo de la barra fija, con el botón «Volver» escondido detrás.

        Colgándolo de `body`, el visor pasa a ser hermano del header y ahí sí
        su `z-50` gana. `body > *` también lo alcanza, pero la clase `z-50`
        tiene más especificidad que el selector de elemento, así que manda.

        Se monta solo con `abierto`, que únicamente puede volverse `true` por
        un clic — o sea siempre en el navegador, nunca al renderizar en el
        servidor, donde `document` no existe.
      */}
      {abierto &&
        createPortal(
          <div
            ref={dialogoRef}
            role="dialog"
            aria-modal="true"
            aria-label={`Fotos de ${hotel}`}
            className="fixed inset-0 z-50 flex flex-col bg-ink/97"
          >
            <div className="flex items-center justify-between border-b border-line-invert px-5 py-4">
              <p className="text-sm text-mute-invert tabular-nums">
                {indice + 1} / {total}
                <span className="ml-3 hidden text-mute-invert/70 sm:inline">
                  {hotel}
                </span>
              </p>
              {/*
                Dice «Volver», no «Cerrar». La salida ya existía —este botón,
                Escape, y el foco vuelve solo a la foto que se tocó—, pero
                «Cerrar» nombra lo que le pasa al visor; «Volver» nombra a dónde
                va quien lo aprieta, que es a seguir mirando el hotel. La flecha
                es la misma que lleva de la ficha a la parrilla: los dos son
                gestos de salir un nivel.
              */}
              <button
                ref={cerrarRef}
                type="button"
                onClick={cerrar}
                className="group flex cursor-pointer items-center gap-2.5 border border-line-invert px-4 py-3 text-sm text-bone transition-colors duration-200 hover:bg-bone hover:text-ink"
              >
                <span className="ease-out-soft transition-transform duration-300 group-hover:-translate-x-1">
                  <FlechaIzquierda className="h-4 w-4 shrink-0" />
                </span>
                Volver
              </button>
            </div>

            <div
              onTouchStart={alTocar}
              onTouchEnd={alSoltar}
              className="relative flex flex-1 items-center justify-center p-4 sm:p-8"
            >
              <Foto
                key={actual.src}
                src={actual.src}
                alt={actual.alt}
                fill
                sizes="100vw"
                className="object-contain"
              />

              {/*
                La foto siguiente, adelantada.

                Se monta de verdad en el DOM en vez de pedirla con `new Image()`
                porque `<Foto>` emite un `<picture>`: así el navegador negocia
                AVIF o WebP igual que con la visible, y lo que se precarga es
                exactamente el archivo que después va a usar. Pedirla a mano
                bajaría el JPG original, que es el más pesado de todos.

                Queda de 1px y sin lectura para nadie: no es contenido, es
                caché.
              */}
              {precargar && siguiente && (
                <div
                  aria-hidden
                  className="pointer-events-none absolute h-px w-px overflow-hidden opacity-0"
                >
                  <Foto
                    key={siguiente.src}
                    src={siguiente.src}
                    alt=""
                    fill
                    sizes="100vw"
                  />
                </div>
              )}
            </div>

            <div className="flex items-center justify-between gap-4 border-t border-line-invert px-5 py-4">
              <button
                type="button"
                onClick={() => ir(-1)}
                aria-label="Foto anterior"
                className="flex cursor-pointer items-center gap-2 border border-line-invert px-4 py-3 text-sm text-bone transition-colors duration-200 hover:bg-bone hover:text-ink"
              >
                <Flecha hacia="izquierda" />
                <span className="hidden sm:inline">Anterior</span>
              </button>

              <p className="max-w-[46ch] text-center text-sm text-mute-invert">
                {actual.alt}
              </p>

              <button
                type="button"
                onClick={() => ir(1)}
                aria-label="Foto siguiente"
                className="flex cursor-pointer items-center gap-2 border border-line-invert px-4 py-3 text-sm text-bone transition-colors duration-200 hover:bg-bone hover:text-ink"
              >
                <span className="hidden sm:inline">Siguiente</span>
                <Flecha hacia="derecha" />
              </button>
            </div>
          </div>,
          document.body,
        )}
    </>
  );
}
