import { Foto } from "@/components/ui/foto";
import Link from "next/link";
import { evento, medios } from "@/lib/datos";

/**
 * Barra fija sobre tinta. Sin menú ni botones: el sitio es una sola vitrina y
 * todo está a un scroll de distancia — cero JS de cliente.
 *
 * Un solo logo, a la izquierda: el de UNADECA. Antes había dos —el del
 * Centenario a la izquierda, todavía sin archivo, y UNADECA a la derecha—;
 * se sacó el espacio reservado del Centenario y UNADECA pasó a ocupar ese
 * lugar. A la derecha no va nada.
 *
 * Mismo tamaño y misma resolución que antes (`h-10` en móvil, `h-14` en
 * `sm`, `h-16` en `lg`, sirviendo el archivo de 3088×700 para que el nombre
 * completo salga nítido) — solo cambió de lado.
 */
export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-line-invert bg-ink text-bone">
      <div className="mx-auto flex h-20 max-w-[92rem] items-center px-5 sm:px-8">
        <Link href="/" aria-label={`Inicio — ${evento.nombre}`}>
          {medios.logoUnadeca && (
            // 3088×700 real: el logo completo, escudo + «UNADECA» + nombre
            // entero, armado a partir del archivo original — ver el
            // comentario en `contenido.ts`. Exportado bien más grande de lo
            // que se muestra para que las letras chicas del nombre completo
            // salgan nítidas.
            <Foto
              src={medios.logoUnadeca.src}
              alt={medios.logoUnadeca.alt}
              width={3088}
              height={700}
              // El logo se muestra a 40/56/64px de alto, y su proporción es de
              // 4.4 a 1: nunca ocupa más de 282px de ancho. Sin este `sizes` el
              // navegador supone el ancho de la ventana y baja la variante de
              // 1600 para pintarla en 176.
              sizes="(min-width: 1024px) 282px, (min-width: 640px) 247px, 176px"
              priority
              className="h-10 w-auto sm:h-14 lg:h-16"
            />
          )}
        </Link>
      </div>
    </header>
  );
}
