import { useLanguage } from '../../shared/i18n/LanguageProvider.jsx';
import { useCallback, useState } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../../shared/services/api.js';
import { PrivateHero } from '../auth/PrivateHero.jsx';
import { useAuth } from '../auth/AuthProvider.jsx';
import { useResource } from '../../shared/hooks/useResource.js';
import { ResourceState } from '../../shared/components/ResourceState.jsx';
import { MessagesSection } from '../communications/MessagesSection.jsx';
import { WorkshopAccount } from '../workshops/WorkshopAccount.jsx';
import { WorkshopApplications } from '../workshops/WorkshopApplications.jsx';
import { AppointmentRow } from './AppointmentRow.jsx';
import { WorkshopJobs } from '../workshops/WorkshopJobs.jsx';
export function AccountPage() {
  const { t } = useLanguage();
  const { user, logout } = useAuth();
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(null);
  const professional = user.accountType === 'workshop';
  const [revision, setRevision] = useState(0);
  const resource = useResource(
    useCallback(
      (signal) => (professional ? Promise.resolve([]) : api.appointments.list({ signal })),
      [professional],
    ),
  );
  const workshops = useResource(
    useCallback(
      (signal) =>
        user.role === 'admin' ? api.workshops.assignable({ signal }) : Promise.resolve([]),
      [user.role],
    ),
  );
  async function update(id, status) {
    setError('');
    setBusy(id);
    try {
      await api.appointments.update(id, { status });
      resource.retry();
      setRevision((value) => value + 1);
    } catch (error) {
      setError(error.message);
    } finally {
      setBusy(null);
    }
  }
  async function exit() {
    try {
      await logout();
    } catch (error) {
      setError(error.message);
    }
  }
  return (
    <div className="account-page">
      <PrivateHero
        image={
          professional
            ? '/images/editorial/taller-equipo-v1.png'
            : ['admin', 'staff'].includes(user.role)
              ? '/images/editorial/asesora-equipo-v1.png'
              : '/images/editorial/lifestyle-clean.png'
        }
        eyebrow={
          ['admin', 'staff'].includes(user.role) ? 'KelseTS CARS TEAM' : t('TU ESPACIO KelseTS')
        }
        title={
          professional
            ? t('Tu taller. Nuestra conexión.')
            : ['admin', 'staff'].includes(user.role)
              ? t('Cada persona. Una misma atención.')
              : t('Tu camino continúa aquí.')
        }
        description={
          professional
            ? t('Tu colaboración y las citas que cuidamos juntos.')
            : user.role === 'client'
              ? t('Organiza tus visitas y consulta tus comunicaciones.')
              : t('Clientes, talleres y concesionarios, conectados.')
        }
      />
      <section className="page-shell account-content">
        <div className="account-heading">
          <div>
            <p className="eyebrow">{professional ? t('PERFIL PROFESIONAL') : t('MI CUENTA')}</p>
            <h2>
              {t('Hola,')} {user.name}.
            </h2>
          </div>
          <button className="text-button" onClick={exit}>
            {t('Cerrar sesión')}
          </button>
        </div>
        {error && (
          <p className="form-error" role="alert">
            {t(error)}
          </p>
        )}
        {professional ? (
          <>
            <WorkshopAccount />
            {user.role === 'workshop' && <WorkshopJobs />}
          </>
        ) : (
          <ResourceState resource={resource}>
            {(items) =>
              items.length ? (
                <div className="appointment-list">
                  {items.map((item) => (
                    <AppointmentRow
                      key={item._id}
                      appointment={item}
                      role={user.role}
                      busy={busy}
                      workshops={workshops}
                      onUpdate={update}
                      onAssigned={() => {
                        resource.retry();
                        setRevision((value) => value + 1);
                      }}
                    />
                  ))}
                </div>
              ) : (
                <p className="notice">
                  {user.role === 'client'
                    ? t(
                        'Todavía no tienes citas. Elige un vehículo en la colección para organizar una visita.',
                      )
                    : t('Todavía no hay solicitudes de cita en tu agenda.')}
                </p>
              )
            }
          </ResourceState>
        )}
        {user.role === 'admin' && (
          <>
            <section className="notice">
              <p className="eyebrow">{t('GESTIÓN DE LA COLECCIÓN')}</p>
              <h2>{t('La imagen de cada vehículo.')}</h2>
              <p>
                {t(
                  'Busca una unidad y abre su ficha para actualizar su fotografía con vista previa.',
                )}
              </p>
              <Link className="button" to="/catalogo">
                {t('Gestionar fotografías ↗')}
              </Link>
            </section>
            <WorkshopApplications />
          </>
        )}
        <MessagesSection revision={revision} />
      </section>
    </div>
  );
}
