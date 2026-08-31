/**
 * Cotizaciones de hoteles en Alajuela — Centenario UNADECA 2027.
 *
 * Fuentes, una por hotel:
 * - Los seis primeros: "Cotizaciones de Hoteles en Alajuela- Centenario Original .docx".
 * - Hampton Inn y Hilton Garden Inn: correos de cotización de cada hotel (agosto 2026).
 * - Courtyard: "Convenio Corporativo Courtyard Alajuela Empresa UNADECA.pdf".
 *
 * Todo lo que está aquí sale textualmente de su fuente. Lo que la fuente NO
 * dice se marca en `pendientes` y se muestra en el sitio como dato faltante —
 * nunca se inventa.
 */

import type { Hotel, Medios, Nivel, PuntoClave } from "./tipos";
/**
 * Parámetros del evento. `personas` es dato de trabajo de la comisión —
 * sale del desglose cotizado en Alajuela Backpackers — y solo se usa en
 * `/comision`, nunca en la vitrina pública.
 */
export const evento = {
  nombre: "Centenario UNADECA 2027",
  personas: 84,
  /** Confirmadas por el Hampton Inn en su correo de cotización. */
  fechas: "21 al 25 de julio de 2027",
  noches: 4,
  moneda: "USD",
} as const;

/**
 * El logo del header, la imagen de portada y el video.
 *
 * - Logo Centenario: todavía no llegó, y desde el 20 de agosto tampoco tiene
 *   un lugar reservado en la pantalla — ver el comentario en `tipos.ts`.
 * - Logo UNADECA: llegó el 19 de agosto de 2026, PNG con transparencia. El
 *   archivo original traía todo apilado en vertical —escudo arriba, «UNADECA»
 *   grande en blanco debajo, el nombre completo en dorado más abajo— con
 *   muchísimo margen en blanco alrededor y un salto de línea que quedaba
 *   invisible por ser blanco sobre blanco. Los tres elementos se recortaron
 *   por separado y se volvieron a montar en horizontal —escudo a la
 *   izquierda, «UNADECA» y el nombre completo apilados a la derecha— para que
 *   entre bien en una barra de header. `public/marca/logo-unadeca.png`,
 *   3088×700, harto más grande de lo que se muestra: así se ve nítido incluso
 *   en pantallas retina.
 * - Portada: `public/marca/portada.jpg`, 2000 px de ancho como mínimo.
 * - Video: mp4 en `public/marca/` si pesa poco, o la URL de incrustar de
 *   YouTube/Vimeo (`https://www.youtube.com/embed/…`, no la del navegador).
 */
export const medios: Medios = {
  logoCentenario: null,
  logoUnadeca: {
    src: "/marca/logo-unadeca.png",
    alt: "UNADECA — Universidad Adventista de Centro América, fundada en 1927",
  },
  portada: null,
  video: null,
};

/**
 * Los tres puntos de la franja intermedia, a la par del video.
 *
 * Texto provisional: dice solo lo que los datos ya respaldan —fechas, cantidad
 * de hoteles y cómo se muestran los precios— para que la página no afirme nada
 * que no esté confirmado. Se reemplaza cuando esté el texto definitivo.
 */
export const puntosClave: PuntoClave[] = [
  {
    titulo: "Fechas confirmadas",
    texto:
      "Cuatro noches en Alajuela, Costa Rica. Todo lo que aparece en esta página está cotizado para esas fechas.",
  },
  {
    titulo: "Hoteles ya cotizados",
    texto:
      "Cada hotel pasó su tarifa para el Centenario. Están agrupados en tres niveles, de 3 a 6 sobre una escala de 6.",
  },
  {
    titulo: "Precios comparables",
    texto:
      "El precio grande es lo que cuestan las cuatro noches para dos personas, con la regla de cobro de cada hotel. Adentro está el desglose por tipo de habitación, con sus camas y lo que falta confirmar.",
  },
];

/**
 * Contacto de la comisión, para quien tenga dudas de precios o reservas.
 *
 * Los números son de ocho dígitos de Costa Rica; el prefijo +506 se agrega al
 * armar los enlaces `tel:` y `wa.me`, no acá, para que se lean como los marca
 * cualquiera en el país.
 */
export const consultas: {
  correo: string | null;
  telefonos: { numero: string; quien: string; whatsapp?: boolean }[];
} = {
  // Desde el 31 de agosto de 2026 el hospedaje tiene correo y teléfono
  // propios. Reemplazan a `linguistika@unadeca.net` y a los dos números que
  // se usaron hasta esa fecha —Secretaría y el contacto de hospedaje externo—,
  // que ya no se muestran.
  correo: "hospedaje@unadeca.net",
  telefonos: [{ numero: "6331 6083", quien: "Hospedaje" }],
};

