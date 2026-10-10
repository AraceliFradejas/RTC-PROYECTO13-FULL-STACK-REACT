# Resultados de validación

## Datos

El XLSX contiene 148 vehículos, cuatro sedes y cuatro talleres. `data:check` compara todas las filas y referencias con los CSV; `seed:check` valida los archivos con fs sin escribir en Atlas. Ambas comprobaciones pasan. La carga repetida conserva las claves y las fotografías existentes. El libro se ha abierto en Numbers y mantiene su archivo original.

[Informe de datos y cinco capturas](evidencias/datos/README.md) · [Colecciones y relaciones en Atlas](evidencias/mongodb/README.md).

## Pruebas locales

`npm test` pasa 51 pruebas: 30 backend, 16 frontend y cinco del cliente HTTP. Las dos integraciones opcionales se omiten en esta ejecución; no se cuentan como aprobadas. Sus comprobaciones con servicios se describen en los informes correspondientes.

`npm run build` genera los archivos de producción. Rollup muestra avisos sobre anotaciones de Zod y el tamaño del paquete principal: 557,05 kB, 162,11 kB gzip. La compilación se completa con estos avisos.

## API e Insomnia

La colección ejecutada en Insomnia 13.2.0 pasa 171 comprobaciones de 76 peticiones sobre una base temporal independiente, eliminada al terminar. La colección pública de Vercel pasa 36 comprobaciones de 15 peticiones, sin crear cuentas ni citas. Las dos peticiones de imágenes manuales no forman parte del runner.

[23 capturas y resultados de Insomnia](evidencias/insomnia/README.md) · [Detalle de los 76 casos](insomnia/VALIDACION-DETALLADA.md).

## Producción

El recorrido HTTP publicado pasa 101 comprobaciones. Incluye sesiones, permisos, catálogo, revisión de talleres, asignación, confirmación, cancelación y cierre de citas, privacidad y comunicaciones ES/EN. Los registros ficticios autorizados se conservan como demostración.

[Informe HTTP de producción](evidencias/produccion/README.md) · [Primeras capturas de despliegue](evidencias/despliegue/README.md).

## Navegación y responsive

Safari permite seguir el registro y revisión de talleres y el mantenimiento entre cliente, Team y taller con una base temporal. Las rutas públicas tienen capturas ES/EN a 390 px; los perfiles privados también a 320, 768 y 1440 px. Hay capturas de formularios, un error de fecha y vista previa de imagen. Son marcos de Safari de escritorio y no una prueba física de iOS.

[Navegación](evidencias/navegacion/README.md) · [Responsive y menú](evidencias/movil/README.md) · [Idiomas](evidencias/idiomas/README.md).

## Servicios y recursos

La fotografía subida desde la web publicada queda en Cloudinary y Atlas y se entrega como JPEG a través de la API. La comprobación conserva su licencia y atribución. Mailtrap recibe las diez muestras HTML y texto; el preset Phone muestra su logo, fotografía, contenido y footer. Esas muestras son independientes de los mensajes simulados del área privada.

[Cloudinary](evidencias/cloudinary/README.md) · [Mailtrap y recorrido](evidencias/README.md) · [Fotografías de las sedes](evidencias/sedes/README.md).

## Interpretación de las evidencias

Una captura muestra el estado visible, una respuesta HTTP permite comprobar los datos y una aserción verifica una condición concreta. Los informes los identifican por separado. No se equiparan las capturas de escritorio con pruebas de teléfono, ni Mailtrap Sandbox con entrega a buzones externos. El repositorio no incluye contraseñas, cookies ni tokens en las evidencias. DocBase está excluida de Git.


## Grabación en dispositivo físico

La [grabación del iPhone 13](evidencias/iphone-real/README.md) incorpora siete fotogramas reales de la web publicada. Su revisión visual está documentada por separado de las capturas de Safari de escritorio.
