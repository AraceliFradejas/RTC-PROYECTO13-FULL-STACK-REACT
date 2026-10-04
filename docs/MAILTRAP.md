# Revisión de comunicaciones en Mailtrap

Uso Email Sandbox para revisar diez comunicaciones con datos ficticios: bienvenida, recepción del taller, aprobación, rechazo, solicitud de cita, confirmación, cancelación, visita completada y asignación para cliente y taller. Las muestras comparten las plantillas y el renderizado HTML de la bandeja de la web.

## Configuración privada

En Mailtrap, abrir el Sandbox y su integración API. Copiar el token y el ID de la bandeja a `backend/.env`:

```env
MAILTRAP_API_TOKEN=
MAILTRAP_INBOX_ID=
EMAIL_PREVIEW_WEB_URL=http://localhost:5173
```

No incluir estos valores en capturas ni en el repositorio. La integración llama únicamente al [endpoint de Email Sandbox](https://docs.mailtrap.io/developers/email-sandbox/send-test-emails), con remitente y destinatario ficticios `@kelsets.example`. No utiliza Email Sending ni entrega a buzones personales.

## Generar y revisar

Para ver HTML local sin Mailtrap:

```bash
npm run email:preview -w backend
```

Para capturar las diez muestras en el Sandbox:

```bash
npm run email:sandbox -w backend
```

Para enviar solo una muestra, por ejemplo la bienvenida:

```bash
npm run email:sandbox -w backend -- client.welcome
```

Cada resultado aceptado se informa por su tipo. El proceso se detiene si Mailtrap rechaza una muestra: revisar configuración o límite del plan y continuar por tipo individual. No se reintenta automáticamente, para evitar muestras duplicadas.

Este comando no se conecta a Atlas, no crea citas y no cambia la entrega de los mensajes de la aplicación. Revisa ejemplos de las plantillas, no acredita la captura automática de un evento real en Mailtrap. Los eventos reales se comprueban en la bandeja privada y en las pruebas de integración.

## Evidencias

| Muestra | Contenido que hay que comprobar |
| --- | --- |
| `client.welcome` | Nombre, bienvenida y enlace al catálogo |
| `workshop.received` | Solicitud pendiente y explicación de la revisión |
| `workshop.approved` | Perfil profesional activado y siguiente paso |
| `workshop.rejected` | Motivo del rechazo y consulta del resultado |
| `appointment.pending` | Vehículo, sede, fecha y confirmación pendiente |
| `appointment.confirmed` | Confirmación y hora de Madrid |
| `appointment.cancelled` | Cancelación y siguiente paso |
| `appointment.completed` | Cierre de la visita |
| `appointment.assigned` | Taller asignado y sede coordinadora para el cliente |
| `workshop.assignment` | Cita asignada para el taller |

Guardar una captura HTML y otra del texto de cada tipo, o una selección representativa con la lista de diez capturas recibidas. Comprobar ancho móvil, lectura, botón redondeado y enlace: debe abrir la web y puede pedir iniciar sesión. Abrir el enlace nunca confirma ni cancela una cita. Anotar fecha, tipo, resultado y cualquier incidencia de compatibilidad que muestre Mailtrap. No afirmar compatibilidad con todos los clientes de correo sin probarlos.

El 4 de octubre de 2026, después de una respuesta HTTP 401, se contrastó la configuración con el ejemplo CURL de My Sandbox. El ID guardado no correspondía a esa bandeja. Se corrigió únicamente `MAILTRAP_INBOX_ID` en el archivo privado y se volvió a enviar `client.welcome`: la API aceptó la muestra. No fue necesario regenerar el token. Los rechazos anteriores quedan como incidencia resuelta de configuración; todavía está pendiente revisar el correo recibido en la interfaz de Mailtrap, su HTML, texto y enlace, y validar las otras nueve muestras.

## Identidad de los correos

El encabezado utiliza una exportación PNG del mismo SVG de `BrandLogo.jsx`, con corona y trazo TS, para mantener el logo de la web en clientes de correo que no admiten SVG. El footer se configura en `emailBrand.js`: lema, cuatro ciudades y enlaces a esencia, sedes y cuenta. Las imágenes conceptuales `email-clientes-v1.png` y `email-talleres-v1.png` son exclusivas de estas comunicaciones y no se reutilizan en las secciones de la web. La variante se elige por el tipo de mensaje: `workshop.*` para profesionales y los demás para clientes. El nombre y los datos de la cita siguen procediendo de la plantilla del evento.

Las muestras Sandbox adjuntan logo y fotografía con identificadores CID; no dependen de que Mailtrap pueda acceder a localhost para mostrar imágenes. Los enlaces sí utilizan la URL web configurada. El HTML emplea tablas de presentación, estilos en línea, ancho máximo de 600 px e imágenes fluidas. Se han generado las diez vistas locales y han pasado las cinco pruebas de comunicaciones; la revisión móvil en Mailtrap y la compatibilidad en clientes de correo siguen pendientes.

La API aceptó las muestras rediseñadas `client.welcome` y `workshop.approved` el 4 de octubre. Un envío consecutivo de taller recibió HTTP 429; una prueba individual posterior fue aceptada. Después se corrigió el recorte de la exportación del logo y se sustituyeron las imágenes reutilizadas por las dos exclusivas. El encabezado completo y el footer se revisaron en Safari con la bienvenida local. Hay que abrir en Mailtrap las muestras más recientes para comprobar su renderizado con imágenes CID; las muestras anteriores conservan el diseño anterior.
