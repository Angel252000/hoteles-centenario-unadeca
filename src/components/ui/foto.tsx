import { varianteDe } from "@/lib/imagen-variantes";

/**
 * Una foto con `srcset`, que es lo que `next/image` no puede darnos acá.
 *
 * El sitio se publica como export estático, y eso apaga el optimizador de
 * imágenes de Next (`images.unoptimized`). Sin optimizador, `<Image>` escribe
 * un `<img src>` pelado: el teléfono descarga el mismo archivo de 1600px que
 * el escritorio. Este componente escribe el `<picture>` a mano, apuntando a
 * las variantes que `scripts/optimizar-imagenes.mjs` dejó en `public/opt`.
 *
 * El orden de los `<source>` importa y es de más nuevo a más viejo: el
 * navegador se queda con el primero que entiende. AVIF pesa la mitad que WebP;
 * WebP existe donde AVIF todavía no; el `<img>` con el JPG original es la red
 * de abajo, y es lo que se ve si nunca se corrió el script.
 *
 * Dos modos, los mismos que traía `<Image>`:
 *
 * - `fill`: la foto se estira sobre el elemento posicionado que la contiene.
 *   Es lo que usan el mosaico, las fichas y el carrusel.
 * - `width`/`height`: medida propia. Hoy solo el logo.
 */
export function Foto({
  src,
  alt,
  fill,
  width,
  height,
  sizes,
  priority,
  className,
}: {
  src: string;
  alt: string;
  fill?: boolean;
  width?: number;
  height?: number;
  sizes?: string;
  priority?: boolean;
  className?: string;
}) {
  const variante = varianteDe(src);

  // `/hoteles/tucan/03.jpg` -> `/opt/hoteles/tucan/03`
  const base = `/opt${src.replace(/\.[^.]+$/, "")}`;
  const conjunto = (formato: "avif" | "webp") =>
    variante?.anchos.map((a) => `${base}-${a}.${formato} ${a}w`).join(", ");

  /*
    Las dimensiones van siempre que se conozcan, también en modo `fill`: el
    navegador reserva el alto con la proporción antes de bajar el archivo, y
    eso es la mitad de no tener saltos de maquetado. En `fill` el CSS de abajo
    las pisa para el tamaño real; solo sobrevive la proporción.
  */
  const medidas = variante
    ? { width: variante.ancho, height: variante.alto }
    : { width, height };

  /*
    `no-img-element` avisa que usemos `next/image`. Acá es al revés: es
    justamente `next/image` el que, con el export estático, no puede escribir
    `srcset`. Este `<img>` es el que sí lo hace.
  */
  const imagen = (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={alt}
      {...medidas}
      sizes={sizes}
      loading={priority ? "eager" : "lazy"}
      // Sin esto el navegador decodifica en el hilo principal y traba el
      // scroll justo cuando entran las miniaturas.
      decoding="async"
      fetchPriority={priority ? "high" : undefined}
      className={className}
      style={
        fill
          ? {
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              color: "transparent",
            }
          : { color: "transparent" }
      }
    />
  );

  // Sin variantes no hay nada que elegir: el `<picture>` sobraría y el JPG
  // original hace el trabajo. Pasa con una foto recién agregada a la que
  // todavía no se le corrió el script.
  if (!variante) return imagen;

  return (
    <picture>
      <source type="image/avif" srcSet={conjunto("avif")} sizes={sizes} />
      <source type="image/webp" srcSet={conjunto("webp")} sizes={sizes} />
      {imagen}
    </picture>
  );
}
