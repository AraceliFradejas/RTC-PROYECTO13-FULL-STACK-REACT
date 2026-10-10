import { useLanguage } from '../../shared/i18n/LanguageProvider.jsx';
import { ResourceState } from '../../shared/components/ResourceState.jsx';
import { AssignWorkshop } from '../workshops/AssignWorkshop.jsx';

export function AppointmentRow({ appointment, role, readOnly = false, busy, workshops, onUpdate, onAssigned }) {
  const { t, locale } = useLanguage();
  const item = appointment;
  const canAssign =
    !readOnly && role === 'admin' && item.active && item.service === 'Mantenimiento' && !item.workshop;
  const date = new Intl.DateTimeFormat(locale, {
    dateStyle: 'long',
    timeStyle: 'short',
    timeZone: 'Europe/Madrid',
  }).format(new Date(item.date));

  return (
    <article className="appointment-row">
      <div>
        <p className="eyebrow">{t(item.status)}</p>
        <h2>
          {item.vehicle?.brand} {item.vehicle?.model}
        </h2>
        <p>
          {t(item.service)} · {item.dealership?.city}
        </p>
        {role !== 'client' && (
          <p>
            {t('Cliente:')} {item.user?.name}
          </p>
        )}
        {item.workshop && (
          <p>
            {t('Taller:')} {item.workshop.name}
          </p>
        )}
        <p>{date} (Madrid)</p>
      </div>
      {canAssign && (
        <ResourceState resource={workshops}>
          {(items) => (
            <AssignWorkshop appointment={item} workshops={items} onAssigned={onAssigned} />
          )}
        </ResourceState>
      )}
      {item.active && !readOnly && (
        <div>
          {role !== 'client' && item.status === 'Pendiente' && (
            <button
              className="button button-outline"
              disabled={busy !== null}
              onClick={() => onUpdate(item._id, 'Confirmada')}
            >
              {t('Confirmar')}
            </button>
          )}
          {role !== 'client' && item.status === 'Confirmada' && (
            <button
              className="button button-outline"
              disabled={busy !== null}
              onClick={() => onUpdate(item._id, 'Completada')}
            >
              {t('Marcar visita completada')}
            </button>
          )}
          <button
            className="text-button"
            disabled={busy !== null}
            onClick={() => onUpdate(item._id, 'Cancelada')}
          >
            {busy === item._id ? t('Un momento…') : t('Cancelar cita')}
          </button>
        </div>
      )}
    </article>
  );
}
