import { useLanguage } from '../../../shared/i18n/LanguageProvider.jsx';
import { NeighborhoodPreview } from '../NeighborhoodPreview.jsx';

export function NetworkCard({ item, nearest, onSelect }) {
  const { t, locale } = useLanguage();
  return (
    <article className="form-panel dealership-card">
      <p className="eyebrow">
        {item.kind === 'workshop' ? t('TALLER COLABORADOR') : t('CONCESIONARIO')} · {item.area}
      </p>
      <h3>{item.name}</h3>
      <NeighborhoodPreview item={item} />
      {nearest && <span className="nearest-badge">{t('El más cercano')}</span>}
      <p>{item.address}</p>
      <p>{item.kind === 'workshop' ? item.specialties.map(t).join(' · ') : item.hours}</p>
      {item.kind === 'workshop' && (
        <p className="small">
          {t('Sede vinculada:')} {item.dealership?.name}
        </p>
      )}
      <p className="dealership-distance">
        {item.distance == null
          ? t('Distancia disponible al activar tu ubicación')
          : `${new Intl.NumberFormat(locale, { maximumFractionDigits: 1 }).format(item.distance)} km · ${t('en línea recta')}`}
      </p>
      <button
        className="button button-outline"
        disabled={!Number.isFinite(item.latitude) || !Number.isFinite(item.longitude)}
        onClick={() => onSelect(item)}
      >
        {t('Ver zona en el mapa ↗')}
      </button>
      <p className="small">{t('Dirección ficticia · Proyecto académico.')}</p>
    </article>
  );
}
