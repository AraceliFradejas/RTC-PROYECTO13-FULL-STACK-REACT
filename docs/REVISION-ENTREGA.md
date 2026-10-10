# Seguimiento del TFM Rock The Code

| Requisito | Estado actual | Pendiente para entrega |
| --- | --- | --- |
| Node.js y React | Recorrido de mantenimiento integrado y comprobado en Safari | Registro y revisión comprobados en base temporal; ciclo HTTP privado comprobado en producción |
| Excel con al menos 100 registros | Libro con 148 vehículos, 4 sedes y 4 talleres; exportación y comparación completa comprobadas | Apertura en Numbers y recuentos comprobados; XLSX original conservado |
| Dos colecciones relacionadas además de usuarios | Vehículos, sedes y talleres relacionados; citas y usuarios persistidos | Relaciones y recorrido de citas comprobados por HTTP en producción |
| Semilla con lectura de archivos `fs` | CSV exportados del Excel y carga repetida en Atlas | Conservar evidencias al ampliar inventario |
| Usuarios y rutas protegidas | Roles y sesión implementados | Casos positivos y negativos completos |
| Variables en `style.css` | Definidas | Ajustes del diseño definitivo |
| Arquitectura y reutilización | Módulos, paquetes y componentes | Revisar al ampliar funcionalidades |
| Hooks avanzados necesarios | Carga con reducer, cancelación y reintento | Comprobar en los recorridos completos |
| UX/UI | Primera dirección visual y pantallas | Validación móvil, teclado y formularios |
| Castellano e inglés, requisito de marca KelseTS | Selector ES/EN y traducciones de interfaz incorporados | Comunicaciones bilingües comprobadas; completar revisión responsive y contenidos dinámicos |
| Cloudinary opcional | Subida y sustitución comprobadas mediante API y Safari | Subida y lectura comprobadas en Vercel; revisar estados móviles |
| README y memoria | README bilingüe y capturas incorporadas en ambos documentos | Actualizar evidencias con los recorridos finales |
| Despliegue frontend y backend | Web y API publicadas; catálogo, recursos y sesión comprobados | Recorrido HTTP privado y fotografías comprobados; quedan dispositivos físicos |
| DocBase fuera del repositorio | Exclusión verificada y repositorio subido | Mantener la exclusión |

La app, el configurador completo y las integraciones específicas pertenecen a la segunda etapa. No se cuentan como requisitos cumplidos de esta entrega.

## Plan de entrega · 17–18 de octubre de 2026

Retomamos el 10 de octubre. El catálogo, la semilla del Excel, el recorrido de mantenimiento y la subida a Cloudinary están comprobados. El README tiene versiones en castellano e inglés y, junto con la memoria, incluye capturas. Web y API ya están publicadas y se ha incorporado el selector ES/EN. Siguen pendientes el responsive completo, la revisión bilingüe, el registro y la revisión de talleres en navegador y el recorrido completo en producción.

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
- [ ] Revisar cada perfil privado a 320, 390, 768 y 1440 px, incluyendo textos largos, formularios y errores; completar comprobación en dispositivo real.

- [x] Conectar Cloudinary y comprobar subida y sustitución con datos temporales.
- [x] Incorporar selección, vista previa y guardado de fotografías desde React con acceso de administrador; comprobarlo en Safari.
- [x] Revisar la distribución del formulario vacío de fotografías a 320, 390, 768 y 1440 px en Safari.
- [ ] Revisar vista previa y errores del formulario a esos anchos y completar la prueba en dispositivo real.

## Revisión del 10 de octubre

Rutas públicas ES/EN, sugerencias por teclado, filtros y paginación comprobados en Vercel. Registro y revisión de talleres y ciclo completo de mantenimiento repetidos en Safari con base temporal eliminada. Subida de fotografías comprobada en la web publicada y entrega JPEG desde la API verificada visualmente. Los informes de [navegación](evidencias/navegacion/README.md) y [Cloudinary](evidencias/cloudinary/README.md) separan entornos y límites. La revisión responsive tiene su informe posterior. Quedan las comprobaciones en dispositivos físicos; la ronda final de Insomnia se ha completado y documentado.

## Capturas responsive y menú móvil

Páginas públicas ES/EN capturadas a 390 px; cliente, taller y Team a 320, 390, 768 y 1440 px. Formularios de registro, error de fecha y vista previa revisados. Menú desplegable incorporado para evitar la cabecera apilada. [Informe y capturas](evidencias/movil/README.md). Siguen pendientes estados adicionales y comprobación completa en dispositivos físicos; los marcos de Safari no equivalen a una prueba de iOS.

## Actualización tras las pruebas de producción e Insomnia

El ciclo HTTP privado en producción ha pasado sus 101 comprobaciones. En Insomnia 13.2.0 han pasado 171 comprobaciones de las 76 peticiones principales sobre una base temporal eliminada al terminar, y 36 comprobaciones de 15 peticiones públicas contra Vercel. Se han guardado 23 capturas y un anexo con los 76 casos. Ver los informes de [producción](evidencias/produccion/README.md) e [Insomnia](evidencias/insomnia/README.md). El libro se ha abierto y revisado en Numbers, con recuentos y comparación completa frente a CSV correctos. Quedan la revisión física del móvil y el cierre final de entrega.

La [revisión del libro en Numbers](evidencias/datos/README.md) conserva cinco capturas y el hash del XLSX original. No se ha convertido el archivo ni se presenta esta comprobación como una ejecución en Microsoft Excel.
