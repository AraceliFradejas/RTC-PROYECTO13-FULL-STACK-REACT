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
| Cloudinary opcional | Endpoint inicial | Credenciales, formulario y subida comprobada |
| README y memoria | Documentación inicial | Actualizar con evidencias reales |
| Despliegue frontend y backend | Configuración base | Publicar y comprobar ambas URLs |
| DocBase fuera del repositorio | Exclusión verificada y repositorio subido | Mantener la exclusión |

La app, el configurador completo y las integraciones específicas pertenecen a la segunda etapa. No se cuentan como requisitos cumplidos de esta entrega.

## Plan de entrega · 12 de octubre de 2026

Revisión del 4 de octubre: el catálogo, la semilla del Excel y el recorrido de mantenimiento están comprobados. Hay 24 pruebas locales correctas y una integración de Atlas ejecutada por separado. Siguen pendientes el responsive completo, la versión en inglés, el registro y la revisión de talleres en navegador y el despliegue. No se garantiza una calificación concreta.

| Fecha objetivo | Trabajo | Condición para darlo por terminado |
| --- | --- | --- |
| Fin de semana 3–4 de octubre | Excel definitivo, revisión de inventario, Atlas, semillas, recorridos principales y primer despliegue | Datos y relaciones comprobados; catálogo público y revisión de sesión y citas |
| Sábado 10 de octubre | Corregir integración, completar castellano e inglés, responsive y Cloudinary si el núcleo funciona | Recorridos completos, interfaz bilingüe y revisión móvil |
| Domingo 11 de octubre | README, memoria, evidencias y ensayo de entrega | Pruebas, instalación y enlaces comprobados; versión final guardada |
| Lunes 12 de octubre | Envío de la entrega preparada | Comprobar enlaces y enviar el repositorio |

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
