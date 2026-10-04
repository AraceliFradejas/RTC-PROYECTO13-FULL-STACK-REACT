import { Link } from 'react-router-dom';
import { ServicesSection } from './components/ServicesSection.jsx';
import { EditorialPanel } from './components/EditorialPanel.jsx';
import { FaqSection } from './components/FaqSection.jsx';
export function ServicesPage() {
  return <><section className="catalog-hero services-hero">
    <div className="catalog-hero-copy">
      <p className="eyebrow">SERVICIOS KelseTS</p>
      <h1>Tu próximo paso.<br /><em>Con tiempo para ti.</em></h1>
      <p>Descubrir, preguntar y organizar una visita: un recorrido conectado con el vehículo que te interesa.</p>
      <a className="button" href="#servicios">Descubrir los servicios ↓</a>
    </div>
    <figure>
      <img src="/images/editorial/servicios-hero-v1.png" alt="Pareja y asesora junto a un gran turismo blanco en un showroom conceptual con el logo KelseTS Cars" fetchPriority="high" />
      <figcaption>Escena conceptual KelseTS Cars</figcaption>
    </figure>
  </section><ServicesSection showLink={false} /><EditorialPanel eyebrow="ASESORAMIENTO PERSONALIZADO" title="Primero, lo que tú necesitas." image="/images/editorial/consulta-servicios-v1.png" alt="Consulta personalizada con una asesora y una pareja ficticias en un salón privado" to="/catalogo" action="Encontrar un vehículo"><p>Un buen asesoramiento empieza por escuchar. Explora la selección con calma, consulta las fichas y solicita una visita para conocer el vehículo que te interesa.</p></EditorialPanel><EditorialPanel eyebrow="TU VISITA, PASO A PASO" title="Todo empieza por elegir." image="/images/editorial/entrega-clean.png" alt="Asesor entregando las llaves a una clienta junto a un automóvil burdeos en un showroom, escena conceptual" to="/catalogo" action="Explorar el catálogo" reverse><ol className="visit-steps"><li>Consulta la ficha y la sede del vehículo.</li><li>Accede a tu cuenta o regístrate.</li><li>Elige el motivo, la fecha y una franja disponible.</li><li>Consulta el resultado en tu área personal.</li></ol><p>Las citas se solicitan de lunes a viernes, de 10:00 a 17:00, en horario de Madrid y dentro de los próximos 90 días.</p></EditorialPanel><EditorialPanel eyebrow="CUIDADO KelseTS" title="Precisión en cada detalle." image="/images/editorial/revision-servicios-v1.png" alt="Técnico ficticio inspeccionando el motor de un gran turismo rojo en el taller" to="/catalogo" action="Elegir vehículo para mi cita" dark><p>El mantenimiento merece la misma atención que la elección del coche. Un espacio ordenado, una revisión cuidadosa y tiempo para escuchar lo que necesitas.</p><p>En este proyecto puedes seleccionar Mantenimiento como motivo de cita desde la ficha de un vehículo.</p></EditorialPanel><EditorialPanel eyebrow="LAS MANOS QUE CUIDAN" title="Una mirada que se detiene." image="/images/editorial/profesional-clean.png" alt="Técnica ficticia inspeccionando una rueda en el taller" to="/mi-cuenta" action="Consultar mis citas" reverse><p>La sofisticación también está en lo que apenas se ve: prestar atención, trabajar con precisión y cuidar los pequeños detalles.</p></EditorialPanel><FaqSection /><section className="section service-end"><h2>Tu agenda.<br />Tu siguiente camino.</h2><Link className="button" to="/mi-cuenta">Ir a mi cuenta ↗</Link></section></>;
}
