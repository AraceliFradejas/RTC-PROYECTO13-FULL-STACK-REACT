import { useLanguage } from '../../../shared/i18n/LanguageProvider.jsx';

export function NetworkHero() {
  const { t } = useLanguage();
  return (
    <section className="catalog-hero dealerships-hero">
      <div className="catalog-hero-copy">
        <p className="eyebrow">{t('LA RED KelseTS')}</p>
        <h1>
          {t('Cuatro ciudades.')}
          <br />
          <em>{t('Un mismo carácter.')}</em>
        </h1>
        <p>
          {t(
            'Cuatro concesionarios y cuatro talleres colaboradores para descubrir y cuidar tu coche. Encuentra tu espacio en la red KelseTS.',
          )}
        </p>
        <a className="button" href="#red-sedes">
          {t('Descubrir las sedes ↓')}
        </a>
      </div>
      <figure>
        <img
          src="/images/editorial/sedes-showroom-v1.png"
          alt={t(
            'Concesionario conceptual KelseTS Cars de fachada curva en piedra clara, logo iluminado y dos deportivos',
          )}
          fetchPriority="high"
        />
        <figcaption>{t('Escena conceptual KelseTS Cars')}</figcaption>
      </figure>
    </section>
  );
}
