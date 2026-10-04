import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { createHash } from 'node:crypto';

// Descarga candidatos con licencia libre. Revisar las imágenes antes de incorporarlas.
const targets = process.argv.includes('--supplement') ? [
  ['Audi', 'S e-tron GT', 'incategory:"Audi S e-tron GT" -PANA0141 -PANA0142'],
  ['Porsche', 'Macan Electric', 'incategory:"Porsche Macan (XAB)"'],
] : [
  ['Porsche', '911 Carrera', 'Porsche 911 Carrera coupe front -Speedster'],
  ['Porsche', 'Taycan', 'Porsche Taycan front'],
  ['Porsche', 'Panamera', 'Porsche Panamera front'],
  ['Porsche', 'Macan Electric', 'Porsche Macan electric front'],
  ['Ferrari', 'Roma', 'Ferrari Roma front -Spider'],
  ['Ferrari', '296 GTB', 'Ferrari 296 GTB front'],
  ['Mercedes-Benz', 'EQS 450+', 'Mercedes EQS sedan front -SUV'],
  ['Mercedes-Benz', 'EQS SUV 450 4MATIC', 'Mercedes EQS SUV front'],
  ['Audi', 'RS e-tron GT', 'Audi RS e-tron GT front'],
  ['Audi', 'S e-tron GT', 'Audi S e-tron GT front'],
  ['Tesla', 'Model S', 'Tesla Model S front'],
  ['Tesla', 'Model X', 'Tesla Model X front'],
];
const directory = join(tmpdir(), 'kelsets-photo-candidates');
await mkdir(directory, { recursive: true });
const existing = JSON.parse(await readFile(new URL('../data/media/vehicles.json', import.meta.url)));
const seen = new Set(existing.map(photo => decodeURIComponent(photo.sourceUrl.split('/wiki/')[1]).replaceAll('_', ' ')));
const clean = html => html.replace(/<[^>]*>/g, '').replaceAll('&amp;', '&').replaceAll('&#39;', "'").trim();
const candidates = process.argv.includes('--supplement') ? JSON.parse(await readFile(`${directory}/manifest.json`, 'utf8')) : [];
for (const photo of candidates) seen.add(photo.fileTitle);
for (const [brand, model, query] of targets) {
  const params = new URLSearchParams({ action: 'query', format: 'json', generator: 'search', gsrsearch: `${query} filetype:bitmap`, gsrnamespace: '6', gsrlimit: '20', prop: 'imageinfo', iiprop: 'url|extmetadata|size', iiurlwidth: '1920' });
  const response = await fetch(`https://commons.wikimedia.org/w/api.php?${params}`, { headers: { 'User-Agent': 'KelseTSCarsTFM/1.0 (educational attribution)' } });
  if (!response.ok) throw new Error(`Commons: ${response.status}`);
  const result = await response.json();
  let count = 0;
  for (const page of Object.values(result.query?.pages || {}).sort((a, b) => a.index - b.index)) {
    const info = page.imageinfo?.[0];
    const metadata = info?.extmetadata;
    const license = metadata?.LicenseShortName?.value;
    if (!info || !/^CC (BY|BY-SA) [234]\.0$|^CC0$|^Public domain$/.test(license || '') || !metadata.Artist?.value || !metadata.LicenseUrl?.value) continue;
    if (seen.has(page.title) || info.width < 1500 || info.width / info.height < 1.25 || info.width / info.height > 2.3 || !/\.jpe?g$/i.test(page.title)) continue;
    if (/interior|cockpit|steering|engine|rear|badge|logo|wheel|detail|speedster/i.test(page.title)) continue;
    const fileId = createHash('sha256').update(page.title).digest('hex').slice(0, 10);
    const key = `collection-${brand}-${model}-${fileId}`.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/-$/, '');
    const downloadUrl = (info.thumburl || info.url).split('?')[0];
    try {
      const image = await fetch(downloadUrl, { headers: { 'User-Agent': 'KelseTSCarsTFM/1.0 (educational attribution)' } });
      if (!image.ok || !image.headers.get('content-type')?.startsWith('image/jpeg')) { console.log(`Omitida ${page.title}: ${image.status}`); continue; }
      const bytes = Buffer.from(await image.arrayBuffer());
      if (bytes[0] !== 255 || bytes[1] !== 216) continue;
      await writeFile(`${directory}/${key}.jpg`, bytes);
      candidates.push({ key, brand, model, src: `/images/vehicles/${key}.jpg`, fileTitle: page.title, sourceUrl: info.descriptionurl, downloadUrl, author: clean(metadata.Artist.value), license, licenseUrl: metadata.LicenseUrl.value, alt: `${brand} ${model}, fotografía de referencia; versión y año pueden diferir`, changes: 'Copia reducida por Wikimedia Commons; encuadre adaptable con CSS. No representa una unidad del concesionario.', checkedAt: '2026-10-04', modelReference: true, width: info.thumbwidth || info.width, height: info.thumbheight || info.height });
      seen.add(page.title); count++;
      console.log(`${brand} ${model}: ${count} · ${page.title}`);
    } catch (error) { console.log(`Descarga omitida: ${page.title} · ${error.message}`); }
    if (count === 4) break;
  }
  await writeFile(`${directory}/manifest.json`, `${JSON.stringify(candidates, null, 2)}\n`);
  console.log(`Resultado ${brand} ${model}: ${count}`);
}
console.log(`${candidates.length} candidatos descargados para revisión visual en ${directory}.`);
