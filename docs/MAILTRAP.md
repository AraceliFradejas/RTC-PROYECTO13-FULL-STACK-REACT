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

La cuenta Sandbox está disponible y se han configurado las variables privadas. La última prueba devolvió HTTP 403, «Too many failed login attempts», después de los rechazos de autenticación anteriores. La captura real de las muestras queda pendiente del desbloqueo; la respuesta no indicó su duración y se han detenido los reintentos.
