import { readFile } from 'node:fs/promises';
import { parse } from 'csv-parse/sync';
import { z } from 'zod';
import { WORKSHOP_SPECIALTIES } from '@kelsets-cars/contracts';
const directory = new URL('../../../data/csv/', import.meta.url);
const unique = (rows, name) => {
  if (new Set(rows.map(row => row.seedKey)).size !== rows.length) throw new Error(`Claves repetidas en ${name}.`);
};
const dealerSchema = z.object({ seedKey: z.string().min(1), name: z.string().min(1), city: z.string().min(1), address: z.string().min(1), area: z.string().min(1), latitude: z.coerce.number().min(-90).max(90), longitude: z.coerce.number().min(-180).max(180), hours: z.string().min(1), demo: z.literal('true') });
const vehicleSchema = z.object({
  seedKey: z.string().min(1), brand: z.string().min(1), model: z.string().min(1),
  bodyType: z.string().min(1), fuel: z.string().min(1),
  year: z.coerce.number().int().min(1900).max(2030), mileage: z.coerce.number().int().min(0),
  condition: z.enum(['Nuevo', 'Usado']), status: z.enum(['Disponible', 'Reservado', 'Vendido']),
  originalPrice: z.string(), originalVin: z.string(), acquiredAt: z.iso.date(), color: z.string(),
  dealershipKey: z.string().min(1), photoKey: z.string(), image: z.string(), sourceUrl: z.url(), demo: z.literal('true'),
});
const workshopSchema = dealerSchema.omit({ hours: true }).extend({ dealershipKey: z.string().min(1), specialties: z.string().transform(value => value.split('|')).pipe(z.array(z.enum(WORKSHOP_SPECIALTIES)).min(1)) });
export async function readDataset() {
  const read = async name => parse(await readFile(new URL(name, directory), 'utf8'), { columns: true, bom: true, skip_empty_lines: true });
  const dealers = (await read('dealerships.csv')).map(row => dealerSchema.parse(row));
  const vehicles = (await read('vehicles.csv')).map(row => vehicleSchema.parse(row));
  const workshops = (await read('workshops.csv')).map(row => workshopSchema.parse(row));
  if (vehicles.length < 100) throw new Error('La semilla necesita al menos 100 vehículos.');
  unique(dealers, 'sedes'); unique(vehicles, 'vehículos');
  unique(workshops, 'talleres');
  const keys = new Set(dealers.map(dealer => dealer.seedKey));
  if (vehicles.some(vehicle => !keys.has(vehicle.dealershipKey))) throw new Error('Hay vehículos sin una sede válida.');
  if (workshops.some(workshop => !keys.has(workshop.dealershipKey))) throw new Error('Hay talleres sin una sede válida.');
  return { dealers, vehicles, workshops };
}
