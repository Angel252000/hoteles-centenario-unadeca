@AGENTS.md

# hoteles-promo — contexto y skills

Sitio estático Next.js 16 + Tailwind 4 (`output: "export"`) que promociona hoteles de Alajuela,
Costa Rica para el **Centenario UNADECA 2027**. Evento: **84 personas, 4 noches**, precios USD.

Los 10 hoteles se agrupan en 3 niveles, que desde el 26 de agosto de 2026 se muestran como
**estrellas sobre 6** en vez de las palabras «Básico / Medio / Premium»: `grupos` = 3 de 6,
`accesibles` = 4 a 5 de 6, `premium` = 6 de 6.

**El rótulo en pantalla dice «Nivel N de 6», nunca «estrellas» a secas, y eso no se cambia.**
La escala de estrellas de hotel del mundo real llega a 5 y es una clasificación oficial; acá
se aplica a hoteles de marca reales (Courtyard, Fairfield, Hampton Inn, Hilton Garden Inn)
que en esa escala son de clase 3. Escrito «6 estrellas», la hoja afirmaría una categoría
falsa ante gente que la usa para decidir dónde dormir. La advertencia larga está en
`contenido.ts`, arriba de `niveles`.

Ojo también: 6 de los 10 hoteles son `premium`, o sea muestran 6 de 6 idéntico. Las estrellas
cargan la misma información que cargaban las tres palabras. Para que discriminen haría falta
un valor por hotel — es la tarea 15 de `docs/MEJORAS.md` y la decide la comisión.

Todo el contenido vive en `src/lib/datos/contenido.ts`. Para cambiar textos, precios o fotos
se edita ese archivo — no se tocan los componentes. Los datos se importan siempre desde
`@/lib/datos`, nunca de los archivos internos de esa carpeta.

## Reglas técnicas que no son obvias

**No se usa `next/image`.** El export estático apaga el optimizador de imágenes, y sin él
`<Image>` escribe un `<img src>` pelado: el teléfono se baja el mismo archivo que el
escritorio. Las fotos van por `src/components/ui/foto.tsx`, que emite un `<picture>` con
AVIF y WebP. Las variantes se generan a mano con `pnpm build:imagenes` y se versionan en
`public/opt`. **Foto nueva sin correr ese comando = se sirve el JPG original.**

**No hay librería de animación.** framer-motion se sacó el 31 de agosto de 2026: se usaba
para una aparición de 14 px y costaba 38 KB comprimidos. Hoy `ui/reveal.tsx` marca el bloque,
`globals.css` tiene la transición y `ui/observador-reveal.tsx` monta un solo
`IntersectionObserver` para toda la página. `prefers-reduced-motion` se resuelve en CSS.

**`/comision` no se publica.** `pnpm build` la borra de `out/` (`scripts/quitar-comision.mjs`).
Se ve con `pnpm dev`; para publicarla a propósito, `INCLUIR_COMISION=1 pnpm build`.

**Todos los iconos van en `ui/iconos.tsx`.** Sin excepciones.

**El sitio ya no está en Netlify.** Se sirve desde servidor propio; la configuración está en
`deploy/`. `pnpm build` deja los `.br` y `.gz` precomprimidos, y el servidor tiene que estar
configurado para servirlos: sin eso la portada pesa 189 KB en vez de 10.8 KB.

Estructura completa del proyecto: `docs/ARQUITECTURA.md`. Registro de decisiones, con las
autocríticas de cada una: `docs/MEJORAS.md`.

## Cómo se muestran los precios

Desde el 26 de agosto de 2026 el precio grande **no es por persona por noche**. Son las
**4 noches para 2 personas** (`costoDosPersonas`), calculadas con la regla de cobro de cada
hotel: cuatro hoteles cobran por persona-noche y seis por habitación-noche, y un «total de 4
noches» crudo pondría los $240 de una habitación al lado de los $112 de una sola persona.

Dos cosas de ese cálculo que conviene no romper:

- **Devuelve también de qué tarifa salió, y la pantalla lo muestra.** El mínimo a veces es un
  camarote en dormitorio compartido — Backpackers da $128 así, contra $240 de la privada.
  La cifra sin esa línea haría parecer que el hotel entero cuesta eso.
