import { z } from 'zod';
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
  const appointment = await Appointment.create({ ...input, user: req.user._id });
  send(res, await appointment.populate(['vehicle', 'dealership']), 201);
}
export async function listAppointments(req, res) {
  const filter = req.user.role === 'client' ? { user: req.user._id } : req.user.role === 'staff' ? { dealership: req.user.dealership || null } : {};
  send(res, await Appointment.find(filter).sort({ date: 1 }).limit(250).populate('vehicle dealership').populate('user', 'name email'));
}
export async function updateAppointment(req, res) {
  const { status } = z.object({ status: z.enum(['Confirmada', 'Cancelada', 'Completada']) }).strict().parse(req.body);
  const filter = { _id: objectId.parse(req.params.id), active: true };
  if (req.user.role === 'client') {
    if (status !== 'Cancelada') throw new HttpError(403, 'Solo puedes cancelar tus propias citas.');
    filter.user = req.user._id;
  } else if (req.user.role === 'staff') filter.dealership = req.user.dealership || null;
  const appointment = await Appointment.findOneAndUpdate(filter, { status, active: status === 'Confirmada' }, { new: true, runValidators: true }).populate('vehicle dealership');
  if (!appointment) throw new HttpError(404, 'No se ha encontrado una cita activa que puedas modificar.');
  send(res, appointment);
}
