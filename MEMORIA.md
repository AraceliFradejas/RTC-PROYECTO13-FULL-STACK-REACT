# Memoria técnica · KelseTS Cars

## Datos del proyecto

| Dato | Información |
| --- | --- |
| Proyecto | Catálogo de vehículos y gestión de citas |
| Formación | TFM Rock The Code · The Power Tech School |
| Autora | Araceli Fradejas Muñoz |
| Tecnologías | JavaScript, Node.js, Express, React y MongoDB |
| Etapa | Base inicial · 3 de octubre de 2026 |
| Despliegue | Pendiente |
| Evolución posterior | TFM BigSchool con app y módulos específicos |

Esta memoria sigue la organización de [KelseTS Talks](https://github.com/AraceliFradejas/RTC-PROYECTO10-FULL-STACK-JAVASCRIPT/blob/main/MEMORIA.md). Recoge el estado real del trabajo: las pantallas creadas no equivalen a una integración comprobada, y las funcionalidades futuras se identifican como pendientes.

## 1. Contexto y motivación

He situado este TFM dentro de KelseTS, la marca ficticia con la que he dado identidad a varios proyectos del máster. KelseTS Cars aplica esa continuidad al automóvil, con una propuesta que combina catálogo, sedes y citas.

La idea inicial incluía una web comercial, áreas de clientes y colaboradores, personalización de vehículos y una futura aplicación. He dividido el trabajo en dos etapas para que la primera entrega responda estrictamente al enunciado de Rock The Code y la segunda desarrolle el alcance de BigSchool.

## 2. Objetivos

La primera etapa debe permitir consultar vehículos, acceder a una cuenta y gestionar citas con permisos. Su recorrido de datos será Excel → CSV → lectura con `fs` → validación → semilla → MongoDB → API → React.

Como objetivo de arquitectura, la app debe poder consultar la misma API y reutilizar los contratos y el cliente HTTP. Sus pantallas y las capacidades del dispositivo se desarrollarán en la segunda etapa.

## 3. Requisitos y cumplimiento

La [revisión del enunciado](docs/REVISION-ENTREGA.md) contiene el seguimiento. La estructura y las primeras pantallas existen; la entrega final, las integraciones y el despliegue todavía no están completos.

## 4. Tecnologías

Node.js y Express reciben las peticiones. Mongoose define usuarios, vehículos, sedes y citas. React compone la web con rutas y componentes. Zod expresa validaciones comunes sin depender de la interfaz.

El cliente HTTP se ha extraído a un paquete que recibe su URL base y su función `fetch`. Esta decisión permite probar las peticiones y reutilizarlas desde otra interfaz. Los hooks y contextos de React permanecen dentro de la web.

## 5. Arquitectura

El backend es un monolito modular: comparte despliegue y base de datos, pero agrupa modelos y controladores por dominio. La web utiliza `features` para separar marca, catálogo, acceso y citas. Las [decisiones de arquitectura](docs/ARQUITECTURA.md) explican cómo incorporar nuevos módulos.

`packages/contracts` contiene esquemas y valores comunes. `packages/api-client` centraliza peticiones, errores y cancelación. `apps/mobile` reserva la ubicación de la app y documenta lo que aún debe resolverse.

## 6. Flujo de la aplicación

La portada editorial permite conocer la marca y los modelos seleccionados. El catálogo consulta el inventario mediante la API. Una ficha enlaza con la solicitud de cita; si falta sesión, la navegación pasa por acceso y conserva el destino. El área personal consulta citas y permite solicitar su cancelación.

Estos recorridos están preparados en código y deben comprobarse con Atlas antes de calificarlos como funcionalidad integrada.

## 7. Modelos y relaciones

`Vehicle.dealership` referencia `Dealership`. `Appointment` referencia a usuario, vehículo y sede. `User.dealership` limita el ámbito de colaboradores. La relación entre vehículos y sedes cumple el planteamiento de dos colecciones de negocio independientes de los usuarios.

Un índice único parcial en las citas impide ocupar una misma sede y hora con dos citas activas. La cancelación mantiene el historial y libera la franja. El diseño inicial presupone un único puesto de atención por sede; la capacidad por empleado o taller se abordará como ampliación.

## 8. Datos y semilla

El CSV original contiene 100 registros de ejemplo. La normalización conserva precios y VIN originales como procedencia, sin convertirlos en datos reales verificados. El reparto entre cuatro sedes es una decisión de demostración. Los modelos sin fotografía específica utilizan una referencia local de su marca, identificada como tal.

La semilla valida datos y referencias antes de conectar a MongoDB. Su modo `--check` no escribe en la base de datos. La carga utiliza `seedKey` e inserta los registros que faltan, sin vaciar colecciones ni restablecer contraseñas.

He preparado un Excel con los 100 vehículos iniciales y 48 registros de doce modelos de gama alta, cuatro sedes y cuatro talleres relacionados. He comprobado todos sus datos frente a los CSV, exportado las hojas y repetido la semilla en Atlas. La [guía de datos](docs/DATOS-EXCEL.md) explica sus claves y el proceso de exportación. Los modelos añadidos tienen fuente oficial para carrocería y motorización; los datos de cada unidad quedan pendientes. Falta revisar el libro en Excel de escritorio.

### Ampliación del catálogo y relación con la propuesta

El inventario del curso me permite trabajar con los datos y sus relaciones, pero quería que el catálogo también reflejara la temática que he elegido para KelseTS Cars. Por eso he añadido ejemplos de vehículos de gama alta de Porsche, Ferrari, Mercedes-Benz, Audi y Tesla. La intención es que la identidad de la marca tenga continuidad al pasar de la portada a la búsqueda de vehículos, sus fichas y la organización de una visita.

La ampliación incluye doce modelos, con un registro de demostración por modelo en cada una de las cuatro sedes: 48 registros nuevos y 148 en total. Conservo los 100 ejemplos iniciales para mantener su procedencia. Los nuevos registros se preparan en el mismo Excel, se exportan a CSV y se cargan mediante la semilla con lectura de archivos de Node.js. Todos mantienen su referencia al concesionario, de modo que la ampliación forma parte del recorrido de datos exigido en el TFM.

He separado los datos del modelo de los datos de una unidad concreta. El nombre, la carrocería y la motorización se han contrastado con fuentes oficiales; el reparto entre sedes y la disponibilidad pertenecen a la demostración. Año, kilometraje, precio, VIN y fecha de adquisición quedan vacíos cuando no están verificados. La interfaz los identifica como pendientes y no interpreta un kilometraje vacío como cero. Las fotografías locales se presentan como referencias de la marca, sin afirmar que correspondan a esas unidades.

## 9. Seguridad y permisos

El registro fuerza el rol `client`; el servidor no acepta un rol arbitrario enviado por la interfaz. Las contraseñas se resumen con bcrypt. La cookie de sesión es `HttpOnly` y las escrituras comprueban el origen permitido.

El cliente solo puede cancelar citas propias. El personal consulta y gestiona su sede; la administradora dispone de acceso global. Los archivos de imagen tienen límite de tamaño y comprobación de cabecera. Las integraciones y los casos negativos necesitan validación contra la base de datos.

## 10. Hooks y experiencia de usuario

### Clientes, talleres colaboradores y comunicaciones

He añadido dos tipos de registro porque la relación con el cliente continúa después de elegir el coche. Un taller puede indicar su ubicación y sus especialidades de revisión, mecánica, chapa y pintura, lunas o eléctricos. La solicitud queda pendiente hasta que una administradora la revise; registrarse no concede acceso a datos de clientes. La aprobación activa el perfil profesional, pero Team puede asignar citas de mantenimiento a talleres aprobados, y el taller consulta únicamente las citas que le corresponden. El seguimiento de reparaciones y siniestros todavía requiere un módulo posterior.

Para comunicar cada resultado he adaptado la idea que utilicé en [KelseTS Talks, otro proyecto de mi portfolio](https://github.com/AraceliFradejas/RTC-PROYECTO10-FULL-STACK-JAVASCRIPT/blob/main/docs/CORREO.md). Allí probé correos en Mailtrap Sandbox. En Cars los mensajes se guardan en una bandeja privada de demostración y se pueden generar muestras HTML locales, sin envío real. Hay bienvenida de cliente, recepción y resultado de solicitudes de talleres, y comunicaciones de solicitud, confirmación, cancelación y finalización de citas.

Las referencias de Renault y Línea Directa me han servido para organizar la posventa y las especialidades, manteniendo la identidad propia de KelseTS. La [justificación, los permisos y las pruebas](docs/COMUNICACIONES-Y-TALLERES.md) explican qué está implementado y qué queda para después. `Workshop` referencia a su usuario y `Message` a su destinatario. Las altas y los cambios se guardan con sus comunicaciones en una transacción para evitar que aparezca un mensaje de éxito sin haberse completado la operación.

`useResource` combina `useReducer`, cancelación mediante `AbortController` y reintento. Evita que una respuesta anterior actualice una pantalla después de cambiar filtros o ruta. `AuthProvider` comparte el estado de sesión sin copiarlo en cada página.

La búsqueda libre sugiere marcas y modelos del inventario mientras se escribe. Permite seleccionar con las flechas y Enter, cerrar con Escape o mantener el texto libre. El componente reutiliza la carga cancelable y memoriza las coincidencias; no hace una petición por cada tecla. Sigue las pautas del [patrón combobox de W3C](https://www.w3.org/WAI/ARIA/apg/patterns/combobox/), sin considerarlo una auditoría completa de accesibilidad. Las sugerencias ocupan espacio en la página para que no tapen el contador ni las tarjetas.

La interfaz diferencia carga, error y ausencia de resultados. Las variables en `style.css` definen colores y espaciados. Se incluyen enlaces para saltar al contenido, etiquetas de formulario, foco visible y reducción de movimiento. Esto constituye una base de accesibilidad, no una auditoría completa.

## 11. Diseño y recursos

La dirección visual utiliza verde profundo, marfil, acentos cálidos, fotografías grandes y una combinación de tipografía de interfaz y editorial. Las referencias de fabricantes sirven para estudiar jerarquía, navegación y presentación de modelos. KelseTS Cars conserva su propio nombre, composición y textos.

La biblioteca contiene 80 fotografías reales con autor, licencia y enlace de origen. La última ampliación añade 38 imágenes de los doce modelos de gama alta, revisadas visualmente y documentadas en la [galería de vehículos](docs/GALERIA-VEHICULOS.md). La asignación prioriza el modelo y mantiene la misma fotografía en tarjeta y ficha. Son imágenes ilustrativas; no acreditan el acabado, año ni color de las unidades de ejemplo.

## 12. Pruebas y evidencias

Las comprobaciones de esta base se registran en [VALIDACION.md](docs/VALIDACION.md). El registro, las citas, la aprobación de talleres y sus permisos se han probado mediante la API en una base temporal de Atlas, eliminada al terminar. El recorrido completo desde los formularios, las subidas a Cloudinary y la producción siguen pendientes.

Las evidencias de la entrega final deberán diferenciar pruebas locales, integración con servicios y recorrido manual del despliegue, siguiendo la presentación utilizada en mis proyectos anteriores.

## 13. Evolución posterior

Después de entregar Rock The Code se abordarán la app, el configurador y otros módulos de BigSchool. El control remoto de un vehículo requeriría integraciones y permisos reales del fabricante; no se simulará como una función operativa.

## 14. Aprendizaje y próximos pasos

La decisión inicial es separar la lógica compartida de la plataforma. Atlas y el Excel relacionado ya permiten cargar el inventario inicial. Los siguientes pasos son configurar Cloudinary, completar la versión bilingüe y las pruebas de entrega y publicar ambas aplicaciones.

## Desarrollo de las secciones editoriales

La portada incorpora servicios, conducción, movilidad eléctrica, historias de marca, acceso al área personal y preguntas frecuentes. Servicios explica los pasos para solicitar una visita y Nuestra esencia desarrolla la identidad. Se reutilizan los componentes de panel editorial, servicios, historias y preguntas. La sección eléctrica enlaza al filtro de motorización del catálogo.

Las imágenes aportadas sirven como referencias de dirección visual. Las secciones utilizan nuevas escenas conceptuales creadas sin textos incorporados. La [organización de referencias](docs/SECCIONES.md) recoge el destino de cada imagen y los módulos reservados para BigSchool. No se presentan app, financiación, configurador o reseñas reales como funcionalidades terminadas.


## Red de talleres y acceso Team · 4 de octubre de 2026

He añadido KelseTS Cars Team como acceso interno. Las cuentas no se registran públicamente y los permisos se comprueban en el backend. La red parte de cuatro talleres ficticios próximos a las cuatro sedes, cargados desde un nuevo CSV y visibles en el mapa con un color distinto. Cada taller inicial referencia su concesionario, y la cita puede relacionar a cliente, vehículo, sede y taller mediante `Appointment.workshop`. Los talleres registrados solo consultan sus asignaciones, sin acceso a la agenda general. Los talleres de demostración no tienen credenciales ni cuenta de usuario. La documentación distingue coordinación de citas de la futura gestión de reparaciones.

### Identidad visual de las muestras de correo

He mantenido el mismo logotipo de la web en los correos, exportándolo desde el SVG para conservar la corona y el trazo TS. El footer reúne el lema de KelseTS Cars, las cuatro ciudades y los accesos a la web. He preparado diez imágenes conceptuales exclusivas, una para cada comunicación, sin repetir las fotografías de las secciones. Una confirmación presenta la bienvenida en la sede; una asignación muestra la coordinación del cuidado del vehículo; una cancelación deja una escena tranquila, sin transmitir urgencia. El contenido sigue adaptándose al destinatario y al estado de su solicitud o cita. En Mailtrap las imágenes se adjuntan al mensaje, de forma que la vista previa no depende de mi servidor local. Esta prueba revisa muestras; los eventos de la aplicación siguen registrando comunicaciones en su bandeja privada.

### Comprobación de las comunicaciones en Mailtrap

El 4 de octubre he enviado las diez muestras al Sandbox y he comprobado su recepción consultando la API. He guardado el HTML y el texto recibidos, la fecha y el identificador de cada mensaje. El texto coincide con la plantilla actual y los cinco enlaces de cada HTML apuntan a la web configurada. La versión de texto incluye también el footer, para conservar la información cuando no se muestran imágenes.

Las [evidencias](docs/evidencias/README.md) distinguen las vistas locales de los mensajes descargados del Sandbox. La bienvenida tiene capturas de escritorio y del preset móvil de Mailtrap. Falta revisar todos los tipos en móvil y probar clientes de correo reales. El análisis de Mailtrap señala estilos que algunos clientes pueden interpretar de otra forma; no lo considero una prueba de compatibilidad universal. Estas muestras no envían correo a buzones personales ni demuestran un envío automático desde un evento de la aplicación.
