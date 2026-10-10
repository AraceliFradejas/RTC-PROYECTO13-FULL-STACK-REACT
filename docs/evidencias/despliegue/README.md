# Despliegue

- [Web](https://kelsets-cars.vercel.app).
- [API](https://kelsets-cars-api.vercel.app/api/v1/health).
- [Informe HTTP sin credenciales](verificacion.json).

## Capturas de Safari de escritorio

<a href="01-home-safari.png"><img src="01-home-safari.png" alt="Portada publicada, con vídeo y controles visibles" width="720"></a>

<a href="02-catalogo-safari.png"><img src="02-catalogo-safari.png" alt="Catálogo publicado: búsqueda, contador de 148 vehículos e imágenes" width="720"></a>

<a href="03-sesion-safari.png"><img src="03-sesion-safari.png" alt="Área de la cuenta ficticia después de recargar con sesión activa" width="720"></a>

El registro se realizó mediante HTTP con una cuenta ficticia autorizada. El acceso, la recarga y el cierre se comprobaron también desde Safari. La cuenta permanece en Atlas como demostración. No se publican su contraseña ni las cookies. Su bandeja contiene la bienvenida; no se enviaron correos a buzones personales.

El informe comprueba consultas públicas, archivos, rutas directas, acceso, sesión, agenda vacía, bienvenida, cierre y rechazos de origen y de permisos. Una respuesta HTML correcta en una ruta no prueba todas las interacciones de esa página.

## Recorridos relacionados

El [recorrido HTTP en producción](../produccion/README.md) incluye talleres y citas. La [subida publicada](../cloudinary/README.md) documenta React, Vercel, Cloudinary y Atlas. Las [capturas de idiomas](../idiomas/README.md) y [responsive](../movil/README.md) identifican sus páginas y anchuras. Cada informe conserva el alcance de su revisión.
