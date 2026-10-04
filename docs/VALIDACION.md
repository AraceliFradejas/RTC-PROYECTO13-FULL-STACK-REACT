# Validación de la base inicial

## Conexión e importación en Atlas · 3 de octubre de 2026

Se ha comprobado la conexión local a Atlas mediante ping. La semilla se ha ejecutado dos veces: después de ambas ejecuciones hay 100 vehículos, 4 sedes y 100 claves de vehículo únicas, sin referencias de sede ausentes. El endpoint local `GET /api/v1/vehicles` devuelve HTTP 200, total 100, 12 resultados en la primera página y la sede relacionada incluida. Estas comprobaciones no acreditan todavía autenticación, citas ni despliegue. El inventario cargado es el CSV inicial; el Excel definitivo y su revisión siguen pendientes.

Comprobaciones locales del 3 de octubre de 2026: `npm run build` completado, `npm test` con **15 pruebas superadas** (8 backend, 3 horario de interfaz y 4 cliente HTTP) y `npm run seed:check` con **100 vehículos y 4 sedes relacionadas**. Atlas, Cloudinary y producción no se han validado todavía.

## Alcance de las comprobaciones

- Contratos: rechazo de roles arbitrarios y entradas de cita no válidas.
- API: salud sin base de datos y rechazo de escritura desde un origen no permitido.
- Cliente compartido: serialización, errores, cancelación y transporte de archivos.
- Citas: límites de fecha y conversión del horario de Madrid en verano e invierno.
- CSV: conteo, claves únicas y referencias de sede.
- Web: compilación y revisión visual de la portada y los créditos.

La portada se ha abierto en Safari y se ha inspeccionado una captura de escritorio: logo, navegación, textos y fotografía principal visibles. Las cinco fotografías se han inspeccionado individualmente. El PNG del logo tiene canal alfa y se ha comprobado integrado en la cabecera; el pie se ha integrado en código pero no se ha revisado visualmente todavía. La revisión móvil y el recorrido de la página de créditos siguen pendientes.

Las pruebas de API locales que no utilizan MongoDB no acreditan registro, login, autorización sobre registros ni reservas concurrentes.

## Revisión de los recursos aportados · 3 de octubre de 2026

La compilación pasa tras integrar el logo SVG, el vídeo conceptual y la escena del showroom. En Safari de escritorio se ha comprobado la reproducción del hero, el cambio de los controles entre pausar y reanudar, el logo sobre el fondo oscuro y la sección de marca. La revisión móvil sigue pendiente.

La mejora de nitidez compila correctamente. Se ha inspeccionado el showroom reconstruido tanto como archivo como integrado en Safari de escritorio. Se reduce el zoom de las animaciones para evitar ampliaciones adicionales.

## Ampliación de secciones

La compilación de la portada ampliada, Servicios y Nuestra esencia pasa. En Safari de escritorio se ha revisado la página Servicios, abierto una pregunta frecuente y comprobado la navegación desde el bloque eléctrico al catálogo con Motorización = Eléctrico. La consulta de inventario devuelve un error porque la API no está disponible; no se da por probado el resultado de la búsqueda contra Atlas. La comprobación móvil y las citas integradas permanecen pendientes.

La sustitución de las ocho escenas compila correctamente. Se han inspeccionado individualmente los ocho archivos para comprobar composición, ausencia de textos y detalle. Safari muestra la escena eléctrica nueva integrada y confirma la carga del showroom tras recargar.

La serie de profesionales incorpora cuatro imágenes inspeccionadas individualmente: asesoramiento, taller, revisión técnica y entrega. La compilación pasa. Se ha revisado en Safari la integración del taller y la técnica en Servicios.

## Sedes y mapa · 3 de octubre de 2026

