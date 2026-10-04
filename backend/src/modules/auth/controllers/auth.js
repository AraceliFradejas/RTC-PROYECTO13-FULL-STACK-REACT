import bcrypt from 'bcryptjs';
import mongoose from 'mongoose';
import { User, publicUser } from '../models/User.js';
import { loginInput, accountRegistration } from '@kelsets-cars/contracts';
import { Workshop } from '../../workshops/Workshop.js';
import { createMessage } from '../../communications/createMessage.js';
import { setSession, cookieOptions } from '../../../middlewares/auth.js';
import { send, HttpError } from '../../../utils/errors.js';
import { requireAuthConfig } from '../../../config/env.js';
export async function register(req, res) {
  requireAuthConfig();
  const input = accountRegistration.parse(req.body);
  const password = await bcrypt.hash(input.password, 12);
  let user;
  await mongoose.connection.transaction(async session => {
    [user] = await User.create([{ name: input.name, email: input.email, password, role: 'client', accountType: input.accountType }], { session });
    if (input.accountType === 'workshop') {
      await Workshop.create([{ user: user._id, name: input.workshopName, city: input.city, address: input.address, phone: input.phone, specialties: input.specialties }], { session });
    }
    await createMessage({ user: user._id, type: input.accountType === 'workshop' ? 'workshop.received' : 'client.welcome', eventKey: `registration:${user._id}`, data: input, session });
  });
  setSession(res, user);
  send(res, publicUser(user), 201);
}
export async function login(req, res) {
  const input = loginInput.parse(req.body);
  const user = await User.findOne({ email: input.email }).select('+password');
  if (!user || !await bcrypt.compare(input.password, user.password)) throw new HttpError(401, 'Correo o contraseña incorrectos.');
  const portal = ['staff', 'admin'].includes(user.role) ? 'team' : user.accountType === 'workshop' ? 'workshop' : 'client';
  if (input.portal && input.portal !== portal) throw new HttpError(403, 'Esta cuenta pertenece a otro acceso. Selecciona Clientes, Talleres o KelseTS Cars Team según tu cuenta.');
  setSession(res, user); send(res, publicUser(user));
}
export function logout(req, res) {
  const { maxAge, ...options } = cookieOptions();
  res.clearCookie('session', options); send(res, null);
}
export function me(req, res) { send(res, publicUser(req.user)); }
