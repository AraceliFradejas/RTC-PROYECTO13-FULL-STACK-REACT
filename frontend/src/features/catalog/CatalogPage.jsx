import { useLanguage } from '../../shared/i18n/LanguageProvider.jsx';
import { useCallback } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { api } from '../../shared/services/api.js';
import { useResource } from '../../shared/hooks/useResource.js';
import { ResourceState } from '../../shared/components/ResourceState.jsx';
import { CatalogSearch } from './CatalogSearch.jsx';
import { VehiclePhoto } from '../../shared/components/VehiclePhoto.jsx';
export function CatalogPage() {
  const { t, locale } = useLanguage();
  const [params, setParams] = useSearchParams();
  const mode = params.get('mode') === 'filters' || (!params.get('mode') && (params.has('brand') || params.has('fuel'))) ? 'filters' : 'search';
  const queryParams = new URLSearchParams(params);
  queryParams.delete('mode');
  if (mode === 'search') { queryParams.delete('brand'); queryParams.delete('fuel'); queryParams.delete('sort'); }
  else queryParams.delete('q');
  const query = queryParams.toString();
  function selectMode(nextMode) { setParams({ mode: nextMode }); }
  const load = useCallback(signal => api.catalog.list(query, { signal }), [query]);
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
  function page(number) { const next = new URLSearchParams(params); next.set('page', String(number)); setParams(next); }
  return <><section className="catalog-hero" aria-label={t("La colección KelseTS Cars")}><div className="catalog-hero-copy"><p className="eyebrow">{t("LA COLECCIÓN")}</p><h1>{t("Encuentra tu")}<br /><em>{t("próximo camino.")}</em></h1><p>{t("Consulta el inventario y descubre cada vehículo con su sede de referencia.")}</p><a className="button" href="#buscar-vehiculos">{t("Explorar vehículos ↓")}</a></div><figure><img src="/images/editorial/showroom-v2.png" alt={t("Concesionario conceptual KelseTS Cars con el logo iluminado en la fachada")} fetchPriority="high" /><figcaption>{t("Escena conceptual KelseTS Cars")}</figcaption></figure></section><section className="page-shell catalog-results" id="buscar-vehiculos"><div className="catalog-toolbar"><div className="catalog-search-intro"><p className="eyebrow">{t("TU COLECCIÓN, A TU MANERA")}</p><h2>{t("¿Cómo quieres encontrar tu próximo coche?")}</h2><p><strong>{t("Búsqueda libre:")}</strong> {t("escribe una marca o modelo y elige entre las sugerencias. Ideal si ya tienes algo en mente.")}</p><p><strong>{t("Filtros:")}</strong> {t("combina marca y motorización para comparar opciones y ordenar los resultados. Ideal si todavía estás explorando.")}</p></div><div className="catalog-modes" role="group" aria-label={t("Modo de búsqueda")}><button type="button" aria-pressed={mode === 'search'} onClick={() => selectMode('search')}>{t("Búsqueda libre")}</button><button type="button" aria-pressed={mode === 'filters'} onClick={() => selectMode('filters')}>{t("Filtros")}</button></div>{mode === 'search' ? <CatalogSearch initialValue={params.get('q') || ''} onSearch={q => setParams({ mode: 'search', page: '1', ...(q.trim() ? { q: q.trim() } : {}) })} /> : <form className="filters catalog-filters" aria-label={t("Filtrar vehículos")} onSubmit={filter} key={`filters-${query}`}><label>{t("Marca")}<select name="brand" defaultValue={params.get('brand') || ''}><option value="">{t("Todas las marcas")}</option>{(resource.data?.brands || ['Tesla', 'Mercedes-Benz', 'Audi', 'Ferrari', 'Porsche']).map(value => <option key={value}>{value}</option>)}</select></label><label>{t("Motorización")}<select name="fuel" defaultValue={params.get('fuel') || ''}><option value="">{t("Todas")}</option>{(resource.data?.fuels || ['Eléctrico', 'Por verificar']).map(value => <option key={value} value={value}>{t(value)}</option>)}</select></label><label>{t("Ordenar")}<select name="sort" defaultValue={params.get('sort') || 'brand'}><option value="brand">{t("Marca y modelo")}</option><option value="price-asc">{t("Precio: menor a mayor")}</option><option value="price-desc">{t("Precio: mayor a menor")}</option></select></label><div className="catalog-filter-actions"><button className="button" type="submit">{t("Aplicar filtros")}</button><button className="button button-outline" type="button" onClick={() => setParams({ mode })}>{t("Limpiar filtros")}</button></div></form>}</div><ResourceState resource={resource}>{data => <><p className="catalog-count" role="status">{data.total} {t("vehículos")}</p>{data.items.length ? <div className="editorial-grid">{data.items.map(vehicle => <article className="editorial-card" key={vehicle._id}><VehiclePhoto src={vehicle.image} brand={vehicle.brand} model={vehicle.model} sizes="(max-width: 680px) 100vw, (max-width: 1000px) 50vw, 33vw" vehicleKey={vehicle.seedKey} alt={`${vehicle.brand} ${vehicle.model}, ${t('fotografía ilustrativa')}`} /><div><p className="eyebrow">{vehicle.brand}</p><h2>{vehicle.model}</h2><p>{vehicle.year || t("Año pendiente")} · {vehicle.dealership?.city}</p><p>{vehicle.price == null ? t("Precio pendiente") : new Intl.NumberFormat(locale, { style: 'currency', currency: vehicle.currency || 'EUR', maximumFractionDigits: 0 }).format(vehicle.price)}</p><Link to={`/vehiculos/${vehicle._id}`}>{t("Ver ficha ↗")}</Link></div></article>)}</div> : <div className="notice"><h2>{t("No hay vehículos con estos filtros")}</h2><button className="button" onClick={() => setParams({ mode })}>{t("Limpiar filtros")}</button></div>}<div className="pagination"><button className="button button-outline" disabled={data.page <= 1} onClick={() => page(data.page - 1)}>{t("Anterior")}</button><span>{t("Página")} {data.page} {t("de")} {Math.max(data.pages, 1)}</span><button className="button button-outline" disabled={data.page >= data.pages} onClick={() => page(data.page + 1)}>{t("Siguiente")}</button></div></>}</ResourceState></section></>;
}
