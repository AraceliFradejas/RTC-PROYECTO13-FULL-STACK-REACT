import { useLanguage } from '../../shared/i18n/LanguageProvider.jsx';
import { useCallback } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../../shared/services/api.js';
import { useResource } from '../../shared/hooks/useResource.js';
import { ResourceState } from '../../shared/components/ResourceState.jsx';
export function MessagesSection({ revision = 0 }) {
  const { t, locale, language } = useLanguage();
  const resource = useResource(useCallback(signal => api.messages.list({ signal, language }), [revision, language]));
  return <section className="messages-section" aria-labelledby="messages-heading"><p className="eyebrow">{t("COMUNICACIONES KelseTS")}</p><h2 id="messages-heading">{t("Tu bandeja de demostración.")}</h2><p className="small">{t("Estos mensajes simulan las comunicaciones por correo. Se guardan en tu cuenta y no se envían a un buzón personal.")}</p><ResourceState resource={resource}>{items => items.length ? <div>{items.map(item => <details className="message-card" key={item._id}><summary lang={item.language || 'es'}>{item.subject}<span>{new Intl.DateTimeFormat(locale, { dateStyle: 'medium', timeZone: 'Europe/Madrid' }).format(new Date(item.createdAt))}</span></summary><div className="message-body" lang={item.language || 'es'}><p>{item.text}</p><Link className="text-link" to={item.actionPath}>{item.actionLabel} ↗</Link><p className="small">{t("Comunicación de demostración · sin envío real")}</p></div></details>)}</div> : <p>{t("Todavía no hay comunicaciones para esta cuenta.")}</p>}</ResourceState></section>;
}
