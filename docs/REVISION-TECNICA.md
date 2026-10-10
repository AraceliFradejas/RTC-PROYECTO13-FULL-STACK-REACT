# Revisión técnica · 10 de octubre de 2026

La revisión aplica los criterios de mantenimiento, reutilización, claridad y coherencia entre la interfaz y los datos.

| Aspecto | Resultado |
| --- | --- |
| Componentización | El catálogo separa `CatalogHero`, `CatalogToolbar`, `CatalogFilters`, `VehicleCard` y `CatalogPagination`. Las citas utilizan `AppointmentRow`. Registro separa `AccountTypeSelector` y `WorkshopRegistrationFields`. La red utiliza `NetworkHero` y `NetworkCard`. |
| Lectura del código | El JSX está distribuido en líneas con sangría. Los componentes se separan por responsabilidad; la longitud de un archivo no sustituye este criterio. |
| Estilos | Todos los CSS se importan y ninguno está vacío. `private.css` reúne acceso y cuentas; `neighborhood.css` recoge las tarjetas del barrio. Se conserva el orden de la cascada. |
| Recursos sin uso | Se retiran del directorio público el vídeo de conducción anterior, showroom-clean y las dos propuestas PNG de logo sustituidas por el SVG. Los prompts y créditos de las imágenes se conservan. |
| Metadatos | El documento tiene descripción, viewport, color de tema, favicon, Open Graph y tarjeta de Twitter. Los metadatos iniciales describen la marca y su carácter académico. |
| Idioma | El footer utiliza únicamente el idioma seleccionado. Una prueba comprueba ambas versiones. |
| Constantes | El umbral de desplazamiento del header y los tiempos de geolocalización y del comando Sandbox tienen nombres y unidades. |
| Helpers | El escape de expresiones regulares tiene una única implementación. Se retiran constantes de contratos sin uso y se mantienen privados los helpers que solo se utilizan dentro de su módulo. |
| Datos | No hay filas idénticas salvo su clave en el CSV de vehículos. Las variantes de un modelo se relacionan con sedes; no se contabilizan copias idénticas para alcanzar el mínimo. |
| Respuestas relacionadas | La subida de fotografía devuelve el vehículo con su sede poblada, igual que la lectura de la ficha. Los campos relacionados de talleres y citas se seleccionan según sus permisos. |
| Sustitución de imágenes | `replaceVehicleImage` guarda primero la nueva referencia. Si Atlas falla, restaura la referencia previa y solicita la eliminación de la nueva subida. Solo retira imágenes anteriores de la carpeta propia. Si falla una limpieza, conserva el error original o la ficha ya guardada y registra un aviso. |
| Estados de la interfaz | Las acciones de Team corresponden a Pendiente o Confirmada. Una cita completada no conserva botones de modificación. Cliente solo recibe la cancelación de su cita activa. Los permisos reales siguen verificándose en el servidor. |

## Validación

- `npm test`: 44 pruebas correctas, con dos integraciones opcionales omitidas en esta ronda local.
- Cuatro pruebas nuevas cubren el orden de guardado y limpieza, el fallo de guardado, los recursos ajenos y el fallo de limpieza de la imagen anterior.
- Tres pruebas nuevas comprueban el renderizado por idioma y los controles de citas. Utilizan renderizado estático de React; no simulan clics ni sustituyen las evidencias de navegación en Safari.
- `npm run build`: compilación correcta. Se mantiene el aviso de tamaño del paquete principal y los avisos de anotaciones de Zod.
- `npm run seed:check`: 148 vehículos, cuatro sedes y cuatro talleres con relaciones válidas.
- `npm run data:check`: coincidencia completa entre Excel y CSV.

Esta revisión se realiza sobre el código local. Las capturas y las pruebas de Vercel documentan sus versiones y entornos por separado en el [índice de evidencias](evidencias/README.md).