Las cuatro sedes se han actualizado en Atlas con direcciones inventadas, zonas y coordenadas aproximadas. Safari muestra las direcciones servidas por la API y el mapa Leaflet/OpenStreetMap con los cuatro puntos. La fórmula de distancia se ha comprobado con puntos iguales (0 km) y Madrid–Barcelona (unos 498 km en línea recta). La geolocalización requiere una acción y permiso del visitante; no se ha concedido acceso a la ubicación personal durante esta comprobación. Se gestionan permiso denegado, tiempo agotado y navegador sin geolocalización.

## Clientes, talleres y Team · 4 de octubre de 2026

La compilación pasa y las pruebas ordinarias suman 18 resultados correctos; la integración de Atlas se omite en esa ejecución. Activada por separado, la integración ha pasado contra una base temporal eliminada al terminar: registro, duplicados, acceso por perfil, aprobación y rechazo, permisos, asignación de mantenimiento y mensajes privados de solicitud, asignación, confirmación y cancelación. También comprueba que un taller no recibe el correo del cliente ni puede consultar la agenda general.

La semilla ha cargado cuatro talleres ficticios relacionados con las cuatro sedes. En Safari se han comprobado los tres accesos y las ocho tarjetas del directorio con el mapa. No se ha concedido geolocalización durante esta revisión. El recorrido completo de formularios en navegador, la revisión móvil, Cloudinary y el despliegue siguen pendientes. Las comunicaciones son registros simulados; no se ha enviado ningún correo.

El acceso y el panel de Team incorporan un hero compacto y títulos reducidos. Ambos se han revisado visualmente en Safari de escritorio. El formulario se ha separado del marco de la página para reutilizarlo en futuras vistas web; una aplicación nativa requerirá su propia interfaz. Los estilos incluyen adaptación móvil y controles táctiles de 44–48 px; su revisión en dispositivo sigue pendiente.

## Colección de Insomnia · 4 de octubre de 2026

Se han verificado el JSON, las referencias internas y la sintaxis de los scripts de las 78 peticiones. Las 76 del recorrido principal y sus scripts se han ejecutado con un adaptador local sobre Supertest contra una base temporal de Atlas: 76 respuestas y 171 comprobaciones correctas. Esa base se ha eliminado al terminar. No se han utilizado las credenciales Team personales ni se ha llamado a Cloudinary. Esta ejecución valida los casos y los scripts, pero no sustituye la importación, las cookies ni el ejecutor de la aplicación Insomnia, que siguen pendientes de comprobar allí.

El formulario de cita ahora muestra vehículo y sede, comprueba la selección, limita el calendario y explica el estado pendiente de confirmación. La compilación y las tres pruebas existentes del horario de Madrid pasan; el envío completo desde ese formulario continúa pendiente.

## Heroes privados y muestras de correo · 4 de octubre

Acceso, cliente, taller, Team y solicitud de cita utilizan un hero compartido con imágenes distintas por vista. Se han inspeccionado los cuatro recursos nuevos. Los títulos privados están acotados y los estilos contemplan textos largos, acciones, campos y especialidades en pantallas estrechas. Safari se ha revisado en una ventana de 574 px para Team y solicitud de cita, además de escritorio; falta comprobar cliente y taller con sesión propia y tamaños de 320/390 px, tablet y dispositivos reales. No se considera todavía validado un responsive completo.

Se han generado diez muestras HTML locales. El comando de Mailtrap usa exclusivamente Email Sandbox, datos ficticios y las mismas plantillas; falta configuración privada para capturarlas allí. Las 19 pruebas locales pasan (12 backend, 3 frontend y 4 cliente HTTP), con la integración Atlas omitida en esa ronda.

## Revisión con perfiles propios y archivos de evidencia · 4 de octubre

Se han preparado dos cuentas ficticias identificadas como revisión visual en la base de desarrollo: cliente y taller aprobado. No se han publicado sus datos en el mapa ni se ha enviado correo. Su preparación directa sirve para revisar diseño y no acredita el formulario de registro ni la aprobación desde Team.

