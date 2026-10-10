# Pruebas del backend con Insomnia

He preparado [la colección de KelseTS Cars](insomnia/KelseTS-Cars.insomnia.json) para revisar la API sin depender del frontend. Incluye 78 peticiones ordenadas: 76 forman el recorrido principal y las dos últimas son para probar manualmente la subida de una imagen. Los códigos esperados están en [CASOS.md](insomnia/CASOS.md).

## Preparación

1. Arrancar el backend y cargar la semilla. Utilizar una base de pruebas con las 100 unidades y las cuatro sedes; esta ronda crea cuentas, talleres, mensajes y citas que permanecen en esa base.
2. En Insomnia, importar el archivo JSON. Es formato v4, admitido por el [importador de Insomnia](https://developer.konghq.com/insomnia/import-export/).
3. Crear un entorno privado dentro de la colección, con `base_url`, `origin`, `admin_email` y `admin_password`. El correo y la contraseña Team deben corresponder a la cuenta creada por la semilla. No escribir credenciales en el JSON del repositorio ni exportar el entorno privado.
4. Para desarrollo local, usar `http://localhost:3000/api/v1` como `base_url` y `http://localhost:5173` como `origin`. El origen tiene que figurar en `FRONTEND_URL` del backend. Si `NODE_ENV=production`, las cookies necesitan HTTPS; para la prueba local se utiliza desarrollo.

La colección mantiene la cookie `session` en el jar de Insomnia, también desde los scripts de registro, login y logout para evitar que Insomnia 13.2 restaure la cookie anterior. No hay que copiar un JWT ni poner un Bearer token. Todas las peticiones usan el mismo dominio; no alternar `localhost` y `127.0.0.1` en mitad del recorrido.

## Orden de ejecución

Ejecutar las carpetas 01 a 06 y sus peticiones por orden numérico. La primera petición prepara correos ficticios únicos y dos fechas laborables futuras, a las 10:00 de Madrid. Las respuestas guardan los identificadores de vehículo, sede, taller y cita para los pasos siguientes. Las peticiones de acceso van cambiando la sesión: cliente, taller, Team y otro cliente. No ejecutar en paralelo ni cambiar manualmente la sesión entre pasos.

Revisar los resultados de los scripts después de cada respuesta. Utilizan las [comprobaciones de Insomnia](https://developer.konghq.com/insomnia/scripts/) para verificar código HTTP, estructura, permisos y comunicaciones. Un 400, 401, 403 o 409 puede ser el resultado correcto de un caso negativo; cada petición indica lo esperado.

La API limita registro y login a 20 intentos por 15 minutos. La ronda principal contiene 15 intentos. Repetirla inmediatamente o hacer pruebas manuales adicionales puede producir 429. Esperar a que pase la ventana antes de repetir una ronda completa; no desactivar el límite para la entrega.

## Qué se comprueba

- Salud, sedes, talleres públicos, catálogo, búsqueda, filtros y errores de identificadores.
- Registro, duplicados, acceso por perfil, logout y rechazo de orígenes ajenos.
- Cliente sin permisos administrativos y contraseña ausente de las respuestas de usuario.
- Solicitud de cita pendiente, franja ocupada, confirmación, cancelación y visita completada.
- Taller pendiente, aprobación y rechazo con motivo obligatorio.
- Asignación de mantenimiento y agenda profesional con nombre del cliente, sin su correo.
- Separación de la agenda y la bandeja de dos clientes.
- Comunicaciones privadas y simuladas; no se envía ningún correo.

El aislamiento de la agenda profesional también se comprueba con la integración de Atlas. Esta colección es parte de la validación, no una prueba exhaustiva de seguridad, concurrencia o todas las combinaciones de filtros. Staff por sede y producción requieren sus propias rondas.

## Cloudinary · carpeta 07

Esta carpeta se ejecuta aparte. Iniciar sesión Team y seleccionar en el campo multipart `image` una imagen JPEG, PNG o WebP menor de 4 MB. No fijar manualmente `Content-Type`: Insomnia debe generar el límite multipart.

Con Cloudinary configurado se espera 200; sin credenciales, 503. El script de subida espera 200 porque el caso positivo se considera completado solo cuando la subida funciona. La petición cambia la imagen del vehículo elegido: usar una unidad de la base de pruebas. Probar aparte archivo mayor de 4 MB (413) y archivo con contenido inválido (400), conservando evidencia de cada caso. El recorrido general ya comprueba el rechazo de un cliente y de una subida sin archivo, sin llamar a Cloudinary.

## Evidencias para entregar

Anotar fecha, versión de Insomnia, URL utilizada y resultado de cada carpeta. Guardar capturas con los resultados de pruebas, ocultando cookies y credenciales. Los códigos de `CASOS.md` describen lo esperado. La ejecución del 10 de octubre y sus capturas están en el [informe de Insomnia](evidencias/insomnia/README.md).

### Comprobación previa del archivo

El 4 de octubre se comprobaron el JSON, las referencias y la sintaxis. También se ejecutaron las 76 peticiones principales y sus scripts con un adaptador local sobre Supertest en una base temporal de Atlas: 171 comprobaciones correctas, con eliminación de la base al finalizar. Cloudinary quedó excluido. El 10 de octubre se ha confirmado la importación y ejecución en Insomnia 13.2.0: 76 peticiones y 171 comprobaciones correctas sobre una base temporal eliminada al finalizar. Se corrigieron la comparación del código HTTP y el manejo del jar de cookies en los scripts. Además, la [colección pública de Vercel](insomnia/KelseTS-Cars.public.insomnia.json) ha pasado 36 comprobaciones en 15 peticiones. Las [capturas y el alcance](evidencias/insomnia/README.md) quedan separados de la validación anterior con Supertest.
