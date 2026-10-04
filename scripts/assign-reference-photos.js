import { readFile, writeFile } from 'node:fs/promises';
import { readDataset } from '../backend/src/seeds/readDataset.js';

const photos = JSON.parse(await readFile(new URL('../data/media/vehicles.json', import.meta.url), 'utf8'));
const { vehicles } = await readDataset();
const counts = new Map();
const assignments = {};
for (const vehicle of vehicles.sort((a, b) => a.seedKey.localeCompare(b.seedKey))) {
  const references = photos.filter(photo => photo.brand === vehicle.brand);
  const modelPhotos = references.filter(photo => photo.model === vehicle.model && !photo.brandReference);
  const options = modelPhotos.length ? modelPhotos : references;
  if (!options.length) throw new Error(`Faltan fotografías de ${vehicle.brand}.`);
  const group = `${vehicle.brand}:${modelPhotos.length ? vehicle.model : '*'}`;
  const index = counts.get(group) || 0;
  assignments[vehicle.seedKey] = options[index % options.length].key;
  counts.set(group, index + 1);
}
await writeFile(new URL('../data/media/vehicle-photo-assignments.json', import.meta.url), `${JSON.stringify(assignments, null, 2)}\n`);
console.log(`Referencias asignadas a ${vehicles.length} vehículos de ${new Set(vehicles.map(vehicle => vehicle.brand)).size} marcas, dando prioridad al modelo.`);
