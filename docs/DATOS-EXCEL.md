# Del Excel a MongoDB

El libro [KelseTS-datos.xlsx](../outputs/kelsets-tfm/KelseTS-datos.xlsx) contiene 148 vehículos, cuatro sedes y cuatro talleres, además de una guía con recuentos calculados. Las hojas de datos tienen filtros y cabeceras inmovilizadas.

La hoja Vehículos conserva los 100 registros del ejemplo del curso y añade 48 registros de demostración: doce modelos Porsche, Ferrari, Mercedes-Benz, Audi y Tesla repartidos entre las cuatro sedes. Carrocería y motorización tienen fuente oficial en `sourceUrl`. Año, kilometraje, precio, VIN y adquisición de las unidades añadidas se dejan vacíos cuando no están contrastados. Las sedes, talleres y disponibilidad son ficticios. Los datos del ejemplo no representan unidades reales a la venta.

## Relaciones

`seedKey` identifica cada fila de su colección. `dealershipKey`, tanto en Vehículos como en Talleres, debe coincidir con un `seedKey` de Sedes. Al cargar la semilla, esa referencia se sustituye por el `_id` del concesionario en MongoDB. Los usuarios y las citas se crean desde la aplicación y no necesitan datos personales en el Excel.

La fila 1 de cada hoja contiene los nombres de campo utilizados por la semilla. Las claves, precios originales y VIN son texto. Año y kilometraje son números; las coordenadas también. Las fechas de adquisición se conservan como texto ISO `AAAA-MM-DD` para evitar conversiones de zona horaria. `demo` contiene el texto `true`. Las especialidades del taller se separan con `|`.

## Exportación y validación

Desde la raíz del proyecto:

```bash
npm run data:check   # comprueba el libro frente a los CSV, sin cambiarlos
npm run data:export  # exporta sus tres hojas y valida antes de escribir los CSV
npm run seed:check   # valida los CSV con fs, sin conectar a MongoDB
npm run seed         # carga en la base configurada en backend/.env
```

El exportador lee el XLSX con [ExcelJS](https://github.com/exceljs/exceljs#reading-xlsx) y prepara CSV UTF-8 con comas y campos entrecomillados. Conserva campos vacíos y escapa las comillas del contenido. Valida claves únicas, mínimo de vehículos, tipos y referencias usando la misma función que la semilla. Una validación fallida impide escribir los CSV. Las hojas de datos admiten valores simples; el exportador rechaza fórmulas o enlaces incrustados en sus celdas.

La lectura adapta en memoria los prefijos XML y las relaciones absolutas del XLSX para compatibilidad con ExcelJS. No modifica el libro. JSZip se utiliza para esa lectura del contenedor ZIP. Ambas dependencias son herramientas de desarrollo.

También se puede guardar cada hoja de datos como CSV UTF-8 desde Excel. Hay que conservar las cabeceras y usar coma como separador, no punto y coma. No se exporta la hoja Guía. Antes de cargar archivos editados, ejecutar siempre `seed:check`.

La semilla lee los CSV mediante `node:fs/promises`, valida los datos y utiliza `seedKey` para evitar duplicados. Conserva los vehículos existentes y sus imágenes; actualizar una fila del Excel no modifica automáticamente un vehículo ya cargado. Las sedes sí se actualizan al repetir la carga. Los talleres iniciales se insertan solo si faltan. No se eliminan cuentas ni se restablecen contraseñas.

## Comprobación del 4 de octubre de 2026

Se han revisado las cuatro hojas mediante renderizado y los recuentos calculados dan 148, 4 y 4. La comparación completa de los datos del Excel y los CSV pasa. Se han exportado los tres CSV, validado con `seed:check` y repetido la carga en Atlas con éxito. Las 21 pruebas locales pasan; esta ronda omite la integración opcional de Atlas. La apertura en Numbers se documenta en la revisión del 10 de octubre. La búsqueda Porsche y la ficha del 911 Carrera se han revisado en Safari; se ha guardado una captura.

## Apertura en Numbers · 10 de octubre de 2026

Se han abierto las cuatro hojas del XLSX original en Numbers para macOS. La guía muestra las fórmulas con resultados 148, 4 y 4. La comparación completa `data:check` y la validación `seed:check` pasan. El archivo mantiene su SHA-256: no se editaron celdas ni se guardó una conversión. Las [cinco capturas y el informe](evidencias/datos/README.md) documentan la comprobación. No se ha ejecutado Microsoft Excel ni exportado CSV desde Numbers; la entrega conserva el XLSX y el exportador del proyecto.
