import photos from '../../../../data/media/vehicles.json';
import assignments from '../../../../data/media/vehicle-photo-assignments.json';
import { useState } from 'react';
import { BrandLogo } from './BrandLogo.jsx';
export function VehiclePhoto({ src, alt, brand, model, vehicleKey, eager = false, className = '', sizes = '100vw' }) {
  const [failed, setFailed] = useState([]);
  const references = photos.filter(photo => photo.brand === brand);
  const preferred = references.find(photo => photo.key === assignments[vehicleKey]) || references[0];
  const useVariation = src?.startsWith('/images/vehicles/') && preferred && preferred.src !== src;
  const reference = [preferred, ...references].find(photo => photo && !failed.includes(photo.src));
  const isReference = (!src || failed.includes(src) || useVariation) && reference;
  const markFailed = path => setFailed(previous => [...previous, path]);
  const matchesModel = reference && model && reference.model === model && !reference.brandReference;
  const referenceName = matchesModel ? `${brand} ${model}` : brand;
  const referenceAlt = matchesModel ? `${referenceName}, fotografía de referencia; versión y año pueden diferir` : `${brand}, imagen de referencia de la marca; puede mostrar otro modelo`;
  if (isReference) return <div className={`vehicle-reference ${className}`}><img src={reference.src} srcSet={reference.srcSet} sizes={sizes} alt={referenceAlt} loading={eager ? 'eager' : 'lazy'} decoding="async" onError={() => markFailed(reference.src)} /><span>Imagen de referencia · {referenceName}</span></div>;
  if (!src || failed.includes(src)) return <div className={`photo-placeholder ${className}`} role="img" aria-label={`${alt}. Fotografía pendiente`}><BrandLogo /><span>Fotografía pendiente</span></div>;
  return <img className={className} src={src} srcSet={photos.find(photo => photo.src === src)?.srcSet} sizes={sizes} alt={alt} loading={eager ? 'eager' : 'lazy'} decoding="async" onError={() => markFailed(src)} />;
}
