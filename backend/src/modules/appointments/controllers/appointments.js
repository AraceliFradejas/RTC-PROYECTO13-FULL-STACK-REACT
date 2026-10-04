import { z } from 'zod';
import mongoose from 'mongoose';
import { User } from '../../auth/models/User.js';
import { createMessage } from '../../communications/createMessage.js';
import { Workshop } from '../../workshops/Workshop.js';
import { Appointment } from '../models/Appointment.js';
import { Vehicle } from '../../catalog/models/Vehicle.js';
import { appointmentInput, objectId } from '@kelsets-cars/contracts';
import { validateAppointmentDate } from '../../../utils/validation.js';
import { HttpError, send } from '../../../utils/errors.js';
export async function createAppointment(req, res) {
  const input = appointmentInput.parse(req.body);
  if (!validateAppointmentDate(input.date)) throw new HttpError(400, 'Elige una hora en punto, de lunes a viernes, de 10:00 a 17:00 (Madrid), dentro de los próximos 90 días.');
  const vehicle = await Vehicle.findById(input.vehicle);
  if (!vehicle || String(vehicle.dealership) !== input.dealership) throw new HttpError(400, 'El vehículo no pertenece a esa sede.');
  if (['Vendido', 'Reservado'].includes(vehicle.status)) throw new HttpError(409, 'Este vehículo no está disponible para una nueva cita.');
  let appointment;
  await mongoose.connection.transaction(async session => {
    [appointment] = await Appointment.create([{ ...input, user: req.user._id }], { session });
    await appointment.populate(['vehicle', 'dealership']);
    await appointmentMessage(appointment, req.user, 'pending', session);
  });
  send(res, appointment, 201);
}
export async function listAppointments(req, res) {
  const filter = req.user.role === 'client' ? { user: req.user._id } : req.user.role === 'staff' ? { dealership: req.user.dealership || null } : {};
  send(res, await Appointment.find(filter).sort({ date: 1 }).limit(250).populate('vehicle dealership').populate('workshop', 'name city').populate('user', 'name email'));
}
export async function updateAppointment(req, res) {
  const { status } = z.object({ status: z.enum(['Confirmada', 'Cancelada', 'Completada']) }).strict().parse(req.body);
  const filter = { _id: objectId.parse(req.params.id), active: true };
  if (req.user.role === 'client') {
    if (status !== 'Cancelada') throw new HttpError(403, 'Solo puedes cancelar tus propias citas.');
    filter.user = req.user._id;
  } else if (req.user.role === 'staff') filter.dealership = req.user.dealership || null;
  filter.status = { $ne: status };
  let appointment;
  await mongoose.connection.transaction(async session => {
    appointment = await Appointment.findOneAndUpdate(filter, { status, active: status === 'Confirmada' }, { new: true, runValidators: true, session }).populate('vehicle dealership');
    if (!appointment) throw new HttpError(409, 'La cita ya tiene ese estado o no puedes modificarla.');
    const user = await User.findById(appointment.user).session(session);
    await appointmentMessage(appointment, user, { Confirmada: 'confirmed', Cancelada: 'cancelled', Completada: 'completed' }[status], session);
  });
  send(res, appointment);
}
async function appointmentMessage(appointment, user, status, session) {
  await createMessage({ user: user._id, type: `appointment.${status}`, eventKey: `appointment:${appointment._id}:${status}`, data: { name: user.name, date: appointment.date, service: appointment.service, vehicle: `${appointment.vehicle.brand} ${appointment.vehicle.model}`, dealership: appointment.dealership.name }, session });
  if (appointment.workshop) {
    const workshop = await Workshop.findById(appointment.workshop).session(session);
    if (workshop?.user) {
      const partner = await User.findById(workshop.user).session(session);
      if (partner) await createMessage({ user: partner._id, type: `appointment.${status}`, eventKey: `appointment:${appointment._id}:${status}:workshop`, data: { name: partner.name, date: appointment.date, service: appointment.service, vehicle: `${appointment.vehicle.brand} ${appointment.vehicle.model}`, dealership: appointment.dealership.name }, session });
    }
  }
}
export async function assignWorkshop(req, res) {
  const id = objectId.parse(req.params.id);
  const input = z.object({ workshop: objectId }).strict().parse(req.body);
  let appointment;
  await mongoose.connection.transaction(async session => {
    const workshop = await Workshop.findOne({ _id: input.workshop, status: 'approved' }).session(session);
    if (!workshop) throw new HttpError(400, 'Elige un taller aprobado.');
    appointment = await Appointment.findOne({ _id: id, active: true, service: 'Mantenimiento' }).session(session).populate('vehicle dealership');
    if (!appointment) throw new HttpError(409, 'Solo se puede asignar un taller a una cita activa de mantenimiento.');
    if (appointment.workshop) throw new HttpError(409, 'La cita ya tiene un taller asignado.');
    if (workshop.dealership && String(workshop.dealership) !== String(appointment.dealership._id)) throw new HttpError(400, 'Este taller está vinculado a otra sede.');
    appointment.workshop = workshop._id; await appointment.save({ session });
    const client = await User.findById(appointment.user).session(session);
    const data = { name: client.name, workshopName: workshop.name, date: appointment.date, service: appointment.service, vehicle: `${appointment.vehicle.brand} ${appointment.vehicle.model}`, dealership: appointment.dealership.name };
    await createMessage({ user: client._id, type: 'appointment.assigned', eventKey: `appointment:${id}:assigned:client`, data, session });
    if (workshop.user) {
      const partner = await User.findById(workshop.user).session(session);
      if (partner) await createMessage({ user: partner._id, type: 'workshop.assignment', eventKey: `appointment:${id}:assigned:workshop`, data: { ...data, name: partner.name }, session });
    }
  });
  send(res, appointment);
}
