import { Link } from 'react-router-dom';
import { useLanguage } from '../i18n/LanguageProvider.jsx';
import { BrandLogo } from './BrandLogo.jsx';

export function SiteFooter() {
  const { t } = useLanguage();
  return (
    <footer className="site-footer">
      <div>
        <Link className="wordmark footer-wordmark" to="/" aria-label={t('KelseTS Cars, inicio')}>
          <BrandLogo />
        </Link>
        <p>
          {t('El carácter se lleva dentro.')}
          <br />
          {t('El camino lo eliges tú.')}
        </p>
      </div>
      <div>
        <p>
          Madrid · Barcelona
          <br />
          San Sebastián · Málaga
        </p>
        <Link to="/creditos">{t('Fotografías y créditos')}</Link>
      </div>
      <p className="legal">
        {t('Marca ficticia · Proyecto académico de Araceli Fradejas Muñoz.')}
        <br />
        {t(
          'Sin vinculación con los fabricantes. Las fotografías ilustran modelos, no unidades a la venta.',
        )}
      </p>
    </footer>
  );
}
