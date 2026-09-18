# Plan de mejoras — Hospedaje Centenario UNADECA 2027

> Estado al 17 de agosto de 2026. 10 hoteles cargados, 45 fotos, sitio sin publicar.
> Cada tarea dice **qué pasa hoy**, **cómo se arregla** y **cómo se verifica**.
> Las casillas son para ir marcando lo que se cierra.

## Cómo se trabaja con este documento

Este archivo es la **única lista de trabajo** del proyecto. Nada se implementa
si no está acá.

1. Se propone una mejora.
2. Se anota acá con sus tres partes: qué pasa hoy, cómo se hace, cómo se
   verifica. Si no se puede escribir el "cómo se verifica", la tarea todavía no
   está lista para empezar.
3. Recién entonces se implementa.
4. Al terminar se marca la casilla y se anota debajo qué se hizo, si terminó
   distinto de lo planeado.

Cada tarea nueva lleva además una **contra**: el riesgo o el costo de hacerla.
Una lista donde todo suena bien es una lista que no se pensó.

## Resumen de prioridades

| # | Tarea | Tipo | Esfuerzo | Impacto |
|---|---|---|---|---|
| 1 | Tarifa de grupo Courtyard y Fairfield | Gestión | Un correo | Bloqueante |
| 2 | Renovar convenios que vencen en 2026 | Gestión | Un correo | Bloqueante |
| 3 | Confirmar impuestos de todos los hoteles | Gestión | Varios correos | Alto |
| 4 | Corregir el precio «desde» que sesga la comparación | Código | Medio | Alto |
| 4b | Reestructurar la portada (logo, banda, video, contacto) | Código | Alto | Alto |
| 5 | Vista previa al compartir por WhatsApp | Código | Bajo | Alto |
| 6 | Favicon propio | Código | Bajo | Medio |
| 7 | Mostrar las fechas del evento | Código | Bajo | Medio |
| 8 | Decidir qué pasa con `/comision` | Decisión | Bajo | Medio |
| 9 | Definir si el sitio se indexa en Google | Decisión | Bajo | Medio |
| 10 | Commitear el trabajo en git | Mantenimiento | Bajo | Medio |
| 11 | Papel blanco y pie marino (hecho) | Código | Medio | Alto |
| 12 | Decidir qué pasa con la copia vieja de `Documents` | Decisión | Bajo | Alto |
| 13 | Carrusel a tamaño de banda y vuelta atrás (hecho) | Código | Medio | Alto |
| 14 | Niveles como estrellas sobre 6 (hecho) | Código | Medio | Medio |
| 15 | Decidir estrellas por hotel, no por nivel | Decisión | Bajo | Alto |
| 16 | Precio por estadía de 2 personas y reparto por ocupación (hecho) | Código | Alto | Alto |

### Orden sugerido

1. **Semana 1 — lo que se ve.** Tareas 5, 6, 7. Son de bajo esfuerzo y es lo
   primero que nota la gente cuando reparten el enlace. Se puede publicar apenas
   terminen.
2. **Semana 1 en paralelo — los correos.** Tareas 1, 2 y 3 dependen de que
   respondan los hoteles, así que conviene mandarlos el primer día y seguir
   trabajando mientras contestan.
3. **Semana 2 — la corrección de precios.** Tarea 4. Es la más importante pero
   la mejor forma de hacerla depende de las respuestas sobre impuestos.
4. **Cuando lleguen los archivos — la portada nueva.** Tarea 4b (§2.5). No
   arranca sin el logo, la imagen del Centenario y el video; conseguirlos es lo
   primero. Absorbe la tarea 7 (fechas del evento), así que si se va a hacer,
   conviene no implementar esa por separado.
5. **Cuando haya un rato — mantenimiento.** Tareas 8, 9, 10 y lo de la sección 4.

---

## 1. Bloqueantes de contenido

No se arreglan programando. Son lo que hoy hace que la página muestre precios
que nadie va a pagar.

### 1.1 Negociar tarifa de grupo con Marriott

- [ ] Confirmar con Melany si el tope de 7 habitaciones sigue vigente para 84 personas
- [ ] Resolver la discrepancia de correo (`reservationscr@` vs `reservations@`)

**Qué pasa hoy.** Llegó una hoja nueva el 18 de agosto de 2026, **"Información
importante para Hoteles del CENTENARIO"**, con tarifas actualizadas para los
cuatro hoteles de esta sección. Para Courtyard y Fairfield esto cambia el
precio pero no cierra la pregunta:

- Precios nuevos ya cargados en `contenido.ts`: Fairfield $105→$119 (sencilla
  y doble), Courtyard $135→$153 (sencilla) y $145→$164 (doble).
- La hoja **no repite** la restricción de "no aplica a grupos de 8 habitaciones
  en adelante" que sí tenía el convenio firmado — pero tampoco dice que se
  levantó. Silencio no es confirmación: para 84 personas sigue haciendo falta
  que Melany lo diga explícitamente.
- La hoja da un correo distinto al del convenio firmado:
  `reservations@marriott.com` en vez de `reservationscr@marriott.com`. Los dos
  quedaron anotados en `pendientes`; no se sabe cuál usar.

**Cómo se hace.** Un correo a Melany con dos preguntas concretas: "¿el tope de
7 habitaciones por noche sigue aplicando con esta tarifa nueva, o ya no rige
para el Centenario?" y "¿reservationscr@ o reservations@marriott.com?".

**Cómo se verifica.** Con la respuesta, se quita el pendiente del tope de
habitaciones (o se actualiza si sigue aplicando y hay que negociar aparte) y
se deja un solo correo de contacto en `contenido.ts`.

→ Melany Ramirez · `melany.ramirez@marriott.com` · (506) 8617-5974

### 1.2 Pedir la renovación de los convenios

- [ ] Preguntar si va a salir una hoja de tarifas para 2027

**Qué pasa hoy.** Vigencia, tanto en el convenio original como en la hoja nueva
del 18 de agosto: 1 enero – 31 diciembre **2026**. El Centenario es del 21 al 25
de **julio de 2027** — la hoja nueva llegó con ese título y esa instrucción
("mencionar que vienen a la celebración de los 100 años de UNADECA"), pero la
vigencia que trae es la misma de siempre, sin extenderse al año del evento.
Vale la pena decirlo así, explícito, en el correo: no alcanza con que la hoja
diga "para el Centenario" en el título si las fechas no lo cubren.

**Cómo se hace.** Va en el mismo correo del punto 1.1.

### 1.3 Confirmar los impuestos

- [ ] Preguntar a los seis hoteles del documento original
- [ ] Preguntar el porcentaje a Hampton Inn y Hilton Garden Inn

**Qué pasa hoy.** Sigue sin cerrarse — la hoja del 18 de agosto no lo resuelve:

- Los seis del documento original no dicen si sus precios ya los incluyen.
- Hampton Inn: la hoja nueva vuelve a decir "más impuestos" sin porcentaje.
- Hilton Garden Inn: su información (sin cambios en esta vuelta) también dice
  "+ impuestos" sin porcentaje.
- El Courtyard es el único que lo fija: 13% — dato del convenio firmado, no
  de la hoja nueva. Se dejó el precio nuevo con ese 13% pero marcado como "sin
  confirmar sobre este precio", porque la hoja no lo repite. Mismo tratamiento
  para el Fairfield, que también trae 13% del convenio.

**Cómo se hace.** Una pregunta corta a cada uno: "¿la tarifa que nos pasaron ya
incluye impuestos, o se agregan aparte? Si se agregan, ¿qué porcentaje?".

**Cómo se verifica.** Con eso cerrado se puede hacer la versión buena de la
tarea 4 —mostrar todo con impuestos incluidos— y se elimina el primer punto de
`pendientesGenerales`.

### 1.4 Cerrar los datos faltantes de los cuatro hoteles nuevos

- [ ] Capacidad total, aire acondicionado y elevador

**Qué pasa hoy.** Salen como "sin dato" en las fichas, que es lo honesto pero
deja huecos visibles.

**Cómo se hace.** Se preguntan junto con los impuestos y se cargan en
`caracteristicas` de cada hotel. Ojo con `aire`: el tipo acepta `null`
justamente para esto, y poner `"no"` haría que la ficha diga "Ventilador", que
sería falso.

### 1.4 Bis — Registro de la hoja de tarifas del 18 de agosto

- [x] Cargar los precios nuevos en `contenido.ts`
- [x] Corregir el horario de transporte de Fairfield y Courtyard (typo heredado)
- [x] Agregar `contacto` a Hampton Inn, que no lo tenía

**Qué pasa hoy.** El usuario pasó el texto completo de "Información importante
para Hoteles del CENTENARIO" — Fairfield, Courtyard, Hampton Inn e Hilton
Garden Inn. Se cargó en `contenido.ts`, hotel por hotel:

- **Fairfield y Courtyard:** precios actualizados (ver 1.1), y de paso se
  corrigió un error heredado — el horario de transporte al aeropuerto decía
  "de 4:15 a. m. a 1:00 a. m." en los dos, un turno de 21 horas seguidas que no
  tenía sentido operativo. La hoja nueva lo aclara: termina a la 1:00 **p. m.**
- **Hampton Inn:** cambio más grande. La tarifa por fecha-de-reserva (antes/
  después del 30/6/2027) se reemplazó por dos ventanas por fecha-de-estadía que
  se superponen y no cubren con claridad el 21–25 de julio de 2027 — ver el
  pendiente nuevo en la ficha del hotel, se explica ahí el criterio que se usó
  mientras no se confirme con el hotel. También se agregó almuerzo incluido,
  áreas públicas y el bloque `contacto` completo (teléfono y correo), que no
  existía antes.
- **Hilton Garden Inn:** se revisó contra la hoja nueva y no hizo falta cambiar
  nada — los precios, el tope de 4 personas y las dos camas full ya estaban
  cargados igual. Quedó como verificación, no como cambio.

**Cómo se verificó.** `tsc --noEmit` limpio, y capturas de las fichas de
Fairfield y Hampton Inn para confirmar que los precios y el detalle de las
tarifas se leen bien en la pantalla.

