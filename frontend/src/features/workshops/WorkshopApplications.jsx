import { useLanguage } from '../../shared/i18n/LanguageProvider.jsx';
import { useCallback, useState } from 'react';
import { api } from '../../shared/services/api.js';
import { useResource } from '../../shared/hooks/useResource.js';
import { ResourceState } from '../../shared/components/ResourceState.jsx';
export function WorkshopApplications() {
  const { t } = useLanguage();
  const resource = useResource(useCallback((signal) => api.workshops.applications({ signal }), []));
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  async function review(event, id, status) {
    event.preventDefault();
    setBusy(true);
    setError('');
    const reason = new FormData(event.currentTarget).get('reason') || '';
    try {
      await api.workshops.review(id, { status, reason });
      resource.retry();
    } catch (error) {
      setError(error.message);
    } finally {
      setBusy(false);
    }
  }
  return (
    <section className="messages-section">
      <h2>{t('Solicitudes de talleres.')}</h2>
      <p>
        {t(
          'Revisa los datos antes de aprobar la colaboración. La decisión genera un mensaje en la cuenta del taller.',
        )}
      </p>
      {error && (
        <p role="alert" className="form-error">
          {t(error)}
        </p>
      )}
      <ResourceState resource={resource}>
        {(items) =>
          items.length ? (
            items.map((item) => (
              <article className="notice" key={item._id}>
                <h3>{item.name}</h3>
                <p>
                  {item.user?.name} · {item.user?.email}
                </p>
                <p>
                  {item.address} · {item.city} · {item.phone}
                </p>
                <p>{item.specialties.map(t).join(' · ')}</p>
                <p>
                  {t('Estado:')}{' '}
                  {
                    {
                      pending: t('Pendiente'),
                      approved: t('Aprobado'),
                      rejected: t('No aprobado'),
                    }[item.status]
                  }
                </p>
                {item.status === 'pending' && (
                  <form
                    onSubmit={(event) =>
                      review(event, item._id, event.nativeEvent.submitter?.value)
                    }
                  >
                    <label>
                      {t('Motivo (obligatorio para rechazar)')}
                      <input name="reason" maxLength={500} />
                    </label>
                    <div className="review-actions">
                      <button className="button" name="decision" value="approved" disabled={busy}>
                        {t('Aprobar colaboración')}
                      </button>
                      <button
                        className="button button-outline"
                        name="decision"
                        value="rejected"
                        disabled={busy}
                      >
                        {t('Rechazar solicitud')}
                      </button>
                    </div>
                  </form>
                )}
                {item.reason && <p>{item.reason}</p>}
              </article>
            ))
          ) : (
            <p>{t('No hay solicitudes de colaboración.')}</p>
          )
        }
      </ResourceState>
    </section>
  );
}
