# Recursos y fotografías

Las cinco fotografías se descargan como recursos locales. Son imágenes ilustrativas del modelo y pueden diferir en generación, acabado, color y año respecto al CSV. No acreditan unidades concretas ni disponibilidad comercial.

| Modelo | Autor | Licencia | Fuente |
| --- | --- | --- | --- |
| Tesla Model S | Tokumeigakarinoaoshima | [CC0](http://creativecommons.org/publicdomain/zero/1.0/deed.en) | [Ficha original](https://commons.wikimedia.org/wiki/File:Tesla_MODEL_S_front.jpg) |
| Audi Q5 | Vauxford | [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0) | [Ficha original](https://commons.wikimedia.org/wiki/File:2018_Audi_Q5_S_Line_TDi_Quattro_S-A_2.0_Front.jpg) |
| Mercedes-Benz Clase S | Борис Ульзибат | [CC BY 3.0](https://creativecommons.org/licenses/by/3.0) | [Ficha original](https://commons.wikimedia.org/wiki/File:Mercedes-Benz_S_500_(W222)_front_view.jpg) |
| Porsche Taycan | Aos.1905 | [CC BY 4.0](https://creativecommons.org/licenses/by/4.0) | [Ficha original](https://commons.wikimedia.org/wiki/File:Porsche_Taycan_GTS_(front_view)_(taken_in_2022)_(Kyoto,_Japan).jpg) |
| Ferrari Roma | Charles | [CC BY 2.0](https://creativecommons.org/licenses/by/2.0) | [Ficha original](https://commons.wikimedia.org/wiki/File:Ferrari_Roma_(2022)_front.jpg) |

Consulta: 3 de octubre de 2026. Se utilizan copias reducidas por Commons y encuadre adaptable mediante CSS. Las condiciones de cada licencia se conservan en la tabla y en la página de créditos. Las fotografías con CC BY-SA conservan su licencia; esta atribución no cambia la licencia del código.

El manifiesto `data/media/vehicles.json` guarda URLs, autoría, licencia, texto alternativo y descripción de cambios. Tesla Model S, Audi Q5 y Mercedes Clase S se corresponden con modelos del CSV. Porsche Taycan y Ferrari Roma son recursos editoriales para la ampliación de lujo; todavía no se han incorporado como unidades al inventario.

El [logo KelseTS Cars](MARCA.md) toma como referencia la marca KelseTS Business School aportada por la autora.


## Recursos de marca aportados

Las imágenes de referencia y el vídeo se han recibido en `DocBase/assets`, carpeta excluida del repositorio. Solo se incorporan a `frontend/public` los archivos utilizados por la web:

- `images/editorial/showroom-v2.png`: escena conceptual reconstruida a partir de `03_showroom_concesionario.png`, utilizada en la sección de marca.
- `videos/kelsets-drive.mp4`: vídeo conceptual aportado, de diez segundos y 1280 × 720. Se elimina la pista de sonido y se prepara para reproducción progresiva.
- `images/editorial/hero-drive.jpg`: fotograma del vídeo para portada estática y respaldo de reproducción.

Estas escenas no acreditan vehículos ni instalaciones reales. Su procedencia se indica también en la página de créditos. Los diseños que muestran app, financiación, comunidad o taller permanecen como referencias para la segunda etapa; no implican funcionalidades implementadas.

## Mejora de nitidez

El showroom se ha reconstruido con la herramienta integrada imagegen y se ha guardado como `frontend/public/images/editorial/showroom-v2.png` (1254 × 1254). Se mantiene su condición de escena conceptual. Se han añadido los originales de Commons de Ferrari Roma (5765 × 3758), Porsche Taycan (3041 × 1728) y Tesla Model S (2496 × 1832). `srcSet` permite elegir entre copia reducida y original según el tamaño de presentación y la densidad de pantalla.

El vídeo conserva su resolución de origen, 1280 × 720. No se ha convertido a una resolución superior ni se afirma recuperar detalle que no existe en la fuente.

Prompt utilizado para la reconstrucción:

> Edit target: attached low-quality conceptual showroom image. Reconstruct as a very sharp high-resolution premium architectural automotive photograph, square composition at least 2048x2048 if supported. Preserve the scene, dark charcoal dealership exterior, perspective, warm amber interior lighting at dusk, parked luxury cars in front, red TS script and white serif Kelse with small crown and CARS beneath on facade. Exact main sign KelseTS CARS. Remove the white collage borders at image edges. Correct blurry edges and compression artifacts with crisp glass, fine metal panel seams, natural reflections, realistic wheels and headlights, clean accurate architectural geometry. Keep restrained colors and evening atmosphere. Side sign exact words LUXURY PERFORMANCE PEOPLE PASSION, elegant legible type. This remains conceptual brand artwork, not a photograph documenting a real dealership. No additional objects, slogans, watermark, or new brand identity.

Las nuevas láminas editoriales aportadas se guardan como conduccion.png, llaves.png, electrico.png, libertad.png, companeros.png, ruta.png y lifestyle.png. Su uso y los recursos reservados se detallan en [SECCIONES.md](SECCIONES.md).

## Sustitución de carteles por escenas limpias

Los recursos de las secciones se sustituyen por ocho imágenes creadas desde cero, sin textos incorporados: showroom-clean.png, conduccion-clean.png, electrico-clean.png, llaves-clean.png, ruta-clean.png, companeros-clean.png, lifestyle-clean.png y libertad-clean.png. Se guardan en `frontend/public/images/editorial/`. Los textos y las acciones se presentan mediante React. La dirección visual y los prompts se recogen en [ESCENAS-EDITORIALES.md](ESCENAS-EDITORIALES.md). Las imágenes aportadas permanecen como referencias, y las fotografías de modelos mantienen las atribuciones de Commons.

La serie de atención y cuidado añade asesoramiento-clean.png, taller-clean.png, profesional-clean.png y entrega-clean.png, creadas desde cero con imagegen y guardadas en frontend/public/images/editorial. Sus prompts se conservan en ESCENAS-EDITORIALES.md. Las escenas muestran personas ficticias e ilustran los valores de la marca.
