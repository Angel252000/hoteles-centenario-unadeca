import type { Metadata } from "next";
import { Hanken_Grotesk, Jost } from "next/font/google";
import "@/styles/globals.css";

/** Títulos y cifras: geométrica, de trazo parejo y caja alta ancha. */
const jost = Jost({
  variable: "--font-jost",
  subsets: ["latin"],
  display: "swap",
});

/** Texto corrido: grotesca neutra, alta legibilidad en párrafo y tabla. */
const hanken = Hanken_Grotesk({
  variable: "--font-hanken",
  subsets: ["latin"],
  display: "swap",
});

/*
  El título nombraba los tres niveles por su palabra —«básico, medio y
  premium»—, que es lo que se mostraba hasta el 26 de agosto de 2026. Ahora el
  nivel se muestra como estrellas sobre 6, así que esas palabras ya no
  aparecen en ninguna pantalla y el título prometía algo que el sitio no dice.
*/
export const metadata: Metadata = {
  title: "Hoteles para el Centenario UNADECA 2027 — Alajuela, Costa Rica",
  description:
    "Diez hoteles de Alajuela cotizados para el Centenario, clasificados por nivel sobre 6. Precio por persona y por noche, personas incluidas y qué trae cada uno, sin letra pequeña.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="es"
      className={`${jost.variable} ${hanken.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        {/*
          framer-motion escribe el estado inicial —opacidad 0— en el HTML que
          genera el servidor. Sin JavaScript nadie lo revierte y las fichas no
          se verían nunca. El contenido manda sobre la animación.
        */}
        <noscript>
          <style>{`[data-reveal]{opacity:1!important;transform:none!important}`}</style>
        </noscript>
        <a
          href="#contenido"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:bg-ink focus:px-4 focus:py-2 focus:text-bone"
        >
          Saltar al contenido
        </a>
        {children}
      </body>
    </html>
  );
}
