import { useLanguage } from '../../../shared/i18n/LanguageProvider.jsx';

export function CatalogHero() {
  const { t } = useLanguage();
  return (
    <section className="catalog-hero" aria-label={t('La colección KelseTS Cars')}>
      <div className="catalog-hero-copy">
        <p className="eyebrow">{t('LA COLECCIÓN')}</p>
        <h1>
          {t('Encuentra tu')}
          <br />
          <em>{t('próximo camino.')}</em>
        </h1>
        <p>{t('Consulta el inventario y descubre cada vehículo con su sede de referencia.')}</p>
        <a className="button" href="#buscar-vehiculos">
          {t('Explorar vehículos ↓')}
        </a>
      </div>
      <figure>
        <img
          src="/images/editorial/showroom-v2.png"
          alt={t('Concesionario conceptual KelseTS Cars con el logo iluminado en la fachada')}
          fetchPriority="high"
        />
        <figcaption>{t('Escena conceptual KelseTS Cars')}</figcaption>
      </figure>
    </section>
  );
}
