import { z } from 'zod';
import { Vehicle } from '../models/Vehicle.js';
import { Dealership } from '../models/Dealership.js';
import { objectId } from '@kelsets-cars/contracts';
import { HttpError, send } from '../../../utils/errors.js';
const escapeRegex = value => value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
const querySchema = z.object({
  q: z.string().max(100).optional(), brand: z.string().max(60).optional(), fuel: z.string().max(40).optional(),
  page: z.coerce.number().int().min(1).max(10000).default(1),
  sort: z.enum(['brand', 'price-asc', 'price-desc']).default('brand'),
});
export async function listVehicles(req, res) {
  const { q, brand, fuel, page, sort } = querySchema.parse(req.query);
  const filter = {};
  if (q) filter.$or = ['brand', 'model'].map(key => ({ [key]: new RegExp(escapeRegex(q), 'i') }));
  if (brand) filter.brand = brand;
  if (fuel) filter.fuel = fuel;
  const order = sort === 'brand' ? { brand: 1, model: 1, seedKey: 1 } : { price: sort === 'price-asc' ? 1 : -1, seedKey: 1 };
  const [items, total, brands, fuels] = await Promise.all([
    Vehicle.find(filter).sort(order).skip((page - 1) * 12).limit(12).populate('dealership'),
    Vehicle.countDocuments(filter), Vehicle.distinct('brand'), Vehicle.distinct('fuel'),
  ]);
  send(res, { items, total, page, pages: Math.ceil(total / 12), brands: brands.sort(), fuels: fuels.sort() });
}
export async function getVehicle(req, res) {
  const vehicle = await Vehicle.findById(objectId.parse(req.params.id)).populate('dealership');
  if (!vehicle) throw new HttpError(404, 'Vehículo no encontrado.');
  send(res, vehicle);
}
export async function listDealerships(req, res) { send(res, await Dealership.find().sort({ city: 1 })); }
