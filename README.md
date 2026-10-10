# KelseTS Cars

[Versión en castellano](#versión-en-castellano) · [English version](#english-version)

## Versión en castellano

Proyecto full stack del máster **Rock The Code · The Power Tech School**.

> **El carácter se lleva dentro. El camino lo eliges tú.**

KelseTS Cars es una red ficticia de concesionarios de vehículos de lujo. En la web puedes consultar el catálogo, conocer nuestras cuatro sedes y solicitar una cita para una prueba de conducción, asesoramiento o mantenimiento.

**Web:** [Abrir KelseTS Cars](https://kelsets-cars.vercel.app). **Backend:** [Comprobar la API](https://kelsets-cars-api.vercel.app/api/v1/health).

### Contenido

- [Una historia personal](#una-historia-personal)
- [Qué puedes hacer en la web](#qué-puedes-hacer-en-la-web)
- [Estructura y tecnologías](#estructura-y-tecnologías)
- [Instalación local](#instalación-local)
- [Datos y fotografías](#datos-y-fotografías)
- [API y permisos](#api-y-permisos)
- [Usuarios DEMO](#usuarios-demo-para-validar-la-entrega)
- [Comunicaciones](#comunicaciones)
- [Pruebas y aprendizajes](#pruebas-y-aprendizajes)
- [Capturas del proyecto](#capturas-del-proyecto)
- [Documentación y despliegue](#documentación-y-despliegue)
- [Redes sociales](#redes-sociales)
- [Aviso legal](#aviso-legal)

### Una historia personal

KelseTS Cars continúa la marca ficticia con la que he dado identidad a KelseTS Lifestyle, KelseTS Store, KelseTS Business School y KelseTS Talks. La música, el deporte y el universo swiftie siguen siendo parte de la inspiración, esta vez llevados a una web dedicada a los coches de lujo.

Para mi último trabajo de Rock The Code quería una propuesta que me ilusionara y que tuviera una utilidad clara. Me he imaginado a una persona que busca su próximo coche: necesita comparar modelos, saber dónde puede verlos y organizar una visita sin perderse entre páginas. A partir de ese recorrido he construido el catálogo, las sedes y las citas.

La experiencia continúa cuando el vehículo necesita cuidado. Por eso he incorporado talleres colaboradores y un equipo que coordina sus citas con los clientes. El diseño mantiene la identidad de KelseTS y cada perfil tiene su propia área, pero todos forman parte de la misma web.

### Qué puedes hacer en la web

- Conocer la marca desde una portada con vídeo, controles de sonido y pausa.
- Consultar 148 vehículos, buscar por marca o modelo con sugerencias y utilizar filtros.
- Abrir la ficha de una unidad y solicitar una cita en su sede.
- Consultar cuatro concesionarios y cuatro talleres en el mapa, calcular distancias y conocer sus barrios con fotografías y enlaces a Street View.
- Registrarte como cliente o solicitar el alta de un taller colaborador.
- Consultar las citas y comunicaciones de tu cuenta. Team revisa solicitudes, coordina visitas y asigna mantenimientos; cada taller consulta sus trabajos.
- Subir y sustituir fotografías del catálogo desde una cuenta administradora.
- Cambiar entre castellano e inglés sin perder la pantalla ni la sesión.

El inventario, las sedes y los talleres se cargan desde los CSV en MongoDB Atlas. Repetir la semilla conserva los registros existentes y no duplica el catálogo. Las personas, direcciones y operaciones del proyecto son ejemplos de demostración.

### Estructura y tecnologías

He organizado el código por funcionalidades para que resulte fácil localizar cada parte. Las páginas coordinan la carga de datos y la navegación; los filtros, tarjetas, formularios y filas de citas tienen componentes propios. Las validaciones y las peticiones HTTP se comparten entre la web y el backend.

```text
backend/src/
  modules/          # Usuarios, catálogo, citas, talleres y comunicaciones
  config/           # Entorno y conexión a MongoDB
  middlewares/      # Sesión, permisos y origen de las peticiones
  routes/           # Rutas de la API
  seeds/            # Lectura, validación y carga de CSV
  utils/            # Errores y reglas comunes
frontend/src/
  app/              # Rutas de la web
  features/         # Marca, catálogo, acceso y citas
  shared/           # Componentes, hooks, idiomas y conexión HTTP
  styles/           # Variables y estilos por funcionalidad
packages/
  contracts/        # Validaciones compartidas
  api-client/       # Cliente HTTP reutilizable
data/
  csv/              # Datos que lee la semilla
  media/            # Fuentes y créditos de fotografías
docs/               # Memoria técnica, guías y evidencias
```

**Frontend:** React, React Router, Vite, Leaflet y CSS. **Backend:** Node.js, Express, Mongoose, JWT, bcrypt, Zod, Multer y Cloudinary. **Datos:** MongoDB Atlas y lectura de CSV con `node:fs/promises`. **Pruebas:** `node:test`, Supertest y Vitest.

`useResource` utiliza `useReducer` para los estados de carga, error y resultado, cancela peticiones con `AbortController` y permite reintentarlas. Los contextos comparten la sesión y el idioma; el mapa reúne su lógica de ubicación en un hook. Los colores y espaciados se definen en `style.css`.

### Instalación local

Requisito: Node.js 22 o posterior.

```bash
npm install
cp backend/.env.example backend/.env
cp frontend/.env.example frontend/.env
npm run dev
```

Configura `MONGODB_URI` y un `JWT_SECRET` de al menos 32 caracteres antes de arrancar el servidor. La web utiliza `http://localhost:5173` y la API `http://localhost:3000/api/v1`.

Para ver las páginas de presentación sin arrancar el backend:

```bash
npm run dev -w frontend
```

Con este comando puedes ver la portada, Nuestra esencia, Servicios, la selección de modelos y los créditos. Para consultar el catálogo y utilizar la cuenta o las citas necesitas tener también el backend en marcha.

### Variables de entorno

| Variable | Uso |
| --- | --- |
| `MONGODB_URI` | Conexión privada a MongoDB Atlas |
| `JWT_SECRET` | Firma de la sesión |
| `FRONTEND_URL` | Orígenes permitidos, separados por comas |
| `CLOUDINARY_CLOUD_NAME` | Espacio de imágenes |
| `CLOUDINARY_API_KEY` | Clave de la API de Cloudinary |
| `CLOUDINARY_API_SECRET` | Secreto de Cloudinary |
| `ADMIN_EMAIL` / `ADMIN_PASSWORD` | Creación opcional de una cuenta administradora mediante semilla |
| `VITE_API_URL` | Dirección de la API; por defecto `/api/v1` |

Los archivos `.env` y la carpeta `DocBase/` están excluidos de Git.

### Scripts

```bash
npm run dev          # web y API
npm run build        # compilación de la web
npm test             # comprobaciones locales
npm run data:check   # compara Excel y CSV sin escribir
npm run data:export  # exporta y valida las tres hojas de datos
npm run seed:check   # CSV y relaciones, sin conectar a Atlas
npm run seed         # inserción en la base de datos configurada
```

La semilla carga los datos de los CSV en MongoDB. Cada registro tiene una clave para evitar duplicados. Al repetirla, se añaden los vehículos que faltan y se actualizan los datos de las sedes; los vehículos ya guardados y sus imágenes se conservan. Por eso, cambiar un vehículo en el CSV no modifica automáticamente su ficha en la base de datos.

### Datos y fotografías

El proceso Excel → CSV → fs → MongoDB se explica en la [guía de datos](docs/DATOS-EXCEL.md). El libro permite revisar y editar las tres colecciones iniciales; la semilla transforma sus claves de relación en referencias de MongoDB.

El CSV inicial contiene datos de ejemplo: VIN, precios, kilometrajes, colores y fechas. Son datos para trabajar en el proyecto, no vehículos reales puestos a la venta. Los precios se conservan tal como aparecen en el archivo, sin asumir una moneda ni presentarlos como precios comprobados. Los VIN del ejemplo no se muestran en la API.

He ampliado el catálogo para que los ejemplos también respondan a la propuesta de KelseTS Cars: una red ficticia de concesionarios centrada en vehículos de gama alta. Mantengo los 100 registros iniciales del curso y añado 48 registros de demostración, correspondientes a doce modelos de Porsche, Ferrari, Mercedes-Benz, Audi y Tesla. Cada modelo aparece en las cuatro sedes, por lo que el inventario suma 148 vehículos. Esto permite explorar la temática del proyecto desde el catálogo, los filtros, las fichas y la solicitud de visitas, además de la selección de la portada.

Los modelos existen y su carrocería y motorización se han contrastado con fuentes oficiales, enlazadas desde sus fichas. Su presencia en las sedes y su disponibilidad son ejemplos ficticios. No he inventado precios, VIN, años, kilometrajes ni fechas de adquisición para las unidades añadidas: esos campos quedan pendientes. Las fotografías son referencias de la marca y pueden mostrar otro modelo. La ampliación se incorpora al mismo Excel y sigue el proceso de exportación a CSV y carga con `fs`, conservando las relaciones con los concesionarios.

He añadido fotografías de Tesla Model S, Audi Q5 y Mercedes Clase S, además de Porsche Taycan y Ferrari Roma para la selección de la portada y el catálogo ampliado. Algunas fotos pueden mostrar otra generación o acabado del modelo. Cuando no hay una imagen específica, utilizo una fotografía de la misma marca y la identifico como imagen de referencia. Cada vehículo muestra la misma foto en la tarjeta y en su ficha.

Las imágenes de los concesionarios, los profesionales y las historias de KelseTS son escenas ficticias creadas para el proyecto. El vídeo del hero es propio y su música está creada con Suno. Los recursos utilizados se recogen en la documentación.

La biblioteca reúne 80 fotografías diferentes: he añadido 38 imágenes para los doce modelos de gama alta, con variantes de 640 px para pantallas pequeñas. La asignación da prioridad al mismo modelo y alterna las fotos disponibles entre sus registros. La [galería documentada](docs/GALERIA-VEHICULOS.md) recoge las nuevas fuentes, autores y licencias.

Fuentes y licencias en [Recursos](docs/RECURSOS.md) y en la página `/creditos`.

### API y permisos

La dirección base de la API es `/api/v1`.

| Método | Ruta | Acceso |
| --- | --- | --- |
| GET | `/health` | Público |
| POST | `/auth/register`, `/auth/login`, `/auth/logout` | Origen permitido |
| GET | `/auth/me` | Sesión |
| GET | `/vehicles`, `/vehicles/search-options`, `/vehicles/:id`, `/dealerships` | Público |
| POST | `/vehicles/:id/image` | Administradora |
| GET / POST | `/appointments` | Sesión |
| PATCH | `/appointments/:id` | Propietario para cancelar; personal autorizado para gestionar |

La API devuelve `{ success, data }` cuando la petición funciona y `{ success: false, error }` si hay un error. La sesión se guarda en una cookie `HttpOnly`. Para crear o modificar datos se comprueba el origen de la petición; en Insomnia hay que incluir un `Origin` permitido. Solo puede haber una cita activa en una misma sede y franja horaria.

#El footer reúne los cuatro proyectos de Universo KelseTS y mis redes sociales. El aviso académico explica la finalidad de la web y se muestra en el idioma elegido.

### Usuarios DEMO para validar la entrega

He preparado cuatro accesos DEMO de solo lectura en la [web publicada](https://kelsets-cars.vercel.app/acceso). La contraseña común es **`KelseTS-Demo-2026!`** y pertenece únicamente a estos ejemplos públicos. En el formulario, selecciona el acceso de la primera columna e inicia sesión con su correo.

| Acceso | Correo | Qué puedes revisar |
| --- | --- | --- |
| Soy cliente · Cliente DEMO | `cliente.demo@kelsets.example` | Dos citas de ejemplo: una completada y otra cancelada, y sus comunicaciones. |
| Soy un taller · Taller DEMO aprobado | `taller.demo@kelsets.example` | Perfil aprobado, una cita de mantenimiento asignada y su bandeja de mensajes. |
| Soy un taller · Taller DEMO no aprobado | `taller.rechazado.demo@kelsets.example` | Solicitud no aprobada, motivo y comunicaciones; no tiene acceso a trabajos. |
| KelseTS Cars Team · Team DEMO | `team.demo@kelsets.example` | Agenda y solicitudes de los perfiles DEMO, con sus relaciones entre cliente, taller y sede. |

Estos ejemplos reproducen el recorrido de mantenimiento y las solicitudes de talleres que he utilizado en las pruebas. Son cuentas y operaciones ficticias, separadas de las cuentas originales. Los talleres DEMO no aparecen en el directorio público.

Puedes cambiar entre castellano e inglés, consultar cada área privada y cerrar sesión antes de entrar con otro perfil. Las cuentas muestran un aviso DEMO y no permiten solicitar, cancelar o modificar citas, revisar solicitudes ni subir fotografías. El backend también bloquea las escrituras; Team DEMO solo consulta datos de otros perfiles DEMO. Las cuentas normales conservan sus permisos.

Para comprobar un registro nuevo puedes utilizar un correo ficticio y una contraseña propia. Las pruebas de modificación y los casos negativos están documentados en [Insomnia](docs/INSOMNIA.md); sus 76 peticiones se ejecutan en una base temporal independiente.

### Comunicaciones

He adaptado el planteamiento de [KelseTS Talks](https://github.com/AraceliFradejas/RTC-PROYECTO10-FULL-STACK-JAVASCRIPT), otro proyecto de mi portfolio. Cada alta o cambio de cita genera un mensaje dirigido a la cuenta que corresponde. La bandeja privada muestra el contenido en el idioma elegido y conserva el historial.

También he preparado diez muestras HTML y texto recibidas en Mailtrap Sandbox. Todas mantienen el logo de la web y un footer común editable, con una imagen exclusiva según el contenido. El Sandbox permite revisar esas muestras sin enviar mensajes a buzones personales. Los eventos de la aplicación guardan comunicaciones simuladas en la cuenta; este proceso es independiente de las muestras de Mailtrap.

Una administradora gestiona las fotografías desde la ficha del vehículo: selecciona JPEG, PNG o WebP de hasta 4 MB, revisa la vista previa y guarda. React envía el archivo con `FormData`; Node comprueba sesión, rol, tamaño y firma del archivo antes de subirlo a Cloudinary. Las claves privadas permanecen en el backend y Atlas guarda la referencia de la fotografía.

### Pruebas y aprendizajes

La compilación y las **51 pruebas locales** pasan: 30 del backend, 16 del frontend y cinco del cliente HTTP. Las dos integraciones opcionales tienen sus informes independientes y no se cuentan como aprobadas en esa ejecución local.

Insomnia pasa **171 comprobaciones en 76 peticiones** sobre una base temporal de Atlas y **36 en 15 peticiones** públicas contra Vercel. El recorrido privado en producción pasa **101 comprobaciones HTTP**, incluyendo permisos, talleres, citas y comunicaciones. Las pruebas de subida y sustitución de imágenes, los mensajes de Mailtrap y la comparación Excel–CSV tienen sus evidencias propias.

Las correcciones de entregas anteriores me han servido para revisar esta: he separado componentes y estilos, retirado recursos sin uso y conservado una sola implementación de los helpers. También he comprobado que el footer muestre un único idioma y que los botones de las citas correspondan a su estado. La respuesta de subida incluye la sede del vehículo y la sustitución de fotografías tiene un servicio propio. He añadido metadatos para compartir la web y revisado las atribuciones de las imágenes.

La [revisión técnica](docs/REVISION-TECNICA.md) explica los cambios. La [memoria](MEMORIA.md) desarrolla las decisiones y las pruebas con sus capturas. Cada informe identifica el entorno utilizado: Safari en el Mac, dispositivo real, API, Insomnia o Mailtrap.

### Capturas del proyecto

Las capturas acompañan el recorrido de la web, sus datos y las pruebas. Puedes pulsar cualquiera para verla a tamaño completo. Esta misma selección aparece en la versión inglesa.

### La web publicada

La portada y el catálogo muestran la propuesta de KelseTS Cars. La cuenta de demostración permite comprobar que la sesión se conserva al recargar.

<a href="docs/evidencias/despliegue/01-home-safari.png"><img src="docs/evidencias/despliegue/01-home-safari.png" alt="Portada publicada en Vercel" width="720"></a>

<a href="docs/evidencias/despliegue/02-catalogo-safari.png"><img src="docs/evidencias/despliegue/02-catalogo-safari.png" alt="Catálogo con 148 vehículos" width="720"></a>

<a href="docs/evidencias/despliegue/03-sesion-safari.png"><img src="docs/evidencias/despliegue/03-sesion-safari.png" alt="Área de cliente con sesión activa" width="720"></a>

### Buscar y elegir un vehículo

La búsqueda libre ofrece sugerencias mientras escribes. Los filtros permiten comparar por características; ambos modos se presentan como alternativas para que resulte claro cuál estás utilizando. Estas capturas corresponden a la revisión local en Safari.

<a href="docs/evidencias/buscador-predictivo-2026-10-04.png"><img src="docs/evidencias/buscador-predictivo-2026-10-04.png" alt="Sugerencias de marcas y modelos" width="720"></a>

<a href="docs/evidencias/modos-busqueda-2026-10-04.png"><img src="docs/evidencias/modos-busqueda-2026-10-04.png" alt="Elección entre búsqueda libre y filtros" width="720"></a>

<a href="docs/evidencias/ficha-lujo-2026-10-04.png"><img src="docs/evidencias/ficha-lujo-2026-10-04.png" alt="Ficha de un vehículo de gama alta" width="720"></a>

### Clientes, Team y talleres

El recorrido de mantenimiento conecta los tres perfiles. El cliente solicita una cita, Team la coordina y el taller consulta el trabajo asignado. Las pruebas locales utilizan datos ficticios en una base temporal.

<a href="docs/evidencias/recorrido/01-cliente-solicitud.png"><img src="docs/evidencias/recorrido/01-cliente-solicitud.png" alt="Solicitud del cliente" width="720"></a>

<a href="docs/evidencias/recorrido/02-team-confirmacion.png"><img src="docs/evidencias/recorrido/02-team-confirmacion.png" alt="Confirmación desde Team" width="720"></a>

<a href="docs/evidencias/recorrido/04-taller-asignacion.png"><img src="docs/evidencias/recorrido/04-taller-asignacion.png" alt="Cita asignada al taller" width="720"></a>

### Comunicaciones e identidad de marca

Las muestras de correo conservan el logo aprobado, una fotografía exclusiva para cada contenido y un footer común. La bienvenida inglesa muestra cómo se adapta el contenido al idioma; sus capturas son vistas previas locales. Los mensajes recibidos en Mailtrap tienen su propio informe.

<a href="docs/evidencias/correo-identidad-2026-10-04.png"><img src="docs/evidencias/correo-identidad-2026-10-04.png" alt="Identidad visual del correo" width="720"></a>

<a href="docs/evidencias/correo-footer-2026-10-04.png"><img src="docs/evidencias/correo-footer-2026-10-04.png" alt="Footer del correo" width="720"></a>

<a href="docs/evidencias/idiomas/05-bienvenida-email-en-safari.png"><img src="docs/evidencias/idiomas/05-bienvenida-email-en-safari.png" alt="Bienvenida en inglés" width="720"></a>

### Gestión de fotografías

La administradora selecciona una imagen desde la ficha, revisa la vista previa y la guarda en Cloudinary. Las primeras dos capturas son locales; la tercera muestra una fotografía servida desde la web publicada.

<a href="docs/evidencias/cloudinary/01-vista-previa-safari.png"><img src="docs/evidencias/cloudinary/01-vista-previa-safari.png" alt="Vista previa antes de guardar" width="720"></a>

<a href="docs/evidencias/cloudinary/02-guardado-safari.png"><img src="docs/evidencias/cloudinary/02-guardado-safari.png" alt="Confirmación de guardado" width="720"></a>

<a href="docs/evidencias/cloudinary/09-imagen-publicada-vercel-safari.png"><img src="docs/evidencias/cloudinary/09-imagen-publicada-vercel-safari.png" alt="Fotografía de Cloudinary publicada" width="720"></a>

### El entorno de las sedes

Cada concesionario y taller tiene una fotografía distinta del barrio, sus créditos y un enlace a Street View. Los centros son ficticios. La captura corresponde a una ventana estrecha de Safari en el Mac.

<a href="docs/evidencias/sedes/01-tarjetas-safari-estrecho.png"><img src="docs/evidencias/sedes/01-tarjetas-safari-estrecho.png" alt="Tarjetas de Málaga y fotografías del entorno" width="320"></a>

### El libro de datos

El Excel se ha abierto en Numbers para revisar sus cuatro hojas. Vehículos incluye el inventario inicial y la ampliación de gama alta. La comparación completa con los CSV confirma los datos y sus relaciones.

<a href="docs/evidencias/datos/01-guia-numbers.png"><img src="docs/evidencias/datos/01-guia-numbers.png" alt="Guía y recuentos" width="720"></a>

<a href="docs/evidencias/datos/02-vehiculos-numbers.png"><img src="docs/evidencias/datos/02-vehiculos-numbers.png" alt="Hoja Vehículos" width="720"></a>

<a href="docs/evidencias/datos/03-ampliacion-lujo-numbers.png"><img src="docs/evidencias/datos/03-ampliacion-lujo-numbers.png" alt="Ampliación del catálogo" width="720"></a>

<a href="docs/evidencias/datos/04-sedes-numbers.png"><img src="docs/evidencias/datos/04-sedes-numbers.png" alt="Hoja Sedes" width="720"></a>

<a href="docs/evidencias/datos/05-talleres-numbers.png"><img src="docs/evidencias/datos/05-talleres-numbers.png" alt="Hoja Talleres" width="720"></a>

### Colecciones y relaciones en MongoDB

Atlas muestra las seis colecciones de la aplicación. El inventario contiene 148 vehículos y cuatro concesionarios. El filtro de talleres públicos devuelve cuatro; la colección conserva también registros ocultos de demostración. Las referencias de vehículo y taller coinciden con el identificador de su sede. Las citas relacionan cliente, vehículo, concesionario y taller. El [informe de Atlas](docs/evidencias/mongodb/README.md) explica cada captura.

<a href="docs/evidencias/mongodb/01-colecciones-atlas.png"><img src="docs/evidencias/mongodb/01-colecciones-atlas.png" alt="Las seis colecciones en Atlas" width="720"></a>

<a href="docs/evidencias/mongodb/02-vehiculos-atlas.png"><img src="docs/evidencias/mongodb/02-vehiculos-atlas.png" alt="148 vehículos y referencia de sede" width="720"></a>

<a href="docs/evidencias/mongodb/03-sedes-atlas.png"><img src="docs/evidencias/mongodb/03-sedes-atlas.png" alt="Concesionarios y sus identificadores" width="720"></a>

<a href="docs/evidencias/mongodb/04-talleres-atlas.png"><img src="docs/evidencias/mongodb/04-talleres-atlas.png" alt="Talleres públicos y su relación con las sedes" width="720"></a>

<a href="docs/evidencias/mongodb/05-citas-atlas.png"><img src="docs/evidencias/mongodb/05-citas-atlas.png" alt="Referencias de las citas" width="720"></a>

### Pruebas con Insomnia

La colección principal pasa 171 comprobaciones en 76 peticiones sobre una base temporal. La colección pública pasa 36 comprobaciones en 15 peticiones contra Vercel. La memoria explica el recorrido con 23 capturas, incluyendo permisos y respuestas de error esperadas.

<a href="docs/evidencias/insomnia/01-ronda-completa-171.png"><img src="docs/evidencias/insomnia/01-ronda-completa-171.png" alt="Resultado de la colección principal" width="720"></a>

<a href="docs/evidencias/insomnia/15-taller-aprobado.png"><img src="docs/evidencias/insomnia/15-taller-aprobado.png" alt="Aprobación de un taller desde Team" width="720"></a>

<a href="docs/evidencias/insomnia/06-vercel-36-comprobaciones.png"><img src="docs/evidencias/insomnia/06-vercel-36-comprobaciones.png" alt="Resultado de la colección pública de Vercel" width="720"></a>

### Mi iPhone 13

He grabado la navegación en mi iPhone 13 y extraído siete fotogramas de la web publicada. Aquí muestro la portada, el buscador y el menú inglés. El informe incluye también el contenido editorial, las tarjetas, la ficha y el acceso. Es una revisión visual del dispositivo real, distinta de las pruebas de escritorio.

<a href="docs/evidencias/iphone-real/01-home.png"><img src="docs/evidencias/iphone-real/01-home.png" alt="Portada en iPhone 13" width="280"></a>

<a href="docs/evidencias/iphone-real/03-buscador.png"><img src="docs/evidencias/iphone-real/03-buscador.png" alt="Buscador y contador en iPhone 13" width="280"></a>

<a href="docs/evidencias/iphone-real/06-menu-ingles.png"><img src="docs/evidencias/iphone-real/06-menu-ingles.png" alt="Menú inglés en iPhone 13" width="280"></a>


### Documentación y despliegue

- [Memoria del proyecto](MEMORIA.md).
- [Arquitectura](docs/ARQUITECTURA.md), [dirección visual](docs/DISENO.md) y [marca](docs/MARCA.md).
- [Requisitos y evidencias de entrega](docs/REVISION-ENTREGA.md).
- [Excel y semilla](docs/DATOS-EXCEL.md).
- [Registro de talleres y comunicaciones](docs/COMUNICACIONES-Y-TALLERES.md).
- [Insomnia](docs/INSOMNIA.md), [Mailtrap](docs/MAILTRAP.md) y [resultados de validación](docs/VALIDACION.md).
- [Índice de capturas e informes](docs/evidencias/README.md).

Frontend y backend son dos proyectos de Vercel conectados al mismo repositorio. La web consulta `/api/v1` en su propio dominio mediante una reescritura al backend; la API conecta con Atlas y Cloudinary. Las variables privadas se guardan en el backend. La [guía de despliegue](docs/DESPLIEGUE.md) explica la configuración.

### Redes sociales

[GitHub](https://github.com/AraceliFradejas) · [LinkedIn](https://www.linkedin.com/in/araceli-fradejas-munoz-transformaciondigital/) · [X](https://x.com/AraceliFradejas) · [Medium](https://medium.com/@araceli.fradejas) · [YouTube](https://www.youtube.com/@aracelifradejasmunoz2758)

### Aviso legal

KelseTS es una marca ficticia creada por Araceli Fradejas Muñoz con fines exclusivamente educativos, académicos y de portfolio. KelseTS Cars se inspira creativamente en la cultura pop, la música y el deporte, pero no está afiliado, patrocinado, autorizado ni respaldado por Taylor Swift, Travis Kelce, los Kansas City Chiefs, la National Football League, sus representantes ni ninguna entidad relacionada. Tampoco existe vinculación comercial con los fabricantes de automóviles mostrados. Los concesionarios, talleres, personas, inventario y servicios de la propuesta son ficticios; la web no ofrece ventas ni servicios reales.

Las escenas de marca y las imágenes de las comunicaciones son creaciones para este proyecto, con personas y espacios ficticios. No se emplean fotografías oficiales ni imágenes promocionales de celebridades. El catálogo y las tarjetas de barrios sí utilizan fotografías reales de terceros, identificadas como referencias y con sus autores, fuentes y licencias en [Recursos](docs/RECURSOS.md), la [galería de vehículos](docs/GALERIA-VEHICULOS.md) y la página de créditos. Las marcas de vehículos que aparecen en esas fotografías pertenecen a sus respectivos titulares. La música del vídeo de portada está creada con Suno.

### Autora

**Araceli Fradejas Muñoz**

Proyecto académico del máster Rock The Code de The Power Tech School.

---

## English version

Full stack final project for **Rock The Code · The Power Tech School**.

> **Character comes from within. You choose the road.**

KelseTS Cars is a fictional luxury dealership network. Visitors can browse the catalogue, discover its four locations and request an appointment for a test drive, advice or maintenance.

**Website:** [Open KelseTS Cars](https://kelsets-cars.vercel.app). **Backend:** [Check the API](https://kelsets-cars-api.vercel.app/api/v1/health).

### Contents

- [A personal story](#a-personal-story)
- [What you can do on the website](#what-you-can-do-on-the-website)
- [Structure and technologies](#structure-and-technologies)
- [Local setup](#local-setup)
- [Scripts and data](#scripts-and-data)
- [Photographs and uploads](#photographs-and-uploads)
- [API and permissions](#api-and-permissions)
- [DEMO users](#demo-users-for-submission-validation)
- [Communications](#communications)
- [Tests and lessons learned](#tests-and-lessons-learned)
- [Project screenshots](#project-screenshots)
- [Documentation and deployment](#documentation-and-deployment)
- [Social media](#social-media)
- [Legal notice](#legal-notice)

### A personal story

KelseTS Cars continues the fictional brand I have used in KelseTS Lifestyle, KelseTS Store, KelseTS Business School and KelseTS Talks. Music, sport and the Swiftie universe remain part of the inspiration, now applied to a website about luxury cars.

For my final Rock The Code project, I wanted an idea I would enjoy developing and that had a clear purpose. I imagined someone looking for their next car: they need to compare models, find out where to see them and arrange a visit without getting lost between pages. That journey shaped the catalogue, locations and appointments.

The relationship continues when the vehicle needs care. I therefore added partner workshops and a team that coordinates their appointments with customers. The design keeps the KelseTS identity, and each profile has its own area within the same website.

### What you can do on the website

- Discover the brand through a video homepage with sound and pause controls.
- Browse 148 vehicles, search by brand or model with suggestions, and use filters.
- Open a vehicle page and request an appointment at its dealership.
- Find four dealerships and four workshops on the map, calculate distances and explore their neighbourhoods through photographs and Street View links.
- Register as a customer or apply as a partner workshop.
- View your appointments and messages. Team reviews applications, coordinates visits and assigns maintenance appointments; workshops see their own jobs.
- Upload and replace catalogue photographs using an administrator account.
- Switch between Spanish and English without losing the current page or session.

Inventory, dealerships and workshops are loaded from CSV into MongoDB Atlas. Repeating the seed preserves existing records and does not duplicate the catalogue. People, addresses and operations are demonstration examples.

### Structure and technologies

I organised the code by feature so each part is easy to find. Pages coordinate data loading and navigation; filters, cards, forms and appointment rows have their own components. Validation and HTTP requests are shared by the website and backend.

```text
backend/src/
  modules/          # Users, catalogue, appointments, workshops and messages
  config/           # Environment and MongoDB connection
  middlewares/      # Session, permissions and request origin
  routes/           # API routes
  seeds/            # CSV reading, validation and loading
  utils/            # Errors and shared rules
frontend/src/
  app/              # Website routes
  features/         # Brand, catalogue, access and appointments
  shared/           # Components, hooks, languages and HTTP connection
  styles/           # Variables and styles by feature
packages/
  contracts/        # Shared validation
  api-client/       # Reusable HTTP client
data/
  csv/              # Seed input data
  media/            # Photo sources and credits
docs/               # Technical report, guides and evidence
```

**Frontend:** React, React Router, Vite, Leaflet and CSS. **Backend:** Node.js, Express, Mongoose, JWT, bcrypt, Zod, Multer and Cloudinary. **Data:** MongoDB Atlas and CSV reading with `node:fs/promises`. **Tests:** `node:test`, Supertest and Vitest.

`useResource` uses `useReducer` for loading, error and result states, cancels requests with `AbortController` and supports retry. Contexts share the session and language; a dedicated hook handles map location. Colours and spacing are defined in `style.css`.

### Local setup

Node.js 22 or later is required.

```bash
npm install
cp backend/.env.example backend/.env
cp frontend/.env.example frontend/.env
npm run dev
```

Configure `MONGODB_URI` and a `JWT_SECRET` of at least 32 characters before starting the server. The website runs at `http://localhost:5173` and the API at `http://localhost:3000/api/v1`.

To view the editorial pages without the backend:

```bash
npm run dev -w frontend
```

The homepage, Our essence, Services, model selection and credits can be viewed this way. The inventory, accounts and appointments also need the backend.

### Environment variables

| Variable | Purpose |
| --- | --- |
| `MONGODB_URI` | Private MongoDB Atlas connection |
| `JWT_SECRET` | Session signing secret |
| `FRONTEND_URL` | Allowed origins, separated by commas |
| `CLOUDINARY_CLOUD_NAME` | Cloudinary image space |
| `CLOUDINARY_API_KEY` | Cloudinary API key |
| `CLOUDINARY_API_SECRET` | Cloudinary secret |
| `ADMIN_EMAIL` / `ADMIN_PASSWORD` | Optional administrator account created by the seed |
| `VITE_API_URL` | API URL; defaults to `/api/v1` |

`.env` files and `DocBase/` are excluded from Git. Additional mail sample configuration is explained in the [Mailtrap guide](docs/MAILTRAP.md).

### Scripts and data

```bash
npm run dev          # Start website and API
npm run build        # Build the frontend
npm test             # Run local checks
npm run data:check   # Compare Excel and CSV without writing
npm run data:export  # Export and validate the three data sheets
npm run seed:check   # Validate CSV and relationships without Atlas
npm run seed         # Load the configured database
```

The [Excel workbook](outputs/kelsets-tfm/KelseTS-datos.xlsx) contains the course's initial 100 vehicles plus 48 demonstration records for twelve luxury models, four dealerships and four workshops. Each additional model appears at all four dealerships. The data remains part of the same Excel → CSV → `fs` → MongoDB process, described in the [data guide](docs/DATOS-EXCEL.md).

The additional models are real and their body types and powertrains were checked against official sources linked from their pages. Their stock and location are fictional. I have left unverified prices, VINs, years, mileage and acquisition dates unset. The original course data is also demonstration data, not real vehicles for sale; its prices do not imply a verified currency. VINs are not exposed through the API.

Seed keys prevent duplicate records. Repeating the seed adds missing vehicles and updates dealership data, while keeping existing vehicles and uploaded images. Editing a vehicle CSV row does not automatically change its stored record.

### Photographs and uploads

The vehicle library contains 80 different photographs, including 38 additional images for the twelve luxury models and 640 px versions for smaller screens. Matching prioritises the model and alternates available photos. A vehicle keeps the same image on its card and detail page. Reference images may show another generation, trim or model of the same brand and are labelled accordingly.

The eight location cards use different neighbourhood photos from Wikimedia Commons. Authors, source links and licences are recorded in `data/media/neighborhoods.json` and the credits page. Street View links open Google Maps at each centre's approximate coordinates; they do not share the visitor's location.

Brand scenes represent fictional people and places. The homepage video was provided by the author and uses music created with Suno. Sources are listed in [Resources](docs/RECURSOS.md), the [vehicle gallery](docs/GALERIA-VEHICULOS.md) and `/creditos`.

From **Manage photographs** in Team, an administrator can find a vehicle, preview a JPEG, PNG or WebP file of up to 4 MB, discard it or save it. React sends `FormData`; Node checks the session, role, size and file signature before uploading to Cloudinary. Secrets stay in the backend. Atlas stores the HTTPS URL and image identifier. A replacement removes the previous image when it belongs to our Cloudinary folder.

Upload and replacement were tested through the API with temporary data and in Safari using the existing reference photo for the Barcelona Porsche 911 Carrera, retaining its credits. The rest of the image library has not been migrated. The [Cloudinary evidence](docs/evidencias/cloudinary/README.md) records the tests and responsive layout checks.

### API and permissions

The base path is `/api/v1`.

| Method | Route | Access |
| --- | --- | --- |
| GET | `/health` | Public |
| POST | `/auth/register`, `/auth/login`, `/auth/logout` | Allowed origin |
| GET | `/auth/me` | Session |
| GET | `/vehicles`, `/vehicles/search-options`, `/vehicles/:id`, `/dealerships` | Public |
| POST | `/vehicles/:id/image` | Administrator |
| GET / POST | `/appointments` | Session |
| PATCH | `/appointments/:id` | Owner cancellation or authorised staff management |

Success responses use `{ success, data }`; errors use `{ success: false, error }`. Sessions use an `HttpOnly` cookie. Writes check the request origin, including requests from Insomnia. Only one active appointment can occupy the same dealership and time slot.

#The footer brings together the four KelseTS universe projects and my social profiles. Its academic notice explains the purpose of the website and follows the selected language.

### DEMO users for submission validation

I prepared four read-only DEMO accounts on the [live website](https://kelsets-cars.vercel.app/acceso). Their shared password is **`KelseTS-Demo-2026!`**, used exclusively for these public examples. Select the access type in the first column, then sign in with its email.

| Access | Email | What you can check |
| --- | --- | --- |
| Customer · Cliente DEMO | `cliente.demo@kelsets.example` | Two sample appointments, one completed and one cancelled, and their communications. |
| Workshop · Taller DEMO aprobado | `taller.demo@kelsets.example` | Approved profile, one assigned maintenance appointment and its inbox. |
| Workshop · Taller DEMO no aprobado | `taller.rechazado.demo@kelsets.example` | Rejected application, reason and communications; no access to jobs. |
| KelseTS Cars Team · Team DEMO | `team.demo@kelsets.example` | DEMO appointments and applications, including the links between customer, workshop and dealership. |

These examples reproduce the maintenance journey and workshop applications used in testing. The fictional accounts and operations are separate from the original accounts. DEMO workshops are hidden from the public directory.

You can switch between Spanish and English, browse each private area and sign out before trying another profile. A DEMO notice identifies these accounts. They cannot create, cancel or change appointments, review applications or upload photographs. The backend also blocks writes, and Team DEMO only accesses data belonging to other DEMO profiles. Regular accounts retain their permissions.

To check registration, use a fictional email and your own password. Write operations and negative cases are documented in [Insomnia](docs/INSOMNIA.md); its 76 requests run against an independent temporary database.

### Communications

I adapted the approach from [KelseTS Talks](https://github.com/AraceliFradejas/RTC-PROYECTO10-FULL-STACK-JAVASCRIPT), another project in my portfolio. Each registration or appointment update generates a message for the relevant account. The private inbox follows the selected language and keeps its history.

I also prepared ten HTML and plain text samples received in Mailtrap Sandbox. They all use the website logo and an editable shared footer, with an exclusive image for each message. The Sandbox allows these samples to be reviewed without sending email to personal inboxes. Application events store simulated messages in the account; this process is separate from the Mailtrap samples.

### Tests and lessons learned

The build and **51 local tests** pass: 30 backend, 16 frontend and five API client tests. Two optional integrations have separate reports and are not counted as passed in that local run.

Insomnia passes **171 assertions across 76 requests** against an isolated Atlas database and **36 across 15 public requests** against Vercel. The private production workflow passes **101 HTTP checks**, covering permissions, workshops, appointments and messages. Image uploads and replacement, Mailtrap samples and the Excel–CSV comparison have their own evidence.

Feedback on earlier submissions helped me review this project: I separated components and styles, removed unused resources and kept shared helpers in one place. I checked that the footer shows only the selected language and that appointment buttons match their state. Upload responses include the vehicle's dealership, and image replacement has its own service. I also added metadata for sharing the website and reviewed photo credits.

The [technical review](docs/REVISION-TECNICA.md) explains the changes. The [project report](MEMORIA.md) develops the decisions and tests with screenshots. Each evidence report identifies the environment used: Safari on the Mac, a physical device, the API, Insomnia or Mailtrap.

### Project screenshots

Screenshots accompany the website journey, data and tests. Click any image to open it at full size. This is the same selection shown in the Spanish version.

### The published website

The homepage and catalogue show the KelseTS Cars concept. A demonstration account was used to check that the session survives a reload.

<a href="docs/evidencias/despliegue/01-home-safari.png"><img src="docs/evidencias/despliegue/01-home-safari.png" alt="Homepage published on Vercel" width="720"></a>

<a href="docs/evidencias/despliegue/02-catalogo-safari.png"><img src="docs/evidencias/despliegue/02-catalogo-safari.png" alt="Catalogue with 148 vehicles" width="720"></a>

<a href="docs/evidencias/despliegue/03-sesion-safari.png"><img src="docs/evidencias/despliegue/03-sesion-safari.png" alt="Customer area with an active session" width="720"></a>

### Finding and choosing a vehicle

Free text search offers suggestions while typing. Filters let visitors compare by vehicle characteristics; the two modes are presented as alternatives. These screenshots come from the local Safari review.

<a href="docs/evidencias/buscador-predictivo-2026-10-04.png"><img src="docs/evidencias/buscador-predictivo-2026-10-04.png" alt="Brand and model suggestions" width="720"></a>

<a href="docs/evidencias/modos-busqueda-2026-10-04.png"><img src="docs/evidencias/modos-busqueda-2026-10-04.png" alt="Choice between free text search and filters" width="720"></a>

<a href="docs/evidencias/ficha-lujo-2026-10-04.png"><img src="docs/evidencias/ficha-lujo-2026-10-04.png" alt="Luxury vehicle details" width="720"></a>

### Customers, Team and workshops

The maintenance workflow connects all three profiles. The customer requests an appointment, Team coordinates it and the workshop sees its assigned work. Local tests use fictional data in an isolated database.

<a href="docs/evidencias/recorrido/01-cliente-solicitud.png"><img src="docs/evidencias/recorrido/01-cliente-solicitud.png" alt="Customer request" width="720"></a>

<a href="docs/evidencias/recorrido/02-team-confirmacion.png"><img src="docs/evidencias/recorrido/02-team-confirmacion.png" alt="Team confirmation" width="720"></a>

<a href="docs/evidencias/recorrido/04-taller-asignacion.png"><img src="docs/evidencias/recorrido/04-taller-asignacion.png" alt="Appointment assigned to the workshop" width="720"></a>

### Communications and brand identity

Email samples keep the approved logo, an exclusive image for each message and a shared footer. The English welcome shows how content follows the selected language; its screenshots are local previews. Received Mailtrap messages have a separate report.

<a href="docs/evidencias/correo-identidad-2026-10-04.png"><img src="docs/evidencias/correo-identidad-2026-10-04.png" alt="Email brand identity" width="720"></a>

<a href="docs/evidencias/correo-footer-2026-10-04.png"><img src="docs/evidencias/correo-footer-2026-10-04.png" alt="Email footer" width="720"></a>

<a href="docs/evidencias/idiomas/05-bienvenida-email-en-safari.png"><img src="docs/evidencias/idiomas/05-bienvenida-email-en-safari.png" alt="Welcome in English" width="720"></a>

### Photograph management

An administrator selects an image on the vehicle page, checks the preview and saves it to Cloudinary. The first two screenshots are local; the third shows an image served by the deployed website.

<a href="docs/evidencias/cloudinary/01-vista-previa-safari.png"><img src="docs/evidencias/cloudinary/01-vista-previa-safari.png" alt="Preview before saving" width="720"></a>

<a href="docs/evidencias/cloudinary/02-guardado-safari.png"><img src="docs/evidencias/cloudinary/02-guardado-safari.png" alt="Save confirmation" width="720"></a>

<a href="docs/evidencias/cloudinary/09-imagen-publicada-vercel-safari.png"><img src="docs/evidencias/cloudinary/09-imagen-publicada-vercel-safari.png" alt="Published Cloudinary photograph" width="720"></a>

### The neighbourhoods around our locations

Each dealership and workshop has a different neighbourhood photograph, credits and a Street View link. The centres are fictional. This screenshot shows a narrow Safari window on the Mac.

<a href="docs/evidencias/sedes/01-tarjetas-safari-estrecho.png"><img src="docs/evidencias/sedes/01-tarjetas-safari-estrecho.png" alt="Málaga cards and neighbourhood photographs" width="320"></a>

### The data workbook

The Excel workbook was opened in Numbers to inspect all four sheets. Vehicles contains the initial inventory and the luxury additions. A complete CSV comparison verifies the data and relationships.

<a href="docs/evidencias/datos/01-guia-numbers.png"><img src="docs/evidencias/datos/01-guia-numbers.png" alt="Guide and counts" width="720"></a>

<a href="docs/evidencias/datos/02-vehiculos-numbers.png"><img src="docs/evidencias/datos/02-vehiculos-numbers.png" alt="Vehicles sheet" width="720"></a>

<a href="docs/evidencias/datos/03-ampliacion-lujo-numbers.png"><img src="docs/evidencias/datos/03-ampliacion-lujo-numbers.png" alt="Catalogue additions" width="720"></a>

<a href="docs/evidencias/datos/04-sedes-numbers.png"><img src="docs/evidencias/datos/04-sedes-numbers.png" alt="Dealerships sheet" width="720"></a>

<a href="docs/evidencias/datos/05-talleres-numbers.png"><img src="docs/evidencias/datos/05-talleres-numbers.png" alt="Workshops sheet" width="720"></a>

### Collections and relationships in MongoDB

Atlas shows the application's six collections. The inventory contains 148 vehicles and four dealerships. The public workshop filter returns four entries; the collection also retains hidden demonstration records. Vehicle and workshop references match their dealership identifier. Appointments link the customer, vehicle, dealership and workshop. The [Atlas report](docs/evidencias/mongodb/README.md) explains each screenshot.

<a href="docs/evidencias/mongodb/01-colecciones-atlas.png"><img src="docs/evidencias/mongodb/01-colecciones-atlas.png" alt="Six collections in Atlas" width="720"></a>

<a href="docs/evidencias/mongodb/02-vehiculos-atlas.png"><img src="docs/evidencias/mongodb/02-vehiculos-atlas.png" alt="148 vehicles and dealership reference" width="720"></a>

<a href="docs/evidencias/mongodb/03-sedes-atlas.png"><img src="docs/evidencias/mongodb/03-sedes-atlas.png" alt="Dealerships and their identifiers" width="720"></a>

<a href="docs/evidencias/mongodb/04-talleres-atlas.png"><img src="docs/evidencias/mongodb/04-talleres-atlas.png" alt="Public workshops and their dealership references" width="720"></a>

<a href="docs/evidencias/mongodb/05-citas-atlas.png"><img src="docs/evidencias/mongodb/05-citas-atlas.png" alt="Appointment references" width="720"></a>

### Insomnia tests

The main collection passes 171 assertions across 76 requests against an isolated database. The public collection passes 36 assertions across 15 requests against Vercel. The report explains the workflow with 23 screenshots, including permissions and expected error responses.

<a href="docs/evidencias/insomnia/01-ronda-completa-171.png"><img src="docs/evidencias/insomnia/01-ronda-completa-171.png" alt="Main collection results" width="720"></a>

<a href="docs/evidencias/insomnia/15-taller-aprobado.png"><img src="docs/evidencias/insomnia/15-taller-aprobado.png" alt="Workshop approval by Team" width="720"></a>

<a href="docs/evidencias/insomnia/06-vercel-36-comprobaciones.png"><img src="docs/evidencias/insomnia/06-vercel-36-comprobaciones.png" alt="Public Vercel collection results" width="720"></a>

### My iPhone 13

I recorded navigation on my iPhone 13 and extracted seven frames of the deployed website. These show the homepage, search and English menu. The report also includes editorial content, cards, vehicle details and sign-in. This is a visual review on a physical device, separate from desktop tests.

<a href="docs/evidencias/iphone-real/01-home.png"><img src="docs/evidencias/iphone-real/01-home.png" alt="Homepage on iPhone 13" width="280"></a>

<a href="docs/evidencias/iphone-real/03-buscador.png"><img src="docs/evidencias/iphone-real/03-buscador.png" alt="Search and result count on iPhone 13" width="280"></a>

<a href="docs/evidencias/iphone-real/06-menu-ingles.png"><img src="docs/evidencias/iphone-real/06-menu-ingles.png" alt="English menu on iPhone 13" width="280"></a>


### Documentation and deployment

The technical reports are in Spanish:

- [Project report](MEMORIA.md).
- [Architecture](docs/ARQUITECTURA.md), [visual design](docs/DISENO.md) and [brand](docs/MARCA.md).
- [Requirements and delivery evidence](docs/REVISION-ENTREGA.md).
- [Excel and seed](docs/DATOS-EXCEL.md).
- [Workshop registration and communications](docs/COMUNICACIONES-Y-TALLERES.md).
- [Insomnia](docs/INSOMNIA.md), [Mailtrap](docs/MAILTRAP.md) and [validation results](docs/VALIDACION.md).
- [Screenshot and report index](docs/evidencias/README.md).

Frontend and backend are two Vercel projects connected to the same repository. The website calls `/api/v1` on its own domain through a rewrite to the backend; the API connects to Atlas and Cloudinary. Private environment variables stay in the backend. The [deployment guide](docs/DESPLIEGUE.md) explains the configuration.

[Back to Spanish / Volver a la versión en castellano](#versión-en-castellano)

### Social media

[GitHub](https://github.com/AraceliFradejas) · [LinkedIn](https://www.linkedin.com/in/araceli-fradejas-munoz-transformaciondigital/) · [X](https://x.com/AraceliFradejas) · [Medium](https://medium.com/@araceli.fradejas) · [YouTube](https://www.youtube.com/@aracelifradejasmunoz2758)

### Legal notice

KelseTS is a fictional brand created by Araceli Fradejas Muñoz exclusively for educational, academic and portfolio purposes. KelseTS Cars draws creative inspiration from pop culture, music and sport, but is not affiliated with, sponsored, authorised or endorsed by Taylor Swift, Travis Kelce, the Kansas City Chiefs, the National Football League, their representatives or any related organisation. There is no commercial affiliation with the car manufacturers shown. The dealerships, workshops, people, inventory and services in the concept are fictional; the website does not offer real sales or services.

Brand scenes and communication images were created for this project using fictional people and settings. They do not use official photographs or promotional images of celebrities. The catalogue and neighbourhood cards do use real third-party photographs, labelled as references, with authors, sources and licences listed in [Resources](docs/RECURSOS.md), the [vehicle gallery](docs/GALERIA-VEHICULOS.md) and the credits page. Vehicle brands visible in those photographs belong to their respective owners. The homepage video uses music created with Suno.

### Author

**Araceli Fradejas Muñoz**

Academic project for the Rock The Code master's programme at The Power Tech School.
