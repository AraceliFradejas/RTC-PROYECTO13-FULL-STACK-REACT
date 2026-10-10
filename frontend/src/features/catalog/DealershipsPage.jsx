import { NetworkHero } from './components/NetworkHero.jsx';
import { useLanguage } from '../../shared/i18n/LanguageProvider.jsx';
import { lazy, Suspense, useCallback } from 'react';
import { api } from '../../shared/services/api.js';
import { useResource } from '../../shared/hooks/useResource.js';
import { ResourceState } from '../../shared/components/ResourceState.jsx';
import { distanceKm } from './dealershipDistance.js';
import { NetworkCard } from './components/NetworkCard.jsx';
import { useDealershipLocation } from './useDealershipLocation.js';
const DealershipMap = lazy(() =>
  import('./DealershipMap.jsx').then((module) => ({ default: module.DealershipMap })),
);

export function DealershipsPage() {
  const { t } = useLanguage();
  const resource = useResource(
    useCallback(async (signal) => {
      const [dealerships, workshops] = await Promise.all([
        api.catalog.dealerships({ signal }),
        api.workshops.list({ signal }),
      ]);
      return [
        ...dealerships.map((item) => ({ ...item, kind: 'dealership' })),
        ...workshops.map((item) => ({ ...item, kind: 'workshop' })),
      ];
    }, []),
  );
  const {
    position,
    selected,
    setSelected,
    locating,
    error,
    picking,
    setPicking,
    choosePosition,
    locate,
    clearPosition,
  } = useDealershipLocation();
  return (
    <>
      <NetworkHero />
      <section className="page-shell dealership-network" id="red-sedes">
        <p className="eyebrow">{t('MÁS CERCA DE TI')}</p>
        <h2>{t('Tu próximo encuentro.')}</h2>
        <p>
          {t(
            'Concesionarios y talleres próximos en cuatro ciudades. Las direcciones son inventadas y los puntos del mapa representan aproximadamente cada zona.',
          )}
        </p>
        <div className="location-toolbar">
          <button className="button" disabled={locating} onClick={locate}>
            {locating
              ? t('Buscando tu ubicación…')
              : position
                ? t('Actualizar mi ubicación')
                : t('Usar mi ubicación')}
          </button>
          <button
            className="button button-outline"
            disabled={locating}
            aria-pressed={picking}
            onClick={() => setPicking((value) => !value)}
          >
            {picking ? t('Cancelar selección') : t('Elegir mi ubicación en el mapa')}
          </button>
          {position && (
            <button className="button button-outline" onClick={clearPosition}>
              {t('Borrar mi ubicación')}
            </button>
          )}
          <p className="small">
            {t(
              'Solicitamos permiso solo al pulsar el botón. Tu ubicación no se guarda en nuestra base de datos. Distancias aproximadas en línea recta, no por carretera.',
            )}
          </p>
        </div>
        {picking && (
          <p role="status">
            {t(
              'Acerca el mapa a tu zona y pulsa en tu ubicación aproximada para calcular las distancias.',
            )}
          </p>
        )}
        {error && (
          <p className="notice" role="alert">
            {t(error)}
          </p>
        )}
        <ResourceState resource={resource}>
          {(items) => {
            const sorted = items
              .map((item) => ({
                ...item,
                distance:
                  position && Number.isFinite(item.latitude) && Number.isFinite(item.longitude)
                    ? distanceKm(position, item)
                    : null,
              }))
              .sort((a, b) =>
                position
                  ? (a.distance ?? Infinity) - (b.distance ?? Infinity)
                  : a.city.localeCompare(b.city),
              );
            return (
              <>
                <p role="status">
                  {position && sorted[0]?.distance != null
                    ? `${t('Tu centro más cercano:')} ${sorted[0].name}.`
                    : t(
                        'Activa tu ubicación para ver las distancias a cada concesionario y taller.',
                      )}
                </p>
                <p className="map-legend">
                  <span className="legend-dealership">{t('● Concesionario')}</span>
                  <span className="legend-workshop">{t('● Taller colaborador')}</span>
                  <span className="legend-position">{t('● Tu ubicación')}</span>
                </p>
                <Suspense fallback={<p role="status">{t('Cargando mapa…')}</p>}>
                  <DealershipMap
                    items={items}
                    position={position}
                    selected={selected}
                    picking={picking}
                    onPick={choosePosition}
                  />
                </Suspense>
                <div className="dealership-grid">
                  {sorted.map((item, index) => (
                    <NetworkCard
                      key={item._id}
                      item={item}
                      nearest={Boolean(position && index === 0 && item.distance != null)}
                      onSelect={(item) => {
                        setSelected(item);
                        document.getElementById('red-sedes')?.scrollIntoView({ behavior: 'auto' });
                      }}
                    />
                  ))}
                </div>
              </>
            );
          }}
        </ResourceState>
      </section>
    </>
  );
}
