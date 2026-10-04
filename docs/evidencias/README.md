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

Los enlaces de estas muestras son relativos y no funcionan como una sesión de la web. Las muestras enviadas al Sandbox utilizan EMAIL_PREVIEW_WEB_URL. La revisión de HTML y texto en Mailtrap queda pendiente: la última respuesta fue HTTP 403, Too many failed login attempts. No se conoce el tiempo de desbloqueo.

## Registro de pruebas

Consultar [VALIDACION.md](../VALIDACION.md) para distinguir comprobaciones realizadas y pendientes. Cada captura de navegador debe identificar página, perfil, ancho de revisión y estado. No incluir contraseñas, cookies ni tokens.

- [Salida de las pruebas locales del 4 de octubre](pruebas-locales-2026-10-04.txt).

## Recorrido de mantenimiento · 4 de octubre de 2026

Prueba manual en Safari de escritorio, con cuentas ficticias de desarrollo. Capturas de 3456 × 1988 píxeles (pantalla Retina; no equivalen a ese ancho CSS).

1. [Cliente: solicitud pendiente y mensaje](recorrido/01-cliente-solicitud.png).
2. [Team: taller asignado y cita confirmada](recorrido/02-team-confirmacion.png).
3. [Cliente: comunicación de asignación](recorrido/03-cliente-asignacion.png).
4. [Taller: comunicación de la cita asignada](recorrido/04-taller-asignacion.png).
5. [Team: visita completada](recorrido/05-team-cierre.png).
6. [Taller: comunicación de cierre](recorrido/06-taller-cierre.png).
7. [Cliente: comunicación de cierre](recorrido/07-cliente-cierre.png).

La visita del 7 de octubre se cierra anticipadamente para comprobar el flujo de demostración; no representa un servicio realizado. El taller de pruebas estaba aprobado previamente y no acredita la aprobación manual desde Team. Los mensajes se guardan en la cuenta, sin envío real. Quedan pendientes las capturas de Mailtrap, el registro y revisión de talleres en navegador y la validación móvil completa.
