import { useLanguage } from '../../shared/i18n/LanguageProvider.jsx';
import { useCallback } from 'react';
import { useParams, Link } from 'react-router-dom';
import { api } from '../../shared/services/api.js';
import { useResource } from '../../shared/hooks/useResource.js';
import { ResourceState } from '../../shared/components/ResourceState.jsx';
import { VehiclePhoto } from '../../shared/components/VehiclePhoto.jsx';
import { VehicleImageUpload } from './VehicleImageUpload.jsx';
import { useAuth } from '../auth/AuthProvider.jsx';
export function VehiclePage() {
  const { t, locale } = useLanguage();
  const { id } = useParams();
  const { user } = useAuth();
  const resource = useResource(useCallback((signal) => api.catalog.detail(id, { signal }), [id]));
  return (
    <section className="page-shell">
      <Link to="/catalogo">{t('← Volver a la colección')}</Link>
      <ResourceState resource={resource}>
        {(vehicle) => (
          <>
            <p className="eyebrow">{vehicle.brand}</p>
            <h1>{vehicle.model}</h1>
            <VehiclePhoto
              className="detail-photo"
              src={vehicle.image}
              vehicleId={vehicle._id}
              imagePublicId={vehicle.imagePublicId}
              brand={vehicle.brand}
              model={vehicle.model}
              vehicleKey={vehicle.seedKey}
              alt={`${vehicle.brand} ${vehicle.model}, ${t('fotografía ilustrativa')}`}
              eager
            />
            <dl className="specs">
              <div>
                <dt>{t('Carrocería')}</dt>
                <dd>{t(vehicle.bodyType)}</dd>
              </div>
              <div>
                <dt>{t('Motorización')}</dt>
                <dd>{t(vehicle.fuel)}</dd>
              </div>
              <div>
                <dt>{t('Año')}</dt>
                <dd>{vehicle.year || t('Por completar')}</dd>
              </div>
              <div>
                <dt>{t('Kilometraje')}</dt>
                <dd>
                  {vehicle.mileage == null
                    ? t('Por completar')
                    : `${vehicle.mileage.toLocaleString(locale)} km`}
                </dd>
              </div>
              <div>
                <dt>{t('Estado')}</dt>
                <dd>{t(vehicle.condition)}</dd>
              </div>
              <div>
                <dt>{t('Sede')}</dt>
                <dd>{vehicle.dealership?.city}</dd>
              </div>
            </dl>
            <p>
              {t(
                'Fotografía de referencia. Si se indica la marca, puede mostrar otro modelo de esa marca; no acredita el año, color o equipamiento de esta unidad.',
              )}
            </p>
            {vehicle.demo && (
              <p className="small">{t('Unidad de demostración del proyecto académico.')}</p>
            )}
            {/^https?:\/\//.test(vehicle.sourceUrl) && (
              <p className="small">
                <a href={vehicle.sourceUrl} target="_blank" rel="noreferrer">
                  {t('Consultar la fuente del modelo ↗')}
                </a>
              </p>
            )}
            <Link
              className="button"
              to={`/citas/nueva?vehicle=${vehicle._id}&dealership=${vehicle.dealership?._id}`}
            >
              {t('Organizar una visita ↗')}
            </Link>
            {user?.role === 'admin' && (
              <VehicleImageUpload
                key={vehicle._id}
                vehicle={vehicle}
                onUploaded={(updated) =>
                  resource.setData({
                    ...vehicle,
                    image: updated.image,
                    imagePublicId: updated.imagePublicId,
                  })
                }
              />
            )}
          </>
        )}
      </ResourceState>
    </section>
  );
}
