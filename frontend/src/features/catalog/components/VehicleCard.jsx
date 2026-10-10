import { Link } from 'react-router-dom';
import { useLanguage } from '../../../shared/i18n/LanguageProvider.jsx';
import { VehiclePhoto } from '../../../shared/components/VehiclePhoto.jsx';

export function VehicleCard({ vehicle }) {
  const { t, locale } = useLanguage();
  const price =
    vehicle.price == null
      ? t('Precio pendiente')
      : new Intl.NumberFormat(locale, {
          style: 'currency',
          currency: vehicle.currency || 'EUR',
          maximumFractionDigits: 0,
        }).format(vehicle.price);

  return (
    <article className="editorial-card">
      <VehiclePhoto
        src={vehicle.image}
        vehicleId={vehicle._id}
        imagePublicId={vehicle.imagePublicId}
        brand={vehicle.brand}
        model={vehicle.model}
        vehicleKey={vehicle.seedKey}
        sizes="(max-width: 680px) 100vw, (max-width: 1000px) 50vw, 33vw"
        alt={`${vehicle.brand} ${vehicle.model}, ${t('fotografía ilustrativa')}`}
      />
      <div>
        <p className="eyebrow">{vehicle.brand}</p>
        <h2>{vehicle.model}</h2>
        <p>
          {vehicle.year || t('Año pendiente')} · {vehicle.dealership?.city}
        </p>
        <p>{price}</p>
        <Link to={`/vehiculos/${vehicle._id}`}>{t('Ver ficha ↗')}</Link>
      </div>
    </article>
  );
}
