import mongoose from 'mongoose';
const translatedContent = new mongoose.Schema({
  subject: { type: String, required: true },
  text: { type: String, required: true },
  html: { type: String, required: true },
  actionLabel: { type: String, required: true },
}, { _id: false });
const schema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
  eventKey: { type: String, required: true, unique: true },
  type: { type: String, required: true },
  subject: { type: String, required: true },
  text: { type: String, required: true },
  html: { type: String, required: true },
  actionPath: { type: String, required: true },
  actionLabel: { type: String, required: true },
  translations: { en: { type: translatedContent, default: undefined } },
  delivery: { type: String, enum: ['simulated'], default: 'simulated' },
}, { timestamps: true });
export const Message = mongoose.model('Message', schema);