- **Dentro de la ficha, cada tarifa por habitación trae el reparto por ocupación** —sola,
  entre 2, entre 3…— hasta `personas`, con el encabezado diciendo «la tarifa cubre hasta N».
  Ese tope sale de la fuente, no de las camas: La Guaria cotiza su «Cuádruple» en ocupación
  doble aunque tenga dos camas dobles.

`Habitacion.personas` es **lo que cubre la tarifa**, no la capacidad de camas. Las camas van
en `Habitacion.camas`, y solo las tienen 8 de las 26 tarifas porque la fuente calla en el
resto. Callar no es decir «no tiene» — mismo criterio que `aire: null`.

**Antes de tocar código, leer [`docs/ARQUITECTURA.md`](docs/ARQUITECTURA.md)**: explica el
árbol de carpetas, por qué está así y los comandos del proyecto.
Las mejoras pendientes están en [`docs/MEJORAS.md`](docs/MEJORAS.md).

## Dirección de diseño (manda sobre cualquier skill)

**Editorial académica — azul marino y oro sobre papel blanco.** Paleta tomada el 18 de
agosto de 2026 del tablero de marca del Centenario UNADECA (oro, crema, azul, marino claro,
marino oscuro, más un degradé azul→marino), con el papel pasado de la crema del tablero a
blanco el 26 de agosto. Un acento reservado y sombras tintadas de marino. Esta dirección ya
está decidida y aplicada; ninguna skill la reemplaza. Las skills sirven para *ejecutarla
mejor*, no para cambiarla.

Dos cosas del cambio a blanco que hay que saber antes de tocar color:

- **`bone` cumple dos papeles.** Es la superficie del papel Y la tinta clara sobre marino
  (`text-bone` en hero, header, badges y visor de galería). Vale blanco en los dos, pero
  tocarlo repinta las dos familias a la vez.
- **El grano de papel (`body::before`) usa `multiply`, no `overlay`.** Overlay es una
  operación nula sobre blanco (`screen(1, x) = 1`) y borraría el grano de todo el sitio
  claro. El precio es que los bloques marinos quedan de color plano. No revertir a overlay
  sin leer el comentario largo en `globals.css`.

Tokens reales en `src/styles/globals.css` (`@theme`) — el comentario junto a cada bloque en
ese archivo trae el porqué y el contraste WCAG calculado, esto es solo la tabla:

| Rol | Token | Valor | Origen |
|---|---|---|---|
| Papel / tinta sobre marino | `--color-bone` | `#ffffff` | Blanco. 17.4:1 sobre `ink` |
| Superficie secundaria | `--color-bone-dim` | `#f2f4f7` | Neutro frío derivado de `ink` |
| Tinta | `--color-ink` | `#001841` | Marino oscuro del tablero, tal cual |
| Tinta suave | `--color-ink-soft` | `#1e3160` | Marino claro del tablero, tal cual |
| Texto | `--color-graphite` | `#1e3160` | Mismo valor que `ink-soft`, a propósito. 12.81:1 |
| Texto tenue | `--color-mute` | `#565e75` | Marino claro aclarado. 6.61:1 |
| Texto tenue sobre tinta | `--color-mute-invert` | `#b0a892` | Gris cálido. 7.35:1 sobre `ink` |
| Acento oro | `--color-brass` | `#6c5b2d` | Oro del tablero, oscurecido para texto en papel. 6.77:1 |
| Acento oro claro | `--color-brass-bright` | `#bca35e` | Oro del tablero, tal cual — solo sobre tinta. 7.07:1 |
| Azul acento | `--color-cobalt` | `#2d73aa` | Azul del tablero, tal cual. 5.19:1 |
| Azul texto | `--color-cobalt-deep` | `#1e4c71` | Azul oscurecido. 9.06:1 |
| Hairline | `--color-line` | `#e3e7ee` | Neutro frío derivado de `ink` |
| Borde de control | `--color-line-strong` | `#848ea0` | Neutro frío. 3.31:1 — WCAG 1.4.11 pide 3:1 |
| Línea sobre tinta | `--color-line-invert` | `#2d73aa` | Reusa `cobalt`. 3.36:1 sobre `ink` |

Los ratios son contra el papel blanco salvo donde diga «sobre `ink`». `bone-dim`, `line` y
`line-strong` eran crema mezclada con oro y se neutralizaron el 26 de agosto: sobre blanco
leían como manchas amarillentas sueltas.

