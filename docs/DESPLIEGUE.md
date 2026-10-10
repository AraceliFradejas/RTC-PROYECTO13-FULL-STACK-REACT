# Despliegue de KelseTS Cars

Preparación del 10 de octubre de 2026. El despliegue todavía no está verificado.

Se utiliza el mismo repositorio para dos proyectos de Vercel. Los paquetes compartidos y el archivo de dependencias están en la raíz del repositorio: ambos proyectos necesitan incluir los archivos externos a su carpeta raíz.

| Ajuste | Backend | Frontend |
| --- | --- | --- |
| Proyecto previsto | `kelsets-cars-api` | `kelsets-cars` |
| Carpeta raíz | `backend` | `frontend` |
| Aplicación | Express | Vite |
| Instalación | Detección de npm workspaces | Detección de npm workspaces |
| Compilación | Sin paso de compilación propio | `npm run build` |
| Directorio de salida | Gestionado por Express en Vercel | `dist` |

## Variables privadas del backend

Configurar en Vercel los valores de `MONGODB_URI`, `JWT_SECRET`, `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY` y `CLOUDINARY_API_SECRET`, como sensibles. El código no contiene esos valores. No se sube el archivo `.env` completo ni las credenciales de la administradora o de Mailtrap.

`NODE_ENV` debe ser `production`. `FRONTEND_URL` debe contener el origen HTTPS real de la web, sin ruta ni barra final. No usar un comodín para permitir las escrituras. Si cambia el dominio, hay que actualizar esta variable y volver a desplegar el backend.

## Web y sesión

El cliente utiliza `/api/v1` y el archivo `frontend/vercel.json` reenvía `/api` al backend. Antes de publicar la web hay que sustituir la dirección provisional por la URL confirmada de la API. No configurar `VITE_API_URL` con una dirección externa para este despliegue: se conserva la ruta relativa para que las peticiones de la web usen su mismo dominio.

Las rutas de React deben poder abrirse directamente y recargarse. Las imágenes y los archivos públicos deben servirse como archivos, sin convertirse en el HTML de la aplicación.

La sesión usa una cookie `HttpOnly` y `Secure` en producción. Las escrituras comprueban `Origin`. Express confía en un salto de proxy solo cuando Vercel identifica su entorno mediante `VERCEL=1`, para que el limitador de acceso pueda interpretar sus cabeceras. El limitador actual utiliza memoria por instancia; no equivale a un límite global distribuido.

## Fotografías

El límite compartido del archivo es 4 MB. Vercel limita el cuerpo completo de las peticiones a 4,5 MB, por lo que se deja margen para multipart. Los archivos llegan a Multer en memoria y se guardan en Cloudinary; no necesitan escritura en el disco del servidor.

## Comprobaciones antes de darlo por publicado

- Salud de la API y consulta pública del catálogo, las sedes y los talleres.
- Acceso, conservación de sesión al recargar y cierre de sesión desde la web.
- Rechazo de solicitudes sin sesión o con permisos insuficientes.
- Registro y cita con datos ficticios; consulta desde los perfiles correspondientes.
- Imágenes, vídeo y enlaces directos a fichas, acceso y sedes.
- Formulario de fotografías, confirmación y errores desde Team.
- Revisión en Safari y en el iPhone, guardando evidencias sin secretos.

No repetir la semilla en producción solo para probar el despliegue: Atlas ya contiene el inventario. La salud de la API no acredita por sí sola una conexión correcta a Atlas, porque funciona sin base de datos.

## Referencias

- [Express en Vercel](https://vercel.com/docs/frameworks/backend/express).
- [Monorepos y archivos fuera de la carpeta raíz](https://vercel.com/docs/monorepos/monorepo-faq).
- [Reescrituras hacia otros proyectos](https://vercel.com/docs/routing/rewrites).
- [Límites de las funciones](https://vercel.com/docs/functions/limitations).
- [Cabeceras de Vercel](https://vercel.com/docs/headers/request-headers).
