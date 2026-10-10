import { CatalogHero } from './components/CatalogHero.jsx';
import { CatalogToolbar } from './components/CatalogToolbar.jsx';
import { VehicleCard } from './components/VehicleCard.jsx';
import { CatalogPagination } from './components/CatalogPagination.jsx';
import { useLanguage } from '../../shared/i18n/LanguageProvider.jsx';
import { useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import { api } from '../../shared/services/api.js';
import { useResource } from '../../shared/hooks/useResource.js';
import { ResourceState } from '../../shared/components/ResourceState.jsx';
export function CatalogPage() {
  const { t } = useLanguage();
  const [params, setParams] = useSearchParams();
  const mode =
    params.get('mode') === 'filters' ||
    (!params.get('mode') && (params.has('brand') || params.has('fuel')))
      ? 'filters'
      : 'search';
  const queryParams = new URLSearchParams(params);
  queryParams.delete('mode');
  if (mode === 'search') {
    queryParams.delete('brand');
    queryParams.delete('fuel');
    queryParams.delete('sort');
  } else queryParams.delete('q');
  const query = queryParams.toString();
  function selectMode(nextMode) {
    setParams({ mode: nextMode });
  }
  const load = useCallback((signal) => api.catalog.list(query, { signal }), [query]);
  const resource = useResource(load);
  function filter(event) {
    event.preventDefault();
    const values = new URLSearchParams({ mode, page: '1' });
    for (const [key, value] of new FormData(event.currentTarget)) {
      const clean = String(value).trim();
      if (clean) values.set(key, clean);
    }
    setParams(values);
  }
  function page(number) {
    const next = new URLSearchParams(params);
    next.set('page', String(number));
    setParams(next);
  }
  const clear = () => setParams({ mode });
  const search = (q) =>
    setParams({ mode: 'search', page: '1', ...(q.trim() ? { q: q.trim() } : {}) });

  return (
    <>
      <CatalogHero />
      <section className="page-shell catalog-results" id="buscar-vehiculos">
        <CatalogToolbar
          mode={mode}
          params={params}
          query={query}
          data={resource.data}
          onModeChange={selectMode}
          onSearch={search}
          onFilter={filter}
          onClear={clear}
        />
        <ResourceState resource={resource}>
          {(data) => (
            <>
              <p className="catalog-count" role="status">
                {data.total} {t(data.total === 1 ? 'vehículo' : 'vehículos')}
              </p>
              {data.items.length ? (
                <div className="editorial-grid">
                  {data.items.map((vehicle) => (
                    <VehicleCard key={vehicle._id} vehicle={vehicle} />
                  ))}
                </div>
              ) : (
                <div className="notice">
                  <h2>{t('No hay vehículos con estos filtros')}</h2>
                  <button className="button" onClick={clear}>
                    {t('Limpiar filtros')}
                  </button>
                </div>
              )}
              <CatalogPagination page={data.page} pages={data.pages} onChange={page} />
            </>
          )}
        </ResourceState>
      </section>
    </>
  );
}
