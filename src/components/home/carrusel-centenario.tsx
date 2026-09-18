import { Foto } from "@/components/ui/foto";

type Banner = { src: string; alt: string };

/**
 * Las cinco piezas que mandó diseño, en orden narrativo: el viaje, el
 * reencuentro, el recuerdo, el hospedaje y el brindis.
 *
 * El titular va quemado en el pixel —no es texto, es parte del JPEG—, así que
 * se repite en el `alt`: sin eso, para un lector de pantalla estas imágenes no
 * dicen nada.
 *
 * Son cinco, y el paso del carrusel está escrito a mano para cinco. Si algún
 * día se suma una sexta, hay que tocar también los `@keyframes` de
 * `globals.css` — ver la sección 17 de `docs/MEJORAS.md`.
 */
const BANNERS: Banner[] = [
  {
    src: "/centenario/01.jpg",
    alt: "Una mujer de espaldas cruza la terminal de un aeropuerto con su maleta. «Organizá tu viaje. ¡Ven a celebrar el Centenario!»",
  },
  {
    src: "/centenario/02.jpg",
    alt: "Una pareja mayor camina tomada de la mano por el aeropuerto, con una maleta amarilla. «Ven a recordar donde se conocieron. ¡Ven a celebrar el Centenario!»",
  },
  {
    src: "/centenario/03.jpg",
    alt: "Una graduanda de espaldas, con birrete y borla dorada, en una ceremonia. «Ven a recordar ese día especial. ¡Ven a celebrar el Centenario!»",
  },
  {
    src: "/centenario/04.jpg",
    alt: "Una recepcionista recibe a dos huéspedes en el lobby de un hotel. «Ven a los mejores hoteles en Alajuela. ¡Ven a celebrar el Centenario!»",
  },
  {
    src: "/centenario/05.jpg",
    alt: "Dos copas brindando entre confeti dorado. «Este brindis te está esperando. ¡Ven a celebrar el Centenario!»",
  },
];

/**
 * Una diapositiva ocupa el ancho completo de la pantalla y la caja exacta que
 * antes tenía la banda de portada.
 *
 * Va `w-screen` y no `w-full`: cuando el sistema permite movimiento, la cinta
 * gana `width: max-content`, que se calcula A PARTIR de los hijos. Un `w-full`
 * ahí adentro sería 100% de un ancho que depende de él mismo — circular, y el
 * navegador lo resuelve colapsando la diapositiva.
 *
 * De `sm` para arriba la caja lleva la proporción NATIVA de la pieza,
 * 1999/737, y no una del sistema. Es la única medida con la que no se recorta
 * nada: estas imágenes no son fotos sueltas que toleren un recorte, son piezas
 * compuestas —foto a la izquierda, panel azul con el titular y el logo a la
 * derecha— y cualquier caja más alta o más baja se come justo esas esquinas.
 * Con `aspect-21/8` más `max-h-[56svh]`, que era lo que había, la banda
 * quedaba en 3,34:1 y cortaba el logo de arriba y el piso de la foto.
 *
 * Por eso también sale el `max-h-[56svh]` que venía de §9. Aquella restricción
 * cuidaba que la banda no se comiera el pliegue, y sigue siendo cierto que a
 * 1440 esta banda mide unos 530 px; pero con la pieza real en pantalla el
 * recorte se ve peor que el alto. Es un cambio de criterio, no un descuido.
 *
 * En móvil no alcanza: a 390 px de ancho, 2,71:1 deja una franja de 144 px y
 * el titular cae a unos 12 px. Ahí la caja pasa a 2:1 y la foto se ancla a la
 * derecha, que es donde está el panel del titular: se pierde la mitad
 * izquierda de la imagen y se gana el mensaje, que a 195 px de alto mide unos
 * 16 px y se lee sin acercar.
 */
