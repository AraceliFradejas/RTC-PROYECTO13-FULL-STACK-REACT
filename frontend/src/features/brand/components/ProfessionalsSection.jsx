import { Link } from 'react-router-dom';
import { Reveal } from '../../../shared/components/Reveal.jsx';
const values = [
  { image: 'asesora-equipo-v1', title: 'Escuchar antes de proponer.', text: 'La sofisticación empieza en el trato: entender qué buscas y darte espacio para decidir.', alt: 'Retrato de una asesora ficticia junto a un coupé blanco en el showroom', to: '/servicios', action: 'Conocer el asesoramiento' },
  { image: 'entrega-clean', title: 'El comienzo de algo tuyo.', text: 'Cercanía, atención y la ilusión de empezar un nuevo camino.', alt: 'Asesor ficticio entregando una llave a una clienta en un showroom', to: '/experiencia', action: 'Descubrir nuestra esencia' },
  { image: 'taller-equipo-v1', title: 'Un espacio para el cuidado.', text: 'Orden, precisión y atención al vehículo: los valores que definen nuestra visión del taller.', alt: 'Profesionales ficticios trabajando en un taller de vehículos de lujo', to: '/servicios', action: 'Conocer el mantenimiento' },
  { image: 'profesional-clean', title: 'Cuidar cada detalle.', text: 'Una mirada atenta, precisión y respeto por lo que te mueve. Así imaginamos el cuidado KelseTS.', alt: 'Profesional ficticia inspeccionando la rueda de un coche en un taller', to: '/servicios', action: 'Descubrir el cuidado KelseTS' },
];
export function ProfessionalsSection() {
  return <Reveal as="section" className="section professionals-section"><div className="section-heading"><div><p className="eyebrow">LAS PERSONAS MARCAN LA DIFERENCIA</p><h2>La elegancia también<br />está en el cuidado.</h2></div><Link className="text-link" to="/servicios">Descubrir los servicios ↗</Link></div><div className="professional-grid">{values.map(item => <article key={item.image}><img src={`/images/editorial/${item.image}.png`} alt={item.alt} loading="lazy" decoding="async" /><h3>{item.title}</h3><p>{item.text}</p><Link className="text-link" to={item.to}>{item.action} <span aria-hidden="true">↗</span></Link></article>)}</div><p className="small photo-note">Escenas conceptuales de la atención y el cuidado KelseTS Cars.</p></Reveal>;
}
