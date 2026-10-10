import { Link } from 'react-router-dom';
import { useLanguage } from '../i18n/LanguageProvider.jsx';
import { BrandLogo } from './BrandLogo.jsx';

const universeLinks = [
  ['KelseTS Lifestyle', 'https://kelset-slanding.vercel.app/'],
  ['KelseTS Store', 'https://proyecto-landing-page-2.vercel.app/'],
  ['KelseTS Business School', 'https://kelse-ts-business-school-landing.vercel.app/'],
  ['KelseTS Talks', 'https://kelse-ts-talks.vercel.app/'],
];
const socialLinks = [
  ['GitHub', 'https://github.com/AraceliFradejas'],
  ['LinkedIn', 'https://www.linkedin.com/in/araceli-fradejas-munoz-transformaciondigital/'],
  ['X', 'https://x.com/AraceliFradejas'],
  ['Medium', 'https://medium.com/@araceli.fradejas'],
  ['YouTube', 'https://www.youtube.com/@aracelifradejasmunoz2758'],
];

function FooterLinks({ title, links }) {
  return (
    <nav className="footer-links" aria-label={title}>
      <h2>{title}</h2>
      <ul>
        {links.map(([label, href]) => (
          <li key={href}>
            <a href={href} target="_blank" rel="noopener noreferrer">{label}</a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export function SiteFooter() {
  const { t } = useLanguage();
  return (
    <footer className="site-footer">
      <div className="footer-brand">
        <Link className="wordmark footer-wordmark" to="/" aria-label={t('KelseTS Cars, inicio')}>
          <BrandLogo />
        </Link>
        <p>{t('El carácter se lleva dentro.')}<br />{t('El camino lo eliges tú.')}</p>
        <p>Madrid · Barcelona<br />San Sebastián · Málaga</p>
        <Link className="footer-credits" to="/creditos">{t('Fotografías y créditos')}</Link>
      </div>
      <FooterLinks title={t('Universo KelseTS')} links={universeLinks} />
      <FooterLinks title={t('Conecta')} links={socialLinks} />
      <div className="legal">
        <p>
          © 2026 {t('KelseTS es un proyecto ficticio creado por Araceli Fradejas Muñoz para el máster Rock The Code de')}{' '}
          <a href="https://thepower.education/thepowermba/tech" target="_blank" rel="noopener noreferrer">The Power Tech School</a>.
          {' '}{t('Esta web demuestra el desarrollo de una aplicación full stack para consultar vehículos y gestionar citas entre clientes, concesionarios y talleres, con soporte multilingüe. Tiene fines exclusivamente educativos y no representa un producto o servicio real.')}
        </p>
        <p>{t('Sin vinculación con los fabricantes. Las fotografías ilustran modelos, no unidades a la venta.')}</p>
      </div>
    </footer>
  );
}
