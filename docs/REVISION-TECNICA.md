# Correcciones y revisión técnica

Las observaciones de mis profesores en proyectos anteriores me han servido para revisar KelseTS Cars antes de la entrega. He aplicado las que afectan a esta web y he comprobado el resultado con las pruebas y los recorridos documentados en la [memoria](../MEMORIA.md).

## Componentes y estilos

En otras entregas me señalaron archivos que reunían demasiadas responsabilidades y hojas CSS vacías o sin utilizar. Aquí he separado el catálogo en `CatalogHero`, `CatalogToolbar`, `CatalogFilters`, `VehicleCard` y `CatalogPagination`. Las citas utilizan `AppointmentRow`; el registro tiene componentes para elegir el perfil y completar los datos del taller. La red comparte `NetworkHero` y `NetworkCard`.

He revisado las importaciones de CSS y retirado los recursos sustituidos. Los estilos de acceso y cuentas están en `private.css`, y las tarjetas de barrio en `neighborhood.css`. Los colores y espaciados comunes se mantienen en `style.css`.

## Helpers y respuestas del backend

También me habían recomendado evitar helpers duplicados y simplificar los controladores. El escape de expresiones regulares tiene una sola implementación, y los tiempos de espera tienen constantes con nombre y unidades.

La sustitución de fotografías está en `replaceVehicleImage`: guarda la nueva referencia antes de retirar la anterior y restaura la referencia previa si falla el guardado. Solo elimina imágenes anteriores de la carpeta propia. Las pruebas cubren el orden de las operaciones y los fallos de guardado y limpieza. La respuesta de subida incluye la sede del vehículo, como la lectura de su ficha.

## Idiomas, estados y presentación

En un proyecto anterior aparecían los dos idiomas a la vez en el footer. En esta web se muestra únicamente el seleccionado. También he revisado las acciones de las citas: una visita completada ya no ofrece controles para modificarla y cada perfil recibe las acciones que le corresponden. Las pruebas de renderizado revisan estas condiciones; los recorridos del navegador están en los informes de evidencias.

He revisado los metadatos de descripción, viewport, favicon, Open Graph y tarjeta de Twitter. Las fotografías de terceros conservan sus fuentes y licencias, y las imágenes ilustrativas se identifican como referencias.

## Datos y accesos DEMO

El Excel está en `data/excel/`, junto a los CSV que utiliza la semilla. He comprobado que sus datos coinciden y que las relaciones son válidas. Las unidades del catálogo ampliado se distribuyen entre sedes; no son filas idénticas añadidas para alcanzar el mínimo.

Los cuatro accesos DEMO son de solo lectura. `authenticate` consulta el indicador de MongoDB y bloquea las escrituras antes de llegar a los controladores. Team DEMO consulta únicamente citas y solicitudes de los perfiles DEMO. La interfaz muestra el aviso y retira los controles de modificación.

## Comprobaciones

He ejecutado `npm test`, `npm run build`, `npm run data:check` y `npm run seed:check`. La suite local reúne 51 pruebas correctas; las dos integraciones opcionales tienen informes separados. La compilación mantiene los avisos de tamaño del paquete principal y de anotaciones de Zod.

Los resultados por entorno están en [Validación](VALIDACION.md). El [índice de evidencias](evidencias/README.md) reúne las capturas de Safari, la grabación del iPhone, Atlas, Insomnia, Mailtrap y Cloudinary.
