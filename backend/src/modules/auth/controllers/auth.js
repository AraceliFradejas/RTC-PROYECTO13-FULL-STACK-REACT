import bcrypt from 'bcryptjs';
import { User, publicUser } from '../models/User.js';
import { credentials, registration } from '@kelsets-cars/contracts';
import { setSession, cookieOptions } from '../../../middlewares/auth.js';
import { send, HttpError } from '../../../utils/errors.js';
export async function register(req, res) {
  const input = registration.parse(req.body);
  const user = await User.create({ ...input, password: await bcrypt.hash(input.password, 12), role: 'client' });
  setSession(res, user);
  send(res, publicUser(user), 201);
}
export async function login(req, res) {
  const input = credentials.parse(req.body);
  const user = await User.findOne({ email: input.email }).select('+password');
  if (!user || !await bcrypt.compare(input.password, user.password)) throw new HttpError(401, 'Correo o contraseña incorrectos.');
  setSession(res, user); send(res, publicUser(user));
}
export function logout(req, res) {
  const { maxAge, ...options } = cookieOptions();
  res.clearCookie('session', options); send(res, null);
}
export function me(req, res) { send(res, publicUser(req.user)); }
