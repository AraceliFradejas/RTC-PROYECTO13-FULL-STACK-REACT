# Colecciones y relaciones en MongoDB Atlas

Las capturas se han tomado en el Data Explorer de Atlas desde Safari, sobre el clúster `kelsetscars` y la base `test` que utiliza la aplicación. El nombre de la base es `test`, pero estos registros pertenecen a la aplicación publicada; no es la base temporal eliminada tras las pruebas de Insomnia.

La revisión es de lectura: se han abierto colecciones y aplicado un filtro para mostrar los talleres públicos, sin insertar, editar ni eliminar documentos. Las capturas conservan la ventana original; puedes pulsarlas para consultar los campos a tamaño completo.

## Colecciones de la aplicación

Atlas muestra `appointments`, `dealerships`, `messages`, `users`, `vehicles` y `workshops`. La colección de usuarios está separada de las colecciones de negocio, como pide el enunciado.

<a href="01-colecciones-atlas.png"><img src="01-colecciones-atlas.png" alt="Las seis colecciones de KelseTS Cars en Atlas" width="720"></a>

## Inventario y relación con el concesionario

`vehicles` contiene 148 documentos. La captura muestra `base-001`, un Hyundai Tucson del ejemplo del curso, y su campo `dealership`: `ObjectId('6ac134fb2927fe45e0f85195')`.

<a href="02-vehiculos-atlas.png"><img src="02-vehiculos-atlas.png" alt="Inventario de 148 vehículos y referencia de sede" width="720"></a>

## Concesionarios

`dealerships` contiene cuatro documentos. El `_id` del concesionario de Madrid es `6ac134fb2927fe45e0f85195`, el mismo valor que referencia el vehículo anterior. La sede conserva la clave `madrid`, su nombre, dirección ficticia y coordenadas aproximadas.

<a href="03-sedes-atlas.png"><img src="03-sedes-atlas.png" alt="Concesionario de Madrid con el identificador referenciado por vehículos" width="720"></a>

## Talleres públicos y especialidades

La consulta `{ public: true }` devuelve los cuatro talleres del directorio. La colección completa tiene siete documentos porque también conserva solicitudes y talleres de demostración ocultos. La cifra siete de la pestaña es el total de la colección; el contador «1–4 of 4» corresponde al filtro.

`atelier-madrid` referencia la misma sede de Madrid mediante `dealership`. Se muestran sus cinco especialidades y su estado `approved`.

<a href="04-talleres-atlas.png"><img src="04-talleres-atlas.png" alt="Cuatro talleres públicos, sus especialidades y referencia a concesionario" width="720"></a>

## Citas y relación entre perfiles

`appointments` conserva las referencias `user`, `vehicle`, `dealership` y, cuando existe asignación, `workshop`. Las citas de demostración completadas mantienen su historial con `active: false`; una cita cancelada también libera la franja.

La captura muestra las referencias persistidas. La interpretación de los estados y los permisos se desarrolla en las pruebas de [Insomnia](../insomnia/README.md) y del [recorrido publicado](../produccion/README.md). Los cierres son operaciones de demostración y no acreditan servicios reales realizados.

<a href="05-citas-atlas.png"><img src="05-citas-atlas.png" alt="Citas con referencias a cliente, vehículo, concesionario y taller" width="720"></a>

## Verificación

Los originales no incluyen contraseñas, hashes de contraseñas, cookies, tokens ni cadenas de conexión. Se documentan las colecciones y sus referencias sin abrir documentos privados de usuarios. El [registro de archivos](verificacion.json) conserva dimensiones y SHA-256 de las cinco capturas.

## English summary

These five screenshots were captured in Atlas Data Explorer using Safari. They show the application's six collections, 148 vehicles, four dealerships, four public workshops and stored appointment references. The workshop collection also contains hidden demonstration records; the filter returns only the four public entries. This was a read-only review, with no database changes.
