import { useCallback, useState } from 'react';
import { api } from '../../shared/services/api.js';
import { useAuth } from '../auth/AuthProvider.jsx';
import { useResource } from '../../shared/hooks/useResource.js';
import { ResourceState } from '../../shared/components/ResourceState.jsx';
export function AccountPage() {
  const { user, logout } = useAuth(); const [error, setError] = useState(''); const [busy, setBusy] = useState(null);
  const resource = useResource(useCallback(signal => api.appointments.list({ signal }), []));
  async function update(id, status) { setError(''); setBusy(id); try { await api.appointments.update(id, { status }); resource.retry(); } catch (error) { setError(error.message); } finally { setBusy(null); } }
  async function exit() { try { await logout(); } catch (error) { setError(error.message); } }
  return <section className="page-shell"><p className="eyebrow">TU ESPACIO KelseTS</p><h1>Hola, {user.name}.</h1><p>{user.role === 'client' ? 'Estas son tus citas.' : 'Agenda de atención de tu área.'}</p><button className="text-button" onClick={exit}>Cerrar sesión</button>{error && <p className="form-error" role="alert">{error}</p>}<ResourceState resource={resource}>{items => items.length ? <div className="appointment-list">{items.map(item => <article className="appointment-row" key={item._id}><div><p className="eyebrow">{item.status}</p><h2>{item.vehicle?.brand} {item.vehicle?.model}</h2><p>{item.service} · {item.dealership?.city}</p><p>{new Intl.DateTimeFormat('es-ES', { dateStyle: 'long', timeStyle: 'short', timeZone: 'Europe/Madrid' }).format(new Date(item.date))} (Madrid)</p></div>{item.active && <div>{user.role !== 'client' && <button className="button button-outline" disabled={busy !== null} onClick={() => update(item._id, 'Confirmada')}>Confirmar</button>}<button className="text-button" disabled={busy !== null} onClick={() => update(item._id, 'Cancelada')}>{busy === item._id ? 'Un momento…' : 'Cancelar cita'}</button></div>}</article>)}</div> : <p className="notice">Todavía no tienes citas. Elige un vehículo en la colección para organizar una visita.</p>}</ResourceState></section>;
}
