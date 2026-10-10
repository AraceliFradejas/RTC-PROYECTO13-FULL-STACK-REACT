import { messageTemplate } from './templates.js';
import { renderEmail } from './renderEmail.js';

const spanishMonths = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];
const englishMonths = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const services = ['Prueba de conducción', 'Asesoramiento', 'Mantenimiento'];
function dateLabels(value) {
  if (typeof value !== 'string') return null;
  const match = value.match(/^(\d{1,2}) de ([a-z]+) de (\d{4})(?:, | a las )(\d{1,2}):(\d{2})$/);
  if (!match) return null;
  const [, day, month, year, hour, minute] = match;
  const index = spanishMonths.indexOf(month);
  const date = new Date(Date.UTC(Number(year), index, Number(day)));
  if (index < 0 || date.getUTCMonth() !== index || date.getUTCDate() !== Number(day) || Number(hour) > 23 || Number(minute) > 59) return null;
  return { es: value, en: `${Number(day)} ${englishMonths[index]} ${year} at ${hour.padStart(2, '0')}:${minute}` };
}
// Reconoce únicamente nuestras plantillas antiguas y comprueba su reproducción exacta.
// No consulta perfiles o citas actuales ni modifica los documentos históricos.
function legacyEnglishContent(message) {
  const greeting = message.text?.match(/^Hola, ([^\n]+)\.\n\n/);
  if (!greeting) return null;
  const data = { name: greeting[1] };
  const body = message.text.slice(greeting[0].length);
  const type = message.type;
  let match;
  if (type === 'client.welcome') { /* Solo necesita el nombre original. */ }
  else if (type === 'workshop.received') {
    match = body.match(/^Hemos recibido la solicitud de ([^\n]+)\. Revisaremos la ubicación/);
    if (!match) return null;
    data.workshopName = match[1];
  } else if (type === 'workshop.approved') {
    match = body.match(/^La solicitud de ([^\n]+) está aprobada\./);
    if (!match) return null;
    data.workshopName = match[1];
  } else if (type === 'workshop.rejected') {
    match = body.match(/^Tras revisar la solicitud de ([^\n]+), no podemos aprobarla en este momento\.\n\nMotivo: ([\s\S]*)\n\nPuedes consultar el resultado en tu cuenta\.$/);
    if (!match) return null;
    data.workshopName = match[1]; data.reason = match[2];
  } else if (type === 'appointment.assigned' || type === 'workshop.assignment') {
    match = body.match(/^KelseTS Cars Team ha asignado la cita de (Prueba de conducción|Asesoramiento|Mantenimiento) para ([^\n]+) a ([^\n]+)\.\nSede coordinadora: ([^\n]+)\.\n([^\n]+) \(hora de Madrid\)\n\n/);
    if (!match || match[2].includes(' a ')) return null;
    [, data.service, data.vehicle, data.workshopName, data.dealership] = match;
    data.dateLabel = dateLabels(match[5]);
    if (!data.dateLabel) return null;
  } else if (type?.startsWith('appointment.')) {
    const parts = body.split('\n\n');
    const lines = parts[0].split('\n');
    if (parts.length !== 2 || lines.length !== 4) return null;
    const service = services.find(value => lines[1].startsWith(`${value} · `));
    if (!service || !lines[3].endsWith(' (hora de Madrid)')) return null;
    Object.assign(data, { service, vehicle: lines[1].slice(service.length + 3), dealership: lines[2], dateLabel: dateLabels(lines[3].slice(0, -17)) });
    if (!data.dateLabel) return null;
  } else return null;
  try {
    const original = messageTemplate(type, data);
    if (['subject', 'text', 'actionPath', 'actionLabel'].some(key => original[key] !== message[key])) return null;
    return messageTemplate(type, data, { language: 'en' });
  } catch { return null; }
}
export function localizeMessage(message, requestedLanguage) {
  const { translations, ...original } = message;
  if (requestedLanguage !== 'en') return { ...original, language: 'es' };
  const snapshot = translations?.en;
  if (snapshot) return { ...original, ...snapshot, language: 'en' };
  const translated = legacyEnglishContent(message);
  return translated ? { ...original, ...translated, html: renderEmail(translated), language: 'en' } : { ...original, language: 'es' };
}
