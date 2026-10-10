import { z } from 'zod';
export const VEHICLE_IMAGE_MAX_BYTES = 4 * 1024 * 1024;
export const WORKSHOP_SPECIALTIES = ['Revisiones y mantenimiento', 'Mecánica', 'Chapa y pintura', 'Lunas', 'Vehículos eléctricos'];
export const SERVICES = ['Prueba de conducción', 'Asesoramiento', 'Mantenimiento'];
export const objectId = z.string().regex(/^[a-f\d]{24}$/i, 'Identificador no válido.');
export const credentials = z.object({
  email: z.email('Introduce un correo válido.').max(254).transform(value => value.toLowerCase()),
  password: z.string().min(10, 'La contraseña debe tener al menos 10 caracteres.').max(72),
});
export const loginInput = credentials.extend({ portal: z.enum(['client', 'workshop', 'team']).optional() }).strict();
const person = credentials.extend({ name: z.string().trim().min(2, 'Introduce tu nombre.').max(80) });
export const registration = person.extend({ accountType: z.literal('client').default('client') }).strict();
const workshopRegistration = person.extend({
  accountType: z.literal('workshop'),
  workshopName: z.string().trim().min(2, 'Introduce el nombre del taller.').max(120),
  city: z.string().trim().min(2, 'Introduce la ciudad.').max(80),
  address: z.string().trim().min(5, 'Introduce la dirección del taller.').max(180),
  phone: z.string().trim().regex(/^\+?[\d ()-]{9,20}$/, 'Introduce un teléfono válido.'),
  specialties: z.array(z.enum(WORKSHOP_SPECIALTIES)).min(1, 'Selecciona al menos una especialidad.').max(5).transform(value => [...new Set(value)]),
}).strict();
export const accountRegistration = z.union([registration, workshopRegistration]);
export const workshopDecision = z.object({ status: z.enum(['approved', 'rejected']), reason: z.string().trim().max(500).default('') }).strict().refine(value => value.status !== 'rejected' || value.reason.length >= 5, { message: 'Explica el motivo del rechazo.', path: ['reason'] });
export const appointmentInput = z.object({ vehicle: objectId, dealership: objectId,
  date: z.iso.datetime({ offset: true }), service: z.enum(SERVICES),
}).strict();
