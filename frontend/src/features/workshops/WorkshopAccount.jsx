import { useCallback, useState } from 'react';
import { useAuth } from '../auth/AuthProvider.jsx';
import { api } from '../../shared/services/api.js';
import { useResource } from '../../shared/hooks/useResource.js';
import { ResourceState } from '../../shared/components/ResourceState.jsx';
const statuses = { pending: 'Pendiente de revisión', approved: 'Colaboración aprobada', rejected: 'Solicitud no aprobada' };
export function WorkshopAccount() {
  const { refresh } = useAuth();
  const [error, setError] = useState('');
  const [refreshing, setRefreshing] = useState(false);
  async function updateStatus() {
    setRefreshing(true); setError('');
    try { await refresh(); resource.retry(); }
    catch { setError('No se ha podido actualizar el estado. Inténtalo de nuevo.'); }
    finally { setRefreshing(false); }
  }
  const resource = useResource(useCallback(signal => api.workshops.me({ signal }), []));
  return <section><h2>Tu solicitud de colaboración.</h2><ResourceState resource={resource}>{item => item ? <article className="notice"><p className="eyebrow">{statuses[item.status]}</p><h3>{item.name}</h3><p>{item.address} · {item.city}</p><p>{item.phone}</p><p>{item.specialties.join(' · ')}</p>{item.reason && <p>Motivo: {item.reason}</p>}<p>{item.status === 'pending' ? 'Revisaremos la información del taller antes de activar tu perfil profesional.' : item.status === 'approved' ? 'Tu perfil profesional está activo. Aquí puedes consultar las citas de mantenimiento que Team te asigne. El seguimiento de reparaciones y siniestros se incorporará en la siguiente fase.' : 'Puedes consultar la comunicación con el resultado de la revisión en tu bandeja.'}</p></article> : <p>No se ha encontrado una solicitud para esta cuenta.</p>}</ResourceState><button className="text-button" disabled={refreshing} onClick={updateStatus}>{refreshing ? 'Actualizando…' : 'Actualizar estado'}</button>{error && <p role="alert">{error}</p>}</section>;
}
