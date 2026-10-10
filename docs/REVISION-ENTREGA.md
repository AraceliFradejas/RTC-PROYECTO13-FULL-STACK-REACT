# Seguimiento del TFM Rock The Code

| Requisito | Estado comprobado | Evidencia o pendiente real |
| --- | --- | --- |
| Node.js y React | Implementados e integrados | Safari: recorrido temporal; HTTP: recorrido privado publicado |
| Excel con al menos 100 registros | 148 vehículos, cuatro sedes y cuatro talleres | [Numbers, CSV y validación](evidencias/datos/README.md) |
| Dos colecciones relacionadas además de usuarios | Vehículos y sedes; talleres y citas amplían las relaciones | [Datos](DATOS-EXCEL.md) y [recorrido de producción](evidencias/produccion/README.md) |
| Semilla con lectura de archivos fs | Excel exportado a CSV; semilla valida y carga sin duplicar | [Guía de datos](DATOS-EXCEL.md) |
| Usuarios y rutas protegidas | Clientes, talleres y Team con permisos diferenciados | [76 casos de Insomnia](insomnia/VALIDACION-DETALLADA.md) |
| Variables en style.css | Colores, espacios y estilos compartidos definidos | frontend/src/styles/style.css |
| Arquitectura y reutilización | Organización por funcionalidades, componentes y cliente HTTP compartido | [Memoria](../MEMORIA.md) |
| Hooks avanzados necesarios | useResource utiliza useReducer para carga, error y reintento; AbortController cancela peticiones | frontend/src/shared/hooks/useResource.js |
| UX/UI | Navegación, teclado y layouts de perfiles revisados en Safari | [Responsive](evidencias/movil/README.md); pendiente recorrido físico completo |
| Castellano e inglés, requisito de marca | Rutas públicas, layouts privados y comunicaciones tienen evidencias ES/EN | [Idiomas](evidencias/idiomas/README.md); completar errores dinámicos y dispositivo físico |
| Cloudinary opcional | Subida, sustitución y entrega desde la web publicada comprobadas | [Fotografías](evidencias/cloudinary/README.md); pendiente selección desde Fotos del móvil |
| README y memoria | README bilingüe; 23 capturas de Insomnia y cinco de Numbers incorporadas | Cierre editorial y coherencia final |
| Despliegue frontend y backend | Web y API publicadas; catálogo, sesión, citas e imágenes comprobados | [Producción](evidencias/produccion/README.md) |
| DocBase fuera del repositorio | Carpeta ignorada y sin archivos versionados | Exclusión comprobada el 10 de octubre |

La app, el configurador completo y las integraciones específicas pertenecen a la segunda etapa. No se cuentan como requisitos cumplidos de esta entrega.

## Plan de entrega · 17–18 de octubre de 2026

Retomamos el 10 de octubre. El catálogo, la semilla del Excel, el recorrido de mantenimiento y la subida a Cloudinary están comprobados. El README tiene versiones en castellano e inglés y, junto con la memoria, incluye capturas. Web y API ya están publicadas y se ha incorporado el selector ES/EN. Esos recorridos ya tienen sus informes de Safari, responsive, producción e Insomnia. La revisión final se centra en dispositivos físicos, estados dinámicos adicionales y documentación.

| Fecha objetivo | Trabajo | Condición para darlo por terminado |
| --- | --- | --- |
| Sábado 10 de octubre | Desplegar web y API y revisar conexión, cookies, rutas e imágenes | Catálogo accesible y sesión y citas comprobadas en las URLs publicadas |
| Domingo 11 de octubre | Completar inglés y revisar registros, permisos y vistas privadas | Recorridos comprobados y textos de ambos idiomas disponibles |
| Sábado 17 de octubre | Corregir fallos, revisión responsive, Insomnia y documentación final | Capturas e informes coherentes con la versión publicada |
| Domingo 18 de octubre | Revisión final y entrega | Enlaces comprobados y versión de Rock The Code identificada en Git |

Después de esta entrega continuará la etapa de BigSchool, con el objetivo de cerrar el proyecto y la presentación el 8 de noviembre. La app será una ampliación acotada para clientes; el enunciado de BigSchool permite también una aplicación web y no exige publicar en tiendas.

La autora trabaja en el proyecto los fines de semana. Cloudinary es una mejora puntuable; los requisitos obligatorios, la versión bilingüe solicitada y los despliegues tienen prioridad.

Atlas y Cloudinary necesitan configuración local mediante variables de entorno excluidas de Git. No guardar secretos en la documentación. El primer despliegue se adelanta para detectar problemas de cookies, proxy, rutas y archivos de la semilla antes del cierre.

