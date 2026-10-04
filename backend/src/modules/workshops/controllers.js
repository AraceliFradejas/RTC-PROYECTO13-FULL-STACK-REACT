import mongoose from 'mongoose';
import { objectId, workshopDecision } from '@kelsets-cars/contracts';
import { Workshop } from './Workshop.js';
import { User } from '../auth/models/User.js';
import { createMessage } from '../communications/createMessage.js';
import { HttpError, send } from '../../utils/errors.js';
import { Appointment } from '../appointments/models/Appointment.js';
export async function myWorkshop(req, res) {
  send(res, await Workshop.findOne({ user: req.user._id }));
}
export async function listPublicWorkshops(req, res) {
  send(res, await Workshop.find({ status: 'approved', public: true }).select('name city address area specialties dealership latitude longitude demo').populate('dealership', 'name city').sort({ city: 1 }).limit(100));
}
export async function assignableWorkshops(req, res) {
  send(res, await Workshop.find({ status: 'approved' }).select('name city dealership').sort({ city: 1 }).limit(250));
}
export async function myJobs(req, res) {
  const workshop = await Workshop.findOne({ user: req.user._id, status: 'approved' });
  if (!workshop) return send(res, []);
  send(res, await Appointment.find({ workshop: workshop._id }).select('date service status vehicle dealership user').populate('vehicle', 'brand model').populate('dealership', 'name city').populate('user', 'name').sort({ date: 1 }).limit(100));
}
export async function listApplications(req, res) {
  send(res, await Workshop.find({ user: { $exists: true, $ne: null } }).sort({ createdAt: -1 }).limit(250).populate('user', 'name email'));
}
export async function reviewApplication(req, res) {
  const id = objectId.parse(req.params.id);
  const decision = workshopDecision.parse(req.body);
  let workshop;
  await mongoose.connection.transaction(async session => {
    workshop = await Workshop.findOneAndUpdate({ _id: id, status: 'pending' }, { ...decision, reviewedBy: req.user._id, reviewedAt: new Date() }, { new: true, runValidators: true, session });
    if (!workshop) throw new HttpError(409, 'La solicitud ya se ha revisado o no existe.');
    const user = await User.findById(workshop.user).session(session);
    if (!user || user.accountType !== 'workshop') throw new HttpError(409, 'La cuenta del taller no está disponible.');
    if (decision.status === 'approved') { user.role = 'workshop'; await user.save({ session }); }
    await createMessage({ user: user._id, type: `workshop.${decision.status}`, eventKey: `workshop:${workshop._id}:review`, data: { name: user.name, workshopName: workshop.name, reason: decision.reason }, session });
  });
  send(res, workshop);
}