Se ha iniciado sesión desde Safari con cada perfil. Cliente: hero, saludo, agenda vacía y apertura de la bienvenida en la bandeja. Taller: hero, solicitud aprobada, información profesional, agenda propia vacía y dos comunicaciones disponibles. Ambos se han inspeccionado en escritorio y ventana de 574 px; los perfiles más estrechos y dispositivos reales siguen pendientes. Las cuentas permanecen disponibles para continuar la revisión.

Las diez muestras locales están en [evidencias/correos](evidencias/README.md). La de asignación se ha abierto e inspeccionado visualmente en Safari: nombre, vehículo, taller, sede y hora de Madrid visibles. Se ha añadido la fecha a las comunicaciones de asignación. Los enlaces relativos de archivos locales son orientativos y no se consideran probados.

## Recorrido de mantenimiento en navegador · 4 de octubre

En Safari de escritorio se ha completado: acceso del cliente, catálogo, ficha, solicitud de mantenimiento para Acura MDX en Málaga el 7 de octubre a las 10:00, asignación desde Team, confirmación, consulta de la agenda del taller y cierre desde Team. Cliente y taller muestran el estado Completada y sus mensajes de cierre. La agenda del taller muestra el nombre del cliente sin su correo. Se han guardado siete [capturas del recorrido](evidencias/README.md). La visita se ha cerrado anticipadamente como simulación; no representa un mantenimiento real.

El backend ahora rechaza completar una cita pendiente, sin modificarla ni crear mensajes. La integración comprueba también el cierre válido de una confirmada y el rechazo de un segundo cierre sin duplicar comunicaciones. Las 14 pruebas del backend, incluida Atlas, pasan contra una base temporal eliminada al terminar. La creación y aprobación manual de talleres en navegador, el responsive completo y Mailtrap siguen pendientes.

## Excel, CSV y semilla · 4 de octubre

El [libro de datos](../outputs/kelsets-tfm/KelseTS-datos.xlsx) contiene 100 vehículos, cuatro sedes y cuatro talleres. Se han revisado las cuatro hojas mediante renderizado y los recuentos calculados. `data:check` compara todas las filas y sus relaciones con los CSV normalizados. Ha pasado antes y después de `data:export`. `seed:check` pasa y la semilla se ha repetido en Atlas con los archivos exportados, conservando vehículos existentes. Esta versión contiene el inventario inicial del curso; la ampliación de lujo y la comprobación en Excel de escritorio siguen pendientes. La [guía](DATOS-EXCEL.md) permite reproducir el proceso.

## Ampliación del catálogo · 4 de octubre

El Excel incorpora 48 registros de demostración de doce modelos de gama alta. Carrocería y motorización tienen fuente oficial; año, kilometraje, precio, VIN y adquisición permanecen ausentes. La exportación y comparación completa pasan con 148 vehículos, cuatro sedes y cuatro talleres. La semilla termina correctamente en Atlas. La API local responde 200 y devuelve 148 vehículos, 16 Porsche, 8 Ferrari y 4 resultados para Porsche Taycan. Las fotografías locales de referencia están asignadas a los 48 registros.

Pasan 21 pruebas ordinarias (14 backend, 3 frontend y 4 cliente HTTP) y la compilación. La integración opcional de Atlas se omite en esta ronda; su ejecución anterior está documentada por separado. La ficha muestra carrocería, motorización y enlace a la fuente. En Safari se han comprobado la búsqueda Porsche, las fotografías de referencia y la ficha del 911 Carrera. En ventana de 574 px se ha ajustado la cuadrícula de datos a dos columnas y guardado una captura. Esto no sustituye la revisión completa de 320/390 px y tablet. Excel de escritorio sigue pendiente.

## Biblioteca de fotografías · 4 de octubre

