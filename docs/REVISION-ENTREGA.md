# Seguimiento del TFM Rock The Code

| Requisito | Estado actual | Pendiente para entrega |
| --- | --- | --- |
| Node.js y React | Estructura y código inicial | Comprobar recorridos integrados |
| Excel con al menos 100 registros | CSV original con 100 registros | Crear el Excel definitivo y documentar exportación |
| Dos colecciones relacionadas además de usuarios | 100 vehículos y 4 sedes cargados en Atlas sin referencias ausentes; Appointment modelado | Comprobar usuarios y citas persistidos |
| Semilla con lectura de archivos `fs` | Carga ejecutada dos veces en Atlas sin duplicados | Repetir con el Excel definitivo y conservar evidencias |
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

Revisión del 3 de octubre: hay una base de código y diseño, pero todavía no una aplicación integrada comprobada. La semilla y el catálogo ya están comprobados contra Atlas. Las 15 pruebas locales no sustituyen los recorridos de autenticación y citas ni la comprobación en producción. No se garantiza una calificación concreta.

| Fecha objetivo | Trabajo | Condición para darlo por terminado |
| --- | --- | --- |
| Fin de semana 3–4 de octubre | Excel definitivo, revisión de inventario, Atlas, semillas, recorridos principales y primer despliegue | Datos y relaciones comprobados; catálogo público y revisión de sesión y citas |
| Sábado 10 de octubre | Corregir integración, completar castellano e inglés, responsive y Cloudinary si el núcleo funciona | Recorridos completos, interfaz bilingüe y revisión móvil |
| Domingo 11 de octubre | README, memoria, evidencias y ensayo de entrega | Pruebas, instalación y enlaces comprobados; versión final guardada |
| Lunes 12 de octubre | Envío de la entrega preparada | Comprobar enlaces y enviar el repositorio |

La autora trabaja en el proyecto los fines de semana. Cloudinary es una mejora puntuable; los requisitos obligatorios, la versión bilingüe solicitada y los despliegues tienen prioridad.

Atlas y Cloudinary necesitan configuración local mediante variables de entorno excluidas de Git. No guardar secretos en la documentación. El primer despliegue se adelanta para detectar problemas de cookies, proxy, rutas y archivos de la semilla antes del cierre.

La gestión de personal y Cloudinary son mejoras propias del proyecto; el enunciado no exige un CRUD completo ni Cloudinary. La versión bilingüe es un requisito de marca solicitado por la autora. Se aplazan app, configurador, pagos, notificaciones e integraciones de fabricantes a BigSchool.
