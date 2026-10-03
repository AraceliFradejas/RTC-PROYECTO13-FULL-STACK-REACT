import { Reveal } from '../../../shared/components/Reveal.jsx';
const stories = [
  { image: 'ruta-clean', title: 'El destino puede esperar.', text: 'Hay caminos que merecen su propio capítulo.', alt: 'Carretera de montaña al atardecer, ilustración de marca' },
  { image: 'companeros-clean', title: 'Historias compartidas.', text: 'Tu estilo de vida también cuenta al elegir coche.', alt: 'Perro con arnés en el asiento trasero de un coche estacionado, escena conceptual' },
  { image: 'lifestyle-clean', title: 'Los pequeños detalles.', text: 'Una identidad que continúa más allá del volante.', alt: 'Gorra, taza y accesorios sin texto sobre una mesa, escena conceptual' },
];
export function StoriesSection() {
  return <Reveal as="section" id="historias" className="section stories-section"><div className="section-heading"><div><p className="eyebrow">EL UNIVERSO KelseTS</p><h2>Más que coches.<br /><em>Tu forma de vivir.</em></h2></div><p>Una mirada a lo que nos inspira.</p></div><div className="story-grid">{stories.map(item => <article key={item.image}><img src={`/images/editorial/${item.image}.png`} alt={item.alt} loading="lazy" decoding="async" /><h3>{item.title}</h3><p>{item.text}</p></article>)}</div><p className="small photo-note">Imágenes conceptuales de marca.</p></Reveal>;
}
