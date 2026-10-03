export function madridDateTime(day, hour) {
  const utc = new Date(`${day}T${hour}:00Z`);
  if (!Number.isFinite(utc.getTime())) throw new Error('Selecciona una fecha y hora válidas.');
  const parts = Object.fromEntries(new Intl.DateTimeFormat('en-GB', {
    timeZone: 'Europe/Madrid', year: 'numeric', month: '2-digit', day: '2-digit',
    hour: '2-digit', minute: '2-digit', second: '2-digit', hourCycle: 'h23',
  }).formatToParts(utc).map(part => [part.type, part.value]));
  const offset = Date.UTC(Number(parts.year), Number(parts.month) - 1, Number(parts.day), Number(parts.hour), Number(parts.minute), Number(parts.second)) - utc.getTime();
  return new Date(utc.getTime() - offset).toISOString();
}