**Contra.** Ninguno de los pendientes de fondo se cerró con esta hoja —al
contrario, sumó dos nuevos (qué tarifa rige en Hampton durante el evento, y el
correo discrepante de Marriott—: la hoja resuelve *cuánto cuesta hoy*, no
resuelve si esos precios sirven *en las fechas del Centenario*, que sigue
siendo la pregunta de fondo de toda la sección 1.

### 1.5 Pedir fotos en alta resolución

- [ ] Hilton Garden Inn, Courtyard, Fairfield

**Qué pasa hoy.** El Hilton Garden Inn tiene fotos de 640 px y varias del
Courtyard y Fairfield son de 375 px, contra 1600–1920 de las demás. El sitio ya
evita que se vean borrosas topando el ancho, pero el mosaico de esos hoteles
queda más angosto que el de los otros.

**Cómo se hace.** Se piden a los mismos contactos, se dejan en
`public/hoteles/<slug>/` numeradas `01.jpg`, `02.jpg`… y se regenera el registro
de tamaños con el script que está en `ARQUITECTURA.md`.

---

## 2. Código — alto impacto

### 2.1 Corregir el precio «desde»

- [ ] Elegir enfoque
- [ ] Implementar
- [ ] Verificar con capturas

**Qué pasa hoy.** `costoPorPersonaNoche()` toma la tarifa más baja y la divide
entre las personas que cubre. Eso hace que el **Hampton Inn aparezca a $32 y el
Hotel 1915 a $47**, cuando el Hampton es más caro: su $32 asume ocupación
cuádruple y no lleva impuestos, mientras los del documento original son netos.

> Es la mejora más importante de la lista. La página existe para comparar y hoy
> la comparación está sesgada.

**Cómo se hace.** Tres opciones, de menor a mayor esfuerzo:

- **Anotar el supuesto.** Bajo el precio, una línea que diga qué ocupación
  asume: "en habitación de 4". Sale de dividir `precio / personas` en la
  habitación elegida, así que no hay que inventar nada.
  *Toca:* `hotel-card.tsx`, `hoteles/[slug]/page.tsx`, y una función nueva en
  `calculos.ts` que además de la cifra devuelva de qué habitación salió.
- **Marcar las que no incluyen impuestos.** Un distintivo discreto en las fichas
  del Hampton, Hilton Garden Inn, Courtyard y Fairfield.
  *Toca:* un campo nuevo en el tipo `Hotel` (por ejemplo `impuestos: "incluidos"
  | "aparte" | null`), `contenido.ts` y las dos pantallas.
- **Recalcular con impuestos.** Lo más justo, pero **depende de la tarea 1.3**:
  hoy faltan los porcentajes de casi todos.

**Recomendación.** Hacer las dos primeras ahora y la tercera cuando lleguen los
porcentajes. Las dos primeras no dependen de nadie.

**Cómo se verifica.** Capturas antes y después de la parrilla completa, y
confirmar que el orden aparente de precios ya no contradice el real.

### 2.2 Agregar vista previa al compartir

- [ ] Crear la imagen 1200×630
- [ ] Agregar la metadata

**Qué pasa hoy.** No existe `openGraph` ni `metadataBase` en
`src/app/layout.tsx`. Como el enlace se va a repartir **por WhatsApp**, hoy
aparece como texto pelado, sin imagen ni descripción.

**Cómo se hace.** En `layout.tsx`, dentro de `metadata`:

```ts
metadataBase: new URL("https://<dominio-publicado>"),
openGraph: {
  title: "Hoteles — Centenario UNADECA 2027",
  description: "10 hoteles en Alajuela cotizados para el Centenario…",
  images: ["/og.jpg"],
  locale: "es_CR",
  type: "website",
},
```

La imagen va en `public/og.jpg`, 1200×630. Puede ser la fachada de un hotel con
el título encima, o algo hecho a propósito.

**Ojo:** `metadataBase` necesita la URL final, así que este paso se cierra
**después** de publicar y saber el dominio.

**Cómo se verifica.** Pegando el enlace en un chat de WhatsApp con uno mismo.

### 2.3 Cambiar el favicon

- [ ] Reemplazar `src/app/favicon.ico`

**Qué pasa hoy.** Es el que trae Next.js al crear el proyecto: en la pestaña se
ve su logo, no algo de UNADECA.

**Cómo se hace.** Se reemplaza el archivo por uno propio. Next lo toma de ahí
automáticamente, sin configurar nada.

### 2.4 Mostrar las fechas del evento

- [ ] Decidir dónde va
- [ ] Implementar

**Qué pasa hoy.** `evento.fechas` ya tiene "21 al 25 de julio de 2027",
confirmado por el Hampton Inn, y no aparece en ninguna pantalla. Es justo el
dato que alguien busca antes de decidir dónde dormir.

**Cómo se hace.** El dato ya está cargado, así que es solo mostrarlo. Dos
lugares naturales: la fila de cifras del hero —donde hoy dice "Hoteles 10 /
Categorías 3 / Noches 4"— o el pie, junto al nombre del evento.
*Toca:* `components/home/hero.tsx` o `components/layout/site-footer.tsx`.

**Ojo.** La tarea 2.5 rehace la portada y se lleva la fila de cifras del hero.
Si esa se va a hacer, la fecha entra ahí y esta no se implementa aparte.

### 2.5 Reestructurar la portada

- [ ] Conseguir los tres archivos: logo, imagen del Centenario, video
- [ ] Escribir los tres puntos clave definitivos (hay texto provisional)
- [ ] Decidir de dónde sale el video
- [x] Implementar
- [x] Verificar con capturas a 1440 y 390

**Estado.** Implementado el 17 de agosto de 2026 con marcadores de posición: el
logo, la imagen y el video todavía no existen como archivos, así que
`medios.logo/portada/video` quedan en `null` en `contenido.ts` y la portada
muestra `EspacioPendiente` —un bloque con la medida exacta del hueco final y
qué se necesita— en vez de acomodarse como si no faltara nada. Los tres puntos
clave tienen texto provisional (dice solo lo que los datos ya respaldan) en
`puntosClave`, en espera del texto definitivo.

Se cerró junto la tarea 2.4: las fechas del evento ya se muestran, en la fila
de cifras debajo de la banda del Centenario.

Componentes nuevos: `home/portada.tsx` (banda + titular + cifras),
`home/puntos-video.tsx` (los tres puntos + video), `ui/espacio-pendiente.tsx`
(el marcador reusable). `home/hero.tsx` se eliminó, absorbido por `portada.tsx`.
`home/consultas.tsx` pasó de tres tarjetas en grilla a un rectángulo centrado,
una vía por renglón.

**Ajuste del 17 de agosto.** El logo se movió del bloque centrado en la portada
al header, arriba a la izquierda, reemplazando el texto «Hospedaje.» que
llevaba ahí. `medios.logo` pasó a llamarse `logoCentenario` en `tipos.ts` y
`contenido.ts`.

Arriba a la derecha **no va logo de UNADECA** — se probó así y se corrigió:
va el texto «Hospedaje.» + «UNADECA», la única marca del sitio que no depende
de ningún archivo. `site-header.tsx` lo escribe directo, no sale de `medios`.

Contra que se mantuvo, con el agregado que se había recomendado: el gancho de
precio y las cifras no se perdieron —vieron dos pantallas de la propuesta
original— gracias a la franja de cifras debajo de la imagen. La banda a todo
ancho sigue siendo una excepción a la regla de paneles contenidos: aceptada a
propósito para este bloque.

**Qué pasa hoy.** La portada tiene tres bloques: el hero partido —titular a la
izquierda, foto del atrio del Hotel 1915 a la derecha con la etiqueta de
precio—, la sección de consultas en tres tarjetas y la parrilla de hoteles. No
hay logo, ni imagen del Centenario, ni video, ni un bloque de texto que explique
de qué se trata el evento.

**Cómo se hace.** Orden nuevo, de arriba abajo:

1. **Logo** (Centenario / UNADECA) arriba del contenido.
2. **Imagen del Centenario** en banda ancha, justo debajo del logo.
3. **Franja a dos columnas:** izquierda los tres puntos clave, derecha el video.
4. **Contacto:** un rectángulo centrado debajo de esa franja, con el WhatsApp
   abajo a la izquierda.
5. **Hoteles recomendados:** bloque ancho al final.

*Toca:* `app/page.tsx` (el orden), `home/hero.tsx` (se parte en dos piezas:
banda de logo + imagen, y franja de puntos + video), `home/consultas.tsx` (pasa
de tres tarjetas en grilla a un rectángulo centrado), `layout/site-header.tsx`
(solo si el logo reemplaza el texto «Hospedaje.»), `contenido.ts` (los tres
puntos y la referencia del video) y `public/` (logo, banda, póster del video).

**Lo que falta antes de empezar.** Tres archivos que hoy no existen en el
repositorio —`public/` solo tiene fotos de hoteles— y un texto:

- **Logo.** SVG si se puede: escala sin pesar y se ve nítido en cualquier
  pantalla. Si solo hay PNG, que sea de 600 px de ancho o más.
- **Imagen del Centenario.** A todo lo ancho necesita **2000 px o más**. Con
  menos se ve interpolada en pantallas grandes, que es justo lo que el hero
  actual evita metiendo la foto en un panel contenido.
- **Video.** Definir la fuente. Dos caminos:
  - *mp4 propio en `public/`* con `<video controls preload="none" poster>`. No
    manda nada al navegador hasta que le dan play, no mete terceros. Contra: el
    archivo viaja en cada deploy y consume ancho de banda del hosting; arriba de
    ~30 MB no conviene.
  - *YouTube o Vimeo en `<iframe loading="lazy">`*. Pesa cero en el repositorio.
    Contra: carga scripts de un tercero y pone cookies antes de que nadie pida
    ver nada.
- **Los tres puntos clave.** El boceto dice "Texto", "Datos", "Importan", que
  son marcas de posición. Hace falta el contenido real; van a `contenido.ts`
  como un arreglo nuevo, no escritos dentro del componente.

**Cómo se verifica.** Capturas antes y después a 1440 y a 390 px, y revisar tres
cosas en móvil: que las dos columnas se apilen con el video arriba o abajo según
se decida, que el rectángulo de contacto no quede más angosto que el texto, y
que el logo no se coma media pantalla.

**Contra.** La estructura es clara, pero mueve cuatro cosas que hoy funcionan:

- **Se pierde el gancho de precio.** El hero actual dice "Desde $X por persona la
  noche" arriba del pliegue. En la estructura nueva, lo primero que se ve es
  logo e imagen, y el primer dato duro queda dos pantallas abajo. Quien abre el
  enlace por WhatsApp quiere saber cuánto cuesta.
- **También se pierde la fila de cifras** (Hoteles 10 / Categorías 3 / Noches 4)
  y con ella el lugar donde iba a ir la fecha del evento —tarea 2.4—.
- **El video rompe el cero-JavaScript** de la portada, con iframe o con `<video>`.
  Ya está medio roto por framer-motion (ver 5.4), pero conviene decirlo.
- **La banda a todo ancho va contra la dirección editorial.** El sitio mete las
  fotos en paneles contenidos a propósito. Una banda a sangre es otra cosa: se
  puede hacer, pero es una decisión de diseño, no un detalle.
- **El rectángulo centrado de contacto** pierde la separación por vía —quién
  atiende cada número— que hoy dan las tres tarjetas. Con dos teléfonos y un
  correo adentro de una sola caja, hay que ordenarlos para que no se lean como
  un bloque de datos sueltos.

**Recomendación.** Hacer la estructura tal cual, con dos agregados que no la
contradicen: una franja delgada de cifras debajo de la imagen del Centenario
—precio desde, hoteles, noches y las fechas del evento, que cierra de paso la
tarea 2.4—, y dentro del rectángulo de contacto, cada vía en su fila con quién
atiende al lado. El video, mp4 propio si pesa poco; si no, YouTube.

### 2.6 Logo de UNADECA en el header

- [x] Recibir el archivo
- [x] Recortarlo y montarlo en el header
- [x] Hacerlo responsivo

**Qué pasa hoy.** El usuario mandó el logo oficial por WhatsApp: un PNG de
8334×8334 px con transparencia, pero con muchísimo margen en blanco y todo
apilado en vertical —escudo arriba, «UNADECA» grande **en blanco** debajo, el
nombre completo en dorado más abajo—. El primer intento se quedó solo con el
escudo porque el salto de línea entre el escudo y «UNADECA» se vio, a simple
vista, como blanco sobre blanco: parecía que el archivo terminaba ahí. No era
así — el usuario lo pidió explícito: quería el logo completo, con las
palabras, y las letras nítidas.

**Cómo se hizo.** Los tres elementos —escudo, «UNADECA», nombre completo— se
recortaron por separado con el canal alfa (no por color, para no perder el
texto blanco) y se volvieron a montar en un solo archivo, esta vez en
horizontal: escudo a la izquierda, «UNADECA» y el nombre completo apilados a
la derecha, guardando la misma proporción relativa que tenían en el diseño
original. Se exportó a una resolución bastante más alta de lo que se muestra
—3088×700 px— para que el nombre completo, que es chico, no se vea pixelado
ni siquiera en pantallas retina.

*Toca:* `public/marca/logo-unadeca.png`, `contenido.ts` (`medios.logoUnadeca`),
`site-header.tsx`.

**Cómo se verificó.** El logo completo es un lockup ancho (4.4:1) y a 390 px de
ancho no entraba junto al espacio reservado del otro logo — se cortaba fuera de
pantalla. Se agregaron tamaños por punto de quiebre (`h-10` en móvil, `h-14` en
`sm`, `h-16` en `lg`) para que los dos logos encojan juntos en vez de
desbordar. Capturas en 1440 y 390 después del ajuste, `tsc --noEmit` limpio.

**Contra.** El archivo pesa 352 KB — más que cualquier foto de hotel del sitio.
Es aceptable por ser un solo asset que se sirve una vez y con `priority` (no
compite con el resto de las imágenes por ancho de banda), pero si en algún
momento se nota lento, se puede volver a exportar a una resolución menor —a
2000×450, por ejemplo— sin perder nitidez perceptible en pantalla.

**Ajuste del 20 de agosto — un solo logo, no dos.** El header tenía dos
lugares: Centenario a la izquierda (sin archivo todavía) y UNADECA a la
derecha. Se simplificó a uno solo: UNADECA se movió a la izquierda —mismo
tamaño, misma resolución, solo cambió de lado— y a la derecha no queda nada.
El campo `medios.logoCentenario` se deja en `tipos.ts`/`contenido.ts`, en
`null`, documentado como que ya no tiene un lugar reservado en el header; si
en algún momento aparece el logo del Centenario, hay que decidir dónde va
—no vuelve automáticamente al lugar viejo, porque ese lugar ya no existe—.

### 2.7 Carrusel de fotos del Centenario

- [x] Armar el carrusel, sin fotos todavía
- [x] Que se mueva solo, en bucle
- [x] Que se pause con la interacción del usuario, sin botón aparte

**Qué pasa hoy.** Debajo de la banda de portada hay una franja nueva,
«Galería del Centenario»: seis tarjetas con el mismo marcador de espacio
reservado que ya usa el resto del sitio (`EspacioPendiente`, `tono="tinta"`),
todavía sin fotos. Se mueven solas, en bucle continuo, sin cortes.

**Cómo se hizo — tres vueltas, no una:**

1. Primero, pasos discretos con flechas y `setInterval` en React.
2. El pedido cambió a bucle continuo tipo cinta —lo que en inglés se llama
   marquee—: se rehizo en CSS puro (`@keyframes`, `translateX(0)` a
   `translateX(-50%)`), con las seis tarjetas duplicadas en el DOM —la
   segunda tanda con `aria-hidden`— para que el punto donde termina la
   primera vuelta coincida exactamente con donde arranca la segunda, sin que
   se note el salto. Sin esto, el componente dejó de necesitar JavaScript.
3. Se agregó un botón de pausar/reanudar por WCAG 2.2.2 (nada que se mueva
   solo sin forma de pararlo), y después se sacó: el pedido fue que pausara
   solo con la interacción del usuario, sin un control aparte que buscar. La
   pausa quedó en CSS —`:hover` para mouse, `:active` para dedo,
   `:focus-within` para teclado, con el visor llevando `tabIndex={0}` porque
   si no no había nada ahí adentro para enfocar—. El componente volvió a ser
   de servidor: no manda nada al navegador.

**Cómo se verificó.** Con `playwright-cli hover` de verdad —no un evento de
mouse simulado por JavaScript, que no activa `:hover` de CSS—: se confirmó
que `animationPlayState` pasa a `paused` al entrar el mouse y vuelve a
`running` al salir. `prefers-reduced-motion` apaga el bucle entero: la franja
queda como una fila común, desplazable a mano.

*Toca:* `components/home/carrusel-centenario.tsx` (nuevo),
`components/home/portada.tsx` (lo monta entre la imagen y el titular),
`styles/globals.css` (`.carrusel-viewport`, `.carrusel-cinta`,
`.carrusel-mascara`).

**Contra.** Las seis tarjetas están duplicadas en el DOM a propósito —doce
`EspacioPendiente` en vez de seis—, así que cuando lleguen las fotos reales,
las doce imágenes se piden igual (la copia oculta también carga, no es
`display:none`, para que la animación no salte). No es grave con seis fotos,
pero si el número crece bastante conviene revisarlo. Además, con
`prefers-reduced-motion` activo, el usuario ve las seis tarjetas reales
seguidas de las mismas seis otra vez al scrollear a mano —redundante, no
roto, pero vale saberlo—.

---

## 3. Decisiones pendientes

### 3.1 ¿`/comision` va en el sitio público?

- [ ] Decidir

**Qué pasa hoy.** La página existe y se genera en el build, pero no está
enlazada desde ningún lado: solo llega quien sepa la URL. Es material interno de
trabajo, con el desglose de la comisión.

**Cómo se hace, según la decisión:**

- *Sacarla del sitio:* mover la carpeta fuera de `app/`, o excluirla del export.
  Sigue disponible en local con `pnpm dev`.
- *Enlazarla:* un enlace discreto en el pie.
- *Dejarla oculta:* no hacer nada, asumiendo que una URL no adivinable alcanza.

### 3.2 ¿El sitio se indexa en Google?

- [ ] Decidir

**Qué pasa hoy.** No hay `noindex`, `robots.txt` ni `sitemap.xml`, así que
quedaría **indexable por defecto**. El convenio de Marriott marca sus tarifas
como "preferencial y confidencial".

**Cómo se hace, según la decisión:**

- *Enlace privado:* `robots: { index: false, follow: false }` en la metadata de
  `layout.tsx`, más un `public/robots.txt` con `Disallow: /`.
- *Público:* agregar `sitemap.ts` y `robots.ts` en `app/`, que Next genera solos.

**Aviso.** Ningún plan gratuito de hosting ofrece contraseña real. Lo máximo es
una URL no listada más `noindex`: sirve contra buscadores, no contra alguien que
reenvíe el enlace.

---

## 4. Mantenimiento

### 4.1 Commitear el trabajo

- [ ] Commitear por temas

**Qué pasa hoy.** El repositorio tiene **un solo commit** ("Initial commit from
Create Next App") y decenas de archivos sin guardar. No hay a dónde volver si
algo se rompe.

**Cómo se hace.** Por temas y no todo junto, para que el historial sirva de
algo: rediseño y tokens · hoteles nuevos y fotos · sección de consultas ·
animación · reorganización de carpetas · documentación.

### 4.2 Agregar pruebas de `calculos.ts`

- [ ] Instalar Vitest y escribir los casos

**Qué pasa hoy.** No hay ninguna prueba en el proyecto.

**Cómo se hace.** `calculos.ts` es el mejor punto de partida: son funciones
puras y producen los números que la gente compara. Casos que valen: tarifa por
persona contra tarifa por habitación, hotel sin habitaciones, y el redondeo de
`dinero()` con `.5` —que es de donde salen los $73 del Courtyard—.

### 4.3 Agregar script `typecheck`

- [ ] Agregarlo a `package.json`

**Qué pasa hoy.** El build tarda 3–4 minutos y casi todo es el chequeo de
TypeScript.

**Cómo se hace.** `"typecheck": "tsc --noEmit"` en `scripts`. Da el mismo error
en una fracción del tiempo mientras se itera.

---

### 4.4 Verificar el sitio en móvil

- [ ] Revisar la portada y una ficha a 390 px

**Qué pasa hoy.** La última verificación en móvil fue **antes** de agregar la
sección de consultas, la animación de entrada, los cuatro hoteles nuevos y la
reorganización. O sea: hay bastante que nunca se miró en pantalla chica, y la
mayoría de la gente va a abrir esto desde el teléfono, por WhatsApp.

**Cómo se hace.** Capturas a 390 px de la portada completa y de una ficha de
detalle. Puntos a mirar: las tres tarjetas de consultas apiladas, el mosaico de
la galería, y que los nombres largos de hotel no desborden.

**Contra.** Ninguna, salvo el rato que toma. Es deuda de verificación, no de
diseño.

---

## 5. Bis — Cambio de paleta (18 de agosto)

- [x] Reemplazar bone/ink/brass por la paleta del tablero de marca

**Qué pasó.** El usuario mandó una foto del tablero de marca del Centenario:
seis tonos — oro `#bca35e`, crema `#fce5b4`, azul `#2d73aa`, marino claro
`#1e3160`, marino oscuro `#001841` y un degradé azul→marino. Reemplazó por
completo la paleta bone/ink/brass del rediseño anterior.

**Cómo se hizo.** Los cinco tonos sólidos se usan tal cual llegaron, sin
inventar ningún color nuevo; lo único derivado son tintes del mismo matiz para
texto y líneas, calibrados por contraste WCAG (el porqué de cada uno está en el
comentario junto a su bloque en `globals.css`):

- El oro de marca (`#bca35e`) da 1.99:1 sobre el crema — no pasa como texto en
  papel. Se armó `--color-brass` oscureciendo ese mismo oro en luminosidad
  (sin mezclarlo con otro color) hasta 5.36:1. El oro de marca sin tocar quedó
  como `--color-brass-bright`, solo para texto sobre tinta (7.07:1).
- `--color-graphite` (texto sobre papel) reutiliza el mismo valor que
  `--color-ink-soft` — el marino claro del tablero. No chocan porque ese texto
  nunca se escribe sobre una superficie `ink-soft` en este sitio.
- El azul del tablero quedó fijo como `--color-line-invert`, la línea sobre
  tinta — su único uso fijo.
- El degradé azul→marino se armó como utilidad `.fondo-degradado-marca` y se
  usa **solo** de fondo en los dos espacios reservados grandes —la banda de
  portada y el marco del video—, mientras no tengan archivo real. No se usa en
  botones, chips ni fondos de sección: sería repartir el degradé, y la regla
  del acento reservado es la misma de siempre, con otro color.

Se actualizó la tabla de tokens en `CLAUDE.md` para que quede igual al código,
y se anotó ahí mismo la excepción puntual del degradé a la regla de «nada de
gradientes».

**Cómo se verificó.** Los seis pares texto/fondo que importan se calcularon
con la fórmula de contraste de WCAG antes de escribir un solo componente —no
a ojo—, y después capturas completas a 1440 y a 390 de las cinco secciones.
Ninguna combinación quedó por debajo de 3:1 en elementos de interfaz ni de
4.5:1 en texto.

**Contra.** El acento dorado pierde algo de su calidez original al
oscurecerse para texto en papel —se acerca a un bronce— y el marino, al ser
tan oscuro (`#001841`), hace que las secciones de fondo oscuro (header, banda
de portada) se sientan más «institucional/corporativo» que la tinta cálida de
antes. Es justo el cambio de dirección que se pidió, no un defecto, pero vale
decirlo: el sitio pasó de sentirse boutique a sentirse universitario, que es
lo que corresponde para UNADECA.

### 5.1 Bis — Bajarle el brillo

- [x] Grano de papel visible sobre fondo oscuro
- [x] Degradé de marca de diagonal saturado a resplandor apagado

**Qué pasó.** Con la paleta puesta, el pedido fue que se viera «atractivo,
combinado, no brilloso». Dos causas concretas, no una sensación vaga:

1. **El grano de papel no se veía en las secciones oscuras.** Es un
   pseudo-elemento fijo con textura de ruido, pensado para que un color sólido
   lea como papel y no como pantalla. Usaba `mix-blend-mode: multiply`, que
   solo puede oscurecer — sobre el marino casi negro no tenía nada que
   oscurecer, así que quedaba invisible justo donde más hacía falta. Header,
   banda de portada y franja del video quedaban perfectamente lisos: eso es lo
   que lee como plástico o pantalla de teléfono, no como papel.
2. **El degradé de marca (azul→marino) iba a máxima saturación, de esquina a
   esquina, en diagonal.** Ese patrón —color plano a todo color, en diagonal—
   es el de un botón o un ícono de app, no el de una tela o una piedra.

**Cómo se arregló.**

- El grano pasó a `mix-blend-mode: overlay`: oscurece sobre lo claro y aclara
  sobre lo oscuro, así que el mismo pseudo-elemento se nota en las dos
  superficies. Subió la opacidad del ruido (0.055 → 0.08) y la del
  pseudo-elemento (0.5 → 0.7) para que se note en el marino sin volverse sucio
  sobre el crema.
- El degradé pasó de lineal a radial, apagado antes de arrancar: el azul entra
  mezclado con `color-mix()` a 55% de marino desde el primer punto —nunca a su
  saturación de tablero—, el resplandor arranca en una esquina en vez de
  cubrir todo el panel, y para la mitad del bloque ya es `ink` liso. El grano
  encima termina de romper lo que queda de superficie tersa.

**Cómo se verificó.** Capturas antes y después de portada, franja de video y
consultas, en 1440 y 390. `tsc --noEmit` limpio.

**Contra.** Subir la opacidad del grano es un cambio global —toca cada
superficie del sitio, no solo las oscuras—; sobre el crema, en pantallas de
alta densidad, se nota un poco más que antes. Si en algún momento se ve sucio
en vez de texturizado, el ajuste es bajar la opacidad del pseudo-elemento
(0.7), no volver a `multiply`.

### 5.2 Bis — El azul no combinaba: le faltaba trabajo

- [x] Darle al cobalto un rol propio, no solo de línea

**Qué pasa hoy.** Después del ajuste anterior seguía sin sentirse «combinado».
La causa, mirando el uso real de cada color: el azul del tablero (`#2d73aa`)
solo vivía como `line-invert`, una línea divisoria sobre tinta. En las
secciones de papel —la mayoría del sitio: la franja de puntos, consultas, la
parrilla, la ficha de cada hotel— el único acento era el oro. Seis colores de
marca, pero cinco de ellos hacían de fondo/texto estructural y solo uno hacía
de acento. Eso no lee como paleta combinada, lee como paleta de un color con
cinco tonos neutros alrededor.

**Cómo se hizo.** Se sumó un segundo par de acento —`--color-cobalt` /
`--color-cobalt-deep`— con el mismo método que ya tenía `brass`/`brass-bright`
(azul de marca tal cual para íconos y bordes, no textuales, 4.1:1; el mismo
azul oscurecido en luminosidad para texto chico, 7.31:1). Y se repartió el uso
por **función**, no al azar:

- **Oro** — sigue siendo dinero y marca: precios, el botón de «Consultar
  precios», los eyebrows de cada sección, el punto de «Hospedaje.».
- **Cobalto** — pasa a ser interacción y detalle: los íconos de contacto en
  Consultas, el hover de los enlaces (nombre del hotel, teléfono, correo), la
  insignia «Con elevador» en las fichas, los índices 01/02/03 de la franja de
  puntos, y el marco del bloque de video —el único panel de medios de esa
  franja, ahora se distingue de los demás bordes neutros—.

Con esto el azul aparece en cada sección clara del sitio, no solo como línea
en las oscuras: la paleta se ve trabajada en las seis secciones, no solo en el
hero.

**Cómo se verificó.** Los pares texto/fondo nuevos se calcularon por
contraste antes de aplicarlos (mismo método que el resto de la paleta) y
después capturas de consultas, la franja de video y la parrilla de hoteles,
en 1440 y 390. `tsc --noEmit` limpio.

**Contra.** El azul y el oro compitiendo en una misma ficha —por ejemplo la
tarjeta de un hotel con elevador: nivel en marino, «Con elevador» en cobalto,
precio en oro— son tres colores en una sola tarjeta chica. Si se siente
saturado en vez de rico, el ajuste es bajar el cobalto a un solo uso por
sección en vez de los cuatro que tiene hoy, empezando por sacarlo de los
índices de la franja de puntos, que es el más prescindible de los cuatro.

`comision/page.tsx` quedó afuera de este ajuste a propósito —es la página de
uso interno, no la que se reparte por WhatsApp— y todavía reparte oro donde
antes lo hacía toda la vitrina pública.

---

## 5. Decoración y detalle visual

- [ ] **Rotar la foto del hero.** Hoy es siempre el atrio del Hotel 1915. Se
      puede elegir a propósito según lo que se quiera destacar.
      *Toca:* `components/home/hero.tsx`.

- [ ] **Diseñar la página 404.** Usa la de Next por defecto. Con el sitio
      público, alguien va a llegar ahí desde un enlace viejo.
      *Toca:* archivo nuevo `app/not-found.tsx`, reusando header y footer.

- [ ] **Hoja de estilos para imprimir.** La comisión probablemente imprima la
      comparación para reunirse; hoy saldría con el fondo oscuro del hero y las
      fotos a página completa.
      *Toca:* un bloque `@media print` en `styles/globals.css`.

- [ ] **Evaluar volver al cero-JavaScript.** La portada no mandaba nada al
      navegador hasta que entró framer-motion. Lo mismo se puede hacer con
      `animation-timeline: view()` en CSS puro: anima en Chrome y Edge, y en
      Safari y Firefox simplemente no anima —el contenido se ve igual—. Solo si
      se quiere priorizar velocidad de carga sobre la animación.

---

## 6. Ideas más grandes

- [ ] **Comparador lado a lado.** Elegir dos o tres hoteles y ver sus tarifas
      enfrentadas. Es la tarea real de la comisión y hoy se hace scrolleando.

- [ ] **Calculadora de grupo.** Meter cuántas personas y cuántas noches, y que
      calcule el total por hotel según su forma de cobro. Toda la información
      necesaria ya está en los datos; sería una función nueva en `calculos.ts`
      más una pantalla.

- [ ] **Sección de traslados.** Cinco de los diez hoteles ofrecen transporte
      gratuito al aeropuerto, con horarios distintos. Es un diferencial fuerte
      que hoy queda enterrado en la lista de servicios.

---

## 7. Bis — Papel blanco y pie de página marino (26 de agosto)

- [x] Pasar el papel de crema a blanco
- [x] Neutralizar los tonos derivados del oro que quedan huérfanos
- [x] Cerrar la página con un pie marino
- [x] Verificar con capturas a 1440 y 390

### Qué pasa hoy

El papel es `--color-bone: #fce5b4`, la crema del tablero de marca. El pie de
página va sobre ese mismo papel y se separa del contenido con una hairline de
1px (`.rule`). Al llegar al final, la página no cierra: se queda sin contenido.
No hay ningún cambio de superficie que diga «esto terminó».

Tres cosas que no se ven a simple vista y que mandan sobre cómo se hace el
cambio:

**`bone` cumple dos papeles opuestos.** De sus 40 usos, unos son superficie
—`body`, `.ficha`— y otros son *tinta clara sobre marino*: `text-bone` en el
hero (`portada.tsx`), en el header, en los badges de `hotel-card.tsx` y en los
botones del visor de `galeria.tsx`. Tocar el token repinta las dos familias a
la vez. Acá conviene: los dos papeles quieren blanco.

**El grano de papel se apaga en blanco puro.** `body::before` usa
`mix-blend-mode: overlay`. Overlay hace `multiply` bajo 0.5 y `screen` encima;
sobre base 1.0, `screen(1, x) = 1`, o sea no hace nada. El grano —que según el
comentario del propio archivo es «lo que separa un fondo plano de una
superficie impresa»— desaparecería de todas las secciones claras.

**Hay tonos derivados del oro que se quedan sin sitio.** `--color-bone-dim`
(`#efd8a3`, 9 usos) es la superficie secundaria: los marcadores de
`espacio-pendiente.tsx`, el panel de `consultas.tsx`, el estado vacío de
`galeria.tsx`. Y `--color-line` (`#e6ce96`, 60 usos) es la hairline. Los dos
son crema mezclada con oro: se calcularon para vivir *dentro* del papel crema.
Sobre blanco quedan como manchas amarillentas sin nada que las justifique —el
síntoma de «paleta a medias» contra el que advierte el comentario del cobalto.

### Cómo se hace

**Papel y superficies**, en `styles/globals.css`:

| Token | Antes | Después | Por qué |
|---|---|---|---|
| `--color-bone` | `#fce5b4` | `#ffffff` | El papel pedido. Sirve igual como tinta sobre marino. |
| `--color-bone-dim` | `#efd8a3` | `#f2f4f7` | Gris muy claro con una pizca de azul, no de oro: emparenta con `ink` en vez de con el oro que ya no está. |
| `--color-line` | `#e6ce96` | `#e3e7ee` | Misma lógica para la hairline. |
| `--color-line-strong` | `#847955` | `#8b95a6` | Borde de control interactivo. Neutro azulado, 3.31:1 sobre blanco — sigue pasando el 3:1 de WCAG 1.4.11. |

**El grano** pasa de `overlay` a `multiply`. Multiply sí opera sobre blanco
(`1 × x = x`), así que el papel conserva su textura. La contra está abajo.

**El pie de página** (`components/layout/site-footer.tsx`) invierte a marino.
El sistema ya trae los tokens para esto —se crearon justamente para «sobre
tinta»—, así que no hay que inventar colores:

- Contenedor: `bg-ink text-bone`, sin `border-t border-line`.
- Título «Hospedaje»: `text-bone`; el punto pasa de `text-brass` a
  `text-brass-bright` — el oro de marca tal cual, que sobre `ink` da 7.07:1.
- Párrafo y copyright: de `text-mute` a `text-mute-invert`.
- Enlaces de hoteles: de `text-graphite hover:text-ink` a `text-mute-invert
  hover:text-bone`.
- La regla interna: `.rule` usa `--color-line` y solo se usa acá, así que se le
  agrega una variante `.rule-invert` con `--color-line-invert` (el cobalto).

**Lo que se elimina**, que hoy no se usa o quedó obsoleto:

- `README.md` — es el de `create-next-app` sin tocar: habla de la fuente Geist
  (el sitio usa Jost y Hanken Grotesk) y de desplegar en Vercel (se despliega
  en Netlify). Todo lo que dice es falso para este proyecto.
- La entrada de `.gitignore` para `/out/` y `.next/` ya está; `.netlify/` no,
  y aparece como archivo sin trackear. Se agrega.

### Cómo se verifica

1. `pnpm dev` y mirar la portada: el hero sigue siendo marino con texto ahora
   blanco, no crema.
2. Capturas antes/después a 1440 y 390 de la portada y de una ficha de hotel
   (`/hoteles/[slug]`), que es donde viven `bone-dim` y `line`.
3. Bajar hasta el final: el pie tiene que leerse como bloque marino cerrado,
   con el punto dorado visible y los nombres de hotel legibles.
4. Contraste: todos los textos *suben* de ratio al pasar de crema a blanco
   —blanco es más claro que `#fce5b4`—, así que ningún par de texto empeora.
   El único que hay que medir es `line-strong`, que es borde, no texto.
5. Confirmar que el grano se sigue viendo en las secciones claras.

### La contra

**El grano se pierde en las secciones oscuras.** Es el precio de pasar a
`multiply`: multiply sobre el marino casi negro no tiene nada que multiplicar y
queda invisible —exactamente el problema que `overlay` había venido a resolver
cuando se cambió la paleta el 18 de agosto—. Con papel crema, `overlay` servía
para las dos superficies; con papel blanco, ningún blend sirve para las dos. O
se acepta que el hero y el pie queden de color plano, o hace falta un segundo
pseudo-elemento con `overlay` solo para los bloques oscuros. Se hace lo simple
primero y se mira si el marino plano molesta.

**Blanco puro es una decisión de identidad, no un ajuste.** La dirección
declarada en `CLAUDE.md` dice «papel cálido» y «editorial académica sobre papel
crema». Blanco es más frío y más cerca de la web genérica: la crema era parte
de lo que hacía que el sitio no pareciera una plantilla. Si al verlo se siente
lavado, el punto medio es un blanco tibio (`#faf9f6`) que además deja
`overlay` funcionando y salva el grano en las dos superficies.

**`CLAUDE.md` queda desactualizado.** Su tabla de tokens y su párrafo de
dirección describen la paleta crema. Hay que reescribirlos en el mismo commit
o el próximo agente va a trabajar contra colores que ya no existen.

---

### Qué se hizo — 26 de agosto

Salió como estaba planeado, con tres desvíos que vale anotar:

**`line-strong` hubo que oscurecerlo dos veces.** El primer candidato neutro
(`#8b95a6`) daba 3.02:1 sobre blanco. Pasa el 3:1 de WCAG 1.4.11, pero por dos
centésimas, y es el borde de los controles interactivos —el hover de `.ficha`—.
Quedó en `#848ea0`, 3.31:1.

**El `README.md` no se borró, se dejó de copiar.** Sigue existiendo en la copia
de `Documents`. Como el proyecto que se edita ahora es `~/dev-local/hoteles-promo`
(ver abajo), ahí simplemente no está. Si algún día se consolida al revés, hay
que acordarse de eliminarlo a mano.

**Las capturas necesitaron forzar el `Reveal`.** En la primera captura
full-page la parrilla de hoteles salía en blanco: `Reveal` arranca en
`opacity: 0` y el IntersectionObserver no dispara cuando Playwright estira el
viewport a la altura completa. No es un bug del sitio —los diez hoteles están
en el HTML generado—, pero cualquiera que vuelva a capturar va a ver el mismo
hueco. El truco:

```bash
playwright-cli eval "() => { document.querySelectorAll('[data-reveal]').forEach(el => { el.style.opacity='1'; el.style.transform='none'; }); }"
```

Verificado: `pnpm typecheck` limpio, `pnpm build` limpio (15 páginas), capturas
a 1440 y 390 con el pie marino cerrando en las dos.

Queda sin hacer, a propósito: el grano en los bloques marinos (ver la contra
arriba) y decidir si el blanco puro se siente lavado frente a `#faf9f6`.

---

## 8. El proyecto se mudó fuera de iCloud (26 de agosto)

- [x] Levantar el sitio desde una carpeta que no sincronice
- [ ] Decidir qué pasa con la copia vieja de `Documents`

`~/Documents` está bajo iCloud Drive (`FXICloudDriveDesktop = 1`) y la cuota
está agotada. Los archivos quedan como *placeholders* que nunca terminan de
bajar: `next dev` se cuelga a 0% de CPU sin abrir el puerto, y `rsync`, `cp -R`
y `git clone` se cuelgan igual a media copia. No es lento — no termina.

El proyecto que se edita y se corre ahora es **`~/dev-local/hoteles-promo`**.
El código (`src/`, `public/`, configs) ya estaba ahí y se verificó idéntico al
de `Documents` con `diff -rq` antes de tocar nada. Se le sumaron `docs/`,
`CLAUDE.md`, `.gitignore` y un `git init` propio.

**Se perdió el historial de git, y fue una decisión, no un accidente.** El
`.git` de `Documents` tenía un solo commit —`a9704b8 Initial commit from Create
Next App`—, puro andamiaje que el árbol actual ya había borrado o reescrito.
Todo el trabajo real estaba sin commitear, o sea vivía en los archivos, que se
copiaron enteros. Rescatar ese `.git` costaba pelear con iCloud a cambio de
nada. Se hizo `git init -b main` limpio.

Lo que falta decidir: qué se hace con `~/Documents/Desarrollo/hoteles-promo`.
Mientras exista, hay dos copias y el riesgo de editar la equivocada. No se
borró porque eso lo decide quien manda en el proyecto, no el agente.

Lo único que quedó atrás es `.playwright-cli/` (33 MB de capturas viejas), que
está en `.gitignore` y se regenera.

---

## 9. Carrusel a tamaño de banda y vuelta atrás (26 de agosto)

- [x] Fundir la banda de portada y el carrusel en un solo bloque grande
- [x] Cambiar el mecanismo de la cinta al nuevo ancho (no alcanzaba con la velocidad)
- [x] Flecha de regreso en la ficha de hotel
- [x] Flecha en el visor de fotos

### 9.1 Un solo bloque grande, no banda + miniaturas

**Qué pasa hoy.** La portada tiene dos bloques de imagen seguidos: la banda
ancha «Imagen del Centenario» (`aspect-4/3`, `max-h-[56svh]`, `sm:aspect-16/9`,
`lg:aspect-21/8`) y, debajo, el carrusel con tarjetas de `w-[70vw] sm:w-[22rem]`.
Las dos son fotos del Centenario, las dos están pendientes, y la de abajo se
lee como la versión chica de la de arriba. Ocupan dos veces el mismo lugar en
la jerarquía.

**Cómo se hace.** El carrusel pasa a ocupar la banda, con la caja exacta que
tenía la banda. Desaparece el bloque estático: `medios.portada`, cuando exista
el archivo, entra como la primera diapositiva en vez de vivir aparte. El
contrato de datos no cambia.

Tres cosas que hay que tocar además del tamaño, y que no se ven venir:

- **La máscara de bordes se va.** `.carrusel-mascara` desvanece los dos
  costados de la cinta. Con tarjetas de 22rem eso decía «hay más para ese
  lado»; a ancho completo apagaría los costados de *cada* foto, todo el
  tiempo. Se saca del componente y se borra la clase de `globals.css`, que
  queda sin ningún uso.
- **La velocidad hay que recalcularla.** La animación mueve `-50%` del ancho
  total en 36s. A 1440px, la tarjeta mide 352px + 20px de gap: doce tarjetas
  son 4464px, o sea 2232px en 36s ≈ 62 px/s. Con diapositivas de ancho
  completo la cinta pasa a ~17520px y esos mismos 36s la dispararían a
  486 px/s. Se sube a 96s, que deja cada foto cruzando en unos 8 segundos.
- **El modo manual gana `scroll-snap`.** Con `prefers-reduced-motion` la
  animación se apaga y la cinta queda desplazable a mano. Con tarjetas
  chicas, parar a mitad de camino se veía bien; a ancho completo, quedar entre
  dos fotos se ve roto. `snap-x snap-mandatory` hace que cada arrastre caiga
  en una diapositiva.

El rótulo «Galería del Centenario» pasa a *debajo* de la banda, como pie de
foto. Encima no puede ir: el comentario de `portada.tsx` ya explica por qué no
se sobrepone texto a esa imagen —la foto definitiva no existe y un texto
encima depende de que su mitad sea oscura—.

**Cómo se verifica.** Capturas a 1440 y 390: una sola banda grande arriba, sin
la fila de miniaturas debajo. Los costados de la foto sin apagar. Con el
sistema en «reducir movimiento», arrastrar la cinta tiene que caer parada en
una foto.

**La contra.** Una cinta de ancho completo que se desplaza sola y sin parar es
menos común que un pase de diapositivas con corte o fundido, y a 8 segundos
por foto puede leerse como que la página se mueve sola mientras se intenta
leer el titular. Es el precio de mantener el cero-JavaScript: un pase discreto
pide JS o animaciones por scroll. Si molesta, la salida barata es subir la
duración hasta que sea casi imperceptible; la cara es cambiar el mecanismo.

Segunda contra: hoy las seis diapositivas son marcadores idénticos. Hasta que
lleguen fotos reales, la banda va a parecer quieta —lo único que se mueve son
los bordes entre marcadores—. No es un error, pero conviene saberlo antes de
concluir que el carrusel no funciona.

### 9.2 Vuelta atrás

**Qué pasa hoy.** Entrar a un hotel es un camino sin vuelta marcada.
`/hoteles/[slug]` va del header directo a la galería: no hay ningún enlace de
regreso a la lista. Se puede volver con el botón del navegador o tocando el
logo —que lleva a la portada, no a la parrilla—, pero nada en la página lo
dice. Al final hay «Otros hoteles» con tres opciones, o sea la vuelta a la
lista completa aparece recién después de leer toda la ficha.

El visor de fotos, en cambio, **ya tiene salida**: botón «Cerrar», tecla
Escape y devolución del foco al elemento que lo abrió. Ahí no falta una
salida; falta que se vea como una vuelta y no como un cierre.

**Cómo se hace.**

- Ficha de hotel: enlace «Ver todos los hoteles» con flecha a la izquierda,
  arriba de la galería, apuntando a `/#hoteles`. Va antes de la foto, que es
  donde se busca la vuelta.
- Visor: al botón «Cerrar» se le antepone la flecha izquierda y pasa a decir
  «Volver». La tecla Escape y el foco siguen igual.
- La flecha se agrega a `components/ui/iconos.tsx` como `FlechaIzquierda`, que
  es donde viven los íconos compartidos. `galeria.tsx` tiene una `Flecha`
  local para anterior/siguiente; esa se queda como está, es de otro uso.

**Cómo se verifica.** Entrar a un hotel desde la portada: la vuelta se ve sin
scrollear. Abrir una foto: el botón dice «Volver» con flecha, Escape sigue
cerrando y el foco vuelve a la foto que se tocó.

**La contra.** `/#hoteles` depende de que la sección de la parrilla tenga ese
`id`. Verificado antes de implementar: `listado.tsx:14` ya lo tiene, así que el
enlace cae en la parrilla y no al inicio de la página. Queda como dependencia
a recordar: si algún día se renombra ese `id`, este enlace se rompe en
silencio —no da error, solo deja de llevar donde dice—.

---

### Qué se hizo — 26 de agosto

Dos desvíos grandes respecto del plan de arriba. Los dos salieron de mirar la
captura, no de leer el código.

**El problema no era la velocidad: era el mecanismo.** El plan decía subir la
duración de 36s a 96s. Se hizo, se capturó, y la banda se veía partida por una
costura vertical: media foto de un lado, media del otro. La cuenta de px/s
estaba bien, el diagnóstico estaba mal. Una cinta que avanza sin parar deja
una diapositiva entera en pantalla solo durante el instante exacto en que
cruza la posición justa —con tarjetas de 22rem eso no importaba, porque las
costuras se leían como la separación normal de una fila; a ancho completo la
costura parte la imagen principal del sitio casi todo el tiempo.

Se cambió a **pase discreto, sin salir de CSS**: cada diapositiva se queda
quieta ~5.6s y avanza en ~1.4s. Son keyframes con pares de porcentajes
—`0%, 13.33%` en la misma posición— y la curva declarada dentro de cada
keyframe, que en CSS gobierna el tramo que arranca ahí. Duración total 42s,
seis diapositivas. Sigue siendo cero JavaScript.

**El visor de fotos estaba tapado por el header, y venía de antes.** Al ir a
verificar la flecha nueva del visor, el botón «Volver» no aparecía. No era la
flecha: era que `globals.css` le da `position: relative; z-index: 1` a
`body > *` —la regla que pone el contenido sobre el grano de papel, de la
paleta del 18 de agosto—, y eso convierte a `<main>` en contexto de
apilamiento. El `z-50` del visor quedaba encerrado ahí adentro, compitiendo
solo con sus hermanos; contra el `z-40` del header, que es hermano de `main`,
lo que pesaba era el `1` de `main`. Medido en el navegador:

```
mainZ: "1"  mainPos: "relative"  mainPadre: "BODY"
headerZ: "40"  dialogZ: "50"
```

El visor se abría **debajo** de la barra fija. Se arregló con `createPortal` a
`document.body`: colgado ahí, el visor pasa a ser hermano del header y su
`z-50` gana. Este bug existía desde el cambio de paleta y no lo introdujo nada
de esta tanda — se encontró porque la tarea obligaba a abrir el visor y mirarlo.

**Lo demás salió como estaba planeado.** La banda quedó con la caja de la
portada, `medios.portada` es su primera diapositiva, se borró
`.carrusel-mascara` de `globals.css` por quedar sin usos, y `portada.tsx`
perdió tres imports que quedaron muertos (`Image`, `EspacioPendiente`,
`medios`). La flecha nueva vive en `ui/iconos.tsx` como `FlechaIzquierda`, con
asta y no solo punta: una punta sola se lee como «anterior» dentro de una
serie, y estos dos gestos son salir un nivel.

Verificado: `pnpm typecheck`, `pnpm lint` y `pnpm build` limpios (15 páginas).
Capturas a 1440 y 390 de la portada, de la ficha de hotel y del visor abierto.

**Sin verificar en navegador:** el modo `prefers-reduced-motion`. La
herramienta de capturas no emula esa media query. Lo que sí se comprobó es que
las clases están en el HTML generado —`snap-x snap-mandatory` en el visor,
`w-screen shrink-0 snap-center` en cada diapositiva—, así que el snap depende
de CSS que ya está puesto, no de código sin escribir. Falta verlo funcionando
con la preferencia activada.

---

## 10. Niveles como estrellas sobre 6 (26 de agosto)

- [x] Agregar el rango de estrellas al tipo `Nivel`
- [x] Componente de estrellas, sobre 6
- [x] Reemplazar las tres etiquetas de texto
- [x] Eliminar `Nivel.titulo`, que quedó sin usos

### Qué pasa hoy

Cada hotel muestra su nivel como una palabra —«Básico», «Medio», «Premium»—
en tres lugares: la insignia sobre la foto de la ficha (`hotel-card.tsx:73`),
el chip al lado del precio en la ficha de hotel (`[slug]/page.tsx:156`) y las
tarjetas de «Otros hoteles» (`[slug]/page.tsx:350`). Sale de `niveles`, en
`contenido.ts`, por el campo `etiqueta`.

`Nivel` tiene además un campo `titulo` («Hoteles para grupos y eventos», etc.)
que **ya no usa nadie**: era el encabezado de cada grupo cuando la parrilla se
dividía por categoría, y quedó huérfano al quitarse los filtros.

### Cómo se hace

`Nivel` gana un rango de estrellas y pierde `titulo`:

| Nivel | Etiqueta vieja | Estrellas |
|---|---|---|
| `grupos` | Básico | 3 de 6 |
| `accesibles` | Medio | 4 a 5 de 6 |
| `premium` | Premium | 6 de 6 |

El rango se guarda en el nivel, no en cada hotel, porque el pedido es un mapeo
de nivel a estrellas y porque no hay dato con que partir el rango del medio
—ver la tercera contra—.

Componente nuevo `components/ui/estrellas.tsx`, sobre un total fijo de 6:

- Las `min` primeras van llenas.
- Si `max > min`, las de `min+1` a `max` van con contorno: es el «hasta»,
  distinto de una estrella vacía.
- El resto, vacías y apagadas.
- Una sola etiqueta accesible en el contenedor (`aria-label="4 a 5 estrellas
  de 6"`) y las estrellas con `aria-hidden`, para que el lector no cante seis
  formas sueltas.

Las tres apariciones de `etiqueta` pasan a mostrar el componente.

### Cómo se verifica

Capturas a 1440 y 390 de la parrilla y de una ficha de cada nivel: básico con
tres llenas, medio con cuatro llenas y una de contorno, premium con las seis.
Que la insignia sobre la foto siga legible sobre imágenes claras y oscuras.
`pnpm typecheck` tiene que fallar hasta que las tres apariciones estén
migradas — es la red que asegura que no quedó ninguna con la palabra vieja.

### Las contras

**Las estrellas de hotel llegan a 5, no a 6.** Es una clasificación con
significado en el mundo real, y acá se aplica a hoteles de marca reales:
Courtyard, Fairfield, Hampton Inn, Hilton Garden Inn. Un «6 estrellas» junto a
un Marriott se lee como categoría oficial, y sería falso —esas marcas son de
servicio selecto, clase 3 estrellas en la escala internacional—. La comisión
reparte esta hoja a gente que elige dónde dormir con ella. Mitigación:
rotularlo en pantalla como escala propia («nivel sobre 6»), nunca como
«estrellas» a secas. No lo resuelve del todo; el riesgo de lectura queda.

**El reparto vacía la comparación.** De los diez hoteles, seis son `premium`:
La Guaria, Hotel 1915, Hampton Inn, Hilton Garden Inn, Courtyard y Fairfield.
Con las estrellas saliendo del nivel, esos seis muestran 6/6 idéntico. Las
estrellas cargan exactamente la misma información que la etiqueta que
reemplazan —tres valores posibles— pero con aspecto de medición fina. Se ve
más preciso sin ser más preciso. Para que discriminen de verdad haría falta un
campo `estrellas` por hotel, y eso es un juicio de la comisión, no algo que se
deduzca de los datos cargados.

**El rango del medio no tiene con qué partirse.** «4 a 5» supone dos valores,
pero solo hay dos hoteles en ese nivel —Park View a $28 y Tucán a $30— y nada
en los datos los separa. Por eso el rango se muestra como rango en vez de
asignarle un número inventado a cada uno. Si la comisión decide cuál es de 4 y
cuál de 5, se agrega el campo por hotel y el componente ya lo soporta.

---

### Qué se hizo — 26 de agosto

Salió como estaba planeado. Un archivo más de lo previsto y una nota sobre la
red de seguridad, que funcionó.

**El typecheck hizo de red, como se esperaba.** Sacar `titulo` y `etiqueta` del
tipo `Nivel` rompía a propósito cualquier pantalla que todavía los usara. Pasó
en verde a la primera después de migrar las tres apariciones, que es la prueba
de que no quedó ninguna con la palabra vieja y de que `titulo` estaba
efectivamente muerto.

**Se agregó un archivo que el plan no mencionaba: `app/layout.tsx`.** El título
del sitio era «Hoteles — estadías por nivel: básico, medio y premium» y la
descripción repetía la idea. Esas tres palabras ya no aparecen en ninguna
pantalla, así que el título prometía una clasificación que el sitio dejó de
mostrar —y es lo que se ve en la pestaña del navegador y en el resultado de
Google—. Quedó «Hoteles para el Centenario UNADECA 2027 — Alajuela, Costa
Rica», con la descripción hablando de «nivel sobre 6».

**Dónde quedó cada cosa.** El rango vive en `niveles` (`contenido.ts`) como
`{ min, max }` más una `leyenda` escrita a mano —«3 de 6», «4 a 5 de 6»,
«6 de 6»—, porque «3» y «4 a 5» no se dicen igual y armarlo con plantillas
salía peor que escribirlo. El total es `ESTRELLAS_TOTAL` en `tipos.ts`, no un 6
suelto en el componente: si se vuelve a una escala de 5, se cambia en un lugar.

El color cambia según el fondo, siguiendo la regla de la paleta: sobre la foto
de la ficha van en `brass-bright` (el oro de marca, 7.07:1 sobre `ink`), y
sobre papel en `brass` (el oro oscurecido, 6.77:1 sobre blanco). Poner el de
marca sobre papel daría 2.13:1.

**La mitigación del rótulo quedó puesta y hay que respetarla.** En pantalla
dice «Nivel 4 a 5 de 6», nunca «4 estrellas». La advertencia larga está en
`contenido.ts`, arriba de `niveles`, y el componente la repite. Si alguien
cambia ese texto a «estrellas» a secas, vuelve el problema de la primera
contra: un Courtyard aparentando una categoría oficial que no tiene.

Verificado: `pnpm typecheck`, `pnpm lint` y `pnpm build` limpios (15 páginas).
Capturas a 1440 y 390 de la parrilla y de fichas de los tres niveles —básico
con tres llenas, medio con cuatro llenas más una de contorno, premium con las
seis—. La insignia se lee sobre fotos claras y oscuras, y convive con la de
«Con elevador» sin pisarse.

**Lo que queda abierto** es la segunda contra, y no se resolvió porque no es
una decisión técnica: seis de los diez hoteles muestran 6 de 6 idéntico. Es la
tarea 15 de la tabla.

---

## 11. Precio por estadía de 2 personas, y camas separadas del texto (26 de agosto)

- [x] `costoDosPersonas`: canasta comparable de 4 noches para 2
- [x] Cambiar el titular de las fichas y de la portada
- [x] Total de 4 noches en cada fila de tarifa, con reparto por ocupación
- [x] Sacar las camas de la prosa a su propio campo

### Qué pasa hoy

El precio grande de cada ficha es `costoPorPersonaNoche`: la tarifa más barata
del hotel normalizada a **una persona, una noche**. Sale de dividir el precio
entre las personas que cubre, cuando el cobro es por habitación.

Eso es comparable, pero es una unidad que nadie reserva. Quien elige hotel
para el Centenario no compra una persona-noche: compra cuatro noches. Y el
número chico —«$22 por persona / noche»— obliga a multiplicar mentalmente por
4 y por la cantidad de gente antes de saber si el hotel entra en el
presupuesto.

**El problema que no se ve.** Pasar el titular a «total de 4 noches» sin más
lo rompería: cuatro hoteles cobran por persona-noche y seis por
habitación-noche. Un total crudo pondría lado a lado los $240 de una
habitación de La Guaria —que cubre dos personas— contra los $112 de una sola
persona en Park View, como si fueran lo mismo. Sería menos certero que hoy,
no más.

**Las camas.** Ya se muestran, pero adentro de la prosa de `detalle`, y solo
las tiene 8 de las 26 tarifas:

| Hotel | Tarifa | Lo que dice el documento |
|---|---|---|
| Backpackers | Habitación compartida | Camarote en dormitorio compartido |
| La Guaria | Doble | 1 cama doble |
| La Guaria | Triple | 1 cama doble y 1 twin |
| La Guaria | Cuádruple | 2 camas dobles |
| La Guaria | Superior | 2 camas dobles y balcón |
| La Guaria | Familiar | 2 camas dobles, 1 individual y sofá cama |
| La Guaria | Junior Suite | Dos estancias, 2 camas dobles, 1 individual y balcón |
| Hampton Inn | Cuádruple | 4 adultos, dos camas full size |
| Hilton Garden Inn | Standard | Dos camas full |

Las otras 18 no dicen nada de camas. No es un olvido de la carga: el documento
no lo trae.

Y ahí está el caso que hay que hacer visible. **La Guaria cobra $60 por
habitación en ocupación doble, en TODOS sus tipos** —así lo encabeza el
documento—. O sea que la «Cuádruple», que tiene 2 camas dobles, está cotizada
para 2 personas, no para 4. Hoy eso se entiende leyendo el `detalle` completo
y el `resumen` del hotel; debería verse de un vistazo. Lo mismo del otro lado
en Hampton Inn: su Cuádruple sí cubre 4 adultos, pero en **dos camas full**,
o sea de a dos por cama.

### Cómo se hace

**Un cálculo nuevo en `calculos.ts`: `costoDosPersonas(hotel)`** — lo más barato
que sale alojar a 2 personas las 4 noches, con la regla de cobro de cada hotel:

- `persona-noche` → `precio × 2 × noches`
- `habitacion-noche` que cubre 2 o más → `precio × noches` (una habitación
  alcanza)
- `habitacion-noche` que cubre 1 → `precio × 2 × noches` (hacen falta dos)

Se toma el mínimo, y **se devuelve también de qué tarifa salió**, porque el
mínimo a veces es un camarote en dormitorio compartido: el número solo,
sin decir de dónde sale, engaña.

También `totalTarifa(habitacion)`: lo que cuesta esa fila por las 4 noches, en
su propia unidad, para mostrarlo al lado del precio por noche.

**El titular** de la ficha y de la portada pasa a ese total, rotulado
**«4 noches · 2 personas»**. Debajo, en letra chica, de qué tarifa sale.

**Las camas** salen de `detalle` a un campo propio `camas` en `Habitacion`,
opcional. Se mueve el texto, no se reescribe: lo que hoy dice «2 camas dobles ·
tarifa en ocupación doble» queda como `camas: "2 camas dobles"` y
`detalle: "tarifa en ocupación doble"`. En las 18 tarifas sin dato, el campo no
existe y la fila no muestra renglón de camas — el mismo criterio que ya usa
`aire: null`: callar no es lo mismo que decir «no tiene».

### Cómo se verifica

1. Que la portada muestre «desde» el nuevo total y que el número sea el de
   Backpackers, que es el hotel más barato.
2. Comprobar tres a mano: Park View `28 × 2 × 4 = $224`; La Guaria Doble
   `60 × 4 = $240`; Courtyard `164 × 4 = $656` —y NO `153 × 2 × 4 = $1224`,
   que es lo que costaría en dos sencillas—.
3. En la ficha de La Guaria, que la Cuádruple diga sus 2 camas dobles y que se
   entienda que la tarifa cubre 2 personas.
4. Capturas a 1440 y 390 de la parrilla y de una ficha de cada tipo de cobro.

### Las contras

**El mínimo puede salir de una tarifa que nadie quiere.** En Backpackers, lo
más barato para 2 personas son dos camarotes en dormitorio compartido: $128 
contra $240 de la privada cuádruple. Es cierto y es lo más barato, pero un
número solo haría parecer que el hotel entero cuesta eso. Por eso el titular
lleva abajo de qué tarifa sale. Aun así, quien mire rápido va a comparar
números sin leer la línea chica.

**Dos personas es una canasta arbitraria.** El grupo es de 84 personas y nadie
va a reservar de a dos. Sirve para comparar hoteles entre sí —que es lo que
hace la comisión— pero no es el presupuesto real. Ese sigue dependiendo de
cómo se repartan las 84 personas, que es una decisión que todavía no se tomó.

**Los impuestos siguen sin cerrarse** (tarea 1.3). Los totales de Hampton Inn,
Hilton Garden Inn, Courtyard y Fairfield son «más impuestos» de porcentaje
desconocido en tres de los cuatro casos. Multiplicar por 4 noches multiplica
también ese hueco: un 13% sobre $656 son $85 que el número no muestra. El
titular se vuelve más grande y más incompleto a la vez.

---

### Qué se hizo — 26 de agosto

El plan de arriba se amplió a mitad de camino, con una observación que lo
mejoró: **alguien puede comprar la habitación sola.** El plan solo contemplaba
la canasta de dos personas; faltaba lo que pasa cuando la ocupación es otra.

Quedó repartido en dos alturas, que es lo que pidió el usuario:

**Afuera, en la parrilla** — el total de las cuatro noches para dos personas,
con el total por persona en el pie. Alcanza para comparar hoteles de un
vistazo, que es para lo que se mira la parrilla.

**Adentro, en cada tarifa** — el total de la habitación por las cuatro noches
y, debajo, **cuánto sale por persona según cuántos la compartan**, dividiendo
el total. Hampton Inn Cuádruple, por ejemplo:

```
Cuádruple                                    $583
Dos camas full size            la habitación, 4 noches
4 adultos · tarifa 17/8/2026…        $146 por noche

POR PERSONA, SEGÚN CUÁNTOS LA COMPARTAN · LA TARIFA CUBRE HASTA 4
Sola $583 · Entre 2 $292 · Entre 3 $194 · Entre 4 $146
```

Ahí se ve todo junto: que se puede tomar sola por $583, que entre cuatro sale
$146 por cabeza, y que esos cuatro adultos duermen en **dos camas full**, o sea
de a dos por cama. Ese último dato antes estaba a mitad de una frase.

**El reparto se corta donde lo corta la fuente, y ahora lo dice.** El encabezado
lleva «la tarifa cubre hasta N». Sin eso, una «Cuádruple» de La Guaria que
muestra «2 camas dobles» y un reparto que se detiene en dos parecería un error
de la página. No lo es: el documento cotiza TODOS los tipos de La Guaria en
ocupación doble y no dice cuánto vale la persona adicional —ya estaba anotado
en los pendientes de ese hotel—. El límite sale de la tarifa, no de las camas,
y esa diferencia es justamente lo que había que hacer visible.

**Las tarifas por persona-noche no llevan reparto**, porque el precio ya es por
cabeza y no cambia con la ocupación. Son cuatro hoteles: Alajuela Airport,
Park View, Tucán y Hotel 1915.

**Se eliminaron `costoPorPersonaNoche` y `costoEstadia`**, que quedaron sin un
solo uso. Con eso se cierra por otra vía la tarea 4 —«corregir el precio desde
que sesga la comparación»—: el sesgo era de la división. Repartir una
habitación entre todas las personas que cubre da el número más chico posible y
hace parecer barato a cualquier hotel con habitaciones grandes, sin decir que
hay que llenarlas. `costoDosPersonas` fija la ocupación en vez de suponer la
más conveniente. `totalCotizado` se mantiene: lo usa `/comision`.

También se actualizaron los tres puntos de la portada, que anunciaban «las
tarifas se muestran por persona y por noche» y «tres niveles: básico, medio y
premium» —las dos cosas ya eran falsas—.

**Camas: 8 de 26 tarifas.** Se movió el texto, no se reescribió. Las otras 18 no
muestran renglón de camas porque la fuente no dice nada. La única que se
completó por razonamiento es la «Standard con 4 personas» del Hilton Garden
Inn, que hereda las dos camas full de la Standard: el correo describe una sola
categoría —«dos camas full · persona adicional $10, hasta 4»— y esa fila es esa
misma habitación con las dos personas extra ya sumadas. Queda anotado en el
código para que se pueda revisar.

Verificado a mano contra el HTML generado, no solo por captura: Park View
`28 × 2 × 4 = $224`; La Guaria `60 × 4 = $240`; Backpackers `16 × 2 × 4 = $128`;
Hampton Inn `123,17 × 4 = $493`; Courtyard `164 × 4 = $656` —y no `153 × 2 × 4
= $1224`, que es lo que costaría en dos sencillas—. `pnpm typecheck`, `lint` y
`build` limpios.

**Las tres contras del plan siguen en pie**, y la tercera ahora pesa más: al
multiplicar por cuatro noches, el hueco de los impuestos también se multiplica.
El $656 de Courtyard lleva un 13% que la cifra no muestra —$85— y en Hampton
Inn e Hilton Garden Inn ni siquiera se sabe el porcentaje. Mientras la tarea
1.3 siga abierta, el número grande es más útil y más incompleto a la vez.

---

## 12. Pruebas piloto de interacción y durabilidad (31 de agosto)

### Qué pasa hoy

El sitio no tiene ni una sola prueba automatizada. Se verifica mirándolo. Eso
alcanzó mientras había una persona tocándolo, pero no dice nada sobre qué pasa
cuando lo abren 84 personas desde teléfonos distintos en el mismo día.

Antes de plantear pruebas hay que corregir el modelo mental, porque cambia qué
tiene sentido probar: **este sitio no tiene servidor**. `next.config.ts` usa
`output: "export"`. `pnpm build` deja archivos en `out/` y Netlify los sirve
como quien sirve un PDF. No hay base de datos, ni sesiones, ni API, ni proceso
de Node corriendo. Nada que se pueda "caer" por cantidad de usuarios: no hay
estado compartido que saturar.

Medido en el build del 31 de agosto:

| Medida | Valor |
|---|---|
| Páginas generadas | 15, todas estáticas |
| Peso de `out/` | 10 MB |
| Imágenes | 8.1 MB de esos 10 |
| JavaScript al navegador | 852 KB sin comprimir · 230 KB gzip · 14 archivos |
| CSS | 36 KB |
| HTML más pesado | `index.html`, 180 KB |
| Errores de tipos | 0 |
| Foto más pesada | `hotel-1915/07.jpg`, 848 KB |

La cuenta de capacidad, entonces, es de banda y no de carga. Netlify da 100 GB
por mes en el plan gratuito. Diez MB por visita —el peor caso, alguien que
abre las 15 páginas y todas las fotos— dan **unas 10.000 visitas completas al
mes**. Ochenta y cuatro personas mirando el sitio diez veces cada una son 840.
El margen es de doce veces, y eso suponiendo el peor caso en cada visita.

Lo que sí puede fallar es otra cosa, y son cuatro cosas concretas:

1. **El teléfono del usuario, no el servidor.** 230 KB de JavaScript para un
   sitio cuyo JavaScript hace dos cosas —un fundido de entrada y el visor de
   la galería— es desproporcionado. Casi todo es `framer-motion`, traído para
   la animación de catorce píxeles de `reveal.tsx`.
2. **Las fotos.** 8.1 MB sin optimizar, con archivos sueltos de 848 KB. El
   export estático apaga el optimizador de imágenes de Next
   (`images.unoptimized: true`), así que se sirve el JPG tal como está. En
   datos móviles de Costa Rica eso no tumba nada: hace esperar, que para una
   promoción es peor.
3. **Fugas en el visor de la galería.** Es el único componente con estado,
   listeners de teclado y manipulación directa de `document.body.style`. Es el
   único lugar del sitio donde una interacción repetida podría degradar la
   pestaña.
4. **Que nadie pueda reconstruirlo.** Hoy el repositorio de `dev-local` tiene
   cero commits y ningún remoto. Si se pierde la carpeta, se pierde el sitio.
   Esta es, de lejos, la amenaza más grande para el objetivo de los dos años,
   y no es una amenaza técnica.

### Sobre el lenguaje y la duración de dos años

TypeScript, React 19, Next 16, Tailwind 4. La pregunta de si "aguanta dos
años" tiene una respuesta tranquilizadora y una incómoda.

La tranquilizadora: lo que se publica es HTML, CSS y JavaScript plano. Aunque
Next 16 quede obsoleto, aunque React saque una versión que rompa todo, el
contenido de `out/` se sigue sirviendo igual en 2028. Un sitio estático no se
pudre; los que se pudren son los que tienen un servidor que alguien tiene que
seguir actualizando. La decisión de `output: "export"` ya compró la mayor
parte de la durabilidad.

La incómoda: lo que sí caduca es la capacidad de **volver a construirlo**. En
dos años, `pnpm install` con este `pnpm-lock.yaml` puede fallar por paquetes
retirados, o por una versión de Node que ya no exista. Eso se cubre fijando la
versión de Node en el repositorio y guardando una copia del `out/` publicado,
no reescribiendo el sitio en otro lenguaje. Cambiar de lenguaje no compra
durabilidad acá: la compra el archivo.

### Cómo se hace

Seis capas, de la más barata a la más cara. Cada una responde una pregunta
distinta; ninguna reemplaza a la anterior.

**Capa 0 — Puerta de compilación.** Ya existe (`typecheck`, `lint`, `build`),
pero se corre a mano. Se junta en un solo comando `pnpm verificar` y se pone
en CI, para que un cambio que no compila no llegue nunca a Netlify.

**Capa 1 — Interacción, con Playwright sobre `out/` servido.** Los guiones
que importan, en orden de riesgo:

- Galería: abrir desde la foto grande y desde cada miniatura; flechas;
  `Escape`, `←`, `→`; que el foco vuelva al botón que la abrió; que el scroll
  del cuerpo se bloquee al abrir y se restaure al cerrar; que el ciclo dé la
  vuelta en los bordes (de la primera foto, "anterior" lleva a la última).
- Carrusel: que pause con el mouse encima y con el foco de teclado; que con
  `prefers-reduced-motion` quede como fila desplazable y no se rompa.
- Rutas: que las 15 carguen sin error en consola y sin enlaces rotos.
- Contacto: que los `href` de `wa.me` y `mailto:` estén bien formados. No se
  hacen clic en la prueba —abrirían aplicaciones externas—, se inspecciona el
  atributo.
- Video: que con `preload="none"` no se descargue nada hasta que alguien lo
  pida, mirando las peticiones de red.

**Capa 2 — Aguante del navegador.** Esto es lo que la pregunta original quería
saber. Abrir y cerrar el visor de la galería 200 veces seguidas con Playwright,
midiendo por CDP la cantidad de listeners y el montón de memoria antes y
después. Si la galería tiene una fuga, aparece acá; si los números quedan
planos, el sitio aguanta cualquier cantidad de manoseo.

**Capa 3 — Rendimiento en condiciones reales.** Lighthouse en modo móvil con
red 4G simulada, contra `out/` servido. Presupuesto declarado, para que la
prueba falle sola cuando se pase: LCP bajo 2.5 s, JavaScript bajo 150 KB gzip,
CLS en cero.

**Capa 4 — Carga.** `oha` o `autocannon` contra `out/` servido localmente. Se
hace **una sola vez**, se anota el número acá, y no se repite.

**Capa 5 — Accesibilidad.** `axe-core` sobre las 15 rutas, contra las reglas
WCAG 2.1 AA.

**Capa 6 — Durabilidad.** Commits de verdad y un remoto privado; `.nvmrc` con
la versión de Node; un `out/` archivado por cada versión publicada; y en el
`README` las tres líneas que hacen falta para levantarlo desde cero en una
máquina limpia.

### Cómo se verifica

Cada capa trae su propio criterio, y todos son números, no impresiones:

| Capa | Pasa si |
|---|---|
| 0 | `pnpm verificar` termina en 0 |
| 1 | Los guiones de galería, carrusel, rutas y contacto pasan en Chromium y WebKit |
| 2 | Tras 200 aperturas: listeners iguales que al inicio, memoria sin crecer más de 10% |
| 3 | LCP < 2.5 s en 4G simulada; JS gzip < 150 KB; CLS = 0 |
| 4 | Número anotado en este documento (una vez) |
| 5 | Cero violaciones de axe de gravedad seria o crítica |
| 6 | `git clone` en una carpeta vacía, `pnpm install && pnpm build`, y sale el mismo `out/` |

El de la capa 6 es el único que verifica el objetivo real de los dos años, y
es el único que se puede correr sin ninguna herramienta nueva.

### Las contras

Escribo esto contra mi propia propuesta, que es para lo que sirve esta sección.

**Seis capas de prueba para 3.900 líneas es desproporcionado.** El andamiaje
terminaría pesando más que el sitio que cuida. Un sitio de promoción que van a
ver 84 personas durante unos meses no justifica la infraestructura de prueba
de un producto.

**Playwright es una ironía en un plan de durabilidad.** Agrega unos 400 MB de
navegadores y una dependencia que en dos años estará vieja. La suite de
pruebas se va a pudrir antes que el sitio.

**La capa 4 es teatro.** Mide la velocidad de un servidor de archivos, que ya
sabemos que no es el cuello de botella. Se incluye porque se preguntó por la
capacidad y tener el número cierra la pregunta, no porque haya un riesgo.

**Las pruebas de interacción se rompen con cada rediseño, y este sitio todavía
se está rediseñando.** Las secciones 9, 10 y 11 son de la semana pasada. Un
guión que afirma que la píldora dice "6 más" se rompe cuando cambia el
mosaico, y eso no es un fallo del sitio: es mantenimiento doble.

**Lo más útil de esta lista no es una prueba.** Es el punto 4 del diagnóstico:
cero commits y ningún remoto. Toda la capa 1 puede pasar en verde y el
proyecto seguir a un borrado accidental de distancia de desaparecer. Si de
todo esto se hace una sola cosa, que sea la capa 6.

**Recorte propuesto.** Capa 6 primero y hoy. Después capa 0. Después capa 2,
que es barata y responde exactamente lo que se preguntó. De la capa 1, solo
los guiones de la galería, que es el único componente con estado real. Capas
3, 4 y 5 se corren una vez, se anota el resultado acá, y no quedan en CI hasta
que el rediseño se asiente.

---

## 13. Fotos: misma resolución, una fracción de los datos (31 de agosto)

### Qué pasa hoy

Dos problemas distintos, y conviene no confundirlos porque se arreglan por
separado.

**Primero: no hay `srcset`.** El export estático apaga el optimizador de Next
(`images.unoptimized: true`), así que `next/image` emite un `<img src>` pelado.
Se puede comprobar en el HTML construido: cero atributos `srcset` en todo el
sitio. Un teléfono de 390 px de ancho descarga exactamente el mismo archivo que
un monitor de escritorio. En la ficha de `hotel-1915`, eso son **2.4 MB para
mostrar cinco fotos que en pantalla miden menos de 400 px**.

**Segundo: los JPG están mal comprimidos.** No es solo cuestión de tamaño en
píxeles. `hotel-1915/08.jpg` mide 800 px de ancho y pesa 673 KB; un JPEG de
800 px bien comprimido pesa unos 90 KB. Las fotos llegaron guardadas a calidad
máxima, y se sirven tal cual.

Lo que sí funciona hoy: la carga por scroll. Las cuatro miniaturas del mosaico
salen con `loading="lazy"` y solo se descargan al acercarse a la pantalla. La
foto grande lleva `priority`, que es lo correcto — es el LCP de la ficha. O
sea que el diferido por scroll no hay que construirlo; hay que hacer que lo
que se difiera pese poco.

Medido con `sharp` sobre las 45 fotos, **sin tocar un solo píxel**:

| Formato | Total 45 fotos | Contra hoy |
|---|---|---|
| Original (JPEG) | 5.63 MB | — |
| JPEG q80 (mozjpeg) | 2.65 MB | 53% menos |
| WebP q75 | 1.91 MB | 66% menos |
| AVIF q50 | 1.21 MB | **79% menos** |

Y agregando variantes por tamaño, para `07.jpg` (1600 px, 847 KB hoy):

| Ancho | AVIF | WebP |
|---|---|---|
| 400 px | 16 KB | 26 KB |
| 800 px | 50 KB | 87 KB |
| 1600 px | 122 KB | 204 KB |

Las dos cosas juntas, en la ficha más pesada del sitio, en un teléfono de
390 px: **de 2442 KB a 140 KB, 94% menos**. La resolución en pantalla es la
misma; lo que cambia es que deja de mandarse cuatro veces más píxeles de los
que la pantalla puede mostrar.

Aparte, el logo: `logo-unadeca.png` mide 3088 px de ancho y pesa 352 KB, y se
muestra a 64 px de alto **en todas las páginas del sitio**. A 600 px son 17 KB
en AVIF. Es la mejora más barata de la lista y la que más veces se cobra.

### Cómo se hace

**1. Un script que genera las variantes: `scripts/optimizar-imagenes.mjs`.**
Recorre `public/hoteles/**` y `public/marca`, y por cada foto escribe AVIF y
WebP en los anchos 400, 800 y 1600, sin ampliar nunca por encima del original
(`withoutEnlargement`). Una foto de 375 px genera una sola variante, no tres
iguales. Las salidas van a `public/opt/` con el mismo nombre más el ancho.

**2. Las variantes se guardan en git, no se generan en cada build.** Es una
decisión a favor de la durabilidad y en contra de la limpieza: el repositorio
crece unos 3 MB, pero el build sigue siendo `next build` a secas y no depende
de que `sharp` compile bien dentro de dos años ni en el servidor de Netlify.
El script se corre a mano cuando llegan fotos nuevas, no en cada publicación.

**3. Un componente `<Foto>` que emite `<picture>`.** Como `unoptimized` mata el
`srcset` de `next/image`, se reemplazan los siete usos de `<Image>` por un
componente propio que escribe HTML explícito:

```html
<picture>
  <source type="image/avif" srcset="...400.avif 400w, ...800.avif 800w" sizes="...">
  <source type="image/webp" srcset="...400.webp 400w, ...800.webp 800w" sizes="...">
  <img src="original.jpg" loading="lazy" decoding="async" width alt>
</picture>
```

El `sizes` es el que ya está escrito en cada llamada actual —`(min-width:
1024px) 50vw, 100vw` en la portada, `25vw`/`50vw` en las miniaturas—; se
traslada tal cual. El navegador elige el archivo; el JPG original queda de
respaldo para cualquier navegador sin AVIF ni WebP.

**4. El `srcset` se arma por foto, con `imagen-tamanos.ts`.** Ese módulo ya
tiene el ancho nativo de las 45 fotos, que es justo lo que hace falta para no
declarar en el `srcset` una variante que no se generó.

**5. El visor a pantalla completa pide la variante de 1600**, no el original.
Hoy carga el JPG entero con `quality={95}`, un ajuste que con `unoptimized` no
hace nada: es un parámetro que Next ignora sin servidor de imágenes.

### Cómo se verifica

| Qué | Pasa si |
|---|---|
| `srcset` presente | `grep -c srcset out/**/*.html` da más de 0 (hoy da 0) |
| Peso de la ficha en teléfono | Menos de 300 KB de imágenes con viewport de 390 px, medido en la pestaña de red |
| Resolución intacta | Comparación lado a lado al 100% de zoom: ninguna foto se ve más blanda |
| Diferido por scroll | Al cargar la ficha sin bajar, solo se piden la portada y el logo; las miniaturas aparecen en la red al hacer scroll |
| Respaldo | Con AVIF y WebP desactivados en el navegador, las fotos siguen apareciendo |
| Peso total de `out/` | Baja de 10 MB a menos de 5 MB |

### Las contras

**Se pierde `next/image`, y con él sus redes de seguridad.** El componente
propio hay que mantenerlo: si alguien agrega una foto y olvida correr el
script, el `<picture>` apunta a variantes que no existen y el navegador cae al
JPG original en silencio. Falla suave, pero falla callada — el script debe
avisar cuál foto le falta.

**El repositorio se llena de archivos derivados.** Unos 200 archivos generados
conviviendo con los 45 originales. Ensucia los `git diff` cada vez que llegan
fotos. Lo compensa que el build no dependa de nada.

**AVIF a calidad 50 es agresivo.** En fotos de interiores con paredes lisas
—que son casi todas acá— puede aparecer bandeo en los degradados. El número
correcto sale de mirar, no de la tabla. Si alguna foto se ve mal, sube a 60
para esa sola; la ganancia sigue siendo enorme.

**Es la tarea que más código toca de todo el documento.** Siete usos de
`<Image>` en cinco archivos, más un componente nuevo, más un script. En un
sitio que todavía se está rediseñando, eso choca con lo que dije en la sección
12 sobre no fijar en pruebas lo que aún se mueve. La diferencia es que esto no
es andamiaje: es la carga útil, y el 94% justifica el riesgo.

**El logo solo no arregla nada, pero casi.** Si de esta sección se hiciera una
sola cosa, sería el logo: 352 KB a 17 KB, en todas las páginas, y es cambiar
un archivo.


### Qué se hizo — 31 de agosto

Se hizo entero: el script, el componente, las variantes y el módulo de anchos.
Pero la meta que este documento se puso estaba mal medida, y una de las contras
se cumplió peor de lo que la escribí.

**Lo que quedó puesto.** `scripts/optimizar-imagenes.mjs` genera 118 archivos
—59 AVIF y 59 WebP— a partir de los 46 originales, y reescribe
`src/lib/imagen-variantes.ts` con los anchos que realmente existen para cada
foto. `src/components/ui/foto.tsx` emite el `<picture>`. No queda ni un uso de
`next/image` en el sitio: las once páginas del build llevan `<source>` con
`srcSet`.

**La meta de «`out/` por debajo de 5 MB» no se cumplió, y era la métrica
equivocada.** `out/` pesa 14 MB: 6.0 MB de originales, 3.3 MB de variantes y el
resto entre HTML y bundles. Los originales siguen ahí porque son el respaldo
del `<picture>`, que es justo lo que los hace innecesarios: ningún navegador de
los últimos años baja el JPG, porque el AVIF o el WebP le sirven primero. Lo
que importaba era el peso transferido por visita, no el peso de la carpeta
publicada. Escribí una meta sobre lo segundo y por eso parece fallada cuando lo
que se buscaba sí funcionó.

**El logo salió mejor que el plan.** Decía «352 KB a 17 KB». El PNG de 360 KB
sigue copiándose al build —es el respaldo—, pero la página pide
`logo-unadeca-400.avif`, que pesa 9 KB.

**La contra que sí golpeó: casi todas las fotos tienen una sola variante.** El
script no amplía, por diseño, y la mayoría de los originales mide entre 375 y
750 px. Resultado: de los diez hoteles, solo `hampton-inn` (1600 px) y
`hotel-1915` (1024 px) dan material para las tres escalas; el resto se quedó en
400w y nada más. En un teléfono con densidad 2 y `sizes="100vw"`, el navegador
necesita unos 780 px y solo encuentra 400. Ahí la foto se ve más blanda que
antes, cuando cargaba el JPG entero.

No es un error del script: es la tarea 1.5 —pedir fotos en alta resolución—
pasando la factura en el único lugar donde se nota. Mientras las fotos sigan
midiendo 375 px, ninguna técnica de entrega las mejora. Conviene resolver 1.5
antes de tocar nada más de esta sección.

Verificado: `pnpm typecheck`, `pnpm lint` y `pnpm build` limpios, 15 páginas.

---

## 14. Endurecer la publicación (31 de agosto)

### Qué pasaba

El sitio ya estaba publicado en Netlify y el trabajo de tres semanas no tenía
un solo commit. Cuatro cosas sueltas:

1. **Sin historial.** El repositorio con commits estaba en la copia de
   `~/Documents/desarrollo` —un único commit, el andamio de Create Next App— y
   todo el trabajo real vivía sin versionar en `~/dev-local`. Ninguna de las
   dos copias tenía el conjunto completo.
2. **Sin cabeceras.** No había `netlify.toml` ni `_headers` en el repositorio;
   el que aparece dentro de `.netlify/` lo genera el plugin en cada build y
   está ignorado. El sitio salía sin CSP, sin `nosniff`, sin `Referrer-Policy`
   y sin `frame-ancestors`: cualquier página ajena podía meterlo en un iframe.
3. **`/comision` accesible.** Lleva `robots: { index: false, follow: false }`,
   que solo le pide a los buscadores que no la listen. Cualquiera con el enlace
   veía el desglose cotizado hotel por hotel. Es la decisión 3.1, que estaba
   abierta desde el principio.
4. **Un aviso de dependencia.** `postcss` arrastraba `nanoid` 3.3.17, con aviso
   de severidad alta (GHSA-2v37-7h3g-55p8).

### Qué se hizo — 31 de agosto

**Historial unificado.** Se trajo el commit del andamio desde la copia de
Documents a `~/dev-local` con `git fetch` y se apuntó `main` ahí, sin tocar el
árbol de trabajo. Así el primer commit real queda como hijo del andamio y se
ve exactamente qué cambió respecto de Create Next App: se borran los cinco SVG
de ejemplo, `globals.css` se muda a `src/styles`, y entran los diez hoteles con
sus fichas.

**Cabeceras en `public/_headers`.** Va en `public/` porque el export copia esa
carpeta tal cual a `out/`, que es lo que Netlify publica. Lleva CSP, `nosniff`,
`Referrer-Policy`, `Permissions-Policy`, HSTS y `frame-ancestors 'none'`, más
cache inmutable para `/opt/*` y `/_next/static/*`, que llevan el ancho o el
hash en el nombre.

**`/comision` deja de publicarse.** `scripts/quitar-comision.mjs` la borra de
`out/` después de `next build`. Sigue disponible en local con `pnpm dev`, y
`INCLUIR_COMISION=1 pnpm build` la publica a propósito. El script rompe el
build si no encuentra nada que borrar: si Next cambia cómo nombra las rutas
exportadas, es mejor fallar que publicarla en silencio.

**`nanoid` parchado.** Un `overrides` que en pnpm 11 va en
`pnpm-workspace.yaml`, no en `package.json` —puesto en `package.json` la
instalación dice «Already up to date» y no resuelve nada, que fue lo que pasó
en el primer intento—. `pnpm audit` queda limpio.

### Cómo se verifica

| Qué | Pasa si |
|---|---|
| Historial | `git log --oneline` muestra el andamio y los dos commits nuevos |
| `/comision` fuera | `find out -name "*comision*"` no devuelve nada |
| Sin rastro del nombre | `grep -rl comision out` no devuelve nada |
| Cabeceras copiadas | `out/_headers` existe después del build |
| Cabeceras aplicadas | `curl -sI` sobre el preview muestra la CSP |
| Dependencias | `pnpm audit` dice «No known vulnerabilities found» |

Los cinco primeros están verificados. El de `curl` no: hace falta un deploy de
preview, y todavía no se hizo.

### Las contras

**La CSP lleva `'unsafe-inline'` en `script-src`, y eso no es menor.** El App
Router inyecta scripts en línea para hidratar, y con export estático no hay
servidor que genere nonces. Con `'unsafe-inline'`, la CSP deja de ser una
defensa real contra XSS; sirven las demás directivas —`frame-ancestors`,
`object-src`, `base-uri`, `form-action`—, que no son poco, pero conviene no
creer que el sitio quedó blindado. En un sitio sin formularios ni entrada de
usuario el riesgo de XSS es bajo de todos modos; la nota es para que nadie
agregue un formulario asumiendo que la CSP lo cubre.

**Quitar `/comision` del build la vuelve más incómoda de consultar.** Quien la
necesite tiene que levantar el proyecto en local. Es el precio de que no esté
expuesta, y me parece el correcto, pero es un cambio real en cómo se trabaja
con ella. Si la comisión la necesita seguido, la respuesta no es volver a
publicarla: es `INCLUIR_COMISION=1` en un deploy de preview con enlace privado.

**El HSTS va sin `preload` a propósito.** Entrar a la lista de precarga es
fácil y salir es lento, y el dominio definitivo todavía no está cerrado.

**Borrar del `out/` es más frágil que no generar.** Lo correcto sería que la
página no se exporte; el App Router con `output: "export"` no da una forma
limpia de condicionar una ruta estática, así que se borra después. Por eso el
script falla si no encuentra nada: es la única defensa contra que Next cambie
los nombres y la página vuelva a colarse sin que nadie lo note.

### Lo que queda abierto

- **No hay remoto.** Los commits están solo en este disco. El repositorio tiene
  que ser privado cuando se cree: publica tarifas de grupo negociadas y correos
  directos de contactos comerciales.
- **La copia de `~/Documents/desarrollo` sigue ahí**, once días atrasada en el
  documento y tres en el código. Conviene borrarla para que nadie edite la
  equivocada, pero eso se decide aparte.
- **Las pruebas de la sección 12 siguen sin escribirse.** `calculos.ts` exporta
  cuatro funciones de dinero sin una sola prueba, y es donde un error se
  traduce en una cifra equivocada frente a un hotel.
- **Dos cosas fuera del proyecto, en la máquina.** La carpeta personal es un
  repositorio git con todo sin rastrear, y el token de git está en texto plano
  en `~/.git-credentials` con `helper = store`. Ninguna de las dos se tocó
  porque son destructivas y van confirmadas aparte.

---

## 15. Fuera de Netlify, a servidor propio (31 de agosto)

### Qué pasa hoy

El sitio se sale de Netlify. El proyecto de allá ya se borró —no quedan datos,
ni deploys, ni la URL `golden-frangollo-4a84b8.netlify.app`— y el destino es un
servidor propio, todavía sin definir cuál ni cómo se sube.

Eso cambia el problema. Netlify hacía tres cosas gratis que ahora hay que hacer
a mano, y si no se hacen el sitio queda **más lento y más caro en datos** que
antes de mudarse:

1. **Comprimía con Brotli.** No es un detalle: la portada pesa 189 KB en crudo
   y 10.8 KB con Brotli. Un servidor sin compresión sirve los 189 KB.
2. **Servía por HTTP/2 desde un CDN.** Ahora la latencia es la del servidor,
   una sola ubicación.
3. **Ponía cabeceras de cache y TLS al día** sin que nadie las escribiera.

Lo segundo no se compensa. Lo primero y lo tercero sí, y son la mayor parte
del beneficio.

### Lo que de verdad cuesta datos móviles

Medido sobre el build actual, primera visita a la portada, con Brotli:

| Recurso | Crudo | Comprimido |
|---|---|---|
| `index.html` | 189 KB | **10.8 KB** |
| JavaScript (9 chunks) | 697 KB | **~180 KB** |
| CSS | 35 KB | **8 KB** |
| Fuentes (2 de 7 subconjuntos) | — | **60 KB** |
| Fotos | según la ficha | — |

El HTML pesa 189 KB en crudo porque Next inserta la carga de React —230
`<script>` en línea, 474 KB entre todas las páginas— pero comprime 18 a 1, así
que **no es el problema**. El problema es el JavaScript: 180 KB comprimidos,
el 70% de la visita, en un sitio cuya única interacción es un visor de fotos y
una aparición al hacer scroll.

### Cómo se hace

**1. Precomprimir en el build.** Un script que, terminado `next build`, escribe
`.br` y `.gz` al lado de cada HTML, CSS, JS, SVG y JSON de `out/`. Los tres
servidores saben servir el archivo ya comprimido sin gastar CPU por visita
(`brotli_static` en nginx, `precompressed` en Caddy, `mod_rewrite` en Apache).
Comprimir una vez al publicar sale mejor que comprimir en cada pedido.

**2. Configuración para los tres servidores.** Como el servidor todavía no está
elegido, se dejan `deploy/nginx.conf`, `deploy/Caddyfile` y
`deploy/apache.htaccess`, los tres con las mismas cabeceras que hoy tiene
`public/_headers`, más TLS, HTTP/2 y cache. Con una nota de cuál conviene: para
un sitio estático de una persona, **Caddy**, porque saca HTTPS y renovación de
certificados sin configuración, que es justo donde se rompen estas cosas.

`public/_headers` y `netlify.toml` se retiran: eran formato de Netlify y ya no
los lee nadie.

**3. Quitar framer-motion.** Se usa en un solo lugar —`Reveal`, una aparición
de 14 px al entrar en pantalla— y arrastra una librería de animación completa.
Se reemplaza por `IntersectionObserver` más una transición CSS: unas veinte
líneas que hacen exactamente lo mismo, incluido el `prefers-reduced-motion` y
el margen superior gigante que ya está documentado en el componente.

**4. La CSP se queda con `'unsafe-inline'`, y conviene decir por qué.** La idea
obvia es reemplazarlo por hashes de los scripts en línea. No sirve acá: hay
**165 hashes distintos** entre las trece páginas, porque cada una lleva su
propia carga de React en línea. La cabecera resultante pesaría más que el HTML.
Externalizar esos 230 scripts a archivos tampoco: serían 230 pedidos más.

La respuesta honesta es que un export estático de App Router no puede tener una
CSP fuerte contra XSS, y que en este sitio eso importa poco —no hay formularios,
ni login, ni entrada de usuario, ni contenido de terceros: todo el texto sale de
`contenido.ts` en el build—. Las otras directivas (`frame-ancestors`,
`object-src`, `base-uri`, `form-action`) sí funcionan y son las que evitan que
alguien enmarque o secuestre la página. Queda anotado para que nadie agregue un
formulario creyendo que la CSP lo cubre.

**5. Interacción del visor de fotos.** Está bien resuelto —Escape, flechas, el
foco vuelve a la miniatura, `aria-modal`, portal para escapar del apilamiento—
pero le faltan cuatro cosas:

- **Trampa de foco.** Con `aria-modal="true"` el lector de pantalla se limita
  al visor, pero el tabulador no: sigue recorriendo los enlaces de la página de
  atrás, que están tapados. Para quien navega con teclado, el foco desaparece.
- **Deslizar en el teléfono.** El visor solo se mueve con los botones. En un
  teléfono, deslizar es el gesto que la gente prueba primero.
- **El bloqueo de scroll no aguanta iOS.** `body.style.overflow = "hidden"` no
  alcanza en Safari de iPhone: la página de atrás se sigue moviendo y al cerrar
  el visor queda en otra posición.
- **La foto siguiente se descarga al pedirla.** Precargar la contigua hace que
  el paso se sienta inmediato. Cuesta un pedido y ahorra la espera.

**6. `robots.txt`.** No hay. Conviene uno explícito que además liste el sitemap
cuando exista.

**7. `images.qualities` en `next.config.ts` está muerto.** Era para
`next/image`, que ya no se usa desde la sección 13.

### Cómo se verifica

| Qué | Pasa si |
|---|---|
| Precompresión | Existe `out/index.html.br` y pesa menos de 15 KB |
| Sin framer | `grep -r framer-motion src/` no devuelve nada y el JS baja |
| La aparición sigue | Al bajar por la parrilla las fichas aparecen; con «reducir movimiento» activo, no |
| Trampa de foco | Con el visor abierto, tabular en círculo no sale de él |
| Deslizar | En teléfono, deslizar cambia de foto |
| iOS | Abrir el visor, cerrar: la página quedó donde estaba |
| Cabeceras | `curl -sI` contra el servidor nuevo muestra la CSP |

### Las contras

**Salir de Netlify empeora la entrega si el servidor queda mal configurado.**
Es el riesgo central de todo esto y no depende del código. Netlify comprimía,
cacheaba y servía desde el borde sin que nadie escribiera una línea. Un nginx
por defecto no comprime nada. El sitio puede terminar sirviendo 189 KB donde
antes servía 10.8 KB —diecisiete veces más datos móviles— y nadie se daría
cuenta mirando la pantalla, porque se ve igual. Por eso la precompresión y las
configuraciones van en el repositorio y no en la cabeza de nadie.

**Escribir la aparición a mano es asumir mantenimiento.** framer-motion tiene
resueltos casos que este reemplazo no: interrupciones a mitad de animación,
elementos que entran y salen, listas que se reordenan. Nada de eso pasa acá —es
una aparición única, con `once`— pero si mañana alguien quiere una animación de
verdad, va a tener que traer la librería de vuelta o pelear con CSS. Se cambia
flexibilidad futura por 180 KB hoy, y para un sitio que se mira una vez antes
de reservar, el intercambio está claro.

**Tres configuraciones de servidor es más de lo necesario.** Dos van a quedar
sin usar y sin probar, y una configuración sin probar envejece mal. Se hace así
porque el servidor todavía no está elegido; en cuanto se decida, conviene
borrar las otras dos en vez de dejarlas ahí pudriéndose.

**La trampa de foco es código sutil que se rompe callado.** Si alguien agrega
un botón al visor y la trampa no lo contempla, nadie lo nota salvo quien navega
con teclado. La alternativa —el elemento `<dialog>` nativo, que trae la trampa
y el `inert` de fondo gratis— obligaría a rehacer el visor completo, incluido
el portal y el apilamiento que costó entender. Se queda la trampa a mano, con
el comentario que explica por qué existe.

**Nada de esto arregla las fotos de 375 px.** Sigue siendo el cuello de botella
real de la sección 13, y es contenido, no código.


### Qué se hizo — 31 de agosto

Salió todo lo planeado. Dos cosas cambiaron de forma respecto del plan y una
métrica quedó peor medida de lo que la escribí.

**El proyecto de Netlify se borró.** No tenía dominio propio ni alias, solo la
URL de cortesía, así que no arrastró nada: la lista de proyectos quedó vacía y
`golden-frangollo-4a84b8.netlify.app` responde 404. Del repositorio salieron
`netlify.toml`, `public/_headers` y la carpeta `.netlify/`.

**La precompresión funciona mejor de lo esperado.** `scripts/precomprimir.mjs`
procesa 60 archivos y los baja de 2956 KB a 438 KB con Brotli: **85% menos**.
La portada sola pasa de 189 KB a 10.8 KB.

**framer-motion afuera.** `Reveal` pasó a ser componente de servidor: escribe
`data-reveal` y el retraso, nada más. El estado inicial y la transición viven
en `globals.css`, y un único `IntersectionObserver` en el layout
—`ObservadorReveal`— va marcando los elementos. El `rootMargin` de
`9999px 0px -60px 0px` se trasladó igual, con su explicación.

Un cambio respecto del plan que salió mejor: **`prefers-reduced-motion` se
resolvió en CSS, no en JavaScript**. Antes lo consultaba el componente con
`useReducedMotion`; ahora es una regla de medios. Quien pidió menos movimiento
ve el contenido de una aunque el JavaScript nunca cargue, que es un caso que la
versión con framer no cubría.

**La galería ganó las cuatro cosas.** Trampa de foco que consulta el DOM en
cada pulsación —así un control nuevo entra solo—; deslizar con umbral de 50 px;
bloqueo de scroll con `position: fixed` y `top` negativo, que es lo que sí
detiene a Safari de iPhone; y precarga de la foto siguiente.

Dos detalles que el plan no anticipó y que importan:

- **La precarga se monta en el DOM, no con `new Image()`.** `<Foto>` emite un
  `<picture>`: pedirla a mano habría bajado el JPG original, el archivo más
  pesado de todos, justo lo contrario de lo que se buscaba. Montada de verdad,
  el navegador negocia AVIF o WebP igual que con la visible.
- **La precarga respeta «ahorro de datos».** Con `saveData` activo o en una red
  2G no se precarga nada. Son datos que se gastan por una foto que quizá nadie
  mire, y el pedido explícito acá era no gastar datos móviles de más.

**La devolución del foco se movió a la limpieza del efecto.** Antes `cerrar()`
enfocaba la miniatura de una. Con el `body` en `position: fixed` eso mandaba la
página a otro lado: ahora la limpieza restaura el scroll primero y recién
después enfoca, con `preventScroll`.

**Tres configuraciones de servidor en `deploy/`**, más un README con el número
que importa y cómo comprobarlo con `curl`. La recomendación es Caddy.

### Lo que costó

| | Antes | Ahora |
|---|---|---|
| JavaScript crudo | 697 KB | 596 KB |
| JavaScript comprimido (gzip) | 210 KB | 172 KB |
| Primera visita a la portada (Brotli) | — | **226 KB** |

Ese total se reparte en 149 KB de JavaScript, 60 KB de fuentes, 10.6 KB de
HTML y 7 KB de CSS, más las fotos de cada ficha.

**La comparación de arriba está medida con dos varas y hay que decirlo.** El
«antes» es gzip porque es lo que medí primero; el «ahora» en Brotli da 149 KB.
Contra gzip y gzip, quitar framer-motion ahorró 38 KB —un 18%—, no los 180 KB
que sugería el plan. Ese número era el peso de la librería entera y no todo
viajaba: el resto es React, que sigue ahí. El ahorro es real pero es la mitad
de lo que anuncié.

**El JavaScript sigue siendo el 66% de la visita.** 149 KB de los 226, en un
sitio cuya interacción es un visor de fotos. Lo que queda es React y la carga
de hidratación de App Router, y sacarlos no es una optimización sino cambiar de
herramienta. No se hizo y no creo que valga la pena por ahora, pero conviene
que esté escrito: la próxima ganancia grande de este sitio no está en el
código, está en no usar React para servir folletos.

### Lo que quedó sin verificar

La aparición al hacer scroll y el visor de fotos **no se probaron en un
navegador de verdad**: la extensión de Chrome no está conectada y el Chromium
de Playwright no está instalado en la máquina. Lo que sí está comprobado es que
las piezas llegaron al build y en el orden correcto:

- `[data-reveal]{opacity:0}` está en el CSS publicado, y
  `[data-reveal=visible]{opacity:1}` viene **después**, así que gana.
- La regla de `prefers-reduced-motion` viene última de las tres.
- El `<noscript>` que fuerza `opacity: 1` sigue en el HTML.
- El `rootMargin` del observador está en el bundle publicado.
- Las 24 marcas `data-reveal` y sus `transition-delay` están en la portada.

Falta abrir la página y mirar. Es lo primero que hay que hacer antes de
publicar: si el observador fallara, el contenido quedaría invisible, y esa es
la única forma en que este cambio puede salir mal.


---

## 16. Que el código se lea (31 de agosto)

### Qué pasa hoy

El código está mejor comentado que el promedio: los comentarios explican *por
qué*, no *qué*, y los tipos vienen documentados. Eso no es lo que hay que
arreglar. Lo que cuesta leer es otra cosa, y son siete puntos concretos.

**1. `ARQUITECTURA.md` miente, y es el mapa.** Es el primer archivo que abre
quien llega, y lo que dice ya no es cierto:

| Dice | Es |
|---|---|
| `home/hero.tsx` | `home/portada.tsx` |
| `ui/` tiene 2 archivos | Tiene 6 —faltan `foto`, `estrellas`, `espacio-pendiente`, `observador-reveal`— |
| `home/` tiene 3 archivos | Tiene 5 —faltan `carrusel-centenario`, `puntos-video`— |
| `lib/` tiene `imagen-tamanos` | También tiene `imagen-variantes` |
| No existen `scripts/` ni `deploy/` | Existen, con seis archivos entre los dos |
| Para regenerar tamaños, un bloque de `sips` de doce líneas | `pnpm build:imagenes` |
| Publicar: arrastrar `out/` a `app.netlify.com/drop` | Netlify ya no existe para este proyecto |

Un mapa equivocado es peor que no tener mapa: quien busca `hero.tsx` no lo
encuentra y no sabe si se renombró, se borró, o está mirando mal.

**2. `HotelPage` es una función de 417 líneas.** De la 85 a la 502, todo el
JSX de la ficha en línea: galería, cabecera, descripción, tabla de tarifas,
reservas y «otros hoteles». Tiene secciones claras —hay `<h2>` que las
separan— pero ninguna tiene nombre, así que para cambiar la tabla de tarifas
hay que barrer el archivo buscando dónde empieza.

**3. `galeria.tsx` tiene 432 líneas y hace dos cosas.** El mosaico de la ficha
y el visor a pantalla completa. El visor se llevó además toda la lógica de
teclado, trampa de foco, bloqueo de scroll y precarga que se agregó hoy. Son
dos componentes con ciclos de vida distintos conviviendo en un archivo.

**4. `Spec` está definido dos veces**, en `hotel-card.tsx` y en la ficha, con
el mismo nombre, la misma idea y diferencias que no son intencionales: uno
recibe `icon` y el otro `icono`, uno usa `gap-2` y el otro `gap-2.5`, y el
`text-sm` está en distinto elemento. Dos cosas casi iguales con el mismo
nombre es peor que dos cosas distintas: quien edita una cree que arregló las
dos.

**5. `icon` es la única palabra en inglés del código.** Todo lo demás está en
castellano —`icono`, `hoteles`, `costoEstadia`, `anchoNativo`—. Una sola
excepción obliga a recordar cuál era.

**6. `Foto` es dos cosas en el mismo archivo.** `galeria.tsx` importa el
componente `Foto` y en la línea siguiente exporta `type Foto`. TypeScript lo
permite porque valores y tipos viven en espacios separados, pero al leer
`fotos: Foto[]` hay que saber esa regla para no pensar que es un arreglo de
componentes.

**7. Los iconos están a medias.** Once viven en `ui/iconos.tsx`; tres andan
sueltos: `Flecha` e `IconoFotos` en `galeria.tsx`, `Check` en la ficha. La
regla existe pero no se aplicó entera, y eso es peor que no tener regla,
porque el próximo icono se agrega donde caiga.

### Cómo se hace

1. **Reescribir `ARQUITECTURA.md` desde el árbol real**, incluidos `scripts/`
   y `deploy/`, con los comandos que existen hoy y la publicación a servidor
   propio.
2. **Partir `HotelPage` en las secciones que ya tiene**, como componentes con
   nombre en `components/hoteles/`. El `page.tsx` queda ensamblando, igual que
   hace la portada — que es el patrón que el propio `ARQUITECTURA.md` declara
   y que la ficha nunca siguió.
3. **Separar `galeria.tsx`** en el mosaico y el visor.
4. **Un solo `Spec`**, en `ui/`, con prop `icono`.
5. **Mover `Flecha`, `IconoFotos` y `Check`** a `ui/iconos.tsx`.
6. **Renombrar el tipo `Foto`** y llevarlo a `lib/datos/tipos.ts`, que es
   donde viven las formas de los datos.

### Cómo se verifica

| Qué | Pasa si |
|---|---|
| Nada se rompió | `pnpm typecheck`, `pnpm lint` y `pnpm build` limpios, 15 páginas |
| El HTML es el mismo | El `out/` de antes y el de después no difieren salvo en los hashes de los bundles |
| El mapa es cierto | Cada archivo que `ARQUITECTURA.md` nombra existe, y cada archivo de `src/` está nombrado |
| No quedó `Spec` duplicado | `grep -rn "function Spec" src/` devuelve una sola línea |

La segunda es la que de verdad prueba que un refactor no cambió nada, y es
barata: se guarda el `out/` actual antes de empezar y se compara al final.

### Las contras

**Partir archivos puede empeorar la lectura, no mejorarla.** Una función de
417 líneas que se lee de arriba abajo a veces es más fácil que cinco archivos
entre los que hay que saltar. El corte solo vale si sigue las divisiones que
la página ya tiene —las que marcan los `<h2>`— y no unas inventadas para que
los archivos queden parejos. Si al final hay que abrir cuatro archivos para
entender una pantalla, salió mal.

**Es churn sobre un proyecto que todavía se está rediseñando.** Es la misma
tensión de la sección 12: mover código que aún se mueve genera conflictos y
diffs grandes sin agregar nada visible. Lo que lo justifica es que la ficha ya
está estable —no cambia desde el 26 de agosto— y que el mapa equivocado cuesta
en cada sesión.

**Y esto se hace sin una sola prueba.** Toda la verificación es `typecheck`,
`lint` y mirar. Un refactor de este tamaño es exactamente el momento donde una
suite de pruebas paga sola, y la sección 12 sigue sin hacerse. La comparación
del `out/` es un sustituto pobre pero real: detecta cambios en el HTML
generado, que es lo que ve el visitante. No detecta que la trampa de foco dejó
de funcionar.

**Renombrar el tipo `Foto` toca todo lo que lo consume.** Es el cambio con más
superficie y el de menos beneficio visible. Se hace igual porque el costo es
de una vez y la confusión es permanente.


### Qué se hizo — 31 de agosto

Los siete puntos. Un archivo más de lo previsto, un cambio visual mínimo que
no estaba en el plan, y la verificación salió mejor de lo que esperaba.

**El mapa vuelve a ser cierto.** `ARQUITECTURA.md` se reescribió desde el árbol
real y ahora se comprueba sola: de los 39 archivos de `src/`, `scripts/` y
`deploy/`, los 39 están nombrados, y el único nombre que menciona sin que
exista es `hero.tsx`, dentro de la nota que explica por qué el mapa se había
roto. Se le agregó arriba el aviso de mantenerlo.

**La ficha pasó de 474 líneas a 120.** Se partió en las secciones que ya tenía:

| Archivo | Líneas |
|---|---|
| `encabezado-hotel.tsx` | 158 |
| `tabla-tarifas.tsx` | 111 |
| `panel-reservas.tsx` | 106 |
| `otros-hoteles.tsx` | 60 |
| `page.tsx` (ensambla) | 120 |

El corte siguió los `<h2>` que la página ya usaba, no divisiones inventadas
para emparejar tamaños. `page.tsx` ahora se lee de un vistazo.

**La galería se partió en dos.** `galeria.tsx` (176) es el mosaico; el visor a
pantalla completa se fue a `visor-fotos.tsx` (292) con todo lo suyo: teclado,
trampa de foco, bloqueo de scroll, gestos y precarga.

**Un archivo que el plan no mencionaba: `ui/spec.tsx`.** Estaba planeado
unificar los dos `Spec`, pero no que el resultado viviera en `ui/`. Ahí
corresponde: no tiene nada de hoteles.

**La diferencia entre los dos `Spec` ahora tiene nombre.** Eran casi iguales
—`gap-2` contra `gap-2.5`, y el `text-sm` en distinto elemento— sin que nada
dijera si era a propósito. En vez de elegir uno y perder el otro, la
diferencia es una prop: `denso`, que usa la parrilla.

**`nivelDe` se fue a `calculos.ts`.** Era un `Map` suelto en la ficha. Ahora
está al lado del resto de lo que se deriva de los datos, y lo usan dos
componentes.

**El tipo repetido resultó estar tres veces, no dos.** El plan hablaba del
choque entre `type Foto` y el componente `Foto` dentro de `galeria.tsx`. Al
buscar consumidores apareció que `Hotel.imagenes` declaraba la misma forma sin
nombre. Ahora es `Imagen` en `tipos.ts`, usada en los tres lugares. Se llama
`Imagen` y no `Foto` justamente para no volver a pisar al componente.

**Los tres iconos sueltos se mudaron a `ui/iconos.tsx`.** `Flecha` se llama
ahora `FlechaSerie`, y el comentario de `FlechaIzquierda` —que ya explicaba
por qué son dos iconos distintos y no uno con una prop— se actualizó para
apuntar a su vecina en vez de a otro archivo.

**`CLAUDE.md` ganó una sección de reglas técnicas** con lo que un agente no
puede adivinar: que no se usa `next/image`, que no hay librería de animación,
que `/comision` no se publica, que los iconos van todos en un archivo y que el
sitio ya no está en Netlify. También se corrigió el bloque de verificación:
decía `npx serve`, que en esta máquina falla sin dar error.

### Que no cambió nada: la comprobación

Se guardó el `out/` de antes y se comparó contra el de después. El `diff` a
secas no sirve —cambian los hashes de los bundles y con ellos todo el HTML—,
así que se comparó normalizando: sin `<script>`, sin comentarios, sin
etiquetas, con los espacios colapsados.

**El texto visible es idéntico en las 13 páginas.** Los atributos `alt`,
`aria-label`, `aria-modal` y `href` tampoco cambiaron: mismo conjunto, mismas
cantidades.

Las diferencias que quedan en el HTML son tres, y ninguna se ve:

1. **Orden de clases**: `gap-2.5 text-graphite` pasó a `text-graphite gap-2.5`.
2. **Espaciado del JSX**: `{" "}` seguido de `— texto` se escribió como
   `" — texto"`. Renderiza igual; cambia dónde caen los separadores de React.
3. **Un `<span>` de más por cada `Spec` de la parrilla**, con el `text-sm` que
   antes iba en el `<li>`. Es el único cambio deliberado en el DOM, y es el
   precio de tener un solo componente en vez de dos casi iguales.

Verificado además: `pnpm typecheck`, `pnpm lint`, `pnpm build` (15 páginas) y
`pnpm audit`, todos limpios.

### Lo que quedó abierto

**Sigue sin haber una sola prueba.** Es lo que dije en las contras y no cambió:
la comparación del `out/` demuestra que el HTML generado es el mismo, y eso es
bastante, pero no demuestra que la trampa de foco siga atrapando ni que el
visor siga cerrando con Escape. Eso vive en JavaScript que ninguna comparación
de HTML toca. Es la sección 12, que ya lleva dos secciones citándose sin
hacerse.

**Y sigue sin abrirse en un navegador**, por lo mismo de la sección 15: la
extensión de Chrome no está conectada y el Chromium de Playwright no está
instalado.



### Verificado en navegador — 2 de septiembre

Las secciones 15 y 16 quedaron cerradas sin abrir la página. Se instaló el Chromium de
Playwright y se comprobó todo lo que estaba en duda. **Nada falló.**

**La aparición al hacer scroll**: 11 de 11 bloques pasan a opacidad 1, tanto a 1440 como a
390. El estado inicial en 0 es correcto —son todos bloques bajo el pliegue— y el observador
los va marcando al entrar.

**El visor de fotos**, medido paso a paso a partir de `scrollY = 399`:

| Qué | Resultado |
|---|---|
| Abre con `aria-modal="true"` | sí |
| Bloqueo de scroll | `body` en `position: fixed`, `top: -399px` — coincide con el scroll |
| Foco inicial | en «Volver», dentro del diálogo |
| Trampa de foco | 5 pulsaciones reales de Tab sobre 3 elementos: el foco nunca sale |
| Flechas | `ArrowRight` pasa de «1 / 9» a «2 / 9» |
| Escape | cierra |
| Al salir | `body` vuelve a `static`, `scrollY` vuelve a 399 |
| Devolución del foco | vuelve a la miniatura, con su `aria-label` |

**El contraste de la sección 15 de la crítica, medido en vivo**: el degradado renderiza
`color(srgb 0.0970588 0.290392 0.481373)` —o sea `#194a7b`— y el texto `rgb(176, 168, 146)`,
que es `mute-invert`. Da **3.84:1** contra el 4.5:1 que pide AA. Confirmado sobre la página,
no solo calculado.

**Dos cosas que aprendimos verificando:**

1. **Una captura `--full-page` sin scroll previo sale con franjas en blanco.** Lo que nunca
   entró al viewport sigue en opacidad 0 y se fotografía invisible. Anotado en `CLAUDE.md`.
2. **Un scroll de más de 400ms por paso le gana al observador.** Recorriendo la página a
   120ms por salto quedaron 3 de 11 revelados, y eso se confunde fácil con un bug del sitio.
   No lo es.

**Un dato para la sección de la comparación**: a 390 px la portada mide **10 590 px de
alto**. Comparar el primer hotel con el último son unos 8 000 px de scroll, y el sitio se
reparte por WhatsApp. Es el argumento más concreto a favor de resolver la comparación.


---

## 17. Llegaron las fotos del Centenario (11 de septiembre)

- [x] Copiar las cinco piezas con texto a `public/centenario/`
- [x] Sumar `public/centenario` al optimizador y generar las variantes
- [x] Cambiar los seis huecos por las cinco fotos reales
- [x] Ajustar los keyframes de seis pasos a cinco
- [x] Resolver la proporción: la pieza es 2,71:1 y la caja en móvil es 4:3
- [x] Verificar en el navegador, escritorio y móvil
- [x] Que el mouse encima ya no la pare, y que se pare sola fuera de pantalla

### Qué pasa hoy

El carrusel de §9 quedó a tamaño de banda, con seis `EspacioPendiente` y el
pase discreto ya funcionando. Lo único que faltaba eran las fotos. Llegaron.

### Qué llegó, exactamente

Diez archivos en `~/Downloads/Fotos Página Hospedaje Centenario`, pero no son
diez fotos: son **cinco fotos, cada una en dos versiones**.

| Con texto | Sin texto | Foto | Titular quemado en la imagen |
|---|---|---|---|
| `-1 copy` | `-10 copy` | Mujer de espaldas en el aeropuerto | ORGANIZÁ TU VIAJE |
| `-3` | `-8 copy` | Pareja mayor caminando con maleta | VEN A RECORDAR DONDE SE CONOCIERON |
| `-2` | `-9 copy` | Graduación, birrete y borla | VEN A RECORDAR ESE DÍA ESPECIAL |
| `-4` | `-7 copy` | Recepción de hotel, tres huéspedes | VEN A LOS MEJORES HOTELES EN ALAJUELA |
| `-5` | `-6 copy` | Brindis con copas y confeti dorado | ESTE BRINDIS TE ESTA ESPERANDO |

Las cinco comparten el bajante «¡VEN A CELEBRAR EL CENTENARIO!» y el panel
azul de la derecha con el logo. Todas miden **1999×737**, o sea **2,71:1**.

Las versiones «sin texto» no son la foto limpia: son la misma composición con
la caja azul **vacía**, que se lee como un error de exportación, no como un
recurso. No se usan. Van las cinco con texto.

### Cómo se hace

1. Copiar las cinco con texto a `public/centenario/01.jpg` … `05.jpg`, en
   orden narrativo: viaje, reencuentro, recuerdo, hospedaje, brindis.
2. Sumar `public/centenario` a `ORIGEN` en `scripts/optimizar-imagenes.mjs` y
   correr `pnpm build:imagenes`. Sin eso, `<Foto>` no encuentra variantes y
   sirve el JPG de 1999 px a todo el mundo, que es exactamente lo que §13 vino
   a arreglar.
3. En `carrusel-centenario.tsx`, cambiar `CUPOS` —seis números— por la lista
   real de cinco banners con su `alt`, y `EspacioPendiente` por `<Foto>`.
4. En `globals.css`, rehacer los keyframes: eran seis pasos sobre doce
   diapositivas (una = 8,3333 %); pasan a cinco pasos sobre diez (una = 10 %).
   La tanda sigue terminando en `-50%`. La duración baja de 42 s a 35 s para
   que cada foto se quede los mismos ~5,6 s de antes.
5. **La proporción, que es el punto que obliga a decidir.** La caja de la
   diapositiva es hoy `aspect-4/3` en móvil, `sm:aspect-16/9` y
   `lg:aspect-21/8`. La pieza es 2,71:1:
   - En `lg`, 21/8 = 2,625. Casi idéntico: el recorte es de un par de píxeles.
   - En `sm`, 16/9 = 1,78. Recorta un 34 % del ancho.
   - En móvil, 4/3 = 1,33. Recorta más de la mitad.

   Con `object-position` centrado, ese recorte se come el panel del titular,
   que es donde está todo el mensaje. La salida es anclar a la derecha
   —`object-right`— hasta `lg`, y bajar la caja de móvil a 2:1: a 390 px la
   banda queda de 195 px de alto y el titular mide unos 16 px, que se lee sin
   acercar. Se pierde la mitad izquierda de la foto y se gana el mensaje; en
   una pieza cuyo texto está quemado en el pixel, ese es el intercambio
   correcto. `max-h-[56svh]` se queda: es la decisión de §9 para que la banda
   no se coma el pliegue.
6. Sacar del carrusel la rama de `medios.portada`. Ver las contras.

### Cómo se verifica

En `localhost`: que las cinco piezas pasen en orden, que el salto de la quinta
a la primera no se note, que el mouse encima lo pare y al salir siga, y que
`<picture>` esté sirviendo AVIF y no el JPG. En un viewport de 390 px, que el
titular se lea sin acercar. Con `prefers-reduced-motion` activo, que no se
mueva nada y se pueda pasar de a una foto.

### Las contras

- **Son cinco, no seis.** No hay una sexta pieza. Si aparece, entra en la
  lista, pero **hay que tocar los keyframes también**: el paso está escrito a
  mano para cinco. Es el mismo acoplamiento que ya tenía §9 con seis, no uno
  nuevo, pero ahora que las fotos son reales conviene dejarlo dicho.
- **`medios.portada` sale del carrusel.** §9 había fusionado la banda de
  portada con el carrusel: si algún día llegaba `portada.jpg`, entraba como
  primera diapositiva. Con cinco fotos reales esa rama se vuelve una trampa —
  cargar la portada haría seis diapositivas contra unos keyframes escritos
  para cinco, y la cinta se desfasaría sin avisar—. Se saca la rama. Queda
  pendiente decidir qué pasa con `medios.portada` cuando llegue: o vuelve como
  primera pieza y se rehacen los keyframes, o el campo se retira del contrato
  de datos.
- **El texto está quemado en el pixel.** No se corrige, no se traduce, no se
  reescala aparte de la foto y no lo lee un lector de pantalla — por eso el
  titular se repite en el `alt` de cada imagen. Cualquier cambio de copy es un
  pedido a quien diseñó las piezas.
- **Hay una falta de ortografía adentro de una imagen.** La quinta dice «ESTE
  BRINDIS TE **ESTA** ESPERANDO», sin tilde. No se arregla desde acá.
- **El registro no es parejo.** La primera vosea —«ORGANIZÁ»—; las otras
  cuatro tutean —«VEN»—. Las dos formas son normales en Costa Rica, pero
  mezcladas en la misma banda se notan.
- **El bajante se repite cinco veces.** «¡VEN A CELEBRAR EL CENTENARIO!» en
  las cinco piezas. Como firma de un slider funciona; cinco veces seguidas
  puede leerse como insistencia.
- **En móvil se ve media foto.** El anclaje a la derecha es una decisión a
  favor del texto y en contra de la imagen. Si se prefiere lo contrario, el
  cambio es una palabra —`object-right` a `object-center`— y el titular queda
  cortado.

### Qué se hizo — 11 de septiembre

Lo del plan, más dos cambios que salieron de mirarlo en pantalla.

**Uno: la proporción de la caja.** El plan decía dejar `lg:aspect-21/8` porque
2,625 y 2,712 casi no se distinguen. En pantalla sí se distinguen, y no por el
21/8 sino por el `max-h-[56svh]` que venía con él: entre los dos la banda
quedaba en 3,34:1 y le cortaban el logo de arriba y el piso de la foto. Estas
piezas no son fotos sueltas que toleren un recorte —son composiciones, con el
panel del titular y el logo pegados a los bordes—, así que de `sm` para arriba
la caja pasó a la proporción nativa, `aspect-[1999/737]`, y el `max-h` salió.

Eso contradice a §9, que había puesto ese `max-h` para que la banda no se
comiera el pliegue. Sigue siendo cierto: a 1470 px la banda mide 542 px de
alto. Es un cambio de criterio con la pieza real delante, no un descuido — y
si molesta, el `max-h` vuelve en una línea, a cambio del recorte.

**Dos: la resolución.** El optimizador tenía tres anchos, con tope en 1600. La
pieza mide 1999 y va a ancho completo, así que en cualquier pantalla retina el
1600 se ampliaba y el titular quedaba blando. Se agregó un cuarto escalón,
1999, que solo alcanza a estas cinco: el script nunca amplía y la foto de hotel
más grande que hay es de 1600.

De paso, el `sizes` de la diapositiva dejó de ser `100vw` a secas. Abajo de
`sm` la caja es 2:1 y la pieza 2,712:1, así que `object-cover` la dibuja a
2,712 × el alto de la caja —529 px de imagen dentro de una caja de 390—, y
declarar `100vw` hacía que el navegador eligiera la variante de 400 px. Ahora
dice `(max-width: 639px) 136vw, 100vw`.

**Tres: cuándo se para, que se rehízo entero.** Hasta hoy el único freno era
el mouse encima. El pedido fue sacarlo, y tiene razón de ser: el cursor queda
quieto sobre la banda todo el tiempo sin que nadie lo haya querido —se lee lo
que está debajo y el mouse se olvida arriba—, y desde afuera eso se ve como un
carrusel roto. A cambio entró algo mejor: **fuera de pantalla se para sola**.
Animar lo que nadie mira gasta cuadros y batería, y evita que quien vuelve a
subir se encuentre la banda en una pieza al azar.

Eso no se puede hacer con CSS solo, así que apareció
`ui/observador-en-vista.tsx`: un `IntersectionObserver` montado una vez en el
layout, con la misma forma que el de reveal, que escribe `data-en-vista` en el
visor. La diferencia con reveal es que este no deja de observar — reveal marca
«ya se vio» y se desentiende, acá el estado va y viene.

Falla abierto a propósito: el servidor dibuja `data-en-vista="si"` y el
observador solo lo cambia a `"no"`. Si el JavaScript nunca llega, la banda anda
siempre, como antes. Al revés —arrancar en `"no"`— una falla la dejaría
congelada en la primera foto sin que nadie supiera por qué.

Se mantuvo la pausa por `:focus-within`. No molesta a nadie con mouse y deja en
pie una forma real de detenerla, que es lo que pide WCAG 2.2.2 para cualquier
cosa que se mueva sola más de cinco segundos. Vale decirlo claro igual: con el
hover afuera, un usuario con mouse ya no tiene cómo parar la banda. Si eso
pesa, la salida no es devolver el hover sino un botón de pausa de verdad — que
§9 ya había probado y sacado.

La duración bajó de 42 s a 35 s, pero no es que vaya más rápido: son cinco
diapositivas en vez de seis, y cada una se sigue quedando los mismos ~5,6 s.

**Cuatro: la calidad de compresión, aparte del resto de las fotos.** El
optimizador comprimía todo igual, AVIF a q50. Sirve para una foto de hotel:
lo que se pierde es detalle en una pared lisa y nadie lo nota. No sirve para
estas cinco, que son las únicas con **texto quemado en el pixel**: a q50 las
letras agarran el halo típico de la compresión con pérdida alrededor del
contorno, y ahí sí se ve, porque el ojo sabe qué forma tendría que tener una A.

Se agregó `CALIDAD_POR_CARPETA` al script: `public/centenario` va a q72 AVIF y
q88 WebP. La variante de 1999 px pasa de 42 a 83 KB —y las cinco juntas, de
~200 KB a ~436 KB— sobre originales de 690 KB. Son las cinco imágenes de la
primera pantalla del sitio; el presupuesto está bien gastado. La clave es el
prefijo de carpeta, no el archivo: una pieza nueva ahí adentro hereda la
calidad sin tocar nada.

**El techo que queda, y no es de código.** El archivo original mide 1999 px de
ancho. La banda va a ancho completo, así que en un portátil retina de 1470 px
el navegador necesita 2940 px reales y solo tenemos 1999: la imagen se amplía
un 47 %, y ninguna calidad de compresión lo arregla — no se puede comprimir
detalle que el archivo nunca tuvo. Para que estas piezas se vean de verdad
nítidas en pantalla retina hace falta pedirle a diseño la exportación a ~4000
px de ancho. Es un pedido de una línea y es lo único que mueve la aguja de acá
en adelante.

**Cinco: se sacó el rótulo «Galería del Centenario».** Era el pie de la banda.
Tenía sentido mientras la banda eran seis huecos grises y había que explicar
qué iba a ir ahí; con las piezas reales adentro repetía en texto chico —y en
oro sobre marino— lo que cada imagen ya dice en grande, con su propio titular y
el logo de UNADECA quemados. Dos marcas de lo mismo, una arriba de la otra.

### Verificado en navegador — 11 de septiembre

En `localhost:3001`, ventana de 1470×808 y `devicePixelRatio` 2:

- Diez diapositivas en el DOM (cinco, dos veces), ciclo de 35 s.
- La caja mide 1470×542, proporción 2,712 — idéntica a la nativa, sin recorte.
- Se sirve `01-1999.avif`, no el JPG ni el escalón de 1600.
- La página no gana scroll horizontal, que es el riesgo de `w-screen`.
- Forzando `data-en-vista="no"` el pase pasa a `paused`; con `"si"` vuelve a
  `running`. Con el foco de teclado adentro, `paused`. **No hay ninguna regla
  que pause por `:hover`** — se comprobó listando los selectores que tocan
  `animation-play-state`, y el único que existe es
  `.carrusel-viewport[data-en-vista="no"] .carrusel-cinta,
  .carrusel-viewport:focus-within .carrusel-cinta`.
- En un viewport de 390 px: banda de 390×195, anclada a la derecha
  (`object-position: 100% 50%`), y con el `sizes` corregido baja la variante de
  1999 en vez de la de 400.

Una advertencia para la próxima medición: **Chrome frena las animaciones CSS en
pestañas de segundo plano**. Con la ventana atrás, `animationPlayState` se lee
`paused` y el `transform` no avanza, aunque no haya ninguna regla que lo pause.
La primera lectura de este cambio dio exactamente eso y parecía un bug; lo que
lo desarmó fue mirar `document.hidden`, que estaba en `true`. Conviene
comprobar ese valor antes de creerle a una medición de animación.

### Lo que quedó abierto

- Las tres cosas del diseño que no se arreglan desde el código: la tilde de
  «ESTÁ» en la quinta pieza, el voseo de la primera contra el tuteo de las
  otras cuatro, y si el bajante repetido cinco veces es lo buscado.
- Qué pasa con `medios.portada` si algún día llega el archivo. Hoy el campo
  sigue en el contrato de datos y no lo usa nadie.
- La copia vieja del proyecto en `~/Documents/Desarrollo/hoteles-promo` se
  mandó a la papelera el 11 de septiembre. Tenía un solo commit —«Initial
  commit from Create Next App»—, la paleta crema anterior al 26 de agosto y
  todo el trabajo sin commitear; se confirmó que su `MEJORAS.md` (887 líneas)
  era un subconjunto del de acá (2357) antes de moverla.

## Contactos

| Hotel | Contacto |
|---|---|
| Hilton Garden Inn | `SJOAC_Reservations@hilton.com` · 4052-2300 ext. 2301 |
| Hilton Garden Inn — eventos | `SJOAC-Events@hilton.com` |
| Courtyard y Fairfield | Melany Ramirez · `melany.ramirez@marriott.com` · (506) 8617-5974 |
| Reservas Marriott | `reservationscr@marriott.com` |
| Consultas UNADECA | `hospedaje@unadeca.net` · +506 6331 6083 |
