import bcrypt from 'bcryptjs';
import mongoose from 'mongoose';
import { readDataset } from './readDataset.js';
import { connectDatabase } from '../config/database.js';
import { Dealership } from '../modules/catalog/models/Dealership.js';
import { Vehicle } from '../modules/catalog/models/Vehicle.js';
import { User } from '../modules/auth/models/User.js';
import { Workshop } from '../modules/workshops/Workshop.js';
const { dealers, vehicles, workshops } = await readDataset();
console.log(`CSV válidos: ${vehicles.length} vehículos, ${dealers.length} sedes y ${workshops.length} talleres relacionados.`);
if (!process.argv.includes('--check')) {
  const email = process.env.ADMIN_EMAIL?.trim().toLowerCase();
  const password = process.env.ADMIN_PASSWORD;
  if ((email || password) && (!email || !password || password.length < 10 || password.length > 72)) throw new Error('Configura ADMIN_EMAIL y ADMIN_PASSWORD (10–72 caracteres) conjuntamente.');
  try {
    await connectDatabase();
    const dealerMap = new Map();
    for (const input of dealers) {
      const dealer = await Dealership.findOneAndUpdate({ seedKey: input.seedKey }, { $set: { ...input, demo: true } }, { upsert: true, new: true, runValidators: true });
      dealerMap.set(input.seedKey, dealer._id);
    }
    for (const input of vehicles) {
      const { dealershipKey, originalPrice, originalVin, image, photoKey, ...data } = input;
      // El símbolo "$" no identifica una moneda. VIN y precios del ejemplo
      // no se convierten en características verificadas de una unidad real.
      await Vehicle.findOneAndUpdate({ seedKey: data.seedKey }, {
        $setOnInsert: { ...data, acquiredAt: data.acquiredAt ? new Date(data.acquiredAt) : undefined, demo: true, vin: null,
          dealership: dealerMap.get(dealershipKey), image, photoKey },
      }, { upsert: true, runValidators: true });
    }
    for (const input of workshops) {
      const { dealershipKey, ...data } = input;
      await Workshop.findOneAndUpdate({ seedKey: input.seedKey }, { $setOnInsert: { ...data, demo: true, public: true, status: 'approved', dealership: dealerMap.get(dealershipKey) } }, { upsert: true, runValidators: true });
    }
    if (email) {
      await User.findOneAndUpdate({ email }, { $setOnInsert: { name: 'Administración KelseTS Cars', email, role: 'admin', password: await bcrypt.hash(password, 12) } }, { upsert: true, runValidators: true });
    }
    await Promise.all([User.init(), Vehicle.init(), Dealership.init(), Workshop.init()]);
    console.log('Semilla terminada. No se han eliminado ni sobrescrito vehículos existentes.');
  } finally { await mongoose.disconnect(); }
}
