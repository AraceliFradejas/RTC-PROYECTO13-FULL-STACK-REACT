import { readFile } from 'node:fs/promises';

// Compartido por las vistas locales y las muestras Sandbox. Editar aquí el footer.
export const emailFooter = {
  motto: 'El carácter se lleva dentro. El camino lo eliges tú.',
  locations: 'Madrid · Barcelona · San Sebastián · Málaga',
};
// Cada tipo tiene una escena exclusiva, sin reutilizar fotos de las secciones de la web.
export const emailScenes = {
  'client.welcome': { heading: 'No es solo llegar. Es cómo lo vives.', image: 'email-clientes-v1.png', alt: 'Llegada a un espacio KelseTS junto a un gran turismo.' },
  'workshop.received': { heading: 'Cada colaboración empieza con atención.', image: 'email-taller-solicitud-v1.png', alt: 'Recepción profesional revisando una solicitud de colaboración.' },
  'workshop.approved': { heading: 'El cuidado también lleva nuestra firma.', image: 'email-talleres-v1.png', alt: 'Equipo profesional de la red revisando un vehículo.' },
  'workshop.rejected': { heading: 'Una revisión cuidada. Una respuesta clara.', image: 'email-taller-resultado-v1.png', alt: 'Carpeta de revisión en un despacho de la red KelseTS.' },
  'appointment.pending': { heading: 'Tu próximo encuentro empieza aquí.', image: 'email-cita-solicitud-v1.png', alt: 'Consulta entre cliente y asesora en un salón del concesionario.' },
  'appointment.confirmed': { heading: 'Todo preparado para recibirte.', image: 'email-cita-confirmada-v1.png', alt: 'Asesora junto a un vehículo en la zona de bienvenida.' },
  'appointment.cancelled': { heading: 'El camino puede esperar. Tú eliges cuándo.', image: 'email-cita-cancelada-v1.png', alt: 'Gran turismo estacionado junto a una tranquila carretera costera.' },
  'appointment.completed': { heading: 'Gracias por compartir este camino.', image: 'email-cita-completada-v1.png', alt: 'Cliente al volante tras una visita al concesionario.' },
  'appointment.assigned': { heading: 'Tu coche, acompañado en cada paso.', image: 'email-cita-asignada-v1.png', alt: 'Asesor explicando a una cliente la atención de su taller.' },
  'workshop.assignment': { heading: 'Una nueva cita. El mismo compromiso.', image: 'email-taller-asignacion-v1.png', alt: 'Profesional preparando una intervención en el taller.' },
};
export function emailIdentity(type = 'client.welcome') {
  const scene = emailScenes[type];
  if (!scene) throw new Error('Tipo de identidad de correo desconocido.');
  return { ...scene, audience: type.startsWith('workshop.') ? 'RED DE TALLERES' : 'TU EXPERIENCIA KELSETS', alt: `${scene.alt} Imagen conceptual.` };
}
const logo = new URL('./assets/logo-email.png', import.meta.url);
const editorial = new URL('../../../../frontend/public/images/editorial/', import.meta.url);
export async function emailMedia(type, { inline = false } = {}) {
  const identity = emailIdentity(type);
  const [logoBytes, heroBytes] = await Promise.all([readFile(logo), readFile(new URL(identity.image, editorial))]);
  const files = [{ id: 'kelsets-logo', name: 'kelsets-logo.png', bytes: logoBytes }, { id: 'kelsets-editorial', name: identity.image, bytes: heroBytes }];
  return {
    logoSrc: inline ? 'cid:kelsets-logo' : `data:image/png;base64,${logoBytes.toString('base64')}`,
    heroSrc: inline ? 'cid:kelsets-editorial' : `data:image/png;base64,${heroBytes.toString('base64')}`,
    attachments: files.map(file => ({ filename: file.name, content: file.bytes.toString('base64'), type: 'image/png', disposition: 'inline', content_id: file.id })),
  };
}
