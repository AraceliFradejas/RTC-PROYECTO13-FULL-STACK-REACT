import { useCallback } from 'react';
import { useParams, Link } from 'react-router-dom';
import { api } from '../../shared/services/api.js';
import { useResource } from '../../shared/hooks/useResource.js';
import { ResourceState } from '../../shared/components/ResourceState.jsx';
import { VehiclePhoto } from '../../shared/components/VehiclePhoto.jsx';
export function VehiclePage() {
  const { id } = useParams();
  const resource = useResource(useCallback(signal => api.catalog.detail(id, { signal }), [id]));
  return <section className="page-shell">
    <Link to="/catalogo">← Volver a la colección</Link>
    <ResourceState resource={resource}>{vehicle => <>
      <p className="eyebrow">{vehicle.brand}</p><h1>{vehicle.model}</h1>
      <VehiclePhoto className="detail-photo" src={vehicle.image} brand={vehicle.brand} model={vehicle.model} vehicleKey={vehicle.seedKey} alt={`${vehicle.brand} ${vehicle.model}, fotografía ilustrativa`} eager />
      <dl className="specs">
        <div><dt>Carrocería</dt><dd>{vehicle.bodyType}</dd></div>
        <div><dt>Motorización</dt><dd>{vehicle.fuel}</dd></div>
        <div><dt>Año</dt><dd>{vehicle.year || 'Por completar'}</dd></div>
        <div><dt>Kilometraje</dt><dd>{vehicle.mileage == null ? 'Por completar' : `${vehicle.mileage.toLocaleString('es-ES')} km`}</dd></div>
        <div><dt>Estado</dt><dd>{vehicle.condition}</dd></div>
        <div><dt>Sede</dt><dd>{vehicle.dealership?.city}</dd></div>
      </dl>
      <p>Fotografía de referencia. Si se indica la marca, puede mostrar otro modelo de esa marca; no acredita el año, color o equipamiento de esta unidad.</p>
      {vehicle.demo && <p className="small">Unidad de demostración del proyecto académico.</p>}
      {/^https?:\/\//.test(vehicle.sourceUrl) && <p className="small"><a href={vehicle.sourceUrl} target="_blank" rel="noreferrer">Consultar la fuente del modelo ↗</a></p>}
      <Link className="button" to={`/citas/nueva?vehicle=${vehicle._id}&dealership=${vehicle.dealership?._id}`}>Organizar una visita ↗</Link>
    </>}</ResourceState>
  </section>;
}
