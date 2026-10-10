import { useLanguage } from '../../shared/i18n/LanguageProvider.jsx';
import { useParams, Link } from 'react-router-dom';
import photos from '../../../../data/media/vehicles.json';
import { VehiclePhoto } from '../../shared/components/VehiclePhoto.jsx';
export function ModelPage() {
  const { t } = useLanguage();
  const { key } = useParams();
  const photo = photos.find((value) => value.key === key);
  if (!photo)
    return (
      <section className="page-shell">
        <h1>{t('Modelo no encontrado')}</h1>
        <Link to="/">{t('Volver al inicio')}</Link>
      </section>
    );
  return (
    <section className="page-shell">
      <p className="eyebrow">
        {t('SELECCIÓN EDITORIAL ·')} {photo.brand}
      </p>
      <h1>{photo.model}</h1>
      <VehiclePhoto
        className="detail-photo"
        src={photo.src}
        alt={`${photo.brand} ${photo.model}, ${t('fotografía ilustrativa')}`}
        eager
      />
      <p>
        {t(
          'Fotografía ilustrativa del modelo. No representa una unidad concreta del inventario ni acredita equipamiento, color o disponibilidad.',
        )}
      </p>
      <p className="small">
        {t('Fotografía:')} {photo.author} ·{' '}
        <a href={photo.licenseUrl} target="_blank" rel="noreferrer">
          {photo.license}
        </a>{' '}
        ·{' '}
        <a href={photo.sourceUrl} target="_blank" rel="noreferrer">
          {t('Ficha original')}
        </a>
      </p>
      <Link className="button" to={`/catalogo?brand=${encodeURIComponent(photo.brand)}`}>
        {t('Consultar el catálogo')}
      </Link>
    </section>
  );
}
