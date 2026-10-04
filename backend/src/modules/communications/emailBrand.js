import { readFile } from 'node:fs/promises';

// Compartido por el HTML local y las muestras Sandbox. Cambiar aquí el footer.
export const emailFooter = {
  motto: 'El carácter se lleva dentro. El camino lo eliges tú.',
  locations: 'Madrid · Barcelona · San Sebastián · Málaga',
};
export function emailIdentity(type = 'client.welcome') {
  const professional = type.startsWith('workshop.');
  return professional
    ? { audience: 'RED DE TALLERES', heading: 'El cuidado también lleva nuestra firma.', image: 'email-talleres-v1.png', alt: 'Equipo profesional de la red KelseTS Cars. Imagen conceptual.' }
    : { audience: 'TU EXPERIENCIA KELSETS', heading: 'No es solo llegar. Es cómo lo vives.', image: 'email-clientes-v1.png', alt: 'Llegada a un espacio KelseTS Cars junto a un gran turismo. Imagen conceptual.' };
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
