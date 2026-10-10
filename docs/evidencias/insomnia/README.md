# Insomnia · Ejecución del 10 de octubre de 2026

Las colecciones se han importado y ejecutado en **Insomnia 13.2.0 para macOS**, en el proyecto local `RTC-PROYECTO13 · KelseTS Cars`. Estas capturas corresponden a la aplicación, no al adaptador de pruebas utilizado anteriormente.

| Ronda | Entorno | Peticiones | Comprobaciones correctas |
| --- | --- | --- | --- |
| Recorrido principal | Backend local, puerto 3003, con una base temporal independiente en Atlas | 76 | 171 / 171 |
| Recursos públicos y casos negativos | API publicada, mediante `https://kelsets-cars.vercel.app/api/v1` | 15 | 36 / 36 |

## Recorrido completo

La base temporal se cargó desde los CSV: 148 vehículos, cuatro sedes y cuatro talleres. Se crearon cuentas ficticias para comprobar el registro, duplicados, sesiones, permisos, aprobación y rechazo de talleres, asignación de mantenimiento, agenda profesional, aislamiento entre dos clientes, comunicaciones, cancelación y finalización. La base se eliminó al terminar; no se añadieron registros a producción en esta ronda.

![Resultado de las 171 comprobaciones en Insomnia](01-ronda-completa-171.png)

El filtro de resultados fallidos queda vacío:

![Sin comprobaciones fallidas](02-sin-fallos.png)

La petición 74 devuelve `200` y el estado `Completada`. En esta captura se ha aplicado el filtro JSONPath `$.data.status` para que el resultado se lea claramente:

![Visita completada](03-visita-completada.png)

El taller recibe únicamente su trabajo asignado y el nombre del cliente, sin su correo:

![Agenda del taller y privacidad](04-agenda-taller-privacidad.png)

El cliente no puede revisar solicitudes de talleres. El `403` es el resultado correcto del caso negativo:

![Permiso administrativo denegado al cliente](05-cliente-permiso-denegado.png)

## Producción

La [colección pública](../../insomnia/KelseTS-Cars.public.insomnia.json) permite repetir los casos 01–14 y 76 en Vercel, sin credenciales. Incluye salud, cierre de una sesión previa, perfil anónimo, sedes, talleres públicos, catálogo, ficha, búsqueda, filtros, página incorrecta, identificadores, origen ajeno y rechazo del registro con rol administrativo. La última petición comprueba que no hay acceso anónimo a los mensajes. No crea cuentas ni citas.

![Las 36 comprobaciones de producción pasan](06-vercel-36-comprobaciones.png)

![Filtro de fallos vacío en producción](07-vercel-sin-fallos.png)

El catálogo publicado devuelve 148 unidades. La captura utiliza `$.data.total`:

![Inventario publicado](08-vercel-inventario-148.png)

![Perfil sin sesión rechazado en producción](09-vercel-sin-sesion.png)

## Ajustes encontrados durante la ejecución

La primera importación detectó dos problemas de los scripts. `insomnia.response.status` devolvía el texto `OK`; la comprobación numérica debe utilizar `insomnia.response.code`, como muestra la [documentación de Kong](https://developer.konghq.com/how-to/set-a-value-from-a-response-as-an-environment-variable/). También se observó que el jar de cookies usado por los scripts podía recuperar la sesión anterior al login. La colección guarda en ese jar la cookie de la respuesta de registro o login y lo vacía después del logout, sin copiar el token al entorno ni exportarlo. Tras corregirlo se repitió el recorrido completo y pasó.

No se han modificado la autenticación ni los permisos del backend para obtener estos resultados. Las dos peticiones de subida manual, 77 y 78, se excluyeron del runner; la subida real desde Safari está documentada en [Cloudinary](../cloudinary/README.md). Las pruebas de producción del recorrido privado realizadas mediante HTTP se conservan en [su informe independiente](../produccion/README.md).

## English

Both collections were imported and run in the actual Insomnia 13.2.0 macOS app. The main workflow passed **171 assertions across 76 requests**, using a local backend and an isolated temporary Atlas database seeded with 148 vehicles, four dealerships and four workshops. The database was removed afterwards. The public production collection passed **36 assertions across 15 requests** without credentials or new accounts and appointments.

The screenshots show the runner results, no failed assertions, a completed visit, restricted workshop customer data, a forbidden customer action, the published catalogue count and anonymous access rejection. Two collection scripting issues were corrected before the successful final runs: numeric HTTP status checks and session cookie handling. The manual image upload requests were excluded; the actual upload from Safari is documented separately. No passwords or cookie values are shown in these screenshots.
