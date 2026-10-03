import mongoose from 'mongoose';
const schema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  vehicle: { type: mongoose.Schema.Types.ObjectId, ref: 'Vehicle', required: true },
  dealership: { type: mongoose.Schema.Types.ObjectId, ref: 'Dealership', required: true },
  date: { type: Date, required: true },
  service: { type: String, enum: ['Prueba de conducción', 'Asesoramiento', 'Mantenimiento'], required: true },
  status: { type: String, enum: ['Pendiente', 'Confirmada', 'Cancelada', 'Completada'], default: 'Pendiente' },
  active: { type: Boolean, default: true },
}, { timestamps: true });
schema.index({ dealership: 1, date: 1 }, { unique: true, partialFilterExpression: { active: true } });
export const Appointment = mongoose.model('Appointment', schema);
