# Subida de fotografías · 4 de octubre de 2026

La cuenta administradora accede a Gestionar fotografías desde Team, busca una unidad y abre su ficha. React muestra la vista previa antes de enviar el archivo al backend como `multipart/form-data`.

- [Vista previa en Safari](01-vista-previa-safari.png).
- [Confirmación del guardado en Safari](02-guardado-safari.png).
- [Informe de la integración real](verificacion.json): diez casos correctos. La base y las dos imágenes de prueba se eliminaron al terminar.

La revisión en Safari utiliza el Porsche 911 Carrera de Barcelona (`lux-porsche-911-carrera-barcelona`) y el archivo `collection-porsche-911-carrera-1.jpg`, que ya estaba asignado a esa unidad en la biblioteca. Su licencia y atribución siguen en los créditos. Se subió y se volvió a guardar para comprobar la confirmación; la segunda subida sustituye a la primera. Queda una imagen asociada a esta unidad en Cloudinary.

El informe automático valida la API, Atlas y Cloudinary; las capturas muestran el recorrido de React en Safari de escritorio. La distribución del formulario vacío también se ha revisado en Safari con la ficha real dentro de un marco de anchura controlada: [320 px](03-formulario-320-safari.png), [390 px](04-formulario-390-safari.png), [768 px](05-formulario-768-safari.png) y [1440 px](06-formulario-1440-safari.png). El marco de 1440 px se muestra reducido para encajar en la ventana, conservando su anchura de contenido. El archivo auxiliar de revisión se eliminó al terminar. Estas capturas no acreditan selección de archivos, vista previa ni errores en móvil; queda la revisión de esos estados y en un dispositivo real.

Para repetir la integración, con `backend/.env` configurado:

```sh
RUN_CLOUDINARY_TESTS=true node --test backend/test/images.integration.test.js
```

La prueba genera datos temporales y los elimina al terminar. Añadir `SAVE_CLOUDINARY_EVIDENCE=true` actualiza el informe. No usa la cuenta administradora personal ni modifica el inventario existente.
