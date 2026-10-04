# KelseTS Cars

Proyecto full stack del máster **Rock The Code · The Power Tech School**.

> **El carácter se lleva dentro. El camino lo eliges tú.**

KelseTS Cars es una red ficticia de concesionarios de vehículos de lujo. En la web puedes consultar el catálogo, conocer nuestras cuatro sedes y solicitar una cita para una prueba de conducción, asesoramiento o mantenimiento.

## Contenido

- [Una historia personal](#una-historia-personal)
- [Estado actual](#estado-actual)
- [Dos etapas](#dos-etapas)
- [Estructura](#estructura)
- [Instalación local](#instalación-local)
- [Datos y fotografías](#datos-y-fotografías)
- [Documentación](#documentación)

## Una historia personal

KelseTS Cars es un nuevo proyecto dentro de la marca KelseTS, después de KelseTS Lifestyle, KelseTS Store, KelseTS Business School y KelseTS Talks. La música, el deporte y el universo swiftie siguen siendo parte de la inspiración, esta vez en una web dedicada a los coches de lujo.

Para este último trabajo de Rock The Code he querido crear una web que tenga una identidad propia y una utilidad clara. Está pensada para personas que quieren conocer distintos modelos, comparar opciones y organizar una visita al concesionario con tiempo.

He mantenido los colores y el estilo de KelseTS, con imágenes aspiracionales y una atención especial al diseño. Además de cuidar la parte visual, el proyecto me permite poner en práctica lo aprendido sobre React, Node.js y bases de datos.

## Estado actual

**El proyecto sigue en desarrollo y todavía no está listo para la entrega final.**

La conexión con MongoDB Atlas está configurada. Ya se han cargado 148 vehículos, cuatro concesionarios y cuatro talleres desde los CSV, y se ha comprobado que repetir la carga no duplica los registros.

La web incluye:

- Portada con vídeo, controles de sonido y pausa.
- Catálogo con búsqueda libre, sugerencias de marcas y modelos mientras escribes, filtros y fichas de vehículos.
- Página de sedes con cuatro concesionarios, cuatro talleres colaboradores, mapa y cálculo de distancias desde una ubicación automática o elegida manualmente.
- Páginas de Servicios y Nuestra esencia con imágenes propias.
- Formularios de acceso y páginas para solicitar y consultar citas.
- Accesos para clientes, talleres y KelseTS Cars Team, con revisión de solicitudes y asignación de citas de mantenimiento por una administradora.
- Bandeja privada de comunicaciones de demostración para altas, solicitudes y cambios de cita, sin envío de correos reales.

El diseño se ha ajustado para móvil, tableta y escritorio. Las tarjetas de historias de la portada enlazan con sus apartados en Nuestra esencia. Las imágenes del catálogo tienen sus créditos y las escenas de marca representan personas y espacios ficticios.

La compilación y las 24 pruebas locales han pasado. También he probado registro, acceso, aprobación de talleres y asignación de citas en una base temporal de Atlas, que se elimina al terminar. En Safari he completado el recorrido de mantenimiento entre cliente, Team y taller, hasta el cierre y sus comunicaciones. Las capturas están en [evidencias](docs/evidencias/README.md). Quedan el registro y la revisión de talleres en navegador, la revisión móvil, configurar Cloudinary y preparar el despliegue.

El [Excel de datos](outputs/kelsets-tfm/KelseTS-datos.xlsx) contiene 100 vehículos del ejemplo del curso y 48 registros de demostración de doce modelos de gama alta, cuatro sedes y cuatro talleres relacionados. He comprobado su exportación a CSV y la carga de la semilla en Atlas. Falta completar la versión en inglés y cerrar la documentación y las pruebas de entrega.

## Dos etapas

Primero voy a completar la entrega de **Rock The Code**: backend con Node.js, frontend con React, datos preparados en Excel y cargados desde CSV con `fs`, usuarios, colecciones relacionadas, rutas protegidas y despliegue de la web y la API.

Después continuaré el proyecto para el TFM de **BigSchool**, con una app y nuevas funcionalidades. La estructura ya separa el código de la web de las validaciones y las peticiones a la API que podrán aprovecharse más adelante. La carpeta `apps/mobile/` está reservada para esa segunda etapa; la app aún no está desarrollada.

Los requisitos y las tareas pendientes están en la [revisión de entrega](docs/REVISION-ENTREGA.md).

## Estructura

```text
backend/src/
  modules/
    auth/          # Usuarios y acceso
    catalog/       # Vehículos, sedes y fotografías
    appointments/  # Citas y permisos sobre la agenda
  config/          # Entorno y conexión a MongoDB
  middlewares/     # Sesión y comprobación de origen
  routes/          # Rutas de la API
  seeds/           # Lectura, validación y carga de CSV
  utils/           # Errores y reglas comunes
frontend/src/
  app/             # Rutas de la web
  features/        # Marca, catálogo, acceso y citas
  shared/          # Componentes, hooks y conexión HTTP
  styles/          # Variables, base y componentes
packages/
  contracts/       # Validaciones compartidas
  api-client/      # Cliente de la API reutilizable
apps/mobile/       # Carpeta reservada para la futura app
data/
  csv/             # Datos que puede leer la semilla
  media/           # Fotografías, fuentes y créditos
docs/              # Arquitectura, diseño y seguimiento
```

## Tecnologías

**Frontend:** React, React Router, Vite, Leaflet y CSS.

**Backend:** Node.js, Express, Mongoose, JWT, bcrypt, Zod, Multer y Cloudinary.

**Datos:** MongoDB Atlas y lectura de CSV con `node:fs/promises`.
**Pruebas:** `node:test`, Supertest y Vitest.

Utilizo Zod para validar los datos en la web y en la API. Los permisos se comprueban en el backend: una persona que se registra no puede asignarse el rol de administradora desde el formulario.

## Instalación local

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

## Variables de entorno

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

## Scripts

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

## Datos y fotografías

El proceso Excel → CSV → fs → MongoDB se explica en la [guía de datos](docs/DATOS-EXCEL.md). El libro permite revisar y editar las tres colecciones iniciales; la semilla transforma sus claves de relación en referencias de MongoDB.

El CSV inicial contiene datos de ejemplo: VIN, precios, kilometrajes, colores y fechas. Son datos para trabajar en el proyecto, no vehículos reales puestos a la venta. Los precios se conservan tal como aparecen en el archivo, sin asumir una moneda ni presentarlos como precios comprobados. Los VIN del ejemplo no se muestran en la API.

He ampliado el catálogo para que los ejemplos también respondan a la propuesta de KelseTS Cars: una red ficticia de concesionarios centrada en vehículos de gama alta. Mantengo los 100 registros iniciales del curso y añado 48 registros de demostración, correspondientes a doce modelos de Porsche, Ferrari, Mercedes-Benz, Audi y Tesla. Cada modelo aparece en las cuatro sedes, por lo que el inventario suma 148 vehículos. Esto permite explorar la temática del proyecto desde el catálogo, los filtros, las fichas y la solicitud de visitas, además de la selección de la portada.

Los modelos existen y su carrocería y motorización se han contrastado con fuentes oficiales, enlazadas desde sus fichas. Su presencia en las sedes y su disponibilidad son ejemplos ficticios. No he inventado precios, VIN, años, kilometrajes ni fechas de adquisición para las unidades añadidas: esos campos quedan pendientes. Las fotografías son referencias de la marca y pueden mostrar otro modelo. La ampliación se incorpora al mismo Excel y sigue el proceso de exportación a CSV y carga con `fs`, conservando las relaciones con los concesionarios.

He añadido fotografías de Tesla Model S, Audi Q5 y Mercedes Clase S, además de Porsche Taycan y Ferrari Roma para la selección de la portada y el catálogo ampliado. Algunas fotos pueden mostrar otra generación o acabado del modelo. Cuando no hay una imagen específica, utilizo una fotografía de la misma marca y la identifico como imagen de referencia. Cada vehículo muestra la misma foto en la tarjeta y en su ficha.

Las imágenes de los concesionarios, los profesionales y las historias de KelseTS son escenas ficticias creadas para el proyecto. El vídeo del hero es propio y su música está creada con Suno. Los recursos utilizados se recogen en la documentación.

La biblioteca reúne 80 fotografías diferentes: he añadido 38 imágenes para los doce modelos de gama alta, con variantes de 640 px para pantallas pequeñas. La asignación da prioridad al mismo modelo y alterna las fotos disponibles entre sus registros. La [galería documentada](docs/GALERIA-VEHICULOS.md) recoge las nuevas fuentes, autores y licencias.

Fuentes y licencias en [Recursos](docs/RECURSOS.md) y en la página `/creditos`.

## API

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

## Documentación

- [Memoria del proyecto](MEMORIA.md).
- [Arquitectura y evolución hacia la app](docs/ARQUITECTURA.md).
- [Dirección visual](docs/DISENO.md).
- [Logo e identidad de marca](docs/MARCA.md).
- [Revisión del enunciado](docs/REVISION-ENTREGA.md).
- [Fotografías y recursos](docs/RECURSOS.md).
- [Registro de talleres y comunicaciones](docs/COMUNICACIONES-Y-TALLERES.md), siguiendo el planteamiento de KelseTS Talks.

## Despliegue

El despliegue todavía está pendiente. Ya hay archivos de configuración para Vercel, pero falta indicar la dirección definitiva de la API y comprobar el funcionamiento de la sesión, los permisos de conexión y los enlaces directos a cada página. Cuando estén publicados el frontend y el backend, añadiré aquí los enlaces.

## Aviso académico y autora

KelseTS Cars es una marca ficticia para fines educativos y de portfolio. No existe afiliación ni patrocinio de los fabricantes. No se ofrecen ventas, reservas comerciales ni servicios reales de mantenimiento.

**Araceli Fradejas Muñoz** · Rock The Code · The Power Tech School.

[GitHub](https://github.com/AraceliFradejas) · [LinkedIn](https://www.linkedin.com/in/araceli-fradejas-munoz-transformaciondigital/)

La [guía de secciones](docs/SECCIONES.md) recoge lo previsto para esta entrega y las ideas que desarrollaré después para BigSchool.

Para revisar el backend sin usar la web, he incluido una [colección de pruebas de Insomnia y su guía](docs/INSOMNIA.md). Las credenciales se configuran en un entorno privado; el archivo del repositorio contiene solo datos ficticios.

Las comunicaciones tienen [diez muestras para revisar en Mailtrap Sandbox](docs/MAILTRAP.md), con HTML y texto y sin entrega a buzones personales. La bienvenida de cliente y la aprobación de taller ya han sido aceptadas por el Sandbox. Utilizan el logo de la web, imágenes exclusivas para cada perfil y un footer común editable; las [evidencias locales](docs/evidencias/README.md) recogen el diseño actualizado. Falta completar la revisión de los diez tipos, texto y móvil.

Las muestras de correo y el registro de pruebas se pueden consultar en [las evidencias locales](docs/evidencias/README.md).
