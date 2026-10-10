import { useLanguage } from '../../shared/i18n/LanguageProvider.jsx';
export function PrivateHero({
  eyebrow,
  title,
  description,
  action = false,
  image = '/images/editorial/llaves-clean.png',
}) {
  const { t } = useLanguage();
  return (
    <header className={`access-hero${action ? '' : ' account-hero'}`}>
      <img src={image} alt="" fetchPriority="high" />
      <div className="access-hero-copy">
        <p className="eyebrow">{eyebrow}</p>
        <h1>{title}</h1>
        <p>{description}</p>
        {action && (
          <a href="#acceso" className="access-hero-link">
            {t('Acceder a mi espacio ↓')}
          </a>
        )}
      </div>
    </header>
  );
}
