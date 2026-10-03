import mongoose from 'mongoose';
const schema = new mongoose.Schema({
  seedKey: { type: String, unique: true, required: true },
  name: { type: String, required: true }, city: { type: String, required: true },
  address: String, hours: String, demo: { type: Boolean, default: true },
  area: String,
  latitude: { type: Number, min: -90, max: 90 },
  longitude: { type: Number, min: -180, max: 180 },
}, { timestamps: true });
export const Dealership = mongoose.model('Dealership', schema);
