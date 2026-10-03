# KelseTS Cars

Proyecto full stack del máster **Rock The Code · The Power Tech School**.

> **El carácter se lleva dentro. El camino lo eliges tú.**

KelseTS Cars es una marca ficticia que lleva el universo KelseTS al automóvil. La propuesta une un catálogo de vehículos, sus sedes de referencia y un área personal para organizar citas.

## Contenido

- [Una historia personal](#una-historia-personal)
- [Estado actual](#estado-actual)
- [Dos etapas](#dos-etapas)
- [Estructura](#estructura)
- [Instalación local](#instalación-local)
- [Datos y fotografías](#datos-y-fotografías)
- [Documentación](#documentación)

## Una historia personal

KelseTS Cars continúa mi recorrido con KelseTS Lifestyle, KelseTS Store, KelseTS Business School y KelseTS Talks. Para este trabajo he elegido el automóvil como punto de encuentro entre diseño, tecnología y experiencia de usuario.

El público del proyecto son personas que quieren explorar vehículos de gama alta, consultar información ordenada y organizar una visita. El objetivo académico es conectar ese recorrido con una API, una base de datos y una interfaz React.

## Estado actual

**Base inicial en desarrollo. No es todavía la entrega final.**

La estructura contiene backend modular, frontend React, contratos compartidos y cliente HTTP reutilizable. La portada y las páginas editoriales utilizan cinco fotografías reales con sus créditos y un logo vectorial KelseTS Cars basado en las referencias de marca aportadas, además de un vídeo conceptual en el hero. Se han preparado pantallas iniciales para catálogo, acceso y citas; Atlas ya está conectado: se han cargado 100 vehículos y cuatro sedes, comprobado las relaciones y repetido la semilla sin duplicados. El catálogo ofrece búsqueda libre o filtros y dos fotografías de referencia por marca. Sedes incorpora mapa y distancias con ubicación automática o manual; autenticación y citas todavía necesitan comprobaciones integradas. La compilación y 15 pruebas locales han pasado; la portada se ha revisado en Safari.

El CSV de partida contiene 100 registros de ejemplo. Su normalización conserva la procedencia y sustituye las imágenes genéricas cuando existe una fotografía revisada del modelo. El Excel definitivo, la ampliación de gama alta, las integraciones, las evidencias y el despliegue están pendientes. La carga inicial en Atlas está comprobada; Cloudinary todavía no está configurado.

## Dos etapas

**Rock The Code:** Node.js, React, Excel/CSV y semillas con `fs`, usuarios, al menos dos colecciones de negocio relacionadas, rutas protegidas, hooks con utilidad concreta, UX/UI y despliegue de ambas aplicaciones. Este es el alcance de la primera entrega.

**BigSchool:** evolución posterior con app y módulos específicos. Se reserva `apps/mobile/` y se documentan los límites entre plataforma, negocio e interfaz. La app todavía no está implementada.

La [revisión de entrega](docs/REVISION-ENTREGA.md) distingue lo implementado de lo pendiente.

## Estructura

```text
backend/src/
  modules/
    auth/          # Usuarios y acceso
    catalog/       # Vehículos, sedes y fotografías
    appointments/  # Citas y permisos sobre la agenda
  config/          # Entorno y conexión a MongoDB
  middlewares/     # Sesión y comprobación de origen
  routes/          # Composición de la API
  seeds/           # Lectura, validación y carga de CSV
  utils/           # Errores y reglas comunes
frontend/src/
  app/             # Rutas y composición de la web
  features/        # Marca, catálogo, acceso y citas
  shared/          # Componentes, hooks y conexión HTTP
  styles/          # Variables, base y componentes
packages/
  contracts/       # Esquemas y vocabulario comunes
  api-client/      # Peticiones sin dependencia de React ni DOM
apps/mobile/       # Alcance previsto para la segunda etapa
data/
  csv/             # Datos que puede leer la semilla
  media/           # Créditos y correspondencia de fotografías
docs/              # Arquitectura, diseño y seguimiento
```

## Tecnologías

**Frontend:** React, React Router, Vite y CSS.

**Backend:** Node.js, Express, Mongoose, JWT, bcrypt, Zod, Multer y Cloudinary.

**Datos:** MongoDB Atlas y lectura de CSV con `node:fs/promises`.
**Pruebas:** `node:test`, Supertest y Vitest.

Zod comparte validaciones entre la web y la API. La autorización permanece siempre en el servidor. No se acepta un rol enviado desde el formulario de registro.

## Instalación local

Requisito: Node.js 22 o posterior.

```bash
npm install
cp backend/.env.example backend/.env
cp frontend/.env.example frontend/.env
npm run dev
```

Configura `MONGODB_URI` y un `JWT_SECRET` de al menos 32 caracteres antes de arrancar el servidor. La web utiliza `http://localhost:5173` y la API `http://localhost:3000/api/v1`.

Para revisar únicamente el diseño editorial sin base de datos:

```bash
npm run dev -w frontend
```

La portada, la esencia de marca, los modelos editoriales y los créditos se pueden consultar. El catálogo, la cuenta y las citas muestran errores reales si la API no está disponible; no sustituyen la base de datos por un catálogo simulado.

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
npm run seed:check   # CSV y relaciones, sin conectar a Atlas
npm run seed         # inserción en la base de datos configurada
```

La semilla utiliza claves estables e inserta solo los registros que faltan. No borra colecciones ni sobrescribe vehículos existentes. Las imágenes subidas posteriormente no se sustituyen al repetirla. Modificar un CSV de una unidad ya insertada todavía no actualiza esa unidad.

## Datos y fotografías

El ejemplo contiene VIN, precios con símbolo `$`, kilometrajes, colores y fechas de demostración. No acredita unidades reales. Los precios originales se conservan como texto en el CSV; no se les asigna una moneda ni se convierten en precios de venta verificados. Los VIN originales tampoco se publican como identificadores reales en la API.

Las fotografías revisadas cubren Tesla Model S, Audi Q5 y Mercedes Clase S del CSV, además de Porsche Taycan y Ferrari Roma de la selección editorial. Las fotos pueden corresponder a una generación o acabado diferente. Cuando no hay foto específica, se muestra una referencia de la misma marca, identificada como tal. Cada marca del CSV dispone de dos referencias y se conserva la misma asignación en tarjeta y ficha.

Fuentes y licencias en [Recursos](docs/RECURSOS.md) y en la página `/creditos`.

## API inicial

Todas las rutas de negocio se publican bajo `/api/v1`.

| Método | Ruta | Acceso |
| --- | --- | --- |
| GET | `/health` | Público |
| POST | `/auth/register`, `/auth/login`, `/auth/logout` | Origen permitido |
| GET | `/auth/me` | Sesión |
| GET | `/vehicles`, `/vehicles/:id`, `/dealerships` | Público |
| POST | `/vehicles/:id/image` | Administradora |
| GET / POST | `/appointments` | Sesión |
| PATCH | `/appointments/:id` | Propietario para cancelar; personal autorizado para gestionar |

La respuesta utiliza `{ success, data }` o `{ success: false, error }`. La sesión web utiliza una cookie `HttpOnly`; las operaciones de escritura comprueban `Origin`. Las llamadas manuales de Insomnia deben incluir un origen permitido. El índice de citas permite una cita activa por sede y hora.

## Documentación

- [Memoria inicial](MEMORIA.md).
- [Arquitectura y evolución hacia la app](docs/ARQUITECTURA.md).
- [Dirección visual](docs/DISENO.md).
- [Logo e identidad de marca](docs/MARCA.md).
- [Revisión del enunciado](docs/REVISION-ENTREGA.md).
- [Fotografías y recursos](docs/RECURSOS.md).

## Despliegue

Pendiente. Los archivos de Vercel son una base de configuración; hay que sustituir el dominio de ejemplo de la API y comprobar cookies, CORS y enlaces directos. Se propone que la web publique `/api/v1` mediante un proxy al backend para evitar depender de cookies entre sitios distintos.

## Aviso académico y autora

KelseTS Cars es una marca ficticia para fines educativos y de portfolio. No existe afiliación ni patrocinio de los fabricantes. No se ofrecen ventas, reservas comerciales ni servicios reales de mantenimiento.

**Araceli Fradejas Muñoz** · Rock The Code · The Power Tech School.

[GitHub](https://github.com/AraceliFradejas) · [LinkedIn](https://www.linkedin.com/in/araceli-fradejas-munoz-transformaciondigital/)

La [organización de las secciones y referencias](docs/SECCIONES.md) distingue la entrega Rock The Code de los módulos previstos para BigSchool.
