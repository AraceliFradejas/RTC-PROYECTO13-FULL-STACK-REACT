import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { SERVICES } from '@kelsets-cars/contracts';
import { api } from '../../shared/services/api.js';
import { madridDateTime } from './madridTime.js';
export function NewAppointmentPage() {
  const [params] = useSearchParams(); const navigate = useNavigate();
  const [error, setError] = useState(''); const [busy, setBusy] = useState(false);
  async function submit(event) {
    event.preventDefault(); setError(''); setBusy(true);
    const fields = Object.fromEntries(new FormData(event.currentTarget));
    try { await api.appointments.create({ vehicle: params.get('vehicle'), dealership: params.get('dealership'), date: madridDateTime(fields.date, fields.hour), service: fields.service }); navigate('/mi-cuenta'); }
    catch (error) { setError(error.message); } finally { setBusy(false); }
  }
  return <section className="page-shell reading-page"><p className="eyebrow">TU PRÓXIMA VISITA</p><h1>Hagamos sitio<br />en la agenda.</h1><p>Citas de lunes a viernes, de 10:00 a 17:00, dentro de los próximos 90 días. Horario de Madrid.</p><form className="form-panel" onSubmit={submit}><label>Motivo<select name="service">{SERVICES.map(service => <option key={service}>{service}</option>)}</select></label><label>Fecha<input name="date" type="date" required /></label><label>Hora de Madrid<select name="hour">{Array.from({ length: 8 }, (_, i) => `${i + 10}:00`).map(hour => <option key={hour}>{hour}</option>)}</select></label><p className="small">La cita se confirmará si la franja continúa disponible.</p>{error && <p role="alert" className="form-error">{error}</p>}<button className="button" disabled={busy}>{busy ? 'Reservando…' : 'Solicitar cita'}</button></form></section>;
}
