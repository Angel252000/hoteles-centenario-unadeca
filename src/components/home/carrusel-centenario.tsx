import { Foto } from "@/components/ui/foto";
import { EspacioPendiente } from "@/components/ui/espacio-pendiente";
import { medios } from "@/lib/datos";

/**
 * Seis huecos, no uno ni diez: alcanza para que la cinta se sienta llena sin
 * inventar un número que después haya que revisar entero cuando lleguen las
 * fotos reales.
 */
const CUPOS = Array.from({ length: 6 }, (_, i) => i + 1);

/**
 * Una diapositiva ocupa el ancho completo de la pantalla y la caja exacta que
 * antes tenía la banda de portada.
 *
 * Va `w-screen` y no `w-full`: cuando el sistema permite movimiento, la cinta
 * gana `width: max-content`, que se calcula A PARTIR de los hijos. Un `w-full`
 * ahí adentro sería 100% de un ancho que depende de él mismo — circular, y el
 * navegador lo resuelve colapsando la diapositiva.
 *
 * `medios.portada`, cuando exista el archivo, es la primera: se fundió con
 * este carrusel en vez de vivir como bloque aparte, así que el contrato de
 * datos siguió igual y la foto entra acá.
 */
function Diapositiva({ n, oculta }: { n: number; oculta?: boolean }) {
  const esPortada = n === 1 && medios.portada;

  return (
    <li
      className="w-screen shrink-0 snap-center"
      aria-hidden={oculta || undefined}
    >
      <div className="relative aspect-4/3 max-h-[56svh] w-full sm:aspect-16/9 lg:aspect-21/8">
        {esPortada ? (
          <Foto
            src={medios.portada!.src}
            alt={medios.portada!.alt}
            fill
            priority={!oculta}
            sizes="100vw"
            className="object-cover"
          />
        ) : (
          <EspacioPendiente
            tono="marca"
            titulo={`Foto ${n} de ${CUPOS.length}`}
            detalle="A todo lo ancho: 2000 px o más. Con menos se ve interpolada en pantallas grandes."
            className="absolute inset-0"
          />
        )}
      </div>
    </li>
  );
}

/**
 * Banda del Centenario: una cinta de fotos a ancho completo que se desplaza
 * sola, en bucle, sin cortes. Es el primer bloque del sitio.
 *
 * Antes eran dos bloques seguidos —una banda estática grande y, debajo, un
 * carrusel de tarjetas de 22rem—, las dos con fotos del Centenario y las dos
 * pendientes: la de abajo se leía como la versión chica de la de arriba.
 * Ahora es uno solo, con el tamaño de la banda.
 *
 * Sin JavaScript — es componente de servidor, no manda nada al navegador. El
 * bucle es puro CSS (`@keyframes` en `globals.css`) y la pausa también: se
 * para con `:hover` (mouse), `:focus-within` (teclado — por eso el visor
 * tiene `tabIndex`, si no no habría nada que enfocar ahí adentro) y `:active`
 * (dedo, al tocar y mantener). No hay botón de pausa aparte: se probó con uno
 * y se sacó a propósito — la pausa es la reacción a mirar la banda, no un
 * control que haya que encontrar primero.
 *
 * Dos capas: `carrusel-viewport` es la ventana —recorta y, de base, es
 * desplazable a mano—; `carrusel-cinta` adentro es la fila, que en
 * `globals.css`, solo si el sistema permite movimiento, gana ancho propio
 * (`max-content`) y la animación. Ahí también el visor pasa a
 * `overflow: hidden`, para que el scroll a mano no compita con la animación.
 *
 * Para que el bucle no se note el corte, las seis diapositivas están DOS
 * veces seguidas en el DOM —la segunda tanda con `aria-hidden`, para que el
 * lector de pantalla no las anuncie dos veces—: al llegar al final de la
 * primera tanda, la segunda ya está ocupando el lugar exacto donde arrancó.
 *
 * Ya no lleva `carrusel-mascara`. Esa máscara desvanecía los dos costados
 * para decir «hay más para ese lado»; con diapositivas de ancho completo
 * apagaría los costados de cada foto todo el tiempo.
 *
 * `snap-x snap-mandatory` es para el modo a mano —el de
 * `prefers-reduced-motion`, donde la animación no existe—: con tarjetas
 * chicas, soltar el arrastre a mitad de camino se veía bien; a ancho
 * completo, quedar entre dos fotos se ve roto.
 *
 * `prefers-reduced-motion` no lo hace más lento: lo apaga entero y la banda
 * queda como un pase manual, sin nada que pausar.
 */
export function CarruselCentenario() {
  return (
    <div
      tabIndex={0}
      aria-label="Fotos del Centenario, se desplazan solas — pasá el mouse o entrá con el teclado para pausar"
      className="carrusel-viewport snap-x snap-mandatory overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
    >
      <ul className="carrusel-cinta flex">
        {CUPOS.map((n) => (
          <Diapositiva key={n} n={n} />
        ))}
        {CUPOS.map((n) => (
          <Diapositiva key={`dup-${n}`} n={n} oculta />
        ))}
      </ul>
    </div>
  );
}