Se han descargado 51 candidatas y revisado visualmente todas mediante hojas de contacto. Se incorporan 38 y se descartan 13. La biblioteca suma 80 fotografías distintas con autor, fuente y licencia completos; se ha corregido una atribución vacía de una referencia anterior de Dodge. Los 38 archivos nuevos y sus copias pequeñas se han abierto para comprobar formato y dimensiones reales de srcSet. Las 148 asignaciones referencian archivos existentes y respetan su marca; los 48 registros nuevos tienen fotografía de su modelo.

En Safari se han inspeccionado la nueva foto del 911 Carrera en su ficha y la tarjeta del Ferrari 296 GTB. Se muestra la etiqueta del modelo, con aviso de que versión y año pueden diferir. La cuadrícula del catálogo conserva el vehículo completo mediante encuadre contenido. La compilación pasa. Las fotografías subidas desde un servicio externo conservan prioridad. Las fuentes y licencias se recogen en GALERIA-VEHICULOS.md y en la página de créditos.

## Buscador con sugerencias · 4 de octubre

Se separa el contador del formulario y se muestra una lista de sugerencias dentro del flujo de la página. El endpoint público /vehicles/search-options devuelve 56 combinaciones únicas de marca y modelo del inventario; no devuelve datos de clientes ni unidades completas. La web carga esa lista y filtra localmente mientras se escribe, con un máximo de ocho propuestas. Si falla la carga, se conserva la búsqueda libre y se reintenta al volver a enfocar el campo.

En Safari de escritorio se han comprobado sugerencias para au y tay, selección de Audi Q5 mediante dos flechas abajo y Enter (dos resultados), selección de Porsche Taycan con ratón (cuatro resultados), Escape sin borrar texto y búsqueda libre sin coincidencias (cero resultados). El foco permanece en el campo al seleccionar. Se ha inspeccionado el contador visible con y sin lista de sugerencias. La revisión táctil y de lectores de pantalla sigue pendiente.

Pasan las tres pruebas nuevas de coincidencias, marcas únicas, acentos y texto libre, las tres pruebas existentes del frontend, 14 del backend y cuatro del cliente HTTP: 24 en total. La integración opcional de Atlas se omite en esta ronda. La compilación pasa.

## Equilibrio de los modos de búsqueda · 4 de octubre

Búsqueda libre y filtros comparten un panel con explicación de sus ventajas. Campos y botones tienen una altura mínima de 56 px y tipografía de 1 rem. Los tres filtros ocupan columnas amplias y sus acciones van en una fila propia; los estilos pasan a dos columnas en tablet y una en pantallas estrechas. En Safari se han inspeccionado ambos modos y el contador separado. Se ha corregido la apariencia nativa de los selectores para que Safari respete su altura. La revisión táctil completa sigue pendiente.

## Comunicaciones con identidad de marca · 4 de octubre

Las diez muestras definitivas se han enviado y recibido en Mailtrap Sandbox. Se han descargado HTML y texto mediante una consulta de lectura y verificado los diez textos contra las plantillas actuales. Cada HTML contiene las dos referencias CID previstas y cinco enlaces al origen web configurado. Los identificadores, fechas y hashes se guardan en [verificacion.json](evidencias/mailtrap/verificacion.json); los cuerpos recibidos están en evidencias/mailtrap/recibidos.

El logo conserva el SVG de la web y cada tipo tiene una fotografía conceptual exclusiva. Hay capturas de la bienvenida en escritorio y en el preset Phone de Mailtrap. La captura de texto anterior se conserva como evidencia de una versión previa y no representa el footer de texto definitivo. El análisis HTML de Mailtrap detecta estilos con soporte desigual: no se han probado clientes de correo reales. Quedan pendientes la revisión móvil de los demás tipos y la comprobación real en Gmail/Outlook.

La suite de esta ronda pasa con 24 pruebas ordinarias y una integración opcional de Atlas omitida; la salida está en [pruebas-comunicaciones-2026-10-04.txt](evidencias/pruebas-comunicaciones-2026-10-04.txt). Las muestras utilizan destinatarios ficticios y no activan correo automático en los eventos de la aplicación.
