# Identidad KelseTS Cars

La propuesta actual toma como referencia las imágenes aportadas en `DocBase/assets`, especialmente `01_logo_kelsets_cars.png`. Combina una tipografía serif para Kelse, TS con trazos rojos dibujados como curvas SVG, una corona de cinco puntas y CARS centrado bajo Kelse. El conjunto utiliza marfil, negro, rojo y dorado.

El logo se construye como SVG en `frontend/src/shared/components/BrandLogo.jsx`, compartido por cabecera y pie. Tiene fondo transparente y adapta el texto al color de la superficie. El nombre accesible lo proporciona el enlace que lo contiene. No depende de una imagen rasterizada y mantiene su nitidez al cambiar de tamaño.

La corona adopta el color del texto sobre fondos claros y oscuros. Se han ajustado las proporciones a la referencia aportada y se ha retirado el adorno dorado lateral.

El SVG compartido es la identidad utilizada en la web y sustituye las propuestas PNG anteriores con automóvil lateral.
