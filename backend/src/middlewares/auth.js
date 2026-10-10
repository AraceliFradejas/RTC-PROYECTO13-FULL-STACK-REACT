import jwt from 'jsonwebtoken';
import { env, requireAuthConfig } from '../config/env.js';
import { User } from '../modules/auth/models/User.js';
import { checkReadOnlyAccess } from './readOnly.js';
import { HttpError } from '../utils/errors.js';

export const cookieOptions = () => ({ httpOnly: true, secure: env.production, sameSite: env.production ? 'none' : 'lax', path: '/api/v1', maxAge: 7 * 86400000 });
export function setSession(res, user) {
  requireAuthConfig();
  res.cookie('session', jwt.sign({ sub: String(user._id) }, env.jwtSecret, { expiresIn: '7d', algorithm: 'HS256' }), cookieOptions());
}
export async function authenticate(req, res, next) {
  requireAuthConfig();
  let payload;
  try { payload = jwt.verify(req.cookies.session || '', env.jwtSecret, { algorithms: ['HS256'] }); }
  catch { throw new HttpError(401, 'Inicia sesión para continuar.'); }
  const user = await User.findById(payload.sub);
  if (!user) throw new HttpError(401, 'La sesión ya no está disponible.');
  checkReadOnlyAccess(user, req.method);
  req.user = user;
  next();
}
export const allowRoles = (...roles) => (req, res, next) => {
  if (!roles.includes(req.user.role)) throw new HttpError(403, 'No tienes permiso para esta operación.');
  next();
};
export function checkOrigin(req, res, next) {
  if (['GET', 'HEAD', 'OPTIONS'].includes(req.method)) return next();
  // La cookie identifica la sesión; Origin protege las operaciones contra CSRF.
  if (!env.origins.includes(req.get('origin'))) throw new HttpError(403, 'Origen de la petición no permitido.');
  next();
}
