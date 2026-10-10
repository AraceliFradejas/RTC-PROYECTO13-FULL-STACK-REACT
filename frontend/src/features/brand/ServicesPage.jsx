import { useLanguage } from '../../shared/i18n/LanguageProvider.jsx';
import { Link } from 'react-router-dom';
import { ServicesSection } from './components/ServicesSection.jsx';
import { EditorialPanel } from './components/EditorialPanel.jsx';
import { FaqSection } from './components/FaqSection.jsx';
export function ServicesPage() {
  const { t } = useLanguage();
  return <><section className="catalog-hero services-hero">
    <div className="catalog-hero-copy">
      <p className="eyebrow">{t("SERVICIOS KelseTS")}</p>
      <h1>{t("Tu próximo paso.")}<br /><em>{t("Con tiempo para ti.")}</em></h1>
      <p>{t("Descubrir, preguntar y organizar una visita: un recorrido conectado con el vehículo que te interesa.")}</p>
      <a className="button" href="#servicios">{t("Descubrir los servicios ↓")}</a>
    </div>
    <figure>
      <img src="/images/editorial/servicios-hero-v1.png" alt={t("Pareja y asesora junto a un gran turismo blanco en un showroom conceptual con el logo KelseTS Cars")} fetchPriority="high" />
      <figcaption>{t("Escena conceptual KelseTS Cars")}</figcaption>
    </figure>
  </section><ServicesSection showLink={false} /><EditorialPanel eyebrow={t("ASESORAMIENTO PERSONALIZADO")} title={t("Primero, lo que tú necesitas.")} image="/images/editorial/consulta-servicios-v1.png" alt={t("Consulta personalizada con una asesora y una pareja ficticias en un salón privado")} to="/catalogo" action={t("Encontrar un vehículo")}><p>{t("Un buen asesoramiento empieza por escuchar. Explora la selección con calma, consulta las fichas y solicita una visita para conocer el vehículo que te interesa.")}</p></EditorialPanel><EditorialPanel eyebrow={t("TU VISITA, PASO A PASO")} title={t("Todo empieza por elegir.")} image="/images/editorial/entrega-clean.png" alt={t("Asesor entregando las llaves a una clienta junto a un automóvil burdeos en un showroom, escena conceptual")} to="/catalogo" action={t("Explorar el catálogo")} reverse><ol className="visit-steps"><li>{t("Consulta la ficha y la sede del vehículo.")}</li><li>{t("Accede a tu cuenta o regístrate.")}</li><li>{t("Elige el motivo, la fecha y una franja disponible.")}</li><li>{t("Consulta el resultado en tu área personal.")}</li></ol><p>{t("Las citas se solicitan de lunes a viernes, de 10:00 a 17:00, en horario de Madrid y dentro de los próximos 90 días.")}</p></EditorialPanel><EditorialPanel eyebrow={t("CUIDADO KelseTS")} title={t("Precisión en cada detalle.")} image="/images/editorial/revision-servicios-v1.png" alt={t("Técnico ficticio inspeccionando el motor de un gran turismo rojo en el taller")} to="/catalogo" action={t("Elegir vehículo para mi cita")} dark><p>{t("El mantenimiento merece la misma atención que la elección del coche. Un espacio ordenado, una revisión cuidadosa y tiempo para escuchar lo que necesitas.")}</p><p>{t("En este proyecto puedes seleccionar Mantenimiento como motivo de cita desde la ficha de un vehículo.")}</p></EditorialPanel><EditorialPanel eyebrow={t("LAS MANOS QUE CUIDAN")} title={t("Una mirada que se detiene.")} image="/images/editorial/profesional-clean.png" alt={t("Técnica ficticia inspeccionando una rueda en el taller")} to="/mi-cuenta" action={t("Consultar mis citas")} reverse><p>{t("La sofisticación también está en lo que apenas se ve: prestar atención, trabajar con precisión y cuidar los pequeños detalles.")}</p></EditorialPanel><FaqSection /><section className="section service-end"><h2>{t("Tu agenda.")}<br />{t("Tu siguiente camino.")}</h2><Link className="button" to="/mi-cuenta">{t("Ir a mi cuenta ↗")}</Link></section></>;
}
