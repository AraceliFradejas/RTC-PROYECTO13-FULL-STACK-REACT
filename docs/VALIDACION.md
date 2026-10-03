# Validación de la base inicial

## Conexión e importación en Atlas · 3 de octubre de 2026

Se ha comprobado la conexión local a Atlas mediante ping. La semilla se ha ejecutado dos veces: después de ambas ejecuciones hay 100 vehículos, 4 sedes y 100 claves de vehículo únicas, sin referencias de sede ausentes. El endpoint local `GET /api/v1/vehicles` devuelve HTTP 200, total 100, 12 resultados en la primera página y la sede relacionada incluida. Estas comprobaciones no acreditan todavía autenticación, citas ni despliegue. El inventario cargado es el CSV inicial; el Excel definitivo y su revisión siguen pendientes.

Comprobaciones locales del 3 de octubre de 2026: `npm run build` completado, `npm test` con **15 pruebas superadas** (8 backend, 3 horario de interfaz y 4 cliente HTTP) y `npm run seed:check` con **100 vehículos y 4 sedes relacionadas**. Atlas, Cloudinary y producción no se han validado todavía.

## Alcance de las comprobaciones

- Contratos: rechazo de roles arbitrarios y entradas de cita no válidas.
- API: salud sin base de datos y rechazo de escritura desde un origen no permitido.
- Cliente compartido: serialización, errores, cancelación y transporte de archivos.
- Citas: límites de fecha y conversión del horario de Madrid en verano e invierno.
- CSV: conteo, claves únicas y referencias de sede.
- Web: compilación y revisión visual de la portada y los créditos.

La portada se ha abierto en Safari y se ha inspeccionado una captura de escritorio: logo, navegación, textos y fotografía principal visibles. Las cinco fotografías se han inspeccionado individualmente. El PNG del logo tiene canal alfa y se ha comprobado integrado en la cabecera; el pie se ha integrado en código pero no se ha revisado visualmente todavía. La revisión móvil y el recorrido de la página de créditos siguen pendientes.

Las pruebas de API locales que no utilizan MongoDB no acreditan registro, login, autorización sobre registros ni reservas concurrentes.

## Revisión de los recursos aportados · 3 de octubre de 2026

La compilación pasa tras integrar el logo SVG, el vídeo conceptual y la escena del showroom. En Safari de escritorio se ha comprobado la reproducción del hero, el cambio de los controles entre pausar y reanudar, el logo sobre el fondo oscuro y la sección de marca. La revisión móvil sigue pendiente.

La mejora de nitidez compila correctamente. Se ha inspeccionado el showroom reconstruido tanto como archivo como integrado en Safari de escritorio. Se reduce el zoom de las animaciones para evitar ampliaciones adicionales.

## Ampliación de secciones

La compilación de la portada ampliada, Servicios y Nuestra esencia pasa. En Safari de escritorio se ha revisado la página Servicios, abierto una pregunta frecuente y comprobado la navegación desde el bloque eléctrico al catálogo con Motorización = Eléctrico. La consulta de inventario devuelve un error porque la API no está disponible; no se da por probado el resultado de la búsqueda contra Atlas. La comprobación móvil y las citas integradas permanecen pendientes.

La sustitución de las ocho escenas compila correctamente. Se han inspeccionado individualmente los ocho archivos para comprobar composición, ausencia de textos y detalle. Safari muestra la escena eléctrica nueva integrada y confirma la carga del showroom tras recargar.

La serie de profesionales incorpora cuatro imágenes inspeccionadas individualmente: asesoramiento, taller, revisión técnica y entrega. La compilación pasa. Se ha revisado en Safari la integración del taller y la técnica en Servicios.

## Sedes y mapa · 3 de octubre de 2026

Las cuatro sedes se han actualizado en Atlas con direcciones inventadas, zonas y coordenadas aproximadas. Safari muestra las direcciones servidas por la API y el mapa Leaflet/OpenStreetMap con los cuatro puntos. La fórmula de distancia se ha comprobado con puntos iguales (0 km) y Madrid–Barcelona (unos 498 km en línea recta). La geolocalización requiere una acción y permiso del visitante; no se ha concedido acceso a la ubicación personal durante esta comprobación. Se gestionan permiso denegado, tiempo agotado y navegador sin geolocalización.
