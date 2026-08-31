import { Consultas } from "@/components/home/consultas";
import { Listado } from "@/components/home/listado";
import { Portada } from "@/components/home/portada";
import { PuntosVideo } from "@/components/home/puntos-video";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";

/**
 * Orden de la portada, de arriba abajo: marca e imagen del Centenario, los
 * tres puntos del evento con el video al lado, el contacto y la parrilla de
 * hoteles al final.
 */
export default function Home() {
  return (
    <>
      <SiteHeader />

      <main id="contenido" className="flex-1">
        <Portada />
        <PuntosVideo />
        <Consultas />
        <Listado />
      </main>

      <SiteFooter />
    </>
  );
}
