import { useCallback } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../../shared/services/api.js';
import { useResource } from '../../shared/hooks/useResource.js';
import { ResourceState } from '../../shared/components/ResourceState.jsx';
export function MessagesSection({ revision = 0 }) {
  const resource = useResource(useCallback(signal => api.messages.list({ signal }), [revision]));
  return <section className="messages-section" aria-labelledby="messages-heading"><p className="eyebrow">COMUNICACIONES KelseTS</p><h2 id="messages-heading">Tu bandeja de demostración.</h2><p className="small">Estos mensajes simulan las comunicaciones por correo. Se guardan en tu cuenta y no se envían a un buzón personal.</p><ResourceState resource={resource}>{items => items.length ? <div>{items.map(item => <details className="message-card" key={item._id}><summary>{item.subject}<span>{new Intl.DateTimeFormat('es-ES', { dateStyle: 'medium', timeZone: 'Europe/Madrid' }).format(new Date(item.createdAt))}</span></summary><div className="message-body"><p>{item.text}</p><Link className="text-link" to={item.actionPath}>{item.actionLabel} ↗</Link><p className="small">Comunicación de demostración · sin envío real</p></div></details>)}</div> : <p>Todavía no hay comunicaciones para esta cuenta.</p>}</ResourceState></section>;
}