/**
 * Los tres niveles, ahora como estrellas sobre 6.
 *
 * Reemplaza las etiquetas de texto «Básico», «Medio» y «Premium» que se
 * mostraron hasta el 26 de agosto de 2026. También se eliminó el campo
 * `titulo` («Hoteles para grupos y eventos», etc.): era el encabezado de cada
 * grupo cuando la parrilla se dividía por categoría y quedó sin usos al
 * quitarse los filtros.
 *
 * ATENCIÓN antes de tocar esto: la escala de estrellas de hotel del mundo
 * real llega a 5, no a 6, y significa algo —es una clasificación oficial—.
 * Acá se aplica a hoteles de marca reales (Courtyard, Fairfield, Hampton Inn,
 * Hilton Garden Inn), que en esa escala internacional son de clase 3, no 6.
 * Por eso en pantalla NUNCA se rotula «estrellas» a secas: se dice «nivel
 * sobre 6», para que se lea como la escala propia de la comisión y no como
 * una categoría oficial que sería falsa. Si alguien cambia ese rótulo, vuelve
 * el problema.
 *
 * Segunda cosa que conviene saber: seis de los diez hoteles son `premium`, o
 * sea que seis muestran 6/6 idéntico. Las estrellas cargan la misma
 * información que cargaban las tres palabras. Para que discriminen de verdad
 * haría falta un valor por hotel, y eso lo decide la comisión.
 */
export const niveles: Nivel[] = [
  { id: "grupos", estrellas: { min: 3, max: 3 }, leyenda: "3 de 6" },
  { id: "accesibles", estrellas: { min: 4, max: 5 }, leyenda: "4 a 5 de 6" },
  { id: "premium", estrellas: { min: 6, max: 6 }, leyenda: "6 de 6" },
];

