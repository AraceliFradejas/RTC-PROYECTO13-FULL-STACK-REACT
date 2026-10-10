# Navegación

He recorrido en Safari de escritorio las páginas públicas en castellano e inglés: portada, catálogo, servicios, esencia, sedes, créditos, cuatro páginas de modelo, acceso y página inexistente. El [registro público](recorrido-publico.json) conserva las rutas y encabezamientos observados. También he utilizado pausa del vídeo y una pregunta frecuente de la portada.

En el catálogo publicado he probado una sugerencia de Audi con teclado, el cambio exclusivo a filtros, el filtro Porsche y su segunda página. Los [resultados](interacciones-catalogo-vercel.json) incluyen conteos y conservación de la marca al paginar. He corregido además el contador singular: «1 vehículo» / «1 vehicle».

## Áreas privadas

El [acceso de Team publicado](01-team-en-vercel-safari.png) se ha comprobado con la cuenta administradora existente. Para registrar y revisar nuevos clientes y talleres he utilizado una base temporal separada de producción, con la misma aplicación y API locales. Esa base se eliminó al terminar.

El [registro privado](recorrido-privado-temporal.json) recoge el alta del taller, rechazo sin motivo bloqueado, aprobación, rechazo con motivo, acceso del cliente y recorrido de mantenimiento: solicitud, asignación, confirmación, agenda del taller y visita completada. Las comunicaciones aparecen en inglés y los motivos escritos por usuarios conservan su texto original.

- [Taller pendiente](02-taller-pendiente-temporal-safari.png).
- [Revisión desde Team](03-team-aprobacion-temporal-safari.png).
- [Taller aprobado](04-taller-aprobado-temporal-safari.png).
- [Taller rechazado](05-taller-rechazado-temporal-safari.png).
- [Solicitud del cliente](06-cita-cliente-temporal-safari.png).
- [Área profesional del taller](07-agenda-taller-temporal-safari.png).
- [Visita completada](08-visita-completada-temporal-safari.png).

Las capturas muestran el área visible de la ventana; el registro recoge también estados comprobados mediante accesibilidad que pueden quedar fuera de la captura. Esta ronda no acredita todos los tamaños de pantalla, dispositivos físicos, clientes de correo ni todas las combinaciones de errores. El recorrido privado temporal tampoco sustituye a repetir el ciclo completo en producción.

## English

Public routes were reviewed in desktop Safari in Spanish and English. The published catalogue was checked using keyboard suggestions, exclusive search modes, a Porsche filter and pagination. Private registration, workshop review and the maintenance lifecycle were exercised against an isolated temporary Atlas database, removed afterwards. Screenshots show the visible viewport; the records also include accessible states outside it. Physical devices, all responsive states and the complete production appointment lifecycle remain separate checks.
