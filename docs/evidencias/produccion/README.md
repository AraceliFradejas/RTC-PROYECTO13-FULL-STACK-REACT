# Revisión de producción · 10 de octubre de 2026

Se han ejecutado 101 comprobaciones HTTP contra https://kelsets-cars.vercel.app y su API publicada. Todas han pasado. Los informes registran la fecha, el resultado esperado y el obtenido:

- [Lecturas, sesiones y permisos: 49 comprobaciones](verificacion.json).
- [Recorrido de talleres y citas: 52 comprobaciones](recorrido-citas.json).

La revisión incluye las rutas públicas, el catálogo y su paginación, búsqueda predictiva, búsqueda por marca, orden de precios, identificadores incorrectos, acceso sin sesión, origen no autorizado, separación entre Cliente y Team, privacidad de las agendas y comunicaciones, cierre de sesión y entrega de la fotografía guardada en Cloudinary. Las unidades sin precio se tienen en cuenta al verificar el orden ascendente.

Para el recorrido se han creado, con autorización, dos cuentas ficticias de taller: una aprobada y otra rechazada con motivo. No aparecen en el directorio público. Con Cliente Demo Despliegue se han solicitado dos citas de mantenimiento: una asignada, confirmada y completada; otra cancelada por el cliente. Se han comprobado los bloqueos de duplicados, asignaciones repetidas, confirmación por el cliente, finalización antes de confirmar y finalización repetida. Las citas finalizadas están inactivas. El taller ve la cita asignada y el nombre del cliente, sin su correo.

Las comunicaciones de cliente, taller aprobado y taller rechazado se han consultado en castellano e inglés, sin exponer metadatos internos. Los registros ficticios se conservan para revisar el resultado. Las contraseñas y cookies no están en estos informes ni en Git.

Estas pruebas son peticiones HTTP reales, no una ejecución de la interfaz de Insomnia. Tampoco sustituyen la revisión visual de Safari documentada en las otras carpetas, las pruebas físicas del iPhone o una nueva captura de correos en Mailtrap. Esta revisión comprueba la entrega de una imagen ya subida a Cloudinary; la subida real desde Safari tiene su evidencia en [Cloudinary](../cloudinary/README.md).

## English

All 101 HTTP checks against the live website and API passed: 49 checks for public resources, sessions and permissions, and 52 for the workshop and appointment workflow. Two authorised fictional workshop accounts remain hidden from the public directory. One maintenance appointment was assigned, confirmed and completed; another was cancelled by the demo customer. Invalid transitions and permissions were checked, together with Spanish and English communications and restricted customer data.

The JSON reports contain expected and actual results without passwords or cookies. These are live HTTP checks, not an Insomnia UI run, physical iPhone testing or a new Mailtrap email capture. Cloudinary image delivery was checked; the earlier upload from Safari is documented separately.
