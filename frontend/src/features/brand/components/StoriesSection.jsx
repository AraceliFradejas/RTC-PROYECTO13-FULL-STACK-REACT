import { useLanguage } from '../../../shared/i18n/LanguageProvider.jsx';
import { Reveal } from '../../../shared/components/Reveal.jsx';
import { Link } from 'react-router-dom';
const stories = [
  { image: 'ruta-clean', to: '/experiencia#rutas', title: 'El destino puede esperar.', text: 'Hay caminos que merecen su propio capítulo.', alt: 'Carretera de montaña al atardecer, ilustración de marca' },
  { image: 'companeros-clean', to: '/experiencia#companeros', title: 'Historias compartidas.', text: 'Tu estilo de vida también cuenta al elegir coche.', alt: 'Perro con arnés en el asiento trasero de un coche estacionado, escena conceptual' },
  { image: 'lifestyle-clean', to: '/experiencia#detalles', title: 'Los pequeños detalles.', text: 'Una identidad que continúa más allá del volante.', alt: 'Gorra, taza y accesorios sin texto sobre una mesa, escena conceptual' },
];
export function StoriesSection() {
  const { t } = useLanguage();
  return <Reveal as="section" id="historias" className="section stories-section"><div className="section-heading"><div><p className="eyebrow">{t("EL UNIVERSO KelseTS")}</p><h2>{t("Más que coches.")}<br /><em>{t("Tu forma de vivir.")}</em></h2></div><p>{t("Una mirada a lo que nos inspira.")}</p></div><div className="story-grid">{stories.map(item => <article key={item.image}><Link className="story-link" to={item.to}><img src={`/images/editorial/${item.image}.png`} alt={t(item.alt)} loading="lazy" decoding="async" /><h3>{t(item.title)}</h3><p>{t(item.text)}</p><span className="text-link">{t("Descubrir nuestra esencia")} <span aria-hidden="true">↗</span></span></Link></article>)}</div><p className="small photo-note">{t("Imágenes conceptuales de marca.")}</p></Reveal>;
}
