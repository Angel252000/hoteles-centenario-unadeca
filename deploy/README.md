# Publicar en servidor propio

El sitio es HTML estático: `pnpm build` deja todo listo en `out/` y no hace
falta Node ni nada corriendo en el servidor. Solo un servidor web sirviendo
archivos.

## Lo único que no se puede omitir

**Compresión.** Netlify la hacía sola; un servidor recién instalado, no. La
diferencia medida sobre este sitio:

| | Sin comprimir | Con Brotli |
|---|---|---|
| Portada (`index.html`) | 189 KB | **10.8 KB** |
| JavaScript de la portada | 595 KB | **~150 KB** |

Diecisiete veces más datos en el HTML, y la pantalla se ve idéntica: por eso
es el error que nadie nota. `pnpm build` ya deja escritos los `.br` y `.gz` al
lado de cada archivo (`scripts/precomprimir.mjs`); las tres configuraciones de
acá los sirven tal cual, sin gastar CPU por visita.

## Cuál elegir

**Caddy**, si no hay una razón para otra cosa. Saca el certificado de HTTPS y
lo renueva sin que nadie configure nada, que es exactamente donde se rompen
estos sitios a los dos años. El archivo son quince líneas.

**nginx** si ya hay uno andando y otros sitios en la misma máquina.

**Apache** solo si el hosting no deja elegir. Es el único de los tres donde
servir un archivo precomprimido necesita reglas de reescritura a mano.

En cuanto el servidor esté decidido, **borrar las otras dos configuraciones**.
Una configuración que nadie usa tampoco se prueba, y a los seis meses nadie
sabe si funciona.

## Cómo subir

Cualquier forma de copiar `out/` al servidor sirve. La más simple:

```sh
pnpm build
rsync -avz --delete out/ usuario@servidor:/var/www/hoteles/
```

`--delete` es intencional: sin él quedan archivos viejos de builds anteriores
sirviéndose para siempre. Con él, lo que hay en el servidor es exactamente lo
que salió del último build.

## Después de publicar, verificar

```sh
# Las cabeceras están puestas
curl -sI https://SITIO/ | sort

# Se está sirviendo Brotli, no el archivo crudo
curl -sI -H 'Accept-Encoding: br' https://SITIO/ | grep -i content-encoding
```

La segunda es la que importa. Si no dice `content-encoding: br`, la
compresión no está funcionando y el sitio está gastando diecisiete veces más
datos de los que debería.
