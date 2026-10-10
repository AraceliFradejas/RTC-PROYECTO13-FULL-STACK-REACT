# Evidencias de KelseTS Cars

## Comunicaciones locales · 4 de octubre de 2026

Estos diez HTML se generan con las plantillas del backend y datos ficticios. Son muestras locales; no acreditan entrega ni recepción en Mailtrap.

- [appointment.assigned](correos/appointment.assigned.html)
- [appointment.cancelled](correos/appointment.cancelled.html)
- [appointment.completed](correos/appointment.completed.html)
- [appointment.confirmed](correos/appointment.confirmed.html)
- [appointment.pending](correos/appointment.pending.html)
- [client.welcome](correos/client.welcome.html)
- [workshop.approved](correos/workshop.approved.html)
- [workshop.assignment](correos/workshop.assignment.html)
- [workshop.received](correos/workshop.received.html)
- [workshop.rejected](correos/workshop.rejected.html)

Cada HTML tiene su versión `.txt` en la misma carpeta. Se regeneran con `node scripts/export-email-evidence.mjs`; las imágenes se cargan desde los recursos del proyecto.

## Recepción en Mailtrap · 4 de octubre de 2026

Las diez muestras definitivas se han recibido con destinatario ficticio. El [registro de verificación](mailtrap/verificacion.json) incluye los identificadores y las fechas, coincidencia del texto con la plantilla actual, referencias CID, destinos de los cinco enlaces y hashes de HTML y texto. Los cuerpos realmente descargados están en [mailtrap/recibidos](mailtrap/recibidos). Sus imágenes CID se visualizan dentro de Mailtrap; para una vista local usar los HTML del apartado anterior.

- [Registro de los diez envíos definitivos](mailtrap-envios-finales-2026-10-04.txt).
- [Bienvenida recibida, HTML](mailtrap/client.welcome-html.png).
- [Bienvenida, preset Phone de Mailtrap](mailtrap/client.welcome-phone.png).
- [Diagnóstico HTML de la interfaz](mailtrap/compatibilidad-inicial.png) y [análisis de la API](mailtrap/compatibilidad-api.json).
- [Pruebas de esta ronda: 24 pasan y una integración opcional omitida](pruebas-comunicaciones-2026-10-04.txt).

La captura `client.welcome-text.png` corresponde a una versión anterior, antes de completar el footer de texto. El texto definitivo recibido está en [client.welcome.txt](mailtrap/recibidos/client.welcome.txt). Las capturas locales anteriores de [identidad](correo-identidad-2026-10-04.png) y [footer](correo-footer-2026-10-04.png) también se conservan como revisión previa.

Las fotografías son diez escenas conceptuales distintas y exclusivas de los correos. La recepción y la verificación de sus cuerpos no acreditan un envío automático desde la aplicación. Se han revisado en Safari el logo, las imágenes, los botones y el footer de los diez tipos con el preset Phone. Quedan pendientes las pruebas en dispositivos y clientes de correo reales; el preset de Mailtrap no sustituye estas últimas.

## Revisión Phone en Safari · 4 de octubre

Capturas nativas de 2648 × 1988 píxeles Retina. El tamaño de la captura corresponde a la ventana de Safari, no al ancho CSS del correo. En las zonas revisadas no se observan desbordamientos horizontales; las imágenes y el logo cargan y los botones caben en el mensaje.

| Comunicación | Encabezado e imagen | Botón y footer |
| --- | --- | --- |
| `client.welcome` | [Captura](mailtrap/client.welcome-phone-safari.png) | [Captura](mailtrap/client.welcome-phone-footer-safari.png) |
| `workshop.received` | [Captura](mailtrap/workshop.received-phone-safari.png) | [Captura](mailtrap/workshop.received-phone-footer-safari.png) |
| `workshop.approved` | [Captura](mailtrap/workshop.approved-phone-safari.png) | [Captura](mailtrap/workshop.approved-phone-footer-safari.png) |
| `workshop.rejected` | [Captura](mailtrap/workshop.rejected-phone-safari.png) | [Captura](mailtrap/workshop.rejected-phone-footer-safari.png) |
| `appointment.pending` | [Captura](mailtrap/appointment.pending-phone-safari.png) | [Captura](mailtrap/appointment.pending-phone-footer-safari.png) |
| `appointment.confirmed` | [Captura](mailtrap/appointment.confirmed-phone-safari.png) | [Captura](mailtrap/appointment.confirmed-phone-footer-safari.png) |
| `appointment.cancelled` | [Captura](mailtrap/appointment.cancelled-phone-safari.png) | [Captura](mailtrap/appointment.cancelled-phone-footer-safari.png) |
| `appointment.completed` | [Captura](mailtrap/appointment.completed-phone-safari.png) | [Captura](mailtrap/appointment.completed-phone-footer-safari.png) |
| `appointment.assigned` | [Captura](mailtrap/appointment.assigned-phone-safari.png) | [Captura](mailtrap/appointment.assigned-phone-footer-safari.png) |
| `workshop.assignment` | [Captura](mailtrap/workshop.assignment-phone-safari.png) | [Captura](mailtrap/workshop.assignment-phone-footer-safari.png) |

