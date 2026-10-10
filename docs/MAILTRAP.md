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

## Resultado

Las diez muestras definitivas se han recibido en el Sandbox. La [verificación](evidencias/mailtrap/verificacion.json) conserva tipo, identificador, fecha de recepción, fotografía elegida, enlaces y hashes de los cuerpos descargados. Se ha comprobado que cada mensaje incluye HTML y texto, que el texto coincide con la plantilla actual y que sus cinco enlaces pertenecen al origen web configurado. El HTML contiene las referencias CID del logo y de la fotografía; esta comprobación no compara el contenido binario de los adjuntos.

Para repetir la lectura y exportar los mensajes recibidos, sin enviar nuevas muestras:

```bash
node scripts/verify-mailtrap-samples.mjs
```

Para regenerar las evidencias locales HTML y texto:

```bash
node scripts/export-email-evidence.mjs
```

Los HTML locales usan rutas relativas a los recursos del proyecto. Los HTML descargados de Mailtrap conservan referencias CID, por lo que sus imágenes se revisan en el Sandbox. El [índice de evidencias](evidencias/README.md) enlaza ambos conjuntos y las capturas disponibles.

## Identidad de los correos

El encabezado utiliza una exportación PNG del mismo SVG de `BrandLogo.jsx`, con corona y trazo TS. El footer se configura en `emailBrand.js`: lema, cuatro ciudades y enlaces a esencia, sedes y cuenta. Cada uno de los diez tipos tiene su propia escena conceptual, exclusiva de los correos. No se reutilizan estas fotos en las secciones de la web. La bienvenida, la atención del taller, la confirmación y el cierre se acompañan de escenas acordes con su contenido; el nombre y los datos de la cita proceden de la plantilla.

Sandbox adjunta logo y fotografía mediante CID, sin depender de localhost para mostrar imágenes. Los enlaces utilizan la URL web configurada y deberán apuntar al despliegue cuando esté disponible. La versión de texto conserva contenido, llamada a la acción y footer. El HTML emplea tablas de presentación, estilos en línea, ancho máximo de 600 px e imágenes fluidas.

Se han revisado en Safari los diez tipos en el preset Phone de Mailtrap: logo, fotografía, botón y footer. Las capturas de encabezado y parte final están enlazadas en el índice de evidencias. La asignación al taller incluye una captura intermedia del texto largo. No se han observado desbordamientos horizontales en las zonas revisadas. Esta revisión corresponde al visor de Mailtrap, no a Gmail, Outlook ni a dispositivos físicos. El análisis de compatibilidad y su captura se conservan como diagnóstico: indican estilos con soporte desigual, no errores de entrega ni una garantía de renderizado.

La configuración inicial tenía un ID de bandeja incorrecto, corregido al contrastarlo con la integración del Sandbox. Un envío demasiado próximo recibió HTTP 429. El comando espera ahora doce segundos entre muestras y se detiene ante rechazos, sin reintentos automáticos. Las muestras anteriores permanecen en el Sandbox: la verificación selecciona el mensaje más reciente de cada tipo.
