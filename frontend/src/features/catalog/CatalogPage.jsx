import { useCallback } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { api } from '../../shared/services/api.js';
import { useResource } from '../../shared/hooks/useResource.js';
import { ResourceState } from '../../shared/components/ResourceState.jsx';
import { VehiclePhoto } from '../../shared/components/VehiclePhoto.jsx';
export function CatalogPage() {
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
  return <><section className="catalog-hero" aria-label="La colección KelseTS Cars"><div className="catalog-hero-copy"><p className="eyebrow">LA COLECCIÓN</p><h1>Encuentra tu<br /><em>próximo camino.</em></h1><p>Consulta el inventario y descubre cada vehículo con su sede de referencia.</p><a className="button" href="#buscar-vehiculos">Explorar vehículos ↓</a></div><figure><img src="/images/editorial/showroom-v2.png" alt="Concesionario conceptual KelseTS Cars con el logo iluminado en la fachada" fetchPriority="high" /><figcaption>Escena conceptual KelseTS Cars</figcaption></figure></section><section className="page-shell catalog-results" id="buscar-vehiculos"><div className="catalog-modes" role="group" aria-label="Modo de búsqueda"><button type="button" aria-pressed={mode === 'search'} onClick={() => selectMode('search')}>Búsqueda libre</button><button type="button" aria-pressed={mode === 'filters'} onClick={() => selectMode('filters')}>Filtros</button></div>{mode === 'search' ? <form className="catalog-search" role="search" onSubmit={filter} key={`search-${query}`}><label htmlFor="catalog-query">Buscar por marca o modelo</label><div className="catalog-search-row"><input id="catalog-query" type="search" name="q" defaultValue={params.get('q') || ''} placeholder="Escribe una marca o modelo, por ejemplo Audi Q5" maxLength={100} /><button className="button" type="submit">Buscar</button></div></form> : <form className="filters catalog-filters" aria-label="Filtrar vehículos" onSubmit={filter} key={`filters-${query}`}><label>Marca<select name="brand" defaultValue={params.get('brand') || ''}><option value="">Todas las marcas</option>{(resource.data?.brands || ['Tesla', 'Mercedes-Benz', 'Audi', 'Ferrari', 'Porsche']).map(value => <option key={value}>{value}</option>)}</select></label><label>Motorización<select name="fuel" defaultValue={params.get('fuel') || ''}><option value="">Todas</option>{(resource.data?.fuels || ['Eléctrico', 'Por verificar']).map(value => <option key={value}>{value}</option>)}</select></label><label>Ordenar<select name="sort" defaultValue={params.get('sort') || 'brand'}><option value="brand">Marca y modelo</option><option value="price-asc">Precio: menor a mayor</option><option value="price-desc">Precio: mayor a menor</option></select></label><button className="button" type="submit">Aplicar filtros</button><button className="button button-outline" type="button" onClick={() => setParams({ mode })}>Limpiar filtros</button></form>}<ResourceState resource={resource}>{data => <><p role="status">{data.total} vehículos</p>{data.items.length ? <div className="editorial-grid">{data.items.map(vehicle => <article className="editorial-card" key={vehicle._id}><VehiclePhoto src={vehicle.image} brand={vehicle.brand} vehicleKey={vehicle.seedKey} alt={`${vehicle.brand} ${vehicle.model}, fotografía ilustrativa`} /><div><p className="eyebrow">{vehicle.brand}</p><h2>{vehicle.model}</h2><p>{vehicle.year || 'Año pendiente'} · {vehicle.dealership?.city}</p><p>{vehicle.price == null ? 'Precio pendiente' : new Intl.NumberFormat('es-ES', { style: 'currency', currency: vehicle.currency || 'EUR', maximumFractionDigits: 0 }).format(vehicle.price)}</p><Link to={`/vehiculos/${vehicle._id}`}>Ver ficha ↗</Link></div></article>)}</div> : <div className="notice"><h2>No hay vehículos con estos filtros</h2><button className="button" onClick={() => setParams({ mode })}>Limpiar filtros</button></div>}<div className="pagination"><button className="button button-outline" disabled={data.page <= 1} onClick={() => page(data.page - 1)}>Anterior</button><span>Página {data.page} de {Math.max(data.pages, 1)}</span><button className="button button-outline" disabled={data.page >= data.pages} onClick={() => page(data.page + 1)}>Siguiente</button></div></>}</ResourceState></section></>;
}
