import { useLanguage } from '../../shared/i18n/LanguageProvider.jsx';
import { useCallback, useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { SERVICES, objectId } from '@kelsets-cars/contracts';
import { api } from '../../shared/services/api.js';
import { useResource } from '../../shared/hooks/useResource.js';
import { ResourceState } from '../../shared/components/ResourceState.jsx';
import { useAuth } from '../auth/AuthProvider.jsx';
import { DemoNotice } from '../auth/DemoNotice.jsx';
import { PrivateHero } from '../auth/PrivateHero.jsx';
import { madridDateTime } from './madridTime.js';
export function NewAppointmentPage() {
  const { t } = useLanguage();
  const { user } = useAuth();
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  const vehicleId = params.get('vehicle');
  const dealershipId = params.get('dealership');
  const validSelection =
    objectId.safeParse(vehicleId).success && objectId.safeParse(dealershipId).success;
  const resource = useResource(
    useCallback(
      (signal) =>
        validSelection ? api.catalog.detail(vehicleId, { signal }) : Promise.resolve(null),
      [validSelection, vehicleId],
    ),
  );
  const now = new Date();
  const dayInMadrid = (value) =>
    new Intl.DateTimeFormat('en-CA', {
      timeZone: 'Europe/Madrid',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    }).format(value);
  async function submit(event) {
    event.preventDefault();
    setError('');
    setBusy(true);
    const fields = Object.fromEntries(new FormData(event.currentTarget));
    try {
      const date = madridDateTime(fields.date, fields.hour);
      const weekday = new Date(`${fields.date}T12:00:00Z`).getUTCDay();
      if (weekday === 0 || weekday === 6) throw new Error('Elige una fecha de lunes a viernes.');
      if (new Date(date) <= new Date())
        throw new Error('Elige una hora que todavía no haya pasado.');
      await api.appointments.create({
        vehicle: vehicleId,
        dealership: dealershipId,
        date,
        service: fields.service,
      });
      navigate('/mi-cuenta');
    } catch (error) {
      setError(error.message);
    } finally {
      setBusy(false);
    }
  }
  return (
    <div className="account-page">
      <PrivateHero
        image="/images/editorial/ruta-clean.png"
        eyebrow={t('TU PRÓXIMA VISITA')}
        title={
          <>
            {t('Hagamos sitio.')}
            <br />
            <em>{t('En la agenda.')}</em>
          </>
        }
        description={t('Elige el motivo y el momento. Nosotros cuidamos del encuentro.')}
      />
      <section className="page-shell reading-page appointment-page">
        <DemoNotice readOnly={user?.readOnly} />
        <p>
          {t(
            'Citas de lunes a viernes, de 10:00 a 17:00, dentro de los próximos 90 días. Horario de Madrid.',
          )}
        </p>
        {!validSelection ? (
          <div className="notice">
            <p>{t('Primero elige el vehículo que quieres conocer.')}</p>
            <Link className="button" to="/catalogo">
              {t('Explorar la colección')}
            </Link>
          </div>
        ) : (
          <ResourceState resource={resource}>
            {(vehicle) =>
              String(vehicle.dealership?._id) !== dealershipId ||
              ['Vendido', 'Reservado'].includes(vehicle.status) ? (
                <div className="notice">
                  <p>{t('Esta selección no está disponible para solicitar una cita.')}</p>
                  <Link className="button" to="/catalogo">
                    {t('Elegir otro vehículo')}
                  </Link>
                </div>
              ) : (
                <form className="form-panel" onSubmit={submit} aria-busy={busy}>
                  <fieldset className="demo-fieldset" disabled={busy || user?.readOnly}>
                  <div className="appointment-selection">
                    <p className="eyebrow">{t('TU ELECCIÓN')}</p>
                    <h2>
                      {vehicle.brand} {vehicle.model}
                    </h2>
                    <p>
                      {vehicle.dealership.name} · {vehicle.dealership.city}
                    </p>
                    <Link to={`/vehiculos/${vehicle._id}`}>{t('Volver a la ficha')}</Link>
                  </div>
                  <label>
                    {t('Motivo')}
                    <select name="service" disabled={busy}>
                      {SERVICES.map((service) => (
                        <option key={service} value={service}>
                          {t(service)}
                        </option>
                      ))}
                    </select>
                  </label>
                  <label>
                    {t('Fecha')}
                    <input
                      name="date"
                      type="date"
                      min={dayInMadrid(now)}
                      max={dayInMadrid(new Date(now.getTime() + 90 * 86400000))}
                      required
                      disabled={busy}
                    />
                  </label>
                  <label>
                    {t('Hora de Madrid')}
                    <select name="hour" disabled={busy}>
                      {Array.from({ length: 8 }, (_, i) => `${i + 10}:00`).map((hour) => (
                        <option key={hour}>{hour}</option>
                      ))}
                    </select>
                  </label>
                  <p className="small">
                    {t(
                      'Guardaremos tu solicitud si la franja está disponible. Quedará pendiente hasta que KelseTS Cars Team la confirme; podrás consultar el estado y la comunicación en tu cuenta.',
                    )}
                  </p>
                  {error && (
                    <p role="alert" className="form-error">
                      {t(error)}
                    </p>
                  )}
                  <button className="button" disabled={busy}>
                    {busy ? t('Enviando solicitud…') : t('Solicitar cita')}
                  </button>
                  </fieldset>
                </form>
              )
            }
          </ResourceState>
        )}
      </section>
    </div>
  );
}
