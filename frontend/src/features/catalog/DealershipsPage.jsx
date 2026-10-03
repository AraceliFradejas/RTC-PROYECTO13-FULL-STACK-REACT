import { lazy, Suspense, useCallback, useEffect, useRef, useState } from 'react';
import { api } from '../../shared/services/api.js';
import { useResource } from '../../shared/hooks/useResource.js';
import { ResourceState } from '../../shared/components/ResourceState.jsx';
import { distanceKm } from './dealershipDistance.js';
const DealershipMap = lazy(() => import('./DealershipMap.jsx').then(module => ({ default: module.DealershipMap })));

export function DealershipsPage() {
  const resource = useResource(useCallback(signal => api.catalog.dealerships({ signal }), []));
  const [position, setPosition] = useState(null);
  const [selected, setSelected] = useState(null);
  const [locating, setLocating] = useState(false);
  const [error, setError] = useState('');
  const [picking, setPicking] = useState(false);
  const choosePosition = useCallback(point => { setPosition(point); setSelected(null); setPicking(false); setError(''); }, []);
  const active = useRef(true);
  useEffect(() => { active.current = true; return () => { active.current = false; }; }, []);
  function locate() {
    if (!navigator.geolocation) { setError('Tu navegador no permite geolocalización. Puedes explorar las cuatro sedes en el mapa.'); return; }
    if (!window.isSecureContext) { setError('La ubicación automática necesita HTTPS o localhost. Abre la vista previa en http://localhost:5173/sedes o elige tu punto en el mapa.'); return; }
    setLocating(true); setPicking(false); setError('');
    navigator.geolocation.getCurrentPosition(result => {
      if (!active.current) return;
      setPosition({ latitude: result.coords.latitude, longitude: result.coords.longitude });
      setSelected(null); setLocating(false);
    }, failure => {
      if (!active.current) return;
      setLocating(false);
      const messages = {
        1: 'El acceso a tu ubicación está bloqueado. En Safari, revisa Ajustes → Sitios web → Ubicación y, en macOS, Ajustes del Sistema → Privacidad y seguridad → Localización → Safari. Después vuelve a intentarlo, o elige tu punto en el mapa.',
        2: 'El dispositivo no ha podido determinar tu ubicación. Comprueba que la localización está activada en el sistema, o elige tu punto en el mapa.',
        3: 'El dispositivo ha tardado demasiado en obtener tu ubicación. Puedes volver a intentarlo o elegir tu punto en el mapa.',
      };
      setError(messages[failure.code] || 'No se ha podido obtener tu ubicación. Elige tu punto en el mapa.');
    }, { enableHighAccuracy: false, timeout: 30000, maximumAge: 300000 });
  }
  return <>
    <section className="catalog-hero dealerships-hero"><div className="catalog-hero-copy"><p className="eyebrow">LA RED KelseTS</p><h1>Cuatro ciudades.<br /><em>Un mismo carácter.</em></h1><p>Diseño, atención y pasión por el automóvil. Encuentra tu espacio KelseTS en nuestra red de sedes.</p><a className="button" href="#red-sedes">Descubrir las sedes ↓</a></div><figure><img src="/images/editorial/showroom-v2.png" alt="Concesionario de lujo conceptual KelseTS Cars con coches y fachada iluminada" fetchPriority="high" /><figcaption>Escena conceptual KelseTS Cars</figcaption></figure></section>
    <section className="page-shell dealership-network" id="red-sedes"><p className="eyebrow">MÁS CERCA DE TI</p><h2>Tu próximo encuentro.</h2><p>Cuatro enclaves que inspiran nuestra visión de la elegancia. Las direcciones son inventadas y los puntos del mapa representan aproximadamente cada zona.</p>
      <div className="location-toolbar"><button className="button" disabled={locating} onClick={locate}>{locating ? 'Buscando tu ubicación…' : position ? 'Actualizar mi ubicación' : 'Usar mi ubicación'}</button><button className="button button-outline" disabled={locating} aria-pressed={picking} onClick={() => setPicking(value => !value)}>{picking ? 'Cancelar selección' : 'Elegir mi ubicación en el mapa'}</button>{position && <button className="button button-outline" onClick={() => { setPosition(null); setSelected(null); setPicking(false); }}>Borrar mi ubicación</button>}<p className="small">Solicitamos permiso solo al pulsar el botón. Tu ubicación no se guarda en nuestra base de datos. Distancias aproximadas en línea recta, no por carretera.</p></div>
      {picking && <p role="status">Acerca el mapa a tu zona y pulsa en tu ubicación aproximada para calcular las distancias.</p>}{error && <p className="notice" role="alert">{error}</p>}
      <ResourceState resource={resource}>{items => {
        const sorted = items.map(item => ({ ...item, distance: position && Number.isFinite(item.latitude) && Number.isFinite(item.longitude) ? distanceKm(position, item) : null })).sort((a, b) => position ? (a.distance ?? Infinity) - (b.distance ?? Infinity) : a.city.localeCompare(b.city));
        return <><p role="status">{position && sorted[0]?.distance != null ? `Tu sede más cercana: ${sorted[0].name}.` : 'Activa tu ubicación para ver las distancias a cada sede.'}</p><Suspense fallback={<p role="status">Cargando mapa…</p>}><DealershipMap items={items} position={position} selected={selected} picking={picking} onPick={choosePosition} /></Suspense><div className="dealership-grid">{sorted.map((item, index) => <article className="form-panel dealership-card" key={item._id}><p className="eyebrow">{item.area}</p><h3>{item.city}</h3>{position && index === 0 && item.distance != null && <span className="nearest-badge">La más cercana</span>}<p>{item.address}</p><p>{item.hours}</p><p className="dealership-distance">{item.distance == null ? 'Distancia disponible al activar tu ubicación' : `${new Intl.NumberFormat('es-ES', { maximumFractionDigits: 1 }).format(item.distance)} km · en línea recta`}</p><button className="button button-outline" disabled={!Number.isFinite(item.latitude) || !Number.isFinite(item.longitude)} onClick={() => { setSelected(item); document.getElementById('red-sedes')?.scrollIntoView({ behavior: 'auto' }); }}>Ver zona en el mapa ↗</button><p className="small">Dirección ficticia · Proyecto académico.</p></article>)}</div></>;
      }}</ResourceState>
    </section>
  </>;
}
