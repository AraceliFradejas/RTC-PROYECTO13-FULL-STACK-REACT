import mongoose from 'mongoose';
const schema = new mongoose.Schema({
  seedKey: { type: String, unique: true, required: true },
  brand: { type: String, required: true }, model: { type: String, required: true },
  bodyType: { type: String, required: true }, fuel: { type: String, required: true },
  year: { type: Number, min: 1900, max: 2030 }, mileage: { type: Number, min: 0 },
  price: { type: Number, min: 0 }, currency: { type: String, enum: ['EUR', 'USD'], default: 'EUR' },
  vin: { type: String, default: null },
  condition: { type: String, enum: ['Nuevo', 'Usado', 'Por completar'], default: 'Por completar' },
  status: { type: String, enum: ['Disponible', 'Reservado', 'Vendido', 'Por completar'], default: 'Por completar' },
  acquiredAt: Date, color: String, image: { type: String, default: '' }, imagePublicId: String,
  photoKey: String, sourceUrl: { type: String, required: true }, sourceCheckedAt: String,
  demo: { type: Boolean, default: true },
  dealership: { type: mongoose.Schema.Types.ObjectId, ref: 'Dealership', required: true },
}, { timestamps: true });
schema.index({ brand: 1, fuel: 1, price: 1 });
export const Vehicle = mongoose.model('Vehicle', schema);
