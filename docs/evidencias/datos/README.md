# Revisión del Excel en Numbers

He abierto el XLSX de entrega en Apple Numbers para macOS y recorrido sus cuatro hojas. La guía muestra los resultados de las fórmulas: 148 vehículos, cuatro sedes y cuatro talleres. No se editaron celdas ni se guardó o convirtió el libro. El SHA-256 del original se conserva en [verificacion.json](verificacion.json).

Después de abrirlo, `npm run data:check` confirma que todas las filas y relaciones coinciden con los CSV. `npm run seed:check` valida los 148 vehículos, las cuatro sedes y los cuatro talleres sin escribir en Atlas. La importación en Numbers dispone de filas vacías de formato: no se cuentan como registros de datos.

## Guía y recuentos

<a href="01-guia-numbers.png"><img src="01-guia-numbers.png" alt="Guía abierta en Numbers y resultados de sus fórmulas" width="720"></a>

## Vehículos y ampliación

Estas vistas muestran una parte de las columnas y filas. La comparación automática cubre todos los datos, incluidas las claves de sede y las fuentes. Los campos vacíos de las unidades añadidas conservan el alcance de demostración explicado en la guía.

<a href="02-vehiculos-numbers.png"><img src="02-vehiculos-numbers.png" alt="Inicio del inventario del curso" width="720"></a>

<a href="03-ampliacion-lujo-numbers.png"><img src="03-ampliacion-lujo-numbers.png" alt="Transición a los modelos de lujo añadidos" width="720"></a>

## Sedes y talleres

Los talleres incluyen `dealershipKey`, relacionado con `seedKey` de Sedes. Las ubicaciones son ficticias y las especialidades se separan con `|` para su exportación.

<a href="04-sedes-numbers.png"><img src="04-sedes-numbers.png" alt="Cuatro sedes en Numbers" width="720"></a>

<a href="05-talleres-numbers.png"><img src="05-talleres-numbers.png" alt="Cuatro talleres y sus claves de sede" width="720"></a>

## Alcance

Esta evidencia acredita la apertura y visualización en Numbers y los resultados calculados que muestra la guía. No es una ejecución en Microsoft Excel ni una prueba de exportación CSV desde Numbers. Se mantiene el XLSX original y el proceso de exportación ya validado con el script del proyecto.

## English

The original delivery XLSX was opened and inspected in Apple Numbers on macOS. Its guide displays formula results of 148 vehicles, four dealerships and four workshops. No cells were edited and the workbook was not saved, converted or exported. The original file hash is unchanged. The data comparison and seed validation commands passed after opening it. These screenshots show selected visible rows and columns; the automated comparison covers the complete dataset and relationships. Microsoft Excel and CSV export from Numbers were not tested.
