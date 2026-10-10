# Seguimiento del TFM Rock The Code

| Requisito | Estado actual | Pendiente para entrega |
| --- | --- | --- |
| Node.js y React | Recorrido de mantenimiento integrado y comprobado en Safari | Completar registro y revisión de talleres en navegador |
| Excel con al menos 100 registros | Libro con 148 vehículos, 4 sedes y 4 talleres; exportación y comparación completa comprobadas | Revisar en Excel de escritorio |
| Dos colecciones relacionadas además de usuarios | Vehículos, sedes y talleres relacionados; citas y usuarios persistidos | Comprobar también en producción |
| Semilla con lectura de archivos `fs` | CSV exportados del Excel y carga repetida en Atlas | Conservar evidencias al ampliar inventario |
| Usuarios y rutas protegidas | Roles y sesión implementados | Casos positivos y negativos completos |
| Variables en `style.css` | Definidas | Ajustes del diseño definitivo |
| Arquitectura y reutilización | Módulos, paquetes y componentes | Revisar al ampliar funcionalidades |
| Hooks avanzados necesarios | Carga con reducer, cancelación y reintento | Comprobar en los recorridos completos |
| UX/UI | Primera dirección visual y pantallas | Validación móvil, teclado y formularios |
| Castellano e inglés, requisito de marca KelseTS | Documentado; interfaz actual en castellano | Selector, traducciones completas y revisión de ambos idiomas |
| Cloudinary opcional | Subida y sustitución comprobadas mediante API y Safari | Revisar estados móviles y funcionamiento desplegado |
| README y memoria | README bilingüe y capturas incorporadas en ambos documentos | Añadir URLs y evidencias del despliegue |
| Despliegue frontend y backend | Web y API publicadas; catálogo, recursos y sesión comprobados | Recorrido completo de citas, talleres y fotografías en producción |
| DocBase fuera del repositorio | Exclusión verificada y repositorio subido | Mantener la exclusión |

La app, el configurador completo y las integraciones específicas pertenecen a la segunda etapa. No se cuentan como requisitos cumplidos de esta entrega.

## Plan de entrega · 17–18 de octubre de 2026

Retomamos el 10 de octubre. El catálogo, la semilla del Excel, el recorrido de mantenimiento y la subida a Cloudinary están comprobados. El README tiene versiones en castellano e inglés y, junto con la memoria, incluye capturas. Siguen pendientes el responsive completo, la versión en inglés de la web, el registro y la revisión de talleres en navegador y el despliegue.

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
- [ ] Importar y ejecutar la colección en Insomnia; guardar resultados y capturas de la ronda final.
- [x] Completar el recorrido en navegador de cliente, cita, asignación y confirmación desde Team, agenda del taller y cierre.
- [ ] Completar registro de taller y su aprobación y rechazo desde Team en navegador.

- [x] Capturar y verificar las diez muestras en Mailtrap Sandbox, en HTML y texto, con sus cuerpos recibidos y registro de verificación.
- [x] Revisar logo, imágenes, botones y footer de los diez correos en el preset Phone de Mailtrap desde Safari.
- [ ] Probar dispositivos y clientes de correo reales.
- [ ] Revisar cada perfil privado a 320, 390, 768 y 1440 px, incluyendo textos largos, formularios y errores; completar comprobación en dispositivo real.

- [x] Conectar Cloudinary y comprobar subida y sustitución con datos temporales.
- [x] Incorporar selección, vista previa y guardado de fotografías desde React con acceso de administrador; comprobarlo en Safari.
- [x] Revisar la distribución del formulario vacío de fotografías a 320, 390, 768 y 1440 px en Safari.
- [ ] Revisar vista previa y errores del formulario a esos anchos y completar la prueba en dispositivo real.