La gestión de personal y Cloudinary son mejoras propias del proyecto; el enunciado no exige un CRUD completo ni Cloudinary. La versión bilingüe es un requisito de marca solicitado por la autora. Se aplazan app, configurador, pagos, notificaciones e integraciones de fabricantes a BigSchool.

## Tareas añadidas · 4 de octubre

- [x] Preparar una colección importable de Insomnia para validar el backend, con datos ficticios, casos correctos, errores y permisos.
- [x] Importar y ejecutar la colección en Insomnia; 171 comprobaciones del recorrido completo y 36 públicas de Vercel, con resultados y capturas.
- [x] Completar el recorrido en navegador de cliente, cita, asignación y confirmación desde Team, agenda del taller y cierre.
- [x] Completar registro de taller y su aprobación y rechazo desde Team en navegador, con base temporal aislada.

- [x] Capturar y verificar las diez muestras en Mailtrap Sandbox, en HTML y texto, con sus cuerpos recibidos y registro de verificación.
- [x] Revisar logo, imágenes, botones y footer de los diez correos en el preset Phone de Mailtrap desde Safari.
- [ ] Probar dispositivos y clientes de correo reales.
- [x] Revisar los perfiles privados a 320, 390, 768 y 1440 px; conservar capturas de textos largos, formularios y un error de fecha.
- [ ] Completar los estados adicionales y el recorrido en dispositivo físico.

- [x] Conectar Cloudinary y comprobar subida y sustitución con datos temporales.
- [x] Incorporar selección, vista previa y guardado de fotografías desde React con acceso de administrador; comprobarlo en Safari.
- [x] Revisar la distribución del formulario vacío de fotografías a 320, 390, 768 y 1440 px en Safari.
- [x] Revisar la vista previa y el descarte de fotografía en Safari a 390 px.
- [ ] Completar errores de fotografía y selección de archivos en dispositivo físico.

## Revisión del 10 de octubre

Rutas públicas ES/EN, sugerencias por teclado, filtros y paginación comprobados en Vercel. Registro y revisión de talleres y ciclo completo de mantenimiento repetidos en Safari con base temporal eliminada. Subida de fotografías comprobada en la web publicada y entrega JPEG desde la API verificada visualmente. Los informes de [navegación](evidencias/navegacion/README.md) y [Cloudinary](evidencias/cloudinary/README.md) separan entornos y límites. La revisión responsive tiene su informe posterior. Quedan las comprobaciones en dispositivos físicos; la ronda final de Insomnia se ha completado y documentado.

## Capturas responsive y menú móvil

Páginas públicas ES/EN capturadas a 390 px; cliente, taller y Team a 320, 390, 768 y 1440 px. Formularios de registro, error de fecha y vista previa revisados. Menú desplegable incorporado para evitar la cabecera apilada. [Informe y capturas](evidencias/movil/README.md). Siguen pendientes estados adicionales y comprobación completa en dispositivos físicos; los marcos de Safari no equivalen a una prueba de iOS.

## Actualización tras las pruebas de producción e Insomnia

El ciclo HTTP privado en producción ha pasado sus 101 comprobaciones. En Insomnia 13.2.0 han pasado 171 comprobaciones de las 76 peticiones principales sobre una base temporal eliminada al terminar, y 36 comprobaciones de 15 peticiones públicas contra Vercel. Se han guardado 23 capturas y un anexo con los 76 casos. Ver los informes de [producción](evidencias/produccion/README.md) e [Insomnia](evidencias/insomnia/README.md). El libro se ha abierto y revisado en Numbers, con recuentos y comparación completa frente a CSV correctos. Quedan la revisión física del móvil y el cierre final de entrega.

La [revisión del libro en Numbers](evidencias/datos/README.md) conserva cinco capturas y el hash del XLSX original. No se ha convertido el archivo ni se presenta esta comprobación como una ejecución en Microsoft Excel.

## Cierre técnico y editorial · 10 de octubre

Pasan 37 pruebas locales y la compilación. Las dos integraciones opcionales quedan omitidas en esta ronda; no se contabilizan como correctas ni se repiten las pruebas ya documentadas en otros entornos. El build conserva avisos de anotaciones de Zod y de tamaño del paquete principal: genera los archivos de producción correctamente; dividir más la carga queda como mejora de rendimiento.

El README se ha actualizado en ambos idiomas para retirar los pendientes de talleres y producción ya comprobados. Los informes históricos de VALIDACION.md conservan la situación de cada fecha; las revisiones posteriores completan su alcance. La autora realizará la prueba del iPhone 13 más tarde. No se marca como completada por las capturas de Safari.

Antes de entregar: completar esa revisión física, resolver incidencias si aparecen, comprobar los enlaces publicados y marcar en Git la versión de entrega de Rock The Code. La app y los módulos de BigSchool permanecen fuera de este cierre.
