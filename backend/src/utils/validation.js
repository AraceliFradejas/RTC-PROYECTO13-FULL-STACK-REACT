export { objectId, credentials, registration, appointmentInput } from '@kelsets-cars/contracts';
export function validateAppointmentDate(input, now = new Date()) {
  const date = new Date(input);
  if (!Number.isFinite(date.getTime()) || date <= now) return false;
  if (date.getTime() - now.getTime() > 90 * 86400000) return false;
  const parts = Object.fromEntries(new Intl.DateTimeFormat('en-GB', {
    timeZone: 'Europe/Madrid', weekday: 'short', hour: '2-digit', minute: '2-digit', hourCycle: 'h23',
  }).formatToParts(date).map(p => [p.type, p.value]));
  return !['Sat', 'Sun'].includes(parts.weekday) && Number(parts.hour) >= 10 && Number(parts.hour) < 18 && parts.minute === '00' && date.getUTCSeconds() === 0 && date.getUTCMilliseconds() === 0;
}
