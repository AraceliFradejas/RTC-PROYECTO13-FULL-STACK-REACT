# Primera revisión de idiomas · 10 de octubre de 2026

He añadido el selector ES/EN a la cabecera. La elección se conserva en el navegador, se comparte entre pestañas y actualiza el idioma del documento y su título. Los textos ingleses están separados en un archivo de traducciones; no se modifican los datos de Atlas.

La interfaz incorpora traducciones en navegación, portada, Servicios, Nuestra esencia, catálogo, fichas, sedes, créditos, acceso, citas y paneles privados. Los nombres propios, las direcciones, las licencias y los valores enviados a la API conservan su contenido original. La primera captura de cliente es anterior a la incorporación de comunicaciones inglesas.

## Comprobaciones realizadas

- En Safari: cambio a inglés en la portada y navegación a Servicios y Nuestra esencia.
- En el catálogo: Tesla y Electric muestran diez vehículos. Al pulsar Apply filters la URL conserva `fuel=Eléctrico`, que es el valor esperado por la API.
- Al recargar se mantiene el inglés y la selección del filtro.
- Acceso con la cuenta ficticia Cliente Demo Despliegue y cambio a castellano sin perder la sesión. Se ha cerrado la sesión al terminar.
- Portada inglesa en marcos de Safari de 320 y 390 px: cabecera, navegación, selector y llamada a la colección. No sustituye una prueba en teléfonos reales.
- Once pruebas del frontend y compilación correctas. Cinco pruebas comprueban preferencia, almacenamiento bloqueado, nombres propios y conservación del valor de motorización al traducir su etiqueta.

![Portada en inglés en marcos de 320 y 390 px](01-home-en-320-390-safari.png)

![Catálogo en inglés con Tesla y Electric](02-catalogo-en-safari.png)

![Cuenta ficticia de cliente en inglés](03-cliente-en-safari.png)

## Pendiente

Revisar el conjunto de errores y contenidos dinámicos, recorrer Team y talleres en ambos idiomas y completar formularios y dispositivos reales. Las tres primeras capturas corresponden a la revisión local contra Atlas. La captura siguiente corresponde a la web publicada.


## Comprobación en producción

Vercel ha publicado el commit `6d2f9b3` con estado Ready. En Safari he abierto [kelsets-cars.vercel.app](https://kelsets-cars.vercel.app), pulsado EN y comprobado la navegación inglesa y el hero The road is yours. El resto del recorrido publicado todavía necesita su revisión completa.

![Portada inglesa publicada en Vercel](04-home-en-vercel-safari.png)

## Comunicaciones bilingües

Las diez plantillas tienen versión inglesa. Los mensajes nuevos guardan ambas versiones; el historial anterior se traduce solo tras verificar su plantilla original. Nombres y motivos personales se conservan. La integración en Atlas temporal comprueba almacenamiento, selección de idioma y ausencia de metadatos privados en la respuesta. La base temporal se elimina al terminar.

Las siguientes capturas muestran la bienvenida inglesa generada localmente, sin nuevos envíos a Mailtrap. El logo y las diez imágenes exclusivas se mantienen. No sustituyen la revisión en Outlook, Gmail o dispositivos físicos.

![Bienvenida inglesa en Safari](05-bienvenida-email-en-safari.png)

![Footer inglés en Safari](06-footer-email-en-safari.png)
