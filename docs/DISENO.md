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

## Vídeo y movimiento

La portada utiliza el vídeo definido en `frontend/src/features/brand/heroMedia.js`, con una imagen de respaldo. Se reproduce inicialmente sin sonido y ofrece controles para activar el audio y pausar. La música está creada con Suno. El hero no tiene paginación de diapositivas.

Las secciones utilizan transiciones suaves y respetan `prefers-reduced-motion`. La cabecera se convierte en un menú desplegable en pantallas estrechas. El [informe responsive](evidencias/movil/README.md) recoge la revisión en Safari de escritorio; las capturas no equivalen a una prueba física de iOS.
