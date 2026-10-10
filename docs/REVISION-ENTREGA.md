# Requisitos de Rock The Code y evidencias

La entrega es una aplicación web con React y Node.js, datos preparados en Excel, relaciones en MongoDB Atlas y acceso según el perfil. La tabla relaciona el enunciado con la implementación y los informes de pruebas.

| Requisito | Estado comprobado | Evidencia y alcance |
| --- | --- | --- |
| Node.js y React | Implementados e integrados | Safari: recorrido temporal; HTTP: recorrido privado publicado |
| Excel con al menos 100 registros | 148 vehículos, cuatro sedes y cuatro talleres | [Numbers, CSV y validación](evidencias/datos/README.md) |
| Dos colecciones relacionadas además de usuarios | Vehículos y sedes; talleres y citas amplían las relaciones | [Relaciones en Atlas](evidencias/mongodb/README.md) y [recorrido de producción](evidencias/produccion/README.md) |
| Semilla con lectura de archivos fs | Excel exportado a CSV; semilla valida y carga sin duplicar | [Guía de datos](DATOS-EXCEL.md) |
| Usuarios y rutas protegidas | Clientes, talleres y Team con permisos diferenciados | [76 casos de Insomnia](insomnia/VALIDACION-DETALLADA.md) |
| Variables en style.css | Colores, espacios y estilos compartidos definidos | frontend/src/styles/style.css |
| Arquitectura y reutilización | Organización por funcionalidades, componentes y cliente HTTP compartido | [Memoria](../MEMORIA.md) |
| Hooks avanzados necesarios | useResource utiliza useReducer para carga, error y reintento; AbortController cancela peticiones | frontend/src/shared/hooks/useResource.js |
| UX/UI | Navegación, teclado y layouts de perfiles revisados en Safari | [Responsive](evidencias/movil/README.md); capturas de Safari de escritorio |
| Castellano e inglés, requisito de marca | Rutas públicas, layouts privados y comunicaciones tienen evidencias ES/EN | [Idiomas](evidencias/idiomas/README.md); revisión en Safari y HTTP |
| Cloudinary opcional | Subida, sustitución y entrega desde la web publicada comprobadas | [Fotografías](evidencias/cloudinary/README.md); recorrido en Safari de escritorio |
| README y memoria | README bilingüe; 23 capturas de Insomnia y cinco de Numbers incorporadas | README bilingüe, memoria y anexos de pruebas |
| Despliegue frontend y backend | Web y API publicadas; catálogo, sesión, citas e imágenes comprobados | [Producción](evidencias/produccion/README.md) |
| DocBase fuera del repositorio | Carpeta ignorada y sin archivos versionados | Exclusión comprobada |

## Pruebas documentadas

- 51 pruebas locales: 30 backend, 16 frontend y cinco del cliente HTTP. Dos integraciones opcionales se omiten en esta ejecución y tienen informes independientes.
- Compilación del frontend completada. El paquete principal mide 557,05 kB (162,11 kB gzip); el build muestra un aviso de tamaño.
- Insomnia: 76 peticiones y 171 comprobaciones sobre una base temporal; 15 peticiones y 36 comprobaciones públicas contra Vercel. El informe contiene 23 capturas.
- Producción: 101 comprobaciones HTTP del catálogo, permisos y recorrido privado de talleres y citas.
- Datos: cuatro hojas abiertas en Numbers, cinco capturas, comparación completa XLSX–CSV y validación de la semilla.
- Mailtrap: diez muestras recibidas y revisadas en su preset móvil. Los avisos de la aplicación se conservan como mensajes privados simulados.

Cada informe identifica su entorno. Las capturas responsive utilizan Safari de escritorio a anchuras controladas. La grabación del iPhone 13 aporta siete fotogramas del dispositivo real con una revisión visual independiente. Las muestras del Sandbox no acreditan entrega a buzones personales.
