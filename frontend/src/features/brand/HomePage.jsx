import { useLanguage } from '../../shared/i18n/LanguageProvider.jsx';
import { ProfessionalsSection } from './components/ProfessionalsSection.jsx';
import { EditorialPanel } from './components/EditorialPanel.jsx';
import { ServicesSection } from './components/ServicesSection.jsx';
import { StoriesSection } from './components/StoriesSection.jsx';
import { FaqSection } from './components/FaqSection.jsx';
import { Link } from 'react-router-dom';
import photos from '../../../../data/media/vehicles.json';
import { VehiclePhoto } from '../../shared/components/VehiclePhoto.jsx';
import { CinematicHero } from './CinematicHero.jsx';
import { Reveal } from '../../shared/components/Reveal.jsx';
const featured = ['porsche-taycan', 'ferrari-roma', 'mercedes-s-class', 'tesla-model-s'];
export function HomePage() {
  const { t } = useLanguage();
  return <>
    <CinematicHero />
    <Reveal as="section" id="seleccion" className="section collection-section cinematic-collection"><div className="section-heading"><div><p className="eyebrow">{t("LA SELECCIÓN KelseTS")}</p><h2>{t("Un carácter.")}<br />{t("Muchas formas de vivirlo.")}</h2></div><p>{t("Explora nuestra selección de modelos.")}</p></div><div className="editorial-grid">{featured.map(key => {
      const photo = photos.find(value => value.key === key);
      return <article className="editorial-card" key={key}><VehiclePhoto src={photo.src} alt={`${photo.brand} ${photo.model}, ${t('fotografía ilustrativa')}`} sizes="(max-width: 680px) 100vw, 50vw" /><div><p className="eyebrow">{photo.brand}</p><h3>{photo.model}</h3><span className="model-index" aria-hidden="true">0{featured.indexOf(key) + 1}</span><Link to={`/modelos/${key}`}>{t("Descubrir el modelo")} <span aria-hidden="true">↗</span></Link></div></article>;
    })}</div><p className="small photo-note">{t("Selección editorial. Fotografías de referencia; no indican disponibilidad de stock.")}</p></Reveal>
    <section className="brand-film"><VehiclePhoto src="/images/editorial/esencia-showroom-v1.png" alt={t("Concesionario conceptual con el logo exterior KelseTS Cars y un gran turismo rojo")} /><div className="brand-film-shade" /><Reveal className="brand-film-copy"><p className="eyebrow">{t("NUESTRA ESENCIA")}</p><h2>{t("No es solo")}<br />{t("llegar.")}<br /><em>{t("Es cómo lo vives.")}</em></h2><p>{t("Tu carácter. Tus decisiones. Tu próximo camino.")}</p><Link className="cinematic-cta" to="/experiencia">{t("Descubre KelseTS Cars")} <span aria-hidden="true">↗</span></Link></Reveal></section>
    <ServicesSection imagery="home" />
    <ProfessionalsSection />
    <EditorialPanel id="conduccion" eyebrow={t("LA EXPERIENCIA EMPIEZA AQUÍ")} title={<>{t("Al volante.")}<br />{t("A tu manera.")}</>} image="/images/editorial/volante-editorial-v1.png" alt={t("Conductora ficticia en un descapotable rojo junto al mar, escena conceptual")} to="/catalogo" action={t("Encontrar mi próximo coche")} reverse><p>{t("El diseño llama tu atención. Conocer el coche te ayuda a decidir. Descubre los modelos, consulta sus fichas y organiza una visita.")}</p></EditorialPanel>
    <EditorialPanel id="electrico" eyebrow={t("OTRA FORMA DE AVANZAR")} title={<>{t("Carácter eléctrico.")}<br />{t("La misma emoción.")}</>} image="/images/editorial/electrico-clean.png" alt={t("Coche eléctrico junto a un cargador, escena conceptual")} to="/catalogo?fuel=Eléctrico" action={t("Explorar los eléctricos")} dark><p>{t("La movilidad eléctrica tiene su lugar en nuestra selección. Consulta los datos de cada unidad y encuentra la propuesta que encaje contigo.")}</p></EditorialPanel>
    <StoriesSection />
    <section className="account-banner section"><div><p className="eyebrow">{t("TU ESPACIO KelseTS")}</p><h2>{t("Tu próxima visita.")}<br />{t("En tu propia agenda.")}</h2><p>{t("Accede para consultar tus citas y gestionar las solicitudes activas.")}</p></div><Link className="button button-light" to="/mi-cuenta">{t("Entrar en mi cuenta ↗")}</Link></section>
    <FaqSection />
    <Reveal as="section" className="section visit-section"><div><p className="eyebrow">{t("MÁS CERCA DE TI")}</p><h2>{t("El siguiente paso")}<br />{t("es encontrarnos.")}</h2></div><div><p>{t("Cuatro ciudades para el planteamiento de nuestra red: Madrid, Barcelona, San Sebastián y Málaga.")}</p><p className="small">{t("Sedes ficticias del proyecto académico.")}</p><Link className="text-link" to="/sedes">{t("Explorar las sedes")} <span aria-hidden="true">↗</span></Link></div></Reveal>
  </>;
}
