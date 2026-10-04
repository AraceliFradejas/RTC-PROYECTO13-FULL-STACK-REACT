import { useCallback } from 'react';
import { api } from '../../shared/services/api.js';
import { useResource } from '../../shared/hooks/useResource.js';
import { ResourceState } from '../../shared/components/ResourceState.jsx';
export function WorkshopJobs() {
  const resource = useResource(useCallback(signal => api.workshops.jobs({ signal }), []));
  return <section className="messages-section"><h2>Citas asignadas a tu taller.</h2><p>Solo se muestran las citas que KelseTS Cars Team ha asignado a tu taller.</p><ResourceState resource={resource}>{items => items.length ? items.map(item => <article className="notice" key={item._id}><p className="eyebrow">{item.status}</p><h3>{item.vehicle?.brand} {item.vehicle?.model}</h3><p>{item.service} · {item.dealership?.name}</p><p>Cliente: {item.user?.name}</p><p>{new Intl.DateTimeFormat('es-ES', { dateStyle: 'long', timeStyle: 'short', timeZone: 'Europe/Madrid' }).format(new Date(item.date))} (Madrid)</p></article>) : <p>Todavía no hay citas asignadas a tu taller.</p>}</ResourceState><button className="text-button" onClick={resource.retry}>Actualizar citas</button></section>;
}
