import { Link } from 'react-router-dom';
import { Reveal } from '../../../shared/components/Reveal.jsx';
const services = [
  { number: '01', title: 'Prueba de conducción', text: 'Primero descubre el modelo. Después, elige una unidad y solicita una cita en su sede.' },
  { number: '02', title: 'Asesoramiento', text: 'Compara las propuestas del catálogo y organiza una visita centrada en lo que buscas.' },
  { number: '03', title: 'Mantenimiento', text: 'El cuidado también forma parte del camino. Selecciona este motivo al solicitar tu cita.' },
];
export function ServicesSection({ showLink = true }) {
  return <Reveal as="section" id="servicios" className="section services-section"><div className="section-heading"><div><p className="eyebrow">A TU LADO</p><h2>Cada paso<br />merece su tiempo.</h2></div>{showLink && <Link className="text-link" to="/servicios">Conocer los servicios ↗</Link>}</div><div className="service-grid">{services.map(item => <article key={item.number}><span className="service-number">{item.number}</span><h3>{item.title}</h3><p>{item.text}</p><Link to="/catalogo">Elegir vehículo <span aria-hidden="true">↗</span></Link></article>)}</div></Reveal>;
}
