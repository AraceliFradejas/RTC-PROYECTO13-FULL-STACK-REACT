import mongoose from 'mongoose';
const schema = new mongoose.Schema({
  seedKey: { type: String, unique: true, required: true },
  name: { type: String, required: true }, city: { type: String, required: true },
  address: String, hours: String, demo: { type: Boolean, default: true },
}, { timestamps: true });
export const Dealership = mongoose.model('Dealership', schema);
