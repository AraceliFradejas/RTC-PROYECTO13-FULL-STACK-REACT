export class HttpError extends Error {
  constructor(status, message) { super(message); this.status = status; }
}
export function errorHandler(error, req, res, next) {
  if (res.headersSent) return next(error);
  let status = error.status || 500;
  let message = error.message;
  if (error.name === 'ZodError') { status = 400; message = error.issues.map(i => i.message).join(' '); }
  if (error.name === 'CastError' || error.name === 'ValidationError') { status = 400; message = 'Datos no válidos.'; }
  if (error.code === 11000) { status = 409; message = 'Ya existe un registro con esos datos o esa cita está ocupada.'; }
  if (error.code === 'LIMIT_FILE_SIZE') { status = 413; message = 'La imagen debe ocupar como máximo 5 MB.'; }
  if (error.code === 'LIMIT_UNEXPECTED_FILE' || error.code === 'LIMIT_FILE_COUNT') { status = 400; message = 'Envía una sola fotografía en el campo image.'; }
  if (status >= 500) message = 'No se ha podido completar la operación. Inténtalo de nuevo.';
  res.status(status).json({ success: false, error: message });
}
export function send(res, data, status = 200) { res.status(status).json({ success: true, data }); }
