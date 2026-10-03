import photos from '../../../../data/media/vehicles.json';
import { useState } from 'react';
export function VehiclePhoto({ src, alt, eager = false, className = '', sizes = '100vw' }) {
  const [failed, setFailed] = useState(null);
  if (!src || failed === src) return <div className={`photo-placeholder ${className}`} role="img" aria-label="Fotografía pendiente">Fotografía pendiente</div>;
  return <img className={className} src={src} srcSet={photos.find(photo => photo.src === src)?.srcSet} sizes={sizes} alt={alt} loading={eager ? 'eager' : 'lazy'} decoding="async" onError={() => setFailed(src)} />;
}
