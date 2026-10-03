"""Construye créditos a partir de metadatos de Commons revisados manualmente.

Las respuestas de la API se guardan en /private/tmp, fuera del repositorio.
No selecciona ni publica automáticamente nuevos recursos.
"""
import html
import json
import pathlib
import re

selections = {
    'tesla-model-s': ('Tesla', 'Model S', 'File:Tesla MODEL S front.jpg'),
    'audi-q5': ('Audi', 'Q5', 'File:2018 Audi Q5 S Line TDi Quattro S-A 2.0 Front.jpg'),
    'mercedes-s-class': ('Mercedes-Benz', 'Clase S', 'File:Mercedes-Benz S 500 (W222) front view.jpg'),
    'porsche-taycan': ('Porsche', 'Taycan', 'File:Porsche Taycan GTS (front view) (taken in 2022) (Kyoto, Japan).jpg'),
    'ferrari-roma': ('Ferrari', 'Roma', 'File:Ferrari Roma (2022) front.jpg'),
}
records = []
for key, (brand, model, title) in selections.items():
    payload = json.loads(pathlib.Path(f'/private/tmp/{key}-commons.json').read_text())
    page = next(p for p in payload['query']['pages'].values() if p['title'] == title)
    info = page['imageinfo'][0]
    metadata = info['extmetadata']
    plain = lambda field: html.unescape(re.sub('<[^>]+>', '', metadata.get(field, {}).get('value', '')))
    records.append({
        'key': key, 'brand': brand, 'model': model,
        'src': f'/images/vehicles/{key}.jpg',
        'downloadUrl': info.get('thumburl', info['url']).split('?')[0],
        'sourceUrl': info['descriptionurl'], 'author': plain('Artist'),
        'license': plain('LicenseShortName'), 'licenseUrl': plain('LicenseUrl'),
        'alt': f'{brand} {model}, fotografía ilustrativa del modelo',
        'changes': 'Copia reducida por Wikimedia Commons; encuadre con CSS en la web.',
        'checkedAt': '2026-10-03',
    })
pathlib.Path('data/media/vehicles.json').write_text(json.dumps(records, ensure_ascii=False, indent=2) + '\n')
print('Créditos preparados para', len(records), 'fotografías.')
