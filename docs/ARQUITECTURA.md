# Cómo está organizado el proyecto

Guía para saber **dónde tocar** según lo que quieras cambiar. Si solo vas a
cambiar precios, fotos o textos de hoteles, con la primera sección te alcanza.

> Este archivo se desactualizó una vez y costó: nombraba un `hero.tsx` que ya
> se llamaba `portada.tsx` y no listaba siete archivos que existían. Un mapa
> equivocado es peor que no tener mapa. Si movés un archivo, arreglalo acá.

---

## Lo que cambia seguido

| Quiero cambiar… | Archivo |
|---|---|
| Precios, nombres, servicios, pendientes de un hotel | `src/lib/datos/contenido.ts` |
| Agregar un hotel nuevo | `src/lib/datos/contenido.ts` + fotos en `public/hoteles/<slug>/` |
| Teléfonos y correo de consultas | `src/lib/datos/contenido.ts` → `consultas` |
| Fechas del evento, cantidad de personas o noches | `src/lib/datos/contenido.ts` → `evento` |
| Logo, imagen de portada, video | `src/lib/datos/contenido.ts` → `medios` |
| Colores, tipografías, sombras | `src/styles/globals.css` → bloque `@theme` |

**Ninguno de esos cambios obliga a tocar un componente.** Ese es el trato: el
contenido vive en un solo archivo y las pantallas lo leen.

---

## El árbol

```
src/
├── app/                        Rutas. Un archivo = una página
│   ├── layout.tsx              Cascarón común: fuentes, <body>, noscript
│   ├── page.tsx                Portada — solo ensambla secciones
│   ├── comision/               Página interna. NO se publica (ver más abajo)
│   └── hoteles/[slug]/         Ficha de detalle — solo ensambla secciones
│
├── components/
│   ├── layout/                 Se repite en todas las páginas
│   │   ├── site-header.tsx
│   │   └── site-footer.tsx
│   │
│   ├── home/                   Secciones de la portada, en orden de lectura
│   │   ├── portada.tsx         Banda de arriba
│   │   ├── carrusel-centenario.tsx
│   │   ├── puntos-video.tsx    Tres puntos + el video
│   │   ├── listado.tsx         La parrilla de hoteles (id="hoteles")
│   │   └── consultas.tsx       Teléfonos y correo
│   │
│   ├── hoteles/                Todo lo que muestra un hotel
│   │   ├── hotel-card.tsx      La ficha de la parrilla
│   │   ├── encabezado-hotel.tsx  Precio, nivel, nombre, fila de datos
│   │   ├── tabla-tarifas.tsx   Las tarifas y el reparto por ocupación
│   │   ├── panel-reservas.tsx  Columna lateral: qué incluye y contactos
│   │   ├── otros-hoteles.tsx   Tres hoteles al pie
│   │   ├── galeria.tsx         El mosaico 1 + 4
│   │   └── visor-fotos.tsx     El visor a pantalla completa
│   │
│   └── ui/                     Piezas sin dominio, reutilizables
│       ├── foto.tsx            <picture> con srcset — reemplaza a next/image
│       ├── iconos.tsx          TODOS los iconos del sitio
│       ├── estrellas.tsx       El nivel, sobre 6
│       ├── spec.tsx            Un dato con icono
│       ├── reveal.tsx          Marca un bloque para aparecer al hacer scroll
│       ├── observador-reveal.tsx  El observador, uno para toda la página
│       └── espacio-pendiente.tsx  Hueco medido para lo que aún no llegó
│
├── lib/
│   ├── datos/
│   │   ├── contenido.ts        ← LO QUE SE EDITA
│   │   ├── tipos.ts            La forma que deben cumplir los datos
│   │   ├── calculos.ts         Precios derivados y `nivelDe`
│   │   └── index.ts            Punto de entrada único
│   ├── imagen-tamanos.ts       Resolución nativa de cada foto
│   └── imagen-variantes.ts     Qué anchos existen en public/opt (generado)
│
└── styles/
    └── globals.css             Tokens de diseño y clases base

scripts/                        Se corren a mano o desde `pnpm build`
├── optimizar-imagenes.mjs      Genera public/opt y reescribe imagen-variantes
├── quitar-comision.mjs         Borra /comision de out/ después del build
└── precomprimir.mjs            Escribe los .br y .gz de out/

deploy/                         Configuración del servidor propio
├── README.md                   Cuál elegir y cómo verificar
├── Caddyfile                   ← la recomendada
├── nginx.conf
└── apache.htaccess
```

