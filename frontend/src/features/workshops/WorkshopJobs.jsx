import { useLanguage } from '../../shared/i18n/LanguageProvider.jsx';
import { useCallback } from 'react';
import { api } from '../../shared/services/api.js';
import { useResource } from '../../shared/hooks/useResource.js';
import { ResourceState } from '../../shared/components/ResourceState.jsx';
export function WorkshopJobs() {
  const { t, locale } = useLanguage();
  const resource = useResource(useCallback(signal => api.workshops.jobs({ signal }), []));
  return <section className="messages-section"><h2>{t("Citas asignadas a tu taller.")}</h2><p>{t("Solo se muestran las citas que KelseTS Cars Team ha asignado a tu taller.")}</p><ResourceState resource={resource}>{items => items.length ? items.map(item => <article className="notice" key={item._id}><p className="eyebrow">{t(item.status)}</p><h3>{item.vehicle?.brand} {item.vehicle?.model}</h3><p>{t(item.service)} · {item.dealership?.name}</p><p>{t("Cliente:")} {item.user?.name}</p><p>{new Intl.DateTimeFormat(locale, { dateStyle: 'long', timeStyle: 'short', timeZone: 'Europe/Madrid' }).format(new Date(item.date))} (Madrid)</p></article>) : <p>{t("Todavía no hay citas asignadas a tu taller.")}</p>}</ResourceState><button className="text-button" onClick={resource.retry}>{t("Actualizar citas")}</button></section>;
}
