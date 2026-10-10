import { useLanguage } from '../../../shared/i18n/LanguageProvider.jsx';
import { Link } from 'react-router-dom';
import { Reveal } from '../../../shared/components/Reveal.jsx';
const services = [
  {
    number: '01',
    title: 'Prueba de conducción',
    image: 'conduccion-clean.png',
    alt: 'Escena conceptual de conducción de un coche de lujo por la costa',
    text: 'Primero descubre el modelo. Después, elige una unidad y solicita una cita en su sede.',
  },
  {
    number: '02',
    title: 'Asesoramiento',
    image: 'asesoramiento-clean.png',
    alt: 'Asesora y clientes ficticios conversando en un showroom de lujo',
    text: 'Compara las propuestas del catálogo y organiza una visita centrada en lo que buscas.',
  },
  {
    number: '03',
    title: 'Mantenimiento',
    image: 'taller-clean.png',
    alt: 'Taller conceptual de lujo con profesionales y vehículos en revisión',
    text: 'El cuidado también forma parte del camino. Selecciona este motivo al solicitar tu cita.',
  },
];
const homeImages = [
  {
    image: 'prueba-portada-v1.png',
    alt: 'Pareja ficticia junto a un descapotable blanco frente al mar',
  },
  {
    image: 'asesoramiento-portada-v1.png',
    alt: 'Asesor ficticio mostrando un gran turismo rojo a una clienta',
  },
  {
    image: 'mantenimiento-portada-v1.png',
    alt: 'Detalle conceptual del cuidado del faro de un coupé blanco',
  },
];
export function ServicesSection({ showLink = true, imagery = 'services' }) {
  const { t } = useLanguage();
  const items = services.map((item, index) =>
    imagery === 'home' ? { ...item, ...homeImages[index] } : item,
  );
  return (
    <Reveal as="section" id="servicios" className="section services-section">
      <div className="section-heading">
        <div>
          <p className="eyebrow">{t('A TU LADO')}</p>
          <h2>
            {t('Cada paso')}
            <br />
            {t('merece su tiempo.')}
          </h2>
        </div>
        {showLink && (
          <Link className="text-link" to="/servicios">
            {t('Conocer los servicios ↗')}
          </Link>
        )}
      </div>
      <div className="service-grid">
        {items.map((item) => (
          <article key={item.number}>
            <img
              className="service-image"
              src={`/images/editorial/${item.image}`}
              alt={t(item.alt)}
              loading="lazy"
              decoding="async"
              width="1536"
              height="1024"
            />
            <span className="service-number">{item.number}</span>
            <h3>{t(item.title)}</h3>
            <p>{t(item.text)}</p>
            <Link to="/catalogo" aria-label={`${t('Elegir vehículo')}: ${t(item.title)}`}>
              {t('Elegir vehículo')} <span aria-hidden="true">↗</span>
            </Link>
          </article>
        ))}
      </div>
    </Reveal>
  );
}