### Por qué así

- **`app/` solo tiene rutas.** Una página que además define su interfaz crece
  hasta que nadie la lee. Las dos páginas ensamblan y nada más: se ve de un
  vistazo qué secciones hay y en qué orden. La ficha de hotel llegó a tener
  474 líneas antes de partirse; hoy tiene 120.
- **Componentes agrupados por área, no por tipo.** Buscar «lo de la portada»
  es más frecuente que buscar «todos los botones». `home/`, `hoteles/`,
  `layout/` y `ui/` responden a la pregunta que uno se hace de verdad.
- **`ui/` es lo único reutilizable de forma general.** Si algo de `hoteles/`
  empieza a usarse en tres lugares distintos, ahí se muda.
- **Los datos entran por un solo punto.** Todo importa de `@/lib/datos`, nunca
  de los archivos de adentro: se puede reacomodar el contenido sin tocar
  pantallas.
- **Todos los iconos viven en `ui/iconos.tsx`.** Sin excepciones. Hubo tres
  sueltos por ahí y el resultado fue que el siguiente se agregaba donde caía.

---

## Reglas que conviene respetar

1. **Nunca inventar un dato de hotel.** Lo que la fuente no dice va a
   `pendientes` y el sitio lo muestra como «sin dato». Los tipos permiten
   `null` justamente para eso: `aire: null` no es lo mismo que `aire: "no"`,
   que la ficha mostraría como «Solo ventilador».
2. **Toda foto nueva obliga a correr `pnpm build:imagenes`.** Genera las
   variantes AVIF y WebP en `public/opt` y reescribe `imagen-variantes.ts`.
   Sin eso, `<Foto>` no encuentra variantes y cae al JPG original: el sitio
   anda, pero el teléfono se baja el archivo grande.
3. **`/comision` no se publica.** `pnpm build` la borra de `out/`. Para verla,
   `pnpm dev`. Para publicarla a propósito, `INCLUIR_COMISION=1 pnpm build`.
4. **Verificar cambios visuales con capturas** en escritorio (1440) y móvil
   (390) antes de darlos por buenos.
5. **`CLAUDE.md` y `AGENTS.md` se quedan en la raíz.** No son documentación
   suelta: los agentes de código los leen desde ahí. `AGENTS.md` además lo
   reescribe `next dev` en cada arranque.

---

## Comandos

```bash
pnpm dev                # desarrollo en localhost:3000
pnpm build              # genera out/ listo para publicar
pnpm typecheck          # chequeo de tipos, más rápido que el build
pnpm lint
pnpm build:imagenes     # regenera public/opt tras agregar fotos
```

`pnpm build` hace tres cosas, en este orden: `next build`, después quita
`/comision` de `out/`, y por último escribe los `.br` y `.gz`.

`next dev` y `next build` **no pueden correr a la vez**: chocan por el
directorio `.next` y además dejan dos juegos de tipos generados que se pisan,
lo que hace fallar a `pnpm typecheck` con errores que no vienen del código.
Parar el dev antes de compilar.

---

## Publicar

El sitio es HTML estático: no hace falta Node ni nada corriendo en el
servidor. `pnpm build` deja todo en `out/` y se copia tal cual.

```sh
pnpm build
rsync -avz --delete out/ usuario@servidor:/var/www/hoteles/
```

**La compresión es obligatoria.** El build deja los `.br` listos, pero el
servidor tiene que estar configurado para servirlos: sin eso la portada pesa
189 KB en vez de 10.8 KB y nadie lo nota, porque se ve igual. Ver
`deploy/README.md`, que trae la configuración de los tres servidores y el
`curl` que lo comprueba.
