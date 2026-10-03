# Dirección visual · KelseTS Cars

## Identidad propia

La marca utiliza verde profundo, marfil y acentos cálidos. La tipografía de interfaz facilita navegación y formularios; los fragmentos en serif aportan un tono editorial. La palabra KelseTS conserva la continuidad con los proyectos anteriores.

Las variables de color, espaciado y tipografía viven en `frontend/src/styles/style.css`. Los estilos reutilizables están en `components.css`. No se necesita incorporar una librería de estilos para dar coherencia a esta primera versión.

## Referencias consultadas

- [Porsche España](https://www.porsche.com/spain/): relación entre fotografía, familias de modelos y caminos de descubrimiento.
- [Audi España](https://www.audi.es/es/): navegación por modelos, filtros y acceso a inventario y servicios.
- [Mercedes-Benz España](https://www.mercedes-benz.es/passengercars/models.html): organización de gamas y categorías.
- [Tesla España](https://www.tesla.com/es_es): presentación directa de modelos y movilidad eléctrica.
- [Ferrari](https://www.ferrari.com/en-EN/auto): referencia de marca; la consulta automática del sitio encontró verificación de acceso y no permitió una revisión visual completa.

Las referencias orientan el diseño. No se reproducen sus logotipos, textos comerciales ni composiciones exactas.

## Recorrido

Inicio → catálogo → ficha → acceso si hace falta → solicitud de cita → área personal.

La portada editorial ofrece contexto antes de pedir datos. El catálogo consulta inventario real de la base académica. Los créditos son accesibles desde el pie. Las fotos no se presentan como fotografías de unidades concretas.

## Revisión pendiente

La portada incorpora un hero a pantalla completa con navegación superpuesta, escenas seleccionables, encuadre animado y pausa. Las secciones entran con transiciones suaves al aparecer y las tarjetas usan fotografías a sangre. Se respeta `prefers-reduced-motion`.

`frontend/src/features/brand/heroMedia.js` centraliza el vídeo y la imagen de portada. `videoSrc` permanece vacío hasta disponer del archivo definitivo. El componente reproduce el vídeo sin sonido, admite pausa, detiene la reproducción al ocultar la pestaña y conserva una imagen si el vídeo falla. El vídeo todavía no se ha incorporado ni se ha verificado con un archivo real.

Comprobar contraste, teclado, pantallas pequeñas y estados de formulario. Las imágenes de Commons están elegidas por correspondencia de modelo y licencia; el tratamiento visual definitivo podrá mejorar cuando exista una selección fotográfica más amplia.
