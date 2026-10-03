import { z } from 'zod';
export const API_VERSION = 'v1';
export const ROLES = ['client', 'staff', 'admin'];
export const SERVICES = ['Prueba de conducción', 'Asesoramiento', 'Mantenimiento'];
export const objectId = z.string().regex(/^[a-f\d]{24}$/i, 'Identificador no válido.');
export const credentials = z.object({
  email: z.email('Introduce un correo válido.').max(254).transform(value => value.toLowerCase()),
  password: z.string().min(10, 'La contraseña debe tener al menos 10 caracteres.').max(72),
});
export const registration = credentials.extend({ name: z.string().trim().min(2, 'Introduce tu nombre.').max(80) }).strict();
export const appointmentInput = z.object({ vehicle: objectId, dealership: objectId,
  date: z.iso.datetime({ offset: true }), service: z.enum(SERVICES),
}).strict();
