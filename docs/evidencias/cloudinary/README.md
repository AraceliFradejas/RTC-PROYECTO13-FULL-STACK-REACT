# Subida de fotografías · 4 de octubre de 2026

La cuenta administradora accede a Gestionar fotografías desde Team, busca una unidad y abre su ficha. React muestra la vista previa antes de enviar el archivo al backend como `multipart/form-data`.

- [Vista previa en Safari](01-vista-previa-safari.png).
- [Confirmación del guardado en Safari](02-guardado-safari.png).
- [Informe de la integración real](verificacion.json): diez casos correctos. La base y las dos imágenes de prueba se eliminaron al terminar.

La revisión en Safari utiliza el Porsche 911 Carrera de Barcelona (`lux-porsche-911-carrera-barcelona`) y el archivo `collection-porsche-911-carrera-1.jpg`, que ya estaba asignado a esa unidad en la biblioteca. Su licencia y atribución siguen en los créditos. Se subió y se volvió a guardar para comprobar la confirmación; la segunda subida sustituye a la primera. Queda una imagen asociada a esta unidad en Cloudinary.

El informe automático valida la API, Atlas y Cloudinary; las capturas muestran el recorrido de React en Safari de escritorio. La distribución del formulario vacío también se ha revisado en Safari con la ficha real dentro de un marco de anchura controlada: [320 px](03-formulario-320-safari.png), [390 px](04-formulario-390-safari.png), [768 px](05-formulario-768-safari.png) y [1440 px](06-formulario-1440-safari.png). El marco de 1440 px se muestra reducido para encajar en la ventana, conservando su anchura de contenido. El archivo auxiliar de revisión se eliminó al terminar. Estas capturas corresponden al formulario vacío en Safari de escritorio; la vista previa se documenta por separado y no se presenta como una subida desde móvil.

Para repetir la integración, con `backend/.env` configurado:

```sh
RUN_CLOUDINARY_TESTS=true node --test backend/test/images.integration.test.js
```

La prueba genera datos temporales y los elimina al terminar. Añadir `SAVE_CLOUDINARY_EVIDENCE=true` actualiza el informe. No usa la cuenta administradora personal ni modifica el inventario existente.

## Subida publicada en Vercel · 10 de octubre

He subido desde Safari la fotografía ya asignada al Porsche 911 Carrera de Madrid. React envía el archivo por el proxy de Vercel a la API, que lo guarda en Cloudinary y registra su URL e identificador en Atlas. Se conservan su licencia y atribución en los créditos.

La conexión directa al dominio de Cloudinary fallaba desde este equipo. La ficha y las tarjetas utilizan ahora nuestra API para recuperar la imagen guardada. La API construye un destino fijo de Cloudinary, limita tamaño y formato y permite una caché de cinco minutos. La URL original sigue en Atlas para mantener la integración disponible en la siguiente fase.

- [Vista previa publicada](07-vista-previa-vercel-safari.png).
- [Confirmación del guardado](08-guardado-vercel-safari.png): antes de corregir la entrega de la imagen.
- [Fotografía visible tras la corrección](09-imagen-publicada-vercel-safari.png).
- [Verificación de Vercel y Atlas](verificacion-vercel.json): entrega HTTP 200, JPEG de 223.852 bytes y fotografía visible en Safari.

La subida requiere sesión administradora; la lectura es pública, igual que el catálogo. No se aceptan URLs arbitrarias como destino. Las capturas corresponden a Safari de escritorio y no acreditan el uso desde dispositivos físicos.

### English

The Madrid Porsche 911 photograph was uploaded through the published React application, Vercel, Cloudinary and Atlas. Direct CDN requests failed on this computer, so catalogue images now use our API’s bounded image delivery route. The image is visible in Safari and the route returns HTTP 200 with a JPEG. Original attribution and the Cloudinary URL are retained. These screenshots document desktop Safari, not uploads from a physical phone.
