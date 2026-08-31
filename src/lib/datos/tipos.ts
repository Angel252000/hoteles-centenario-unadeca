/**
 * Formas de los datos. Separadas del contenido para que este archivo se lea
 * de un vistazo y `contenido.ts` quede dedicado a lo que se edita a diario.
 */

export type NivelId = "grupos" | "accesibles" | "premium";

/**
 * Piezas de marca. Las que siguen en `null` es porque todavía no existen:
 * mientras lo estén, la pantalla muestra el espacio reservado con la medida
 * que hace falta, en vez de acomodarse como si el hueco no existiera.
 */
export type Medios = {
  /**
   * El logo del Centenario. No llegó, y por ahora tampoco tiene un lugar fijo
   * en la pantalla: el header lo tenía reservado a la izquierda, pero se sacó
   * de ahí el 20 de agosto de 2026 para dejarle el lugar a UNADECA. Se
   * mantiene el campo por si aparece un lugar para él más adelante — hoy
   * ningún componente lo usa.
   */
  logoCentenario: { src: string; alt: string } | null;
  /** Header, a la izquierda — todo el ancho para él solo. El logo de UNADECA. */
  logoUnadeca: { src: string; alt: string } | null;
  /** Banda ancha de la portada. Pide 2000 px o más para no verse interpolada. */
  portada: { src: string; alt: string } | null;
  video: {
    /** `archivo` = mp4 en `public/`. `incrustado` = URL de YouTube o Vimeo. */
    tipo: "archivo" | "incrustado";
    src: string;
    titulo: string;
    /** Solo para `archivo`: imagen que se ve antes de darle play. */
    poster?: string;
  } | null;
};

/**
 * Una foto de hotel: la ruta y su texto alternativo.
 *
 * Esta forma estaba escrita tres veces —en `Hotel.imagenes` sin nombre, y
 * como `type Foto` dentro de `galeria.tsx`, donde chocaba de nombre con el
 * componente `Foto` que ese mismo archivo importa—. Se llama `Imagen` y no
 * `Foto` justamente para no volver a pisar al componente.
 *
 * El `alt` no es decorativo: es lo que se lee en voz alta y lo que aparece
 * bajo la foto en el visor a pantalla completa.
 */
export type Imagen = { src: string; alt: string };

/** Uno de los tres puntos de la franja intermedia. */
export type PuntoClave = { titulo: string; texto: string };

/**
 * Total fijo de la escala. Seis y no cinco por decisión de la comisión — ver
 * `ESCALA` y su advertencia en `contenido.ts`.
 */
export const ESTRELLAS_TOTAL = 6;

/**
 * Rango de estrellas de un nivel. Es rango y no número porque el nivel medio
 * se definió como «4 a 5»: hay dos hoteles ahí y nada en los datos con que
 * separarlos, así que se muestra el rango en vez de inventarle un valor a
 * cada uno.
 *
 * Cuando `max` es mayor que `min`, las estrellas entre uno y otro se dibujan
 * con contorno: son el «hasta», que no es lo mismo que una estrella vacía.
 */
export type RangoEstrellas = { min: number; max: number };

export type Nivel = {
  id: NivelId;
  /**
   * Reemplazó a `etiqueta` («Básico», «Medio», «Premium»), que era lo que se
   * mostraba antes del 26 de agosto de 2026.
   */
  estrellas: RangoEstrellas;
  /**
   * Cómo se lee el rango en voz alta y en el `aria-label`. Se guarda escrito
   * en vez de armarlo con plantillas porque «3» y «4 a 5» no se dicen igual.
   */
  leyenda: string;
};

/** Cómo se cobra una tarifa. Cambia por completo el cálculo del total. */
export type Unidad = "persona-noche" | "habitacion-noche";

export type Habitacion = {
  nombre: string;
  precio: number;
  unidad: Unidad;
  /**
   * Personas que cubre esa tarifa — NO la capacidad de camas de la
   * habitación. Los dos números pueden no coincidir, y esa es justamente la
   * confusión que hay que evitar: La Guaria cotiza su «Cuádruple» en
   * ocupación doble, así que ahí `personas` es 2 aunque el cuarto tenga dos
   * camas dobles. Lo que hay de camas va en `camas`.
   */
  personas: number;
  /**
   * Camas, tal como las describe el documento. Ausente cuando la fuente no
   * dice nada — que es el caso de 18 de las 26 tarifas y no es un olvido de
   * la carga. Mismo criterio que `aire: null`: callar no es decir «no tiene».
   *
   * Se separó de `detalle` el 26 de agosto de 2026 para que el desajuste
   * entre personas cubiertas y camas se vea de un vistazo en vez de quedar
   * enterrado a mitad de una frase.
   */
  camas?: string;
  detalle?: string;
  /** Cantidad y total a 4 noches, cuando el documento los trae calculados. */
  cotizado?: { unidades: number; total: number };
};

/**
 * Atributos sueltos del hotel. `null` = la fuente no lo dice, que no es lo
 * mismo que «no tiene». Se usaban para filtrar; ahora alimentan la fila de
 * datos de cada ficha.
 */
export type Caracteristicas = {
  /** `null` = no se sabe. Antes no existía esa opción y obligaba a declarar
      "no" —, lo que la ficha mostraba como "Ventilador": un dato falso. */
  aire: "si" | "parcial" | "no" | null;
  elevador: boolean | null;
  salon: boolean | null;
  piscina: boolean | null;
  transporte: boolean;
  desayunoIncluido: boolean;
};

/** Por dónde se reserva. Varios hoteles piden mencionar UNADECA al llamar. */
export type Contacto = {
  correos?: string[];
  telefonos?: string[];
  /** Condición que el hotel pide al reservar, o a quién dirigirse. */
  nota?: string;
};

export type Hotel = {
  slug: string;
  nombre: string;
  nivel: NivelId;
  /** Capacidad máxima declarada. `null` = el documento no la indica. */
  capacidad: number | null;
  capacidadNota?: string;
  resumen: string;
  desayuno: string;
  /** `null` = el hotel no lo informó. Se omite de «Qué incluye» en vez de
      listarse como si fuera un servicio. */
  clima: string | null;
  acceso: string | null;
  servicios: string[];
  caracteristicas: Caracteristicas;
  habitaciones: Habitacion[];
  imagenes: Imagen[];
  contacto?: Contacto;
  /** Datos que faltan o hay que confirmar con el hotel. */
  pendientes: string[];
};
