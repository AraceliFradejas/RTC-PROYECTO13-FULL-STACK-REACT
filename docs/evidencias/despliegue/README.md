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

## Pendiente

- Recorrido completo de citas y talleres desde la web publicada.
- Subida de fotografías desde Vercel. Dos intentos locales del 10 de octubre fallaron por un corte de conexión HTTPS con Cloudinary; los casos de permisos y archivos anteriores a la subida sí se ejecutaron. La integración correcta del 4 de octubre conserva sus evidencias.
- Revisión completa en dispositivos reales y versión inglesa de la interfaz.
