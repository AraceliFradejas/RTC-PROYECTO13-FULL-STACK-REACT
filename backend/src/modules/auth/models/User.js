import mongoose from 'mongoose';
const schema = new mongoose.Schema({
  name: { type: String, required: true, trim: true, maxlength: 80 },
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  password: { type: String, required: true, select: false },
  role: { type: String, enum: ['client', 'workshop', 'staff', 'admin'], default: 'client' },
  accountType: { type: String, enum: ['client', 'workshop'], default: 'client' },
  readOnly: { type: Boolean, default: false },
  dealership: { type: mongoose.Schema.Types.ObjectId, ref: 'Dealership' },
}, { timestamps: true });
export const User = mongoose.model('User', schema);
export const publicUser = user => ({ id: String(user._id), name: user.name, email: user.email, role: user.role, readOnly: user.readOnly === true, accountType: user.accountType || 'client' });
