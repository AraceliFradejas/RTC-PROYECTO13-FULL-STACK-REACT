# Despliegue · 10 de octubre de 2026

- [Web](https://kelsets-cars.vercel.app).
- [API](https://kelsets-cars-api.vercel.app/api/v1/health).
- [Informe HTTP sin credenciales](verificacion.json).

## Capturas de Safari de escritorio

![Portada publicada, con vídeo y controles visibles](01-home-safari.png)

![Catálogo publicado: búsqueda, contador de 148 vehículos e imágenes](02-catalogo-safari.png)

![Área de la cuenta ficticia después de recargar con sesión activa](03-sesion-safari.png)

El registro se realizó mediante HTTP con una cuenta ficticia autorizada. El acceso, la recarga y el cierre se comprobaron también desde Safari. La cuenta permanece en Atlas como demostración. No se publican su contraseña ni las cookies. Su bandeja contiene la bienvenida; no se enviaron correos a buzones personales.

El informe comprueba consultas públicas, archivos, rutas directas, acceso, sesión, agenda vacía, bienvenida, cierre y rechazos de origen y de permisos. Una respuesta HTML correcta en una ruta no prueba todas las interacciones de esa página.

## Recorridos relacionados

El [recorrido HTTP en producción](../produccion/README.md) incluye talleres y citas. La [subida publicada](../cloudinary/README.md) documenta React, Vercel, Cloudinary y Atlas. Las [capturas de idiomas](../idiomas/README.md) y [responsive](../movil/README.md) identifican sus páginas y anchuras. Cada informe conserva el alcance de su revisión.
