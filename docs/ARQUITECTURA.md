# Cómo está organizado el proyecto

Guía para saber **dónde tocar** según lo que querés cambiar. Si solo vas a
cambiar precios, fotos o textos de hoteles, con la primera sección te alcanza.

---

## Lo que cambia seguido

| Quiero cambiar… | Archivo |
|---|---|
| Precios, nombres, servicios, pendientes de un hotel | `src/lib/datos/contenido.ts` |
| Agregar un hotel nuevo | `src/lib/datos/contenido.ts` + fotos en `public/hoteles/<slug>/` |
| Teléfonos y correo de consultas | `src/lib/datos/contenido.ts` → `consultas` |
| Fechas del evento, cantidad de personas o noches | `src/lib/datos/contenido.ts` → `evento` |
| Colores, tipografías, sombras | `src/styles/globals.css` → bloque `@theme` |

**Ninguno de esos cambios obliga a tocar un componente.** Ese es el trato: el
contenido vive en un solo archivo y las pantallas lo leen.

---

## El árbol

```
src/
├── app/                      Rutas. Un archivo = una página
│   ├── layout.tsx            Cascarón común: fuentes, <body>, noscript
│   ├── page.tsx              Portada — solo ensambla secciones
│   ├── comision/             Página interna de trabajo
│   └── hoteles/[slug]/       Ficha de detalle, una por hotel
│
├── components/
│   ├── layout/               Se repite en todas las páginas
│   │   ├── site-header.tsx
│   │   └── site-footer.tsx
│   ├── home/                 Secciones de la portada, en orden
│   │   ├── hero.tsx
│   │   ├── consultas.tsx
│   │   └── listado.tsx
│   ├── hoteles/              Todo lo que muestra un hotel
│   │   ├── hotel-card.tsx    La ficha de la parrilla
│   │   └── galeria.tsx       Mosaico + visor a pantalla completa
│   └── ui/                   Piezas sin dominio, reutilizables
│       ├── iconos.tsx
│       └── reveal.tsx        Animación de entrada
│
├── lib/
│   ├── datos/
│   │   ├── contenido.ts      ← LO QUE SE EDITA
│   │   ├── tipos.ts          La forma que deben cumplir los datos
│   │   ├── calculos.ts       Precios derivados
│   │   └── index.ts          Punto de entrada único
│   └── imagen-tamanos.ts     Resolución nativa de cada foto
│
└── styles/
    └── globals.css           Tokens de diseño y clases base
```

### Por qué así

- **`app/` solo tiene rutas.** Una página que además define su interfaz crece
  hasta que nadie la lee. `page.tsx` de la portada tiene 20 líneas: se ve de un
  vistazo qué secciones hay y en qué orden.
- **Componentes agrupados por área, no por tipo.** Buscar "lo de la portada" es
  más frecuente que buscar "todos los botones". `home/`, `hoteles/`, `layout/`
  y `ui/` responden a la pregunta que uno se hace de verdad.
- **`ui/` es lo único reutilizable de forma general.** Si algo de `hoteles/`
  empieza a usarse en tres lugares distintos, ahí se muda.
- **Los datos entran por un solo punto.** Todo importa de `@/lib/datos`, nunca
  de los archivos internos: se puede reacomodar el contenido sin tocar
  pantallas.

---

## Reglas que conviene respetar

1. **Nunca inventar un dato de hotel.** Lo que la fuente no dice va a
   `pendientes` y el sitio lo muestra como "sin dato". Los tipos permiten
   `null` justamente para eso: `aire: null` no es lo mismo que `aire: "no"`,
   que la ficha mostraría como "Ventilador".
2. **Toda foto nueva obliga a regenerar `imagen-tamanos.ts`.** Sirve para que
   ninguna imagen se muestre por encima de su resolución real. El comando está
   abajo.
3. **Verificar cambios visuales con capturas** en escritorio (1440) y móvil
   (390) antes de darlos por buenos.
4. **`CLAUDE.md` y `AGENTS.md` se quedan en la raíz.** No son documentación
   suelta: los agentes de código los leen desde ahí. `AGENTS.md` además lo
   reescribe `next dev` en cada arranque.

---

## Comandos

```bash
pnpm dev                      # desarrollo en localhost:3000
pnpm build                    # genera out/ para publicar
pnpm lint
pnpm exec tsc --noEmit        # chequeo de tipos, más rápido que el build
```

`next dev` y `next build` **no pueden correr a la vez**: chocan por el
directorio `.next` y el build queda colgado sin consumir CPU. Parar el dev
antes de compilar.

### Regenerar el registro de tamaños de imagen

```bash
{ printf '/**\n * Dimensiones nativas de cada foto, generadas con `sips` desde public/hoteles.\n * Sirven para no mostrar nunca una imagen por encima de su resolución real,\n * que es lo que la vuelve borrosa. Regenerar si se reemplazan las fotos.\n */\nexport const tamanos: Record<string, { ancho: number; alto: number }> = {\n'
  for f in $(find public/hoteles -name '*.jpg' | sort); do
    w=$(sips -g pixelWidth "$f" | tail -1 | awk '{print $2}')
    h=$(sips -g pixelHeight "$f" | tail -1 | awk '{print $2}')
    echo "  \"${f#public}\": { ancho: $w, alto: $h },"
  done
  printf '};\n\n/** Ancho nativo de una foto, o 0 si no está registrada. */\nexport function anchoNativo(src: string): number {\n  return tamanos[src]?.ancho ?? 0;\n}\n'
} > src/lib/imagen-tamanos.ts
```

---

## Publicar

`pnpm build` deja todo en `out/`. Se arrastra esa carpeta a
`app.netlify.com/drop` y sale un enlace. La carpeta entera, no su contenido:
si se sueltan los archivos sueltos, no encuentra el `index.html` de la raíz.
