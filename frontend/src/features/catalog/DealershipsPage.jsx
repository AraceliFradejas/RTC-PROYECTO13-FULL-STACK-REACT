import { useCallback } from 'react';
import { api } from '../../shared/services/api.js';
import { useResource } from '../../shared/hooks/useResource.js';
import { ResourceState } from '../../shared/components/ResourceState.jsx';
export function DealershipsPage() {
  const resource = useResource(useCallback(signal => api.catalog.dealerships({ signal }), []));
  return <section className="page-shell"><p className="eyebrow">LA RED KelseTS</p><h1>Cuatro ciudades.<br />Un mismo carácter.</h1><p>Sedes ficticias previstas en Madrid, Barcelona, San Sebastián y Málaga. Las direcciones y horarios definitivos se consultarán desde la base de datos.</p><ResourceState resource={resource}>{items => <div className="editorial-grid">{items.map(item => <article className="form-panel" key={item._id}><p className="eyebrow">KelseTS CARS</p><h2>{item.city}</h2><p>{item.address || 'Dirección por completar'}</p><p>{item.hours}</p>{item.demo && <p className="small">Sede ficticia del proyecto académico.</p>}</article>)}</div>}</ResourceState></section>;
}