El pie de página (`site-footer.tsx`) va sobre `ink` y usa solo los tokens de «sobre tinta».
Es el cierre de la página: el cambio de superficie es lo que marca el final.

Tipografías: **Jost** (`--font-display`) + **Hanken Grotesk** (`--font-sans`) — sin cambios.
Motion: 150–300ms, `--ease-out-soft`, solo cuando comunica algo.

Prohibido: card dentro de card, gris sobre gris, sombras pesadas, stock proptech genérico.
El oro se reserva para CTAs, precios y reglas — no se reparte. Excepción puntual a la regla de
«nada de gradientes»: el degradé azul→marino del tablero (`.fondo-degradado-marca` en
`globals.css`) SÍ está permitido, pero solo como fondo de los bloques de foto/video que
todavía no tienen archivo real — no se usa en botones, chips ni fondos de sección.

## Qué skill usar y cuándo

Invocar con `/nombre-skill`. No usar varias skills de dirección visual a la vez: se contradicen.

### Sí usar en este proyecto

| Skill | Cuándo |
|---|---|
| `high-end-visual-design` | Subir el acabado (espaciado, sombras, estructura de cards, tipografía) sin cambiar la identidad. Skill de cabecera para este sitio. |
| `polish` | Ronda final antes de publicar: alineación, consistencia, detalles. |
| `redesign-existing-projects` | Auditar el sitio y detectar patrones genéricos de IA antes de mejorar. |
| `layout` / `typeset` | Problemas puntuales de composición o de jerarquía tipográfica. |
| `audit` | Accesibilidad, rendimiento, responsive. Reporte con severidad P0–P3. |
| `harden` | Estados vacíos, overflow de texto, casos borde (filtros sin resultados). |
| `imagegen-frontend-web` | Generar referencias visuales por sección antes de codificar un cambio grande. |
| `image-to-code` | Traducir a código una referencia visual ya generada o una captura. Pareja natural de `imagegen-frontend-web`. |
| `design-taste-frontend` | Secciones o páginas **nuevas** (ej. un bloque de itinerario o de transporte). Ignorar su fase de "inferir dirección": la dirección ya está fijada arriba. |
| `playwright-cli` | Verificar visualmente cualquier cambio. Ver flujo abajo. |
| `full-output-enforcement` | Cuando un archivo largo se deba regenerar completo, sin `// ...` ni recortes. |

### No usar aquí (chocan con la dirección editorial)

`minimalist-ui` (monocromo frío), `industrial-brutalist-ui` (terminal militar),
`gpt-taste` / `overdrive` (GSAP pinning, bento sin gaps, escala llamativa),
`bolder` / `colorize` (rompen la reserva del latón).
`stitch-design-taste` y `brandkit` solo si se arranca una identidad nueva — no es el caso.

### Sin uso en este proyecto (no chocan, simplemente no aplican)

`imagegen-frontend-mobile` — es para apps iOS/Android; esto es web responsive, no app nativa.
`design-taste-frontend-v1` — solo existe por compatibilidad hacia atrás; usar la v2.

### DESIGN.md de referencia

`~/awesome-design-md/design-md/` tiene 74 DESIGN.md extraídos de sitios reales.
`airbnb` es el análogo más cercano por rubro. Usar como **lectura de referencia**,
no copiar su `DESIGN.md` a la raíz: sustituiría la dirección editorial ya definida.

## Verificación visual con playwright-cli

El binario está en `~/.npm-global/bin` (ya en el PATH de `~/.zshrc`).

```bash
pnpm build                                          # regenera out/
python3 -m http.server 4321 --directory out         # servidor estático
playwright-cli open http://127.0.0.1:4321
playwright-cli screenshot --full-page
playwright-cli resize 390 844                       # revisar móvil
```

Los screenshots caen en `.playwright-cli/`. Regla: **ningún cambio visual se da por hecho
sin screenshot antes/después**, desktop (1440) y móvil (390).

Dos cosas que se rompen seguido acá:

- **El Chromium de Playwright puede no estar instalado.** Si `playwright-cli open` dice
  `Browser "chromium" is not installed`, hace falta `playwright-cli install-browser chromium`.
- **`npx serve` falló en esta máquina sin dar error.** `python3 -m http.server` anda.

`.playwright-cli/` y `.claude/` ya están en `.gitignore`.
