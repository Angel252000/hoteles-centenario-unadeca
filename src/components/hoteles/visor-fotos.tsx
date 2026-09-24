"use client";

import { Foto } from "@/components/ui/foto";
import type { Imagen } from "@/lib/datos";
import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { FlechaIzquierda } from "@/components/ui/iconos";

/**
 * El visor a pantalla completa de la galería.
 *
 * Vivía dentro de `galeria.tsx`, que llegó a 432 líneas haciendo dos cosas: el
 * mosaico de la ficha y esto. Son componentes con ciclos de vida distintos —el
 * mosaico está siempre; el visor se monta y se desmonta— y casi toda la
 * complejidad del archivo era de este lado: teclado, trampa de foco, bloqueo
 * de scroll, gestos y precarga.
 *
 * Se monta solo cuando `Galeria` lo decide, o sea siempre por un clic: nunca
 * al renderizar en el servidor, donde `document` no existe.
 */
export function VisorFotos({
  fotos,
  hotel,
  lleno = false,
  indiceInicial,
  precargar,
  alPedirCierre,
  alSalir,
}: {
  fotos: Imagen[];
  hotel: string;
  /**
   * Repite el aviso de «hotel lleno» dentro del visor. A pantalla completa la
   * foto tapa la banda del mosaico, y quien llega mirando las habitaciones de
   * un hotel sin lugar tiene que seguir sabiendolo. Ver §20 de MEJORAS.md.
   */
  lleno?: boolean;
  /** La foto que se tocó en el mosaico. */
  indiceInicial: number;
  /** Si adelantar la descarga de la foto siguiente. Lo decide `Galeria`. */
  precargar: boolean;
  /** Escape o el botón «Volver». El padre desmonta el visor. */
  alPedirCierre: () => void;
  /**
   * Se ejecuta al desmontar, con el scroll de la página ya restaurado. Es
   * donde el padre devuelve el foco a la miniatura: hacerlo antes, con el
   * `body` todavía fijado, manda la página a otro lado.
   */
  alSalir: () => void;
}) {
  const [indice, setIndice] = useState(indiceInicial);
  const cerrarRef = useRef<HTMLButtonElement>(null);
  const dialogoRef = useRef<HTMLDivElement>(null);
  const inicioTactilRef = useRef<number | null>(null);
  const [arrastrando, setArrastrando] = useState(false);

  const total = fotos.length;
  const ir = useCallback(
    (paso: number) => setIndice((i) => (i + paso + total) % total),
    [total],
  );

  /**
   * Arrastrar para cambiar de foto — el unico control de paso que queda.
   *
   * Eventos `Pointer` y no `Touch`: cubren dedo, mouse y lapiz con el mismo
   * codigo. Desde §23 no hay botones de «Anterior» y «Siguiente», asi que en
   * escritorio esto es lo que reemplaza al clic, y por eso el cursor pasa a
   * `grab`: sin esa senal nadie con mouse adivina que ahi se arrastra.
   */
  const alEmpezarArrastre = (e: React.PointerEvent) => {
    inicioTactilRef.current = e.clientX;
    setArrastrando(true);
    // Capturar el puntero: si el dedo o el mouse salen de la foto a mitad del
    // gesto, el `pointerup` llega igual y el arrastre no se queda colgado.
    e.currentTarget.setPointerCapture?.(e.pointerId);
  };

  const alTerminarArrastre = (e: React.PointerEvent) => {
    const inicio = inicioTactilRef.current;
    inicioTactilRef.current = null;
    setArrastrando(false);
    if (inicio === null) return;

    const recorrido = e.clientX - inicio;
    // Menos de 50px suele ser un toque con la mano temblando, no un gesto.
    if (Math.abs(recorrido) < 50) return;
    ir(recorrido < 0 ? 1 : -1);
  };

  /*
    Los dos avisos al padre se guardan en refs.

    El efecto de abajo instala el bloqueo de scroll y lo deshace al salir. Si
    dependiera de estas funciones y el padre pasara una nueva en cada render,
    el efecto se volvería a correr: soltaría el `body`, devolvería el foco a
    la miniatura y volvería a fijar todo, con el visor todavía abierto. Por
    las refs, el efecto solo depende de `ir` y corre una vez.
  */
  const alSalirRef = useRef(alSalir);
  const alPedirCierreRef = useRef(alPedirCierre);
  useEffect(() => {
    alSalirRef.current = alSalir;
    alPedirCierreRef.current = alPedirCierre;
  }, [alSalir, alPedirCierre]);

  useEffect(() => {
    const alTeclear = (e: KeyboardEvent) => {
      if (e.key === "Escape") return alPedirCierreRef.current();
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
      // Recién ahora, con la página de vuelta en su sitio, el padre puede
      // devolver el foco a la miniatura sin arrastrar el scroll con él.
      alSalirRef.current();
    };
  }, [ir]);

  const actual = fotos[indice];
  const siguiente = total > 1 ? fotos[(indice + 1) % total] : null;

  /*
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
  */
  return createPortal(
    <div
      ref={dialogoRef}
      role="dialog"
      aria-modal="true"
      aria-label={`Fotos de ${hotel}`}
      className="fixed inset-0 z-50 flex flex-col bg-[#0d0d0f]/98"
    >
      <div className="flex items-center justify-between border-b border-line-invert px-5 py-4">
        <p className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-mute-invert tabular-nums">
          <span>
            {indice + 1} / {total}
          </span>
          <span className="hidden text-mute-invert/70 sm:inline">{hotel}</span>
          {lleno && (
            <span className="border border-bone/40 px-2 py-0.5 text-[0.65rem] font-semibold tracking-[0.16em] text-bone uppercase">
              Hotel lleno
            </span>
          )}
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
          onClick={alPedirCierre}
          className="group flex cursor-pointer items-center gap-2.5 border border-line-invert px-4 py-3 text-sm text-bone transition-colors duration-200 hover:bg-bone hover:text-ink"
        >
          <span className="ease-out-soft transition-transform duration-300 group-hover:-translate-x-1">
            <FlechaIzquierda className="h-4 w-4 shrink-0" />
          </span>
          Volver
        </button>
      </div>

      <div
        onPointerDown={alEmpezarArrastre}
        onPointerUp={alTerminarArrastre}
        onPointerCancel={() => {
          inicioTactilRef.current = null;
          setArrastrando(false);
        }}
        className={`relative flex flex-1 touch-pan-y items-center justify-center p-4 select-none sm:p-8 ${
          arrastrando ? "cursor-grabbing" : "cursor-grab"
        }`}
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

          Queda de 1px y sin lectura para nadie: no es contenido, es caché.
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

      {/*
        Sin barra de botones desde §23. Quedaban «Anterior» y «Siguiente»
        enmarcados, del mismo peso visual que «Volver», rodeando la foto de
        cromo justo cuando alguien esta mirando la habitacion. El paso lo hace
        el arrastre, y el teclado sigue igual: Escape cierra, ← → cambian.
      */}
      <p className="mx-auto max-w-[46ch] px-5 pb-6 text-center text-sm text-mute-invert">
        {actual.alt}
      </p>
    </div>,
    document.body,
  );
}
