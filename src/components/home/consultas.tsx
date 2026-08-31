import { Correo, Telefono, WhatsApp } from "@/components/ui/iconos";
import { consultas, evento } from "@/lib/datos";

/**
 * Los números se guardan en ocho dígitos y el código de país se pone acá, para
 * no repetirlo en cada entrada ni arriesgar que se cuele dos veces.
 */
const PAIS = "506";

/** Para los enlaces: 6331 6083 → 50663316083. */
function internacional(numero: string) {
  return `${PAIS}${numero.replace(/\D/g, "")}`;
}

/** Para mostrar: 6331 6083 → +506 6331 6083. */
function visible(numero: string) {
  return `+${PAIS} ${numero}`;
}

/** Una vía de contacto: quién atiende a la izquierda, el dato a la derecha. */
function Via({
  quien,
  valor,
  href,
  icono,
}: {
  quien: string;
  valor: string;
  href: string;
  icono: React.ReactNode;
}) {
  return (
    <li className="group flex flex-wrap items-baseline justify-between gap-x-8 gap-y-1 border-b border-line py-5">
      <span className="flex items-center gap-2.5 text-mute">
        {/* Ícono: cobalto, no oro — es utilidad, no precio ni marca. */}
        <span className="text-cobalt">{icono}</span>
        <span className="eyebrow">{quien}</span>
      </span>

      {/*
        El dato se corre un pelo hacia el margen en hover. Es `transform`
        —no reacomoda la fila— y basta para que se lea como algo que responde.
        El color de hover también es cobalto: es interacción, el oro se
        reserva para precio y marca.
      */}
      <a
        href={href}
        className="ease-out-soft cursor-pointer font-display text-xl break-all text-ink transition duration-300 group-hover:-translate-x-0.5 hover:text-cobalt-deep sm:text-2xl"
      >
        {valor}
      </a>
    </li>
  );
}

/**
 * Consultorio: a quién escribirle si las fichas no alcanzan. Va antes de la
 * parrilla a propósito — quien llega con una duda concreta sobre precios no
 * debería tener que recorrer diez hoteles para encontrar a quién preguntarle.
 *
 * Antes eran tres tarjetas en grilla; ahora es un solo rectángulo centrado con
 * una vía por renglón. Con dos teléfonos y un correo, la grilla dejaba una
 * columna coja y las tarjetas se leían como tres cosas distintas.
 */
export function Consultas() {
  const hayWhatsApp = consultas.telefonos.some((tel) => tel.whatsapp);

  return (
    <section
      id="consultas"
      className="scroll-mt-20 border-b border-line bg-bone-dim/50 py-20 sm:py-28"
    >
      <div className="mx-auto max-w-[88rem] px-5 sm:px-8">
        {/* Marco doble, igual que el del video: bandeja con hairline afuera,
            la hoja de contacto adentro. */}
        <div className="mx-auto max-w-[64rem] border border-line bg-bone-dim/70 p-2 shadow-lift sm:p-3">
          <div className="border border-line bg-bone p-8 sm:p-12">
            <p className="eyebrow text-brass">Consultas</p>
            <h2 className="display-lg mt-5 max-w-[16ch]">
              ¿Dudas con los precios?
            </h2>
            <p className="prosa mt-6 text-graphite">
              Las tarifas de esta página son las que cada hotel cotizó para el{" "}
              {evento.nombre} y algunas están sujetas a impuestos o a
              disponibilidad. Si necesitás confirmar un precio, saber qué
              incluye o cómo reservar, escribí o llamá y te respondemos.
            </p>

            <ul className="mt-10 border-t border-line">
              {consultas.telefonos.map((tel) => (
                <Via
                  key={tel.numero}
                  quien={tel.quien}
                  valor={visible(tel.numero)}
                  /*
                  El de WhatsApp abre el chat; el otro marca. Si a un número de
                  WhatsApp se le pone `tel:`, en computadora no hace nada.
                */
                  href={
                    tel.whatsapp
                      ? `https://wa.me/${internacional(tel.numero)}`
                      : `tel:+${internacional(tel.numero)}`
                  }
                  icono={
                    tel.whatsapp ? (
                      <WhatsApp className="h-4 w-4" />
                    ) : (
                      <Telefono className="h-4 w-4" />
                    )
                  }
                />
              ))}

              {consultas.correo && (
                <Via
                  quien="Correo"
                  valor={consultas.correo}
                  href={`mailto:${consultas.correo}`}
                  icono={<Correo className="h-4 w-4" />}
                />
              )}
            </ul>

            {/* La nota de WhatsApp va abajo a la izquierda, como en el boceto:
              el ícono ya lo marca en la fila, esto aclara qué significa. */}
            {hayWhatsApp && (
              <p className="mt-7 flex items-center gap-2.5 text-sm text-mute">
                <WhatsApp className="h-4 w-4 text-cobalt" />
                {consultas.telefonos
                  .filter((tel) => tel.whatsapp)
                  .map((tel) => tel.quien)
                  .join(" y ")}{" "}
                también atiende por WhatsApp.
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
