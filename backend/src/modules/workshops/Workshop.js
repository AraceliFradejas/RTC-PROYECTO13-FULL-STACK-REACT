import mongoose from 'mongoose';
import { WORKSHOP_SPECIALTIES } from '@kelsets-cars/contracts';
const schema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', unique: true, sparse: true },
  seedKey: { type: String, unique: true, sparse: true },
  dealership: { type: mongoose.Schema.Types.ObjectId, ref: 'Dealership' },
  latitude: { type: Number, min: -90, max: 90 },
  longitude: { type: Number, min: -180, max: 180 },
  area: String,
  public: { type: Boolean, default: false },
  demo: { type: Boolean, default: false },
  name: { type: String, required: true, maxlength: 120 },
  city: { type: String, required: true, maxlength: 80 },
  address: { type: String, required: true, maxlength: 180 },
  phone: { type: String, maxlength: 20 },
  specialties: [{ type: String, enum: WORKSHOP_SPECIALTIES }],
  status: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' },
  reason: { type: String, maxlength: 500, default: '' },
  reviewedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  reviewedAt: Date,
}, { timestamps: true });
export const Workshop = mongoose.model('Workshop', schema);
