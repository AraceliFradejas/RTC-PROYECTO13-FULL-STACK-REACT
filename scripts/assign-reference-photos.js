import { readFile, writeFile } from 'node:fs/promises';
import { readDataset } from '../backend/src/seeds/readDataset.js';

const photos = JSON.parse(await readFile(new URL('../data/media/vehicles.json', import.meta.url), 'utf8'));
const { vehicles } = await readDataset();
const counts = new Map();
const assignments = {};
for (const vehicle of vehicles.sort((a, b) => a.seedKey.localeCompare(b.seedKey))) {
  const options = photos.filter(photo => photo.brand === vehicle.brand);
  if (!options.length) throw new Error(`Faltan fotografías de ${vehicle.brand}.`);
  const index = counts.get(vehicle.brand) || 0;
  assignments[vehicle.seedKey] = options[index % options.length].key;
  counts.set(vehicle.brand, index + 1);
}
await writeFile(new URL('../data/media/vehicle-photo-assignments.json', import.meta.url), `${JSON.stringify(assignments, null, 2)}\n`);
console.log(`Referencias asignadas a ${vehicles.length} vehículos de ${counts.size} marcas.`);
