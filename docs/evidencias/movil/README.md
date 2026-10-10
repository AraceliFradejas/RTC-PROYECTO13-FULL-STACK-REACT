# Revisión responsive · 10 de octubre de 2026

He incorporado un menú desplegable hasta 1000 px. La cabecera muestra el logo aprobado y un botón con icono de tres líneas; las secciones, el idioma y el acceso aparecen al abrirlo. Escape cierra el menú y devuelve el foco al botón. Elegir una página también lo cierra. El menú puede desplazarse si la pantalla tiene poca altura.

Las páginas públicas tienen capturas en castellano e inglés a 390 × 844 CSS px, el tamaño de diseño utilizado para revisar el iPhone 13. Cliente, taller y Team tienen además capturas a 320, 768 y 1440 px, con datos ficticios largos. Se incluyen los formularios de registro, el error de fecha de una cita y la vista previa de fotografías con descarte. Los desplegables de citas utilizan ahora una altura mínima de 48 px.

Las capturas se hicieron en Safari de escritorio dentro de marcos de anchura controlada, con el frontend local. El inventario público se consultó mediante un proxy a la API publicada. Las áreas privadas utilizaron una base temporal de Atlas, eliminada al terminar. La vista previa de imagen no se guardó en Cloudinary.

No son capturas tomadas en un iPhone ni una simulación completa de iOS. Muestran la ventana visible, no la página entera. Quedan por revisar el teclado táctil, barras de Safari, orientación, permisos de ubicación, selección de archivos desde Fotos y todos los errores en el dispositivo físico. La autora indica que la web se ve bien en su iPhone 13, salvo la cabecera anterior; el menú corrige esa distribución.

El [registro](revision.json) distingue las rutas, anchos, encabezamientos y acciones comprobadas. Las capturas de portada anteriores a este cambio permanecen como historial en otros informes.

## English

The responsive header now uses a disclosure menu up to 1000 px. Escape restores focus to its button and navigation closes it. Public pages were captured in Spanish and English at 390 × 844 CSS px. Customer, workshop and Team views also have 320, 768 and 1440 px captures with long fictional data. Registration forms, a date validation error and photo preview were reviewed. Select controls now have a 48 px minimum height.

These are desktop Safari captures in controlled-width frames, using the local frontend. Public catalogue data came from the deployed API; private views used an isolated temporary Atlas database, removed afterwards. They do not replace physical iPhone checks of the keyboard, browser bars, orientation, geolocation or Photos file selection.

## Capturas / Screenshots

- [01-home-es-390](01-home-es-390.png)
- [02-menu-es-390](02-menu-es-390.png)
- [03-catalogo-es-390](03-catalogo-es-390.png)
- [04-buscador-es-390](04-buscador-es-390.png)
- [05-servicios-es-390](05-servicios-es-390.png)
- [06-esencia-es-390](06-esencia-es-390.png)
- [07-sedes-es-390](07-sedes-es-390.png)
- [08-creditos-es-390](08-creditos-es-390.png)
- [09-porsche-es-390](09-porsche-es-390.png)
- [10-ferrari-es-390](10-ferrari-es-390.png)
- [11-mercedes-es-390](11-mercedes-es-390.png)
- [12-tesla-es-390](12-tesla-es-390.png)
- [13-ficha-es-390](13-ficha-es-390.png)
- [14-acceso-es-390](14-acceso-es-390.png)
- [15-404-es-390](15-404-es-390.png)
- [16-home-en-390](16-home-en-390.png)
- [17-catalogo-en-390](17-catalogo-en-390.png)
- [18-servicios-en-390](18-servicios-en-390.png)
- [19-esencia-en-390](19-esencia-en-390.png)
- [20-sedes-en-390](20-sedes-en-390.png)
- [21-creditos-en-390](21-creditos-en-390.png)
- [22-porsche-en-390](22-porsche-en-390.png)
- [23-ferrari-en-390](23-ferrari-en-390.png)
- [24-mercedes-en-390](24-mercedes-en-390.png)
- [25-tesla-en-390](25-tesla-en-390.png)
- [26-ficha-en-390](26-ficha-en-390.png)
- [27-acceso-en-390](27-acceso-en-390.png)
- [28-404-en-390](28-404-en-390.png)
- [29-acceso-temporal-es-390](29-acceso-temporal-es-390.png)
- [30-registro-cliente-es-390](30-registro-cliente-es-390.png)
- [31-registro-taller-es-390](31-registro-taller-es-390.png)
- [32-especialidades-taller-es-390](32-especialidades-taller-es-390.png)
- [33-cliente-es-1440](33-cliente-es-1440.png)
- [33-cliente-es-320](33-cliente-es-320.png)
- [33-cliente-es-390](33-cliente-es-390.png)
- [33-cliente-es-768](33-cliente-es-768.png)
- [34-cita-es-390](34-cita-es-390.png)
- [35-error-cita-es-390](35-error-cita-es-390.png)
- [36-cliente-en-390](36-cliente-en-390.png)
- [37-taller-es-1440](37-taller-es-1440.png)
- [37-taller-es-320](37-taller-es-320.png)
- [37-taller-es-390](37-taller-es-390.png)
- [37-taller-es-768](37-taller-es-768.png)
- [38-taller-en-390](38-taller-en-390.png)
- [39-team-es-1440](39-team-es-1440.png)
- [39-team-es-320](39-team-es-320.png)
- [39-team-es-390](39-team-es-390.png)
- [39-team-es-768](39-team-es-768.png)
- [40-team-en-390](40-team-en-390.png)
- [41-team-acciones-en-390](41-team-acciones-en-390.png)
- [42-fotografia-team-en-390](42-fotografia-team-en-390.png)
- [43-vista-previa-en-390](43-vista-previa-en-390.png)
- [44-menu-en-390](44-menu-en-390.png)
- [45-home-es-320](45-home-es-320.png)
- [45-home-es-768](45-home-es-768.png)
- [45-home-es-844](45-home-es-844.png)

## Comprobación publicada

Después de publicar `ffe45a1`, he abierto directamente la home de Vercel en un marco de 390 px de Safari. El [menú publicado](46-menu-vercel-es-390.png) abre sus secciones, idiomas y acceso. Elegir Servicios lleva a esa página y cierra el menú. Esta captura también utiliza Safari de escritorio, no el iPhone físico.

After deploying `ffe45a1`, the Vercel homepage was checked directly in a 390 px Safari frame. The menu opens and selecting Services navigates and closes it. This is still a desktop Safari capture, not a physical iPhone screenshot.