function Diapositiva({ banner, copia }: { banner: Banner; copia?: boolean }) {
  return (
    <li className="w-screen shrink-0 snap-center" aria-hidden={copia || undefined}>
      <div className="relative aspect-2/1 w-full sm:aspect-[1999/737]">
        <Foto
          src={banner.src}
          alt={copia ? "" : banner.alt}
          fill
          // La tanda de verdad carga de entrada: son diapositivas de ancho
          // completo dentro de un contenedor recortado, así que la carga
          // diferida las daría por no visibles y se verían en blanco la
          // primera vuelta. En AVIF a 1600 px son entre 23 y 42 KB cada una.
          // La tanda duplicada no: es el mismo archivo, ya está en caché.
          priority={!copia}
          /*
            Abajo de `sm` no alcanza con `100vw`. La caja es 2:1 y la pieza
            2,712:1, así que `object-cover` la escala hasta llenar el alto y la
            imagen termina dibujada a 2,712 × el alto de la caja —a 390 px de
            ancho eso son 529 px de imagen, no 390—. Declarar `100vw` ahí haría
            que el navegador eligiera una variante pensada para 390 px y el
            titular saldría blando justo donde menos margen hay. 136vw es esa
            proporción, redondeada para arriba.
          */
          sizes="(max-width: 639px) 136vw, 100vw"
          className="object-cover object-right sm:object-center"
        />
      </div>
    </li>
  );
}

/**
 * Banda del Centenario: las cinco piezas de campaña a ancho completo, una a la
 * vez, en bucle. Es el primer bloque del sitio.
 *
 * Antes eran dos bloques seguidos —una banda estática grande y, debajo, un
 * carrusel de tarjetas de 22rem—, las dos con fotos del Centenario y las dos
 * pendientes: la de abajo se leía como la versión chica de la de arriba.
 * Ahora es uno solo, con el tamaño de la banda.
 *
 * El componente no manda JavaScript: el pase es puro CSS (`@keyframes` en
 * `globals.css`). Lo único que viaja es el observador de la página
 * —`<ObservadorEnVista>`, montado una vez en el layout—, que escribe
 * `data-en-vista` acá según la banda esté o no en pantalla.
 *
 * **Cuándo se para, y cuándo no** (cambió el 11 de septiembre, ver §17):
 *
 * - El mouse encima **ya no la para**. Antes sí, y era el único freno; el
 *   pedido fue que siga pasando aunque el cursor quede ahí quieto, que es lo
 *   que pasa todo el tiempo cuando alguien lee lo que hay debajo.
 * - **Fuera de pantalla se para sola.** No tiene sentido gastar cuadros —y
 *   batería en un teléfono— animando algo que nadie está mirando; además
 *   evita que quien vuelve a subir se encuentre la banda en una pieza al azar.
 *   Esto no se puede hacer con CSS solo: hace falta un `IntersectionObserver`,
 *   y por eso existe `<ObservadorEnVista>`. Falla abierto: el atributo se
 *   dibuja en `"si"` desde el servidor, así que si el JavaScript nunca carga
 *   la banda simplemente anda siempre, como antes.
 * - **El foco de teclado sí la sigue parando** (`:focus-within`). No molesta a
 *   nadie con mouse y deja en pie una forma real de detenerla, que es lo que
 *   pide WCAG 2.2.2 para cualquier cosa que se mueva sola más de cinco
 *   segundos.
 * - `prefers-reduced-motion` no la hace más lenta: la apaga entera y la banda
 *   queda como un pase manual, sin nada que pausar.
 *
 * Dos capas: `carrusel-viewport` es la ventana —recorta y, de base, es
 * desplazable a mano—; `carrusel-cinta` adentro es la fila, que en
 * `globals.css`, solo si el sistema permite movimiento, gana ancho propio
 * (`max-content`) y la animación.
 *
 * Para que el bucle no se note el corte, las cinco diapositivas están DOS
 * veces seguidas en el DOM —la segunda tanda con `aria-hidden`, para que el
 * lector de pantalla no las anuncie dos veces—: al llegar al final de la
 * primera tanda, la segunda ya está ocupando el lugar exacto donde arrancó.
 *
 * `snap-x snap-mandatory` es para el modo a mano —el de
 * `prefers-reduced-motion`, donde la animación no existe—: a ancho completo,
 * quedar entre dos fotos se ve roto.
 */
export function CarruselCentenario() {
  return (
    <div
      tabIndex={0}
      data-en-vista="si"
      aria-label="Fotos del Centenario, se desplazan solas — entrá con el teclado para pausar"
      className="carrusel-viewport snap-x snap-mandatory overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
    >
      <ul className="carrusel-cinta flex">
        {BANNERS.map((banner) => (
          <Diapositiva key={banner.src} banner={banner} />
        ))}
        {BANNERS.map((banner) => (
          <Diapositiva key={`dup-${banner.src}`} banner={banner} copia />
        ))}
      </ul>
    </div>
  );
}
