import { HttpError } from '../utils/errors.js';

export function checkReadOnlyAccess(user, method) {
  if (user.readOnly && !['GET', 'HEAD', 'OPTIONS'].includes(method)) {
    throw new HttpError(403, 'Esta cuenta DEMO es de solo lectura. No permite modificar datos.');
  }
}