También se conserva el [contenido largo de asignación al taller](mailtrap/workshop.assignment-phone-contenido-safari.png) y el [texto definitivo de bienvenida](mailtrap/client.welcome-text-final-safari.png), con su footer completo. Las capturas del encabezado y del footer no muestran todo el texto intermedio de cada mensaje; los diez cuerpos completos recibidos están en la carpeta `recibidos`.

## Registro de pruebas

Consultar [VALIDACION.md](../VALIDACION.md) para distinguir comprobaciones realizadas y pendientes. Cada captura de navegador debe identificar página, perfil, ancho de revisión y estado. No incluir contraseñas, cookies ni tokens.

- [Salida de las pruebas locales del 4 de octubre](pruebas-locales-2026-10-04.txt).
- [Comparación Excel–CSV y validación de relaciones del 4 de octubre](excel-csv-2026-10-04.txt).

## Recorrido de mantenimiento · 4 de octubre de 2026

Prueba manual en Safari de escritorio, con cuentas ficticias de desarrollo. Capturas de 3456 × 1988 píxeles (pantalla Retina; no equivalen a ese ancho CSS).

1. [Cliente: solicitud pendiente y mensaje](recorrido/01-cliente-solicitud.png).
2. [Team: taller asignado y cita confirmada](recorrido/02-team-confirmacion.png).
3. [Cliente: comunicación de asignación](recorrido/03-cliente-asignacion.png).
4. [Taller: comunicación de la cita asignada](recorrido/04-taller-asignacion.png).
5. [Team: visita completada](recorrido/05-team-cierre.png).
6. [Taller: comunicación de cierre](recorrido/06-taller-cierre.png).
7. [Cliente: comunicación de cierre](recorrido/07-cliente-cierre.png).

La visita del 7 de octubre se cierra anticipadamente para comprobar el flujo de demostración; no representa un servicio realizado. El taller de pruebas estaba aprobado previamente y no acredita la aprobación manual desde Team. Los mensajes se guardan en la cuenta, sin envío real. El registro y revisión de talleres en navegador y la validación móvil completa siguen pendientes. La recepción de las muestras de Mailtrap se documenta por separado.

## Catálogo ampliado · 4 de octubre

[Ficha del 911 Carrera](ficha-lujo-2026-10-04.png), sin datos personales ni sesión visible. Safari en ventana de 574 px; captura Retina de 1148 × 1272 píxeles. Fotografía de referencia de Porsche, datos pendientes sin kilometraje cero y cuadrícula de dos columnas. No acredita la revisión de dispositivos móviles completos.

## Fotos de modelo · 4 de octubre

[Ficha con fotografía del 911 Carrera](ficha-fotografia-modelo-2026-10-04.png). Safari en ventana de 574 px, captura Retina de 1148 × 1272 píxeles. Sustituye la referencia de otro modelo por una foto del 911 Carrera, con versión y año orientativos. La [galería de fuentes](../GALERIA-VEHICULOS.md) recoge las 38 nuevas fotografías y sus licencias.

## Búsqueda predictiva · 4 de octubre

[Buscador con sugerencias de Audi](buscador-predictivo-2026-10-04.png). Safari de escritorio, captura Retina de 2648 × 1988 píxeles. Lista abierta para au y contador de diez resultados de la búsqueda aplicada Audi, visible debajo. Las sugerencias no tapan el contador ni las tarjetas.

[Diseño de filtros y explicación de ambos modos](modos-busqueda-2026-10-04.png): Safari de escritorio, captura Retina de 2648 × 1988 píxeles; controles amplios y contador fuera del panel.

## Subida de fotografías a Cloudinary

[Recorrido, capturas y resultados](cloudinary/README.md): prueba de integración real con datos temporales y subida desde React en Safari.

## Entorno de concesionarios y talleres

La [revisión de las tarjetas de sedes](sedes/README.md) recoge las ocho fotografías diferentes, las atribuciones y una captura de Safari en ventana estrecha.

## Primera revisión del despliegue · 10 de octubre

[Web y API publicadas: capturas de Safari e informe HTTP](despliegue/README.md). Incluye la cuenta ficticia autorizada y distingue los recorridos que todavía necesitan revisión en producción.
