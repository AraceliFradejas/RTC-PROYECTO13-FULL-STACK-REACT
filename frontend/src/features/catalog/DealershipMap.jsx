import { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

export function DealershipMap({ items, position, selected, picking, onPick }) {
  const container = useRef(null);
  const map = useRef(null);
  useEffect(() => {
    const instance = L.map(container.current, { scrollWheelZoom: false });
    map.current = instance;
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19, attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    }).addTo(instance);
    instance.setView([40.3, -3.3], 5);
    return () => { instance.remove(); map.current = null; };
  }, []);
  useEffect(() => {
    const instance = map.current;
    const layer = L.layerGroup().addTo(instance);
    const points = [];
    for (const item of items) {
      if (!Number.isFinite(item.latitude) || !Number.isFinite(item.longitude)) continue;
      const point = [item.latitude, item.longitude]; points.push(point);
      const popup = document.createElement('div');
      const title = document.createElement('strong'); title.textContent = item.name;
      const text = document.createElement('p'); text.textContent = `${item.kind === 'workshop' ? 'Taller colaborador' : 'Concesionario'} · ${item.area} · Ubicación ficticia aproximada`;
      popup.append(title, text);
      L.circleMarker(point, { radius: item.kind === 'workshop' ? 6 : 11, color: '#f7f6f2', weight: 2, fillColor: item.kind === 'workshop' ? '#996819' : '#b3152b', fillOpacity: 1 }).bindPopup(popup).addTo(layer);
    }
    if (position) {
      const point = [position.latitude, position.longitude]; points.push(point);
      L.circleMarker(point, { radius: 8, color: '#fff', fillColor: '#246ea8', fillOpacity: 1 }).bindPopup('Tu ubicación aproximada').addTo(layer);
    }
    if (points.length) instance.fitBounds(points, { padding: [35, 35], maxZoom: 12 });
    return () => layer.remove();
  }, [items, position]);
  useEffect(() => {
    if (selected) map.current.setView([selected.latitude, selected.longitude], 14);
  }, [selected]);
  useEffect(() => {
    const instance = map.current;
    if (!picking) return;
    const choose = event => onPick({ latitude: event.latlng.lat, longitude: event.latlng.lng });
    instance.on('click', choose);
    instance.getContainer().style.cursor = 'crosshair';
    return () => { instance.off('click', choose); instance.getContainer().style.cursor = ''; };
  }, [picking, onPick]);
  return <div className="dealership-map" ref={container} role="region" aria-label="Mapa de concesionarios y talleres ficticios de KelseTS Cars" />;
}
