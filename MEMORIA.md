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

El CSV original contiene 100 registros de ejemplo. La normalización conserva precios y VIN originales como procedencia, sin convertirlos en datos reales verificados. El reparto entre cuatro sedes es una decisión de demostración. Los modelos sin fotografía revisada quedan sin imagen.

La semilla valida datos y referencias antes de conectar a MongoDB. Su modo `--check` no escribe en la base de datos. La carga utiliza `seedKey` e inserta los registros que faltan, sin vaciar colecciones ni restablecer contraseñas.

El Excel definitivo y la ampliación del catálogo con marcas de lujo están pendientes. No se afirma todavía haber completado el requisito Excel → CSV.

## 9. Seguridad y permisos

El registro fuerza el rol `client`; el servidor no acepta un rol arbitrario enviado por la interfaz. Las contraseñas se resumen con bcrypt. La cookie de sesión es `HttpOnly` y las escrituras comprueban el origen permitido.

El cliente solo puede cancelar citas propias. El personal consulta y gestiona su sede; la administradora dispone de acceso global. Los archivos de imagen tienen límite de tamaño y comprobación de cabecera. Las integraciones y los casos negativos necesitan validación contra la base de datos.

## 10. Hooks y experiencia de usuario

`useResource` combina `useReducer`, cancelación mediante `AbortController` y reintento. Evita que una respuesta anterior actualice una pantalla después de cambiar filtros o ruta. `AuthProvider` comparte el estado de sesión sin copiarlo en cada página.

La interfaz diferencia carga, error y ausencia de resultados. Las variables en `style.css` definen colores y espaciados. Se incluyen enlaces para saltar al contenido, etiquetas de formulario, foco visible y reducción de movimiento. Esto constituye una base de accesibilidad, no una auditoría completa.

## 11. Diseño y recursos

La dirección visual utiliza verde profundo, marfil, acentos cálidos, fotografías grandes y una combinación de tipografía de interfaz y editorial. Las referencias de fabricantes sirven para estudiar jerarquía, navegación y presentación de modelos. KelseTS Cars conserva su propio nombre, composición y textos.

Cinco fotografías reales se han incorporado con autor, licencia y enlace de origen. Tres corresponden a modelos del CSV y dos a la selección editorial de lujo. Son imágenes ilustrativas; no acreditan el acabado, año ni color de las unidades de ejemplo.

## 12. Pruebas y evidencias

Las comprobaciones de esta base se registran en [VALIDACION.md](docs/VALIDACION.md). No se han ejecutado todavía registros, reservas ni subidas reales contra Atlas y Cloudinary. Tampoco existen capturas de producción.

Las evidencias de la entrega final deberán diferenciar pruebas locales, integración con servicios y recorrido manual del despliegue, siguiendo la presentación utilizada en mis proyectos anteriores.

## 13. Evolución posterior

Después de entregar Rock The Code se abordarán la app, el configurador y otros módulos de BigSchool. El control remoto de un vehículo requeriría integraciones y permisos reales del fabricante; no se simulará como una función operativa.

## 14. Aprendizaje y próximos pasos

La decisión inicial es separar la lógica compartida de la plataforma. Los siguientes pasos son cerrar el catálogo definitivo, crear el Excel relacionado, configurar Atlas y Cloudinary, comprobar los recorridos completos y publicar ambas aplicaciones.

## Desarrollo de las secciones editoriales

La portada incorpora servicios, conducción, movilidad eléctrica, historias de marca, acceso al área personal y preguntas frecuentes. Servicios explica los pasos para solicitar una visita y Nuestra esencia desarrolla la identidad. Se reutilizan los componentes de panel editorial, servicios, historias y preguntas. La sección eléctrica enlaza al filtro de motorización del catálogo.

Las imágenes aportadas sirven como referencias de dirección visual. Las secciones utilizan nuevas escenas conceptuales creadas sin textos incorporados. La [organización de referencias](docs/SECCIONES.md) recoge el destino de cada imagen y los módulos reservados para BigSchool. No se presentan app, financiación, configurador o reseñas reales como funcionalidades terminadas.