export const hoteles: Hotel[] = [
  {
    slug: "alajuela-airport",
    nombre: "Hotel Alajuela Costa Rica Airport",
    nivel: "grupos",
    capacidad: 60,
    resumen:
      "Tarifa plana por persona con desayuno incluido. Habitaciones amplias con camas individuales y matrimoniales.",
    desayuno: "Incluido — el hotel no especificó de qué tipo",
    clima: "Solo ventiladores, sin aire acondicionado",
    acceso: "Gradas, sin elevador",
    servicios: ["Camas individuales y matrimoniales", "Posible transporte"],
    caracteristicas: {
      aire: "no",
      elevador: false,
      salon: false,
      piscina: false,
      transporte: true,
      desayunoIncluido: true,
    },
    habitaciones: [
      {
        nombre: "Tarifa por persona",
        precio: 22,
        unidad: "persona-noche",
        personas: 1,
        detalle: "Tarifa sin descuento de grupo",
      },
    ],
    // Ordenadas de mayor a menor resolución: la primera es la que se muestra grande.
    imagenes: [
      {
        src: "/hoteles/alajuela-airport/03.jpg",
        alt: "Habitación con dos camas matrimoniales y pared azul",
      },
      {
        src: "/hoteles/alajuela-airport/01.jpg",
        alt: "Habitación con pared naranja, cama matrimonial y ventanal",
      },
      {
        src: "/hoteles/alajuela-airport/02.jpg",
        alt: "Habitación azul con cama matrimonial, cama individual y ventilador de techo",
      },
    ],
    pendientes: [
      "Tipo de desayuno",
      "Costo y condiciones del transporte",
      "Tarifa de grupo (la cotizada es sin descuento)",
    ],
  },
  {
    slug: "backpackers",
    nombre: "Alajuela Backpackers",
    nivel: "grupos",
    capacidad: 84,
    capacidadNota: "El documento dice 80; el desglose cotizado suma 84 camas",
    resumen:
      "El de mayor capacidad de la lista y el único con elevador. Mezcla dormitorio compartido con habitaciones privadas, así que cada quien elige cuánto gastar sin separarse del grupo.",
    desayuno: "No incluido — $6 por persona por día",
    clima: "Aire acondicionado",
    acceso: "Gradas y elevador",
    servicios: [
      "Habitaciones hasta 10 personas",
      "Camarotes y camas normales",
      "Privadas sencillas, triples y cuádruples",
    ],
    caracteristicas: {
      aire: "si",
      elevador: true,
      salon: false,
      piscina: false,
      transporte: false,
      desayunoIncluido: false,
    },
    habitaciones: [
      {
        nombre: "Habitación compartida",
        precio: 16,
        unidad: "persona-noche",
        personas: 1,
        camas: "Camarote en dormitorio compartido",
        cotizado: { unidades: 50, total: 3200 },
      },
      {
        nombre: "Privada sencilla",
        precio: 45,
        unidad: "habitacion-noche",
        personas: 1,
        cotizado: { unidades: 4, total: 720 },
      },
      {
        nombre: "Privada triple",
        precio: 55,
        unidad: "habitacion-noche",
        personas: 3,
        cotizado: { unidades: 2, total: 440 },
      },
      {
        nombre: "Privada cuádruple",
        precio: 60,
        unidad: "habitacion-noche",
        personas: 4,
        cotizado: { unidades: 6, total: 1440 },
      },
    ],
    // La 02 va primera por ser la única horizontal: las verticales se recortan feo en grande.
    imagenes: [
      {
        src: "/hoteles/backpackers/02.jpg",
        alt: "Privada con cama matrimonial, pared amarilla y aire acondicionado",
      },
      {
        src: "/hoteles/backpackers/03.jpg",
        alt: "Dormitorio compartido con camarotes azules y aire acondicionado",
      },
      {
        src: "/hoteles/backpackers/01.jpg",
        alt: "Privada con cama king y ventanales de arco con balcón",
      },
    ],
    pendientes: [
      "Confirmar si la capacidad real es 80 u 84",
      "Si el desayuno de $6 aplica a los 84 o solo a quienes lo pidan",
    ],
  },
  {
    slug: "park-view",
    nombre: "Park View",
    nivel: "accesibles",
    capacidad: 20,
    resumen:
      "Hotel frente al parque, con restaurante abierto al público. Se cotiza en conjunto con el Tucán.",
    desayuno: "Incluido",
    clima: "Aire acondicionado",
    acceso: "Gradas, sin elevador",
    servicios: [
      "Baños privados",
      "Camas individuales y matrimoniales",
      "Restaurante propio",
    ],
    caracteristicas: {
      aire: "si",
      elevador: false,
      salon: false,
      piscina: false,
      transporte: false,
      desayunoIncluido: true,
    },
    habitaciones: [
      {
        nombre: "Tarifa por noche",
        precio: 28,
        unidad: "persona-noche",
        personas: 1,
        detalle: "Aproximada y sin descuento, según el documento",
      },
    ],
    imagenes: [
      {
        src: "/hoteles/park-view/01.jpg",
        alt: "Habitación con cama matrimonial y armario de madera",
      },
      {
        src: "/hoteles/park-view/02.jpg",
        alt: "Habitación doble con vista a la calle, WiFi, TV y desayuno",
      },
      {
        src: "/hoteles/park-view/03.jpg",
        alt: "Habitación con dos camas individuales y aire acondicionado",
      },
      {
        src: "/hoteles/park-view/04.jpg",
        alt: "Restaurante del hotel, abierto al público",
      },
    ],
    pendientes: [
      "Si los $28 son por persona o por habitación: el documento dice «28 dólares la noche», sin aclararlo",
      "Confirmar la tarifa exacta (el documento dice «aproximadamente»)",
      "Tarifa de grupo",
    ],
  },
  {
    slug: "tucan",
    nombre: "Tucán",
    nivel: "accesibles",
    capacidad: 30,
    capacidadNota: "Entre 27 y 30 personas",
    resumen:
      "Unido con Park View y se cotiza junto a él. Tiene salón propio para 30 personas, donde además se desayuna.",
    desayuno: "Típico incluido, adaptable al gusto del grupo",
    clima: "Primer piso con enfriadores; segundo piso con aire acondicionado",
    acceso: "Únicamente gradas",
    servicios: [
      "Camarotes en todas las habitaciones",
      "Baño privado en todas",
      "Salón para 30 personas",
    ],
    caracteristicas: {
      aire: "parcial",
      elevador: false,
      salon: true,
      piscina: false,
      transporte: false,
      desayunoIncluido: true,
    },
    habitaciones: [
      {
        nombre: "Tarifa por noche",
        precio: 28,
        unidad: "persona-noche",
        personas: 1,
      },
    ],
    // La 05 encabeza por ser la única horizontal del grupo.
    imagenes: [
      {
        src: "/hoteles/tucan/05.jpg",
        alt: "Camarote sobre cama matrimonial con televisor",
      },
      {
        src: "/hoteles/tucan/02.jpg",
        alt: "Habitación con camarote, cama individual y televisor",
      },
      {
        src: "/hoteles/tucan/03.jpg",
        alt: "Habitación con dos camarotes y aire acondicionado",
      },
      {
        src: "/hoteles/tucan/04.jpg",
        alt: "Habitación con camarote y televisor de pared",
      },
      {
        src: "/hoteles/tucan/01.jpg",
        alt: "Habitación con cama matrimonial, baño privado y cielo raso decorado",
      },
      { src: "/hoteles/tucan/06.jpg", alt: "Camarote metálico en habitación privada" },
    ],
    pendientes: [
      "Si los $28 son por persona o por habitación: el documento dice «28 dolares la noche», sin aclararlo",
      "Capacidad exacta: 27 o 30",
      "Si el salón tiene costo aparte para el evento",
    ],
  },
  {
    slug: "la-guaria",
    nombre: "La Guaria",
    nivel: "premium",
    capacidad: null,
    capacidadNota: "El documento no indica capacidad",
    resumen:
      "Tarifas por habitación en ocupación doble, con desayuno continental. Piscina pequeña, área de descanso y transporte diario desde el aeropuerto.",
    desayuno: "Continental, incluido en el precio",
    clima: "Aire acondicionado en todas las habitaciones",
    acceso: "El documento no lo indica",
    servicios: [
      "Refrigerador en todas las habitaciones",
      "1 transporte diario aeropuerto–hotel",
      "Parqueo para 4–5 carros",
      "Área de descanso y piscina pequeña",
    ],
    caracteristicas: {
      aire: "si",
      elevador: null,
      salon: false,
      piscina: true,
      transporte: true,
      desayunoIncluido: true,
    },
    // El documento encabeza TODAS estas tarifas con "Ocupación doble (2 personas)":
    // los $60 cubren dos personas en cualquiera de los tipos, no la capacidad de
    // camas. Lo que cuesta la persona adicional no está cotizado.
    habitaciones: [
      {
        nombre: "Doble",
        precio: 60,
        unidad: "habitacion-noche",
        personas: 2,
        camas: "1 cama doble",
        detalle: "Tarifa en ocupación doble",
      },
      {
        nombre: "Triple",
        precio: 60,
        unidad: "habitacion-noche",
        personas: 2,
        camas: "1 cama doble y 1 twin",
        detalle: "Tarifa en ocupación doble",
      },
      {
        nombre: "Cuádruple",
        precio: 60,
        unidad: "habitacion-noche",
        personas: 2,
        camas: "2 camas dobles",
        detalle: "Tarifa en ocupación doble",
      },
      {
        nombre: "Superior",
        precio: 67,
        unidad: "habitacion-noche",
        personas: 2,
        camas: "2 camas dobles y balcón",
        detalle: "Tarifa en ocupación doble",
      },
      {
        nombre: "Familiar",
        precio: 72,
        unidad: "habitacion-noche",
        personas: 2,
        camas: "2 camas dobles, 1 individual y sofá cama",
        detalle: "Tarifa en ocupación doble",
      },
      {
        nombre: "Junior Suite",
        precio: 78,
        unidad: "habitacion-noche",
        personas: 2,
        camas: "2 camas dobles y 1 individual",
        detalle: "Dos estancias y balcón · tarifa en ocupación doble",
      },
    ],
    imagenes: [
      {
        src: "/hoteles/la-guaria/01.jpg",
        alt: "Piscina interior con pared verde, plantas y área de descanso",
      },
      {
        src: "/hoteles/la-guaria/02.jpg",
        alt: "Habitación con cama matrimonial, armario y baño propio",
      },
      {
        src: "/hoteles/la-guaria/03.jpg",
        alt: "Habitación con dos camas matrimoniales",
      },
    ],
    pendientes: [
      "Capacidad total del hotel — sin esto no entra al comparativo",
      "Cuánto cuesta cada persona adicional sobre la ocupación doble: la triple, la cuádruple y la familiar tienen camas para más gente, pero el precio cotizado cubre solo dos",
      "Cuántas habitaciones hay de cada tipo",
      "Si tiene elevador",
    ],
  },
  {
    slug: "hotel-1915",
    nombre: "Hotel 1915",
    nivel: "premium",
    capacidad: 39,
    resumen:
      "Casona colonial restaurada, con patio de fuente y sala de estar. La opción más cara del documento y la de mejor acabado.",
    desayuno: "Típico, de 6:00 a 9:00 a.m.",
    clima: "Ventilador o aire acondicionado, según la habitación",
    acceso: "Gradas, sin elevador",
    servicios: ["Parqueo para 4 vehículos", "Patio interior y sala de estar"],
    caracteristicas: {
      aire: "parcial",
      elevador: false,
      salon: false,
      piscina: false,
      transporte: false,
      desayunoIncluido: true,
    },
    habitaciones: [
      {
        nombre: "Compartiendo habitación",
        precio: 47,
        unidad: "persona-noche",
        personas: 1,
      },
      {
        nombre: "Ocupación individual",
        precio: 77,
        unidad: "persona-noche",
        personas: 1,
      },
    ],
    imagenes: [
      {
        src: "/hoteles/hotel-1915/07.jpg",
        alt: "Atrio del hotel con techo de caña, escalera curva y barandal de hierro forjado",
      },
      {
        src: "/hoteles/hotel-1915/08.jpg",
        alt: "Sala colonial con candelabro de hierro, fuente al fondo y piso de mosaico",
      },
      {
        src: "/hoteles/hotel-1915/09.jpg",
        alt: "Escalera de caracol vista desde arriba, sobre piso de mosaico ornamentado",
      },
      {
        src: "/hoteles/hotel-1915/01.jpg",
        alt: "Sala de estar con fuente de piedra, vigas de madera y arcos",
      },
      {
        src: "/hoteles/hotel-1915/02.jpg",
        alt: "Habitación con cama matrimonial, pared terracota y ventanal al patio",
      },
      {
        src: "/hoteles/hotel-1915/03.jpg",
        alt: "Habitación amplia con cama king y espejo de cuerpo entero",
      },
      {
        src: "/hoteles/hotel-1915/04.jpg",
        alt: "Habitación con cama de madera tallada y lámparas de noche",
      },
      {
        src: "/hoteles/hotel-1915/05.jpg",
        alt: "Habitación con piso de barro y cama matrimonial",
      },
      {
        src: "/hoteles/hotel-1915/06.jpg",
        alt: "Recepción con arco, banca de madera y mosaico en el piso",
      },
    ],
    pendientes: [
      "Tarifa de grupo",
      "Cuántas habitaciones admiten ocupación compartida",
    ],
  },
  {
    slug: "hampton-inn",
    nombre: "Hampton Inn",
    nivel: "premium",
    capacidad: null,
    resumen:
      "Tarifas por habitación con desayuno buffet, almuerzo y transporte al aeropuerto las 24 horas. Único hotel que cotiza sin impuestos incluidos.",
    desayuno:
      "Desayuno buffet (6:00 a. m.–10:00 a. m.) y almuerzo a la hora que se indique, incluidos en la tarifa",
    clima: null,
    acceso: null,
    servicios: [
      "Transporte al aeropuerto las 24 horas del día",
      "Menores de 12 años sin costo al compartir habitación con sus padres",
      "Piscina al aire libre",
      "Uso de áreas públicas: lobby, gimnasio, suite shop y gift shop",
      "Servicio de fotocopiado y fax nacional e internacional",
      "Cajas de seguridad",
    ],
    caracteristicas: {
      // El correo no menciona el clima ni el elevador, y las fotos no alcanzan
      // para afirmarlo: queda sin dato hasta que el hotel lo confirme.
      aire: null,
      elevador: null,
      salon: null,
      // Confirmada en la foto del hotel, no en el correo.
      piscina: true,
      transporte: true,
      desayunoIncluido: true,
    },
    /*
      Reemplaza la tarifa anterior (escala por fecha de reserva) con la hoja
      "Información importante para Hoteles del CENTENARIO" recibida el
      18/8/2026: ahora son dos ventanas por fecha de ESTADÍA, no de reserva.

      - 17/8/2026–31/7/2027: la más barata. Cubre, tal como está escrita, las
        fechas del Centenario (21–25/7/2027) — es la que va como `precio`.
      - 1/7/2027–19/7/2027: más cara, y NO llega a cubrir el 21–25/7/2027.

      Las dos ventanas se superponen (la primera sigue hasta el 31/7, la
      segunda arranca el 1/7) y ninguna dice explícitamente qué tarifa rige
      justo en las fechas del evento — puede ser un error de la hoja o una
      ventana pico que el hotel no delimitó bien. Se usa la ventana 1 por ser
      la que sí incluye el rango del evento tal como está redactada, con el
      pendiente de abajo para confirmarlo antes de reservar.
    */
    habitaciones: [
      {
        nombre: "Sencilla",
        precio: 123.17,
        unidad: "habitacion-noche",
        personas: 1,
        detalle:
          "1 adulto · tarifa 17/8/2026–31/7/2027 · $135,60 del 1 al 19/7/2027 · más impuestos",
      },
      {
        nombre: "Doble",
        precio: 123.17,
        unidad: "habitacion-noche",
        personas: 2,
        detalle:
          "2 adultos · tarifa 17/8/2026–31/7/2027 · $135,60 del 1 al 19/7/2027 · más impuestos",
      },
      {
        nombre: "Triple",
        precio: 134.47,
        unidad: "habitacion-noche",
        personas: 3,
        detalle:
          "3 adultos · tarifa 17/8/2026–31/7/2027 · $149,90 del 1 al 19/7/2027 · más impuestos",
      },
      {
        nombre: "Cuádruple",
        precio: 145.77,
        unidad: "habitacion-noche",
        personas: 4,
        camas: "Dos camas full size",
        detalle:
          "4 adultos · tarifa 17/8/2026–31/7/2027 · $158,20 del 1 al 19/7/2027 · más impuestos",
      },
    ],
    // La piscina va primera: es la única foto que muestra el edificio entero.
    imagenes: [
      {
        src: "/hoteles/hampton-inn/01.jpg",
        alt: "Piscina al aire libre con tumbonas, palmeras y el edificio de cuatro plantas del hotel al fondo",
      },
      {
        src: "/hoteles/hampton-inn/02.jpg",
        alt: "Habitación con cama king, pared naranja, escritorio de trabajo y baño con ducha de vidrio",
      },
      {
        src: "/hoteles/hampton-inn/03.jpg",
        alt: "Lobby de doble altura con sofás azules, lámparas de mimbre y área de desayuno al fondo",
      },
    ],
    contacto: {
      correos: ["reserve@hamptoncr.com"],
      telefonos: ["(506) 2436 0000"],
      nota: "Indicar que vienen a la celebración de los 100 años de UNADECA, para que se aplique la tarifa correspondiente. Cancelación: mínimo 48 horas antes de la reserva, llamando al mismo teléfono",
    },
    pendientes: [
      "Nombre completo y sede: «Hampton Inn» solo no distingue entre sucursales",
      "Porcentaje de impuestos: la hoja de tarifas dice «más impuestos» otra vez, sin detallarlo",
      "QUÉ TARIFA RIGE EN LAS FECHAS DEL EVENTO: hay dos ventanas de precio que se superponen (17/8/2026–31/7/2027 y 1/7/2027–19/7/2027) y ninguna dice explícitamente cuál aplica del 21 al 25 de julio de 2027. Se está usando la más barata por ser la que cubre esas fechas tal como está redactada — confirmar con el hotel antes de reservar",
      "Capacidad total del hotel",
      "Aire acondicionado, elevador y salón de eventos",
    ],
  },
  {
    slug: "hilton-garden-inn",
    nombre: "Hilton Garden Inn San José Airport City Mall",
    nivel: "premium",
    capacidad: null,
    capacidadNota:
      "El correo no dice cuántas habitaciones tiene; las 250 personas del salón Quetzal son capacidad de evento, no de hospedaje",
    resumen:
      "A 900 metros del aeropuerto y conectado a City Mall Alajuela. Desayuno, traslados, piscina climatizada y piso de eventos para 250 personas.",
    desayuno: "Desayuno buffet, incluido en la tarifa",
    clima: null,
    acceso: null,
    servicios: [
      "Traslado gratuito y continuo aeropuerto–hotel–aeropuerto",
      "A 900 metros del Aeropuerto Internacional Juan Santamaría",
      "Conexión directa con City Mall Alajuela",
      "Piso corporativo con más de 432 m² de salones modulares",
      "Salón Quetzal para hasta 250 personas; salones Tucán y Colibrí divisibles",
      "Foyer corporativo de 135 m² para registro, exhibiciones y coffee breaks",
      "Piscina climatizada y gimnasio 24 horas",
      "Más de 3.000 espacios de parqueo techado gratuito, con carga para vehículos eléctricos",
      "Restaurante con chef en sitio",
    ],
    caracteristicas: {
      // El correo detalla mucho, pero nunca menciona clima ni elevador.
      aire: null,
      elevador: null,
      salon: true,
      piscina: true,
      transporte: true,
      desayunoIncluido: true,
    },
    /*
      Cobra por habitación con tarifa plana hasta dos personas y $10 por cada
      persona extra. Va la base de cada categoría y, aparte, la Standard llena:
      es la única combinación que el correo acota (máximo 4) y la que deja el
      costo por persona más bajo.
    */
    habitaciones: [
      {
        nombre: "Standard",
        precio: 125,
        unidad: "habitacion-noche",
        personas: 2,
        camas: "Dos camas full",
        detalle:
          "Ocupación sencilla o doble · persona adicional $10, hasta 4 · más impuestos",
      },
      {
        nombre: "Standard con 4 personas",
        precio: 145,
        unidad: "habitacion-noche",
        personas: 4,
        /*
          Las camas son las mismas de la Standard: el correo describe una sola
          categoría —«dos camas full · persona adicional $10, hasta 4»— y esta
          fila es esa misma habitación con las dos personas extra ya sumadas,
          como dice su propio detalle. O sea cuatro adultos en dos camas full,
          de a dos por cama. No es un dato inferido de otra fuente: sale de la
          misma línea del correo que la Standard.
        */
        camas: "Dos camas full",
        detalle: "$125 más dos personas adicionales a $10 · más impuestos",
      },
      {
        nombre: "Suite",
        precio: 195,
        unidad: "habitacion-noche",
        personas: 2,
        detalle:
          "Ocupación sencilla o doble · persona adicional $10 · más impuestos",
      },
    ],
    /*
      Estas sí son de la sede: en la fachada se leen el rótulo del hotel y el
      de City Mall al lado. Un primer envío mostraba la torre frente al
      Estadio Nacional, en La Sabana, y se descartó.
    */
    imagenes: [
      {
        src: "/hoteles/hilton-garden-inn/01.jpg",
        alt: "Fachada del hotel con su rótulo, junto al edificio de City Mall y la autopista",
      },
      {
        src: "/hoteles/hilton-garden-inn/02.jpg",
        alt: "Habitación con cama king, escritorio y ventanal de piso a techo con vista a las montañas",
      },
      {
        src: "/hoteles/hilton-garden-inn/03.jpg",
        alt: "Restaurante con mesas montadas, lámparas colgantes y pared de listones de madera",
      },
      {
        src: "/hoteles/hilton-garden-inn/04.jpg",
        alt: "Sala de trabajo con sillones azules y dos puestos de computadora sobre un mueble de madera",
      },
    ],
    contacto: {
      correos: ["SJOAC_Reservations@hilton.com", "SJOAC-Events@hilton.com"],
      telefonos: ["4052-2300, ext. 2301"],
      nota: "Indicar que vienen a la celebración de los 100 años de UNADECA. El correo de Events es para diseño y cotización de eventos. El hotel ofrece una visita de inspección con desayuno o almuerzo de cortesía",
    },
    pendientes: [
      "Fotos oficiales de la sede: pedirlas a SJOAC_Reservations@hilton.com. Las primeras que llegaron eran de otra sede y se retiraron",
      "Porcentaje de impuestos: cotiza «+imp» sin detallarlo",
      "Cantidad de habitaciones: el correo no la da; la cadena publica 149, sin confirmar por el hotel",
      "Aire acondicionado y elevador: el correo no los menciona, aunque la cadena sí anuncia A/C",
      "Si la Suite también admite hasta 4 personas: el tope de 4 solo se indica para la Standard",
      "Tarifas y políticas de eventos: se cotizan aparte en SJOAC-Events@hilton.com",
    ],
  },
  {
    slug: "courtyard-alajuela",
    nombre: "Courtyard by Marriott San José Airport, Alajuela",
    nivel: "premium",
    capacidad: null,
    capacidadNota:
      "El convenio no indica cuántas habitaciones tiene, pero limita la tarifa a 7 habitaciones por noche",
    resumen:
      "A 5 minutos del aeropuerto, en el complejo Mango Park, con certificación LEED. Ojo: la tarifa de convenio no aplica a grupos de 8 habitaciones o más.",
    desayuno: "Desayuno buffet incluido: 1 en sencilla, 2 en doble",
    clima: null,
    acceso: null,
    servicios: [
      "Internet de alta velocidad incluido",
      // Corregido: el convenio original decía "1:00 a. m.", un horario de
      // 21 horas seguidas que no tenía sentido operativo. La hoja de tarifas
      // 2026 lo aclara: termina al mediodía, no de madrugada.
      "Transporte gratuito al aeropuerto cada 30 minutos, de 4:15 a. m. a 1:00 p. m.",
      "Piscina al aire libre y gimnasio 24 horas",
      "Restaurante El Centro",
      "Lavadora y secadora disponibles",
      "Habitaciones con caja fuerte, TV LCD y escritorio con silla ergonómica",
      "Espacio para eventos, reuniones y celebraciones",
      "Hotel de no fumado",
    ],
    caracteristicas: {
      // El convenio detalla servicios pero nunca menciona clima ni elevador.
      aire: null,
      elevador: null,
      salon: true,
      piscina: true,
      transporte: true,
      desayunoIncluido: true,
    },
    /*
      Único hotel que dice el impuesto: 13%. La tarifa de mercado sin convenio
      es de $260 y no se carga acá porque no es una opción que la comisión
      vaya a usar; sirve solo para dimensionar el descuento.

      Precio actualizado el 18/8/2026 con la hoja "Información importante
      para Hoteles del CENTENARIO": $135→$153 sencilla, $145→$164 doble. Esa
      hoja no repite el 13%, así que ese número sigue viniendo del convenio
      firmado — no está confirmado que aplique sobre el precio nuevo.
    */
    habitaciones: [
      {
        nombre: "Estándar sencilla",
        precio: 153,
        unidad: "habitacion-noche",
        personas: 1,
        detalle:
          "Incluye 1 desayuno · 13% de impuestos según el convenio firmado, sin confirmar sobre este precio",
      },
      {
        nombre: "Estándar doble",
        precio: 164,
        unidad: "habitacion-noche",
        personas: 2,
        detalle:
          "Incluye 2 desayunos · 13% de impuestos según el convenio firmado, sin confirmar sobre este precio",
      },
    ],
    // Las de más resolución primero: la 01 es la que se muestra grande.
    imagenes: [
      {
        src: "/hoteles/courtyard-alajuela/01.jpg",
        alt: "Habitación con dos camas dobles, pared azul, escritorio y silla de trabajo",
      },
      {
        src: "/hoteles/courtyard-alajuela/02.jpg",
        alt: "Sala de una suite con sofá seccional, escritorio, televisor y ventanal a las montañas",
      },
      {
        src: "/hoteles/courtyard-alajuela/03.jpg",
        alt: "Restaurante con mesas de madera y ventanales corredizos hacia un patio con plantas",
      },
      {
        src: "/hoteles/courtyard-alajuela/04.jpg",
        alt: "Barra de desayuno buffet con fruta, cereales y máquina de café",
      },
      {
        src: "/hoteles/courtyard-alajuela/05.jpg",
        alt: "Tienda de conveniencia con refrescos, snacks y café",
      },
    ],
    contacto: {
      correos: ["reservationscr@marriott.com"],
      telefonos: ["(506) 2208 3010"],
      nota: "Mencionar UNADECA al reservar. Cancelación: 48 horas antes de la llegada. Tarifas de grupo: Melany Ramirez, melany.ramirez@marriott.com",
    },
    pendientes: [
      "TOPE DE 7 HABITACIONES SIN CONFIRMAR SI SIGUE: el convenio firmado excluía grupos de 8 habitaciones o más. La hoja de tarifas 2026 recibida el 18/8/2026 no repite esa restricción, pero tampoco dice que se levantó. Para 84 personas hay que confirmarlo con Melany Ramirez (melany.ramirez@marriott.com) antes de reservar con este precio",
      "VIGENCIA SIGUE SIN CUBRIR EL CENTENARIO: la hoja nueva —pensada para el Centenario, según su título— repite la misma vigencia del convenio viejo, 1/1/2026 al 31/12/2026. El evento es del 21 al 25 de julio de 2027, fuera de ese rango. Hay que preguntar si va a salir una hoja para 2027 o si esta tarifa se extiende",
      "CORREO DISCREPANTE: el convenio firmado da reservationscr@marriott.com; la hoja nueva da reservations@marriott.com, sin el «cr». No se sabe cuál usar — confirmar antes de escribir",
      "Capacidad total, aire acondicionado y elevador: ningún documento los indica",
      "El convenio exige firmarlo y devolverlo para que la tarifa se cargue en sistema",
    ],
  },
  {
    slug: "fairfield-alajuela",
    nombre: "Fairfield by Marriott San José Airport, Alajuela",
    nivel: "premium",
    capacidad: null,
    capacidadNota:
      "El convenio no indica cuántas habitaciones tiene, pero limita la tarifa a 7 habitaciones por noche",
    resumen:
      "Hermano del Courtyard, en el mismo complejo Mango Park y a 5 minutos del aeropuerto. La doble cuesta igual que la sencilla, así que compartir sale a mitad de precio.",
    desayuno: "Desayuno buffet incluido: 1 en sencilla, 2 en doble",
    clima: null,
    acceso: null,
    servicios: [
      "Internet de alta velocidad incluido",
      // Mismo ajuste que en el Courtyard: la hoja de tarifas 2026 aclara que
      // el transporte termina al mediodía, no de madrugada.
      "Transporte gratuito al aeropuerto cada 30 minutos, de 4:15 a. m. a 1:00 p. m.",
      "Gimnasio 24 horas",
      "Restaurante Garden",
      "Tienda de conveniencia Market, 24 horas",
      "Lavadora y secadora disponibles",
      "Habitaciones con caja fuerte, TV LCD y escritorio con silla ergonómica",
      "Espacio para eventos, reuniones y celebraciones",
      "Hotel de no fumado",
    ],
    caracteristicas: {
      aire: null,
      elevador: null,
      salon: true,
      /*
        A diferencia del Courtyard, este convenio NO menciona piscina, y ambos
        describen los servicios con la misma frase. La omisión sugiere que no
        tiene, pero sugerir no es saber: queda sin dato.
      */
      piscina: null,
      transporte: true,
      desayunoIncluido: true,
    },
    // Tarifa de mercado sin convenio: $170. No se carga por la misma razón
    // que en el Courtyard — no es una opción que la comisión vaya a usar.
    //
    // Precio actualizado el 18/8/2026 con la hoja "Información importante
    // para Hoteles del CENTENARIO": $105→$119, sencilla y doble por igual.
    // Igual que en el Courtyard, esa hoja no repite el 13%; queda como el
    // último dato conocido, del convenio firmado, no confirmado sobre el
    // precio nuevo.
    habitaciones: [
      {
        nombre: "Estándar sencilla",
        precio: 119,
        unidad: "habitacion-noche",
        personas: 1,
        detalle:
          "Incluye 1 desayuno · 13% de impuestos según el convenio firmado, sin confirmar sobre este precio",
      },
      {
        nombre: "Estándar doble",
        precio: 119,
        unidad: "habitacion-noche",
        personas: 2,
        detalle:
          "Incluye 2 desayunos · mismo precio que la sencilla · 13% de impuestos según el convenio firmado, sin confirmar sobre este precio",
      },
    ],
    // Las de más resolución primero: la 01 es la que se muestra grande.
    imagenes: [
      {
        src: "/hoteles/fairfield-alajuela/01.jpg",
        alt: "Fachada azul y gris del hotel al atardecer, con el rótulo y la marquesina de la entrada",
      },
      {
        src: "/hoteles/fairfield-alajuela/02.jpg",
        alt: "Habitación con cama, escritorio, silla azul y televisor sobre panel de madera",
      },
      {
        src: "/hoteles/fairfield-alajuela/03.jpg",
        alt: "Sala del lobby con sofá, mesas bajas y ventanales hacia un jardín interior",
      },
      {
        src: "/hoteles/fairfield-alajuela/04.jpg",
        alt: "Barra con taquetes de madera, dispensador de bebidas y cielo raso de listones",
      },
      {
        src: "/hoteles/fairfield-alajuela/05.jpg",
        alt: "Tienda de conveniencia con estantes de snacks, refrigerador de bebidas y microondas",
      },
    ],
    contacto: {
      correos: ["reservationscr@marriott.com"],
      telefonos: ["(506) 2588 4371", "(506) 2588 4373", "(506) 4036 7214"],
      nota: "Mencionar UNADECA al reservar. Cancelación: 48 horas antes de la llegada. Tarifas de grupo: Melany Ramirez, melany.ramirez@marriott.com",
    },
    pendientes: [
      "TOPE DE 7 HABITACIONES SIN CONFIRMAR SI SIGUE: igual que el Courtyard, el convenio firmado excluía grupos de 8 habitaciones o más. La hoja de tarifas 2026 no repite la restricción, pero tampoco confirma que se levantó. Para 84 personas hay que confirmarlo con Melany Ramirez (melany.ramirez@marriott.com) antes de reservar con este precio",
      "VIGENCIA SIGUE SIN CUBRIR EL CENTENARIO: la hoja nueva —pensada para el Centenario, según su título— repite la misma vigencia del convenio viejo, 1/1/2026 al 31/12/2026. El evento es del 21 al 25 de julio de 2027, fuera de ese rango. Hay que preguntar si va a salir una hoja para 2027",
      "CORREO DISCREPANTE: el convenio firmado da reservationscr@marriott.com; la hoja nueva da reservations@marriott.com, sin el «cr». No se sabe cuál usar — confirmar antes de escribir",
      "Si tiene piscina: ningún documento la menciona, aunque el del Courtyard sí, y en las fotos tampoco aparece",
      "Capacidad total, aire acondicionado y elevador",
      "El convenio exige firmarlo y devolverlo para que la tarifa se cargue en sistema",
    ],
  },
];

export const pendientesGenerales = [
  "Si los precios de los seis primeros hoteles ya incluyen IVA (13%) e impuesto de servicio. El Hampton Inn y el Hilton Garden Inn cotizan «+imp» sin decir el porcentaje; el Courtyard es el único que lo fija en 13%.",
  "Dónde se realiza el evento: solo el Tucán menciona un salón, para 30 personas.",
  "Qué significa «accesible» en la categoría intermedia: ni Park View ni Tucán tienen elevador. El único hotel con elevador es Backpackers, que está en la categoría básica.",
  "Cotización de transporte: el Airport lo menciona como «posible» y La Guaria ofrece un viaje diario.",
];
