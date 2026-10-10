# Clientes, talleres y comunicaciones

## Por qué lo incorporo

KelseTS Cars no termina cuando una persona elige un coche. Las revisiones y las reparaciones también necesitan atención, y para eso he añadido una solicitud de registro para talleres colaboradores. Las especialidades contemplan mantenimiento, mecánica, chapa y pintura, lunas y vehículos eléctricos. Team sí puede asignar una cita de mantenimiento a un taller aprobado.

He tomado como referencias la [posventa de Renault](https://www.renault.es/servicio-posventa.html?country=es), que relaciona mantenimiento, vehículo y cita, y la [red de talleres colaboradores de Línea Directa](https://empresas.lineadirecta.com/web/guest/talleres), que distingue talleres y especialidades. Son referencias de organización del servicio; KelseTS conserva su identidad y no reproduce sus coberturas ni promete sus prestaciones.

Para las comunicaciones he seguido el planteamiento de [KelseTS Talks, otro proyecto de mi portfolio](https://github.com/AraceliFradejas/RTC-PROYECTO10-FULL-STACK-JAVASCRIPT). En sus [correos de asistencia](https://github.com/AraceliFradejas/RTC-PROYECTO10-FULL-STACK-JAVASCRIPT/blob/main/docs/CORREO.md) trabajé con mensajes HTML y texto, y pruebas en Mailtrap Sandbox. Aquí adapto la idea al automóvil y mantengo una demostración dentro de la cuenta, sin enviar correos a buzones personales. También preparo muestras HTML y texto para [revisarlas en Mailtrap Sandbox](MAILTRAP.md), mediante un comando independiente.

## Registro de clientes

La persona introduce nombre, correo y contraseña. El backend guarda la cuenta y una comunicación de bienvenida en una misma transacción. La bienvenida explica el siguiente paso: consultar el catálogo y solicitar una visita. El inicio de sesión no genera una bienvenida nueva.

## Solicitud de talleres

1. La persona elige «Soy un taller» y completa los datos de contacto.
2. Añade nombre del taller, dirección, ciudad, teléfono y especialidades.
3. Al enviar el formulario se guardan la cuenta, el taller pendiente y el mensaje de recepción. Los campos incompletos muestran errores; no crean cuentas ni comunicaciones.
4. En su área personal puede consultar la solicitud y actualizar su estado.
5. Una administradora revisa los datos desde su cuenta. Aprobar activa el rol profesional; rechazar exige explicar el motivo. Ambas decisiones generan una comunicación propia.

La revisión es una decisión del proyecto académico, no una certificación del taller. Una solicitud pendiente o rechazada no obtiene permisos profesionales. Incluso después de la aprobación, el taller no puede consultar la agenda general. Solo consulta las citas que Team le asigne, con nombre del cliente, modelo, servicio, sede, fecha y estado; no recibe el correo ni otros datos del cliente. Las solicitudes privadas no se publican automáticamente en el mapa. El directorio inicial muestra únicamente los cuatro talleres ficticios de demostración.

## Mensajes disponibles

| Momento | Comunicación | Siguiente paso |
| --- | --- | --- |
| Alta de cliente | Bienvenida | Consultar catálogo |
| Alta de taller | Solicitud recibida | Consultar estado |
| Aprobación de taller | Colaboración aprobada | Ver perfil profesional |
| Rechazo de taller | Resultado con motivo | Consultar resultado |
| Solicitud de cita | Solicitud recibida, pendiente de confirmación | Consultar citas |
| Confirmación de cita | Fecha, vehículo, servicio y sede | Consultar visita |
| Cancelación de cita | Cancelación y liberación de la franja | Solicitar otra cita si se necesita |
| Asignación al cliente | Taller y sede coordinadora | Consultar asignación |
| Asignación al taller | Nueva cita para atender | Consultar agenda propia |
| Cita completada | Agradecimiento tras la visita | Consultar historial |

La bandeja indica «demostración» y no afirma haber enviado un email. Los mensajes se consultan solo con la sesión de su destinatario. El nombre, los motivos y otros textos se escapan al generar HTML. Abrir un enlace nunca modifica una cita ni una solicitud.

Cada evento tiene una clave única para evitar duplicar comunicaciones. Las operaciones y sus mensajes se guardan en una transacción de MongoDB: un fallo al guardar el mensaje impide dar por terminada la operación. Es una diferencia respecto al envío SMTP de Talks, donde un fallo de entrega no anulaba una reserva guardada. Aquí solo hay escritura en la base de datos, no envío externo. Las muestras de Mailtrap se envían por separado y no intervienen en esta transacción. Si añado envío automático por SMTP, separaré la operación guardada de la entrega del mensaje y registraré sus resultados.

## Vistas HTML locales

```bash
npm run email:preview -w backend
```

Genera diez muestras con datos ficticios en `backend/.email-previews/`, excluido de Git. Sirven para revisar el diseño de los correos sin conexión a Mailtrap. La bandeja de la web presenta el texto y los enlaces del mismo mensaje; el HTML se utiliza en las muestras de correo. Los enlaces relativos de las muestras locales son orientativos; las acciones funcionales están en la web y necesitan sesión. Las muestras utilizan la URL web configurada en su entorno.

## API y relaciones

- `User.accountType`: cliente o taller. `User.role` se decide en el servidor.
- `Workshop.user`: referencia única a la cuenta del taller; estado pendiente, aprobado o rechazado.
- `Message.user`: destinatario privado de la comunicación; `delivery` siempre es `simulated`.
- `GET /api/v1/workshops/me`: solicitud del propio usuario.
- `GET /api/v1/workshops/applications`: solicitudes, solo administradora.
- `PATCH /api/v1/workshops/:id/review`: decisión, solo administradora y sobre una solicitud pendiente.
- `GET /api/v1/messages`: bandeja del propio usuario.

## Validación

Las pruebas unitarias cubren rechazo de roles o estados enviados al registrarse, especialidades obligatorias, motivo de rechazo, mensajes distintos por evento y escape del HTML.

La prueba opcional de Atlas utiliza una base temporal distinta del catálogo y la elimina al terminar:

```bash
RUN_ATLAS_TESTS=true node --test backend/test/registration.integration.test.js
```

Comprueba altas, duplicados, login y logout, aprobación y rechazo, revisión repetida, aislamiento de mensajes, asignación de mantenimiento, acceso solo a citas propias sin correo del cliente, bloqueo de la agenda general para talleres y comunicaciones de solicitud, confirmación y cancelación de cita. No envía correos. Las pruebas ordinarias omiten esta integración salvo que se active expresamente.

## Alcance de la posventa

La solicitud de reparación de un coche del cliente, el presupuesto y su aceptación, el progreso de una reparación y la gestión de documentación de siniestros requieren su propio módulo. No se consideran implementados con este registro. Los mensajes futuros seguirán el mismo criterio: explicar qué ha ocurrido y cuál es el siguiente paso, con permisos y contenido adecuados para cliente y taller.

La interfaz y las diez comunicaciones tienen versiones en castellano e inglés. La bandeja utiliza el idioma seleccionado y conserva los nombres y motivos introducidos por las personas.


## KelseTS Cars Team y la red inicial

La pantalla de acceso distingue Clientes, Talleres y KelseTS Cars Team. El servidor comprueba que la cuenta corresponde al acceso elegido. Team utiliza los roles internos `admin` y `staff`; no existe registro público de administradores. La cuenta inicial se prepara con `ADMIN_EMAIL` y `ADMIN_PASSWORD` en el `.env` privado y `npm run seed`. Una cuenta existente no se convierte en administradora ni cambia su contraseña al repetir la semilla.

La administradora revisa solicitudes, consulta la agenda y asigna una cita activa de mantenimiento a un taller aprobado. La asignación se guarda en `Appointment.workshop`, conserva la sede coordinadora y genera mensajes para cliente y taller cuando este último tiene una cuenta vinculada. No se permite asignarla dos veces ni elegir un taller vinculado a otra sede. No hay todavía reasignación ni comprobación de capacidad horaria del taller; la asignación es coordinación interna, no confirmación automática de disponibilidad.

Los cuatro talleres iniciales se leen de `data/csv/workshops.csv` con `fs` y se relacionan con las sedes. Son establecimientos ficticios sin cuenta de acceso ni contraseña predeterminada. Sirven para representar la red y probar asignaciones; para probar la bandeja profesional se utiliza un taller registrado y aprobado con su propia cuenta. No se vincula automáticamente una nueva solicitud a un taller de demostración.

| Taller | Dirección ficticia | Sede vinculada |
| --- | --- | --- |
| KelseTS Atelier Madrid | Pasaje KelseTS del Cuidado 6 | Madrid · Salamanca |
| KelseTS Atelier Barcelona | Passatge KelseTS de la Precisió 4 | Barcelona · Pedralbes |
| KelseTS Atelier San Sebastián | Pasaje KelseTS del Horizonte 9 | San Sebastián · Miraconcha |
| KelseTS Atelier Málaga | Pasaje KelseTS de la Calma 7 | Málaga · Monte Sancha |

El mapa usa marcadores rojos para concesionarios, dorados para talleres y azules para la ubicación del visitante. Las tarjetas permiten consultar los ocho centros aunque no se utilice el mapa. Los puntos son aproximados y las distancias se calculan en línea recta.
