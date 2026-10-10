import { useLanguage } from '../../shared/i18n/LanguageProvider.jsx';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import photos from '../../../../data/media/neighborhoods.json';

export function NeighborhoodPreview({ item }) {
  const { t } = useLanguage();
  const [failed, setFailed] = useState(false);
  const photo = photos.find((photo) => photo.seedKey === item.seedKey);
  const hasCoordinates = Number.isFinite(item.latitude) && Number.isFinite(item.longitude);
  if (!photo && !hasCoordinates) return null;
  const streetView = hasCoordinates
    ? `https://www.google.com/maps/@?${new URLSearchParams({ api: '1', map_action: 'pano', viewpoint: `${item.latitude},${item.longitude}` })}`
    : null;
  return (
    <div className="neighborhood-preview">
      {photo && (
        <figure>
          {!failed && (
            <img
              src={photo.src}
              alt={t(photo.alt)}
              loading="lazy"
              decoding="async"
              width="1280"
              height="960"
              onError={() => setFailed(true)}
            />
          )}
          <figcaption>
            <span>{t(photo.label)}</span>
            <small>{t('Imagen del entorno · Centro ficticio')}</small>
          </figcaption>
        </figure>
      )}
      <div className="neighborhood-links">
        {streetView && (
          <a
            href={streetView}
            target="_blank"
            rel="noreferrer"
            aria-label={`${t('Explorar el entorno de')} ${item.name} ${t('en Street View (abre otra pestaña)')}`}
          >
            {t('Explorar en Street View ↗')}
          </a>
        )}
        {photo && <Link to={`/creditos#entorno-${photo.seedKey}`}>{t('Créditos de la foto')}</Link>}
      </div>
    </div>
  );
}
