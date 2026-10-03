import { Link } from 'react-router-dom';
import { Reveal } from '../../../shared/components/Reveal.jsx';

export function EditorialPanel({ id, eyebrow, title, image, alt, children, to, action, dark = false, reverse = false }) {
  return <section id={id} tabIndex={id ? -1 : undefined} className={`editorial-panel ${dark ? 'editorial-panel-dark' : ''} ${reverse ? 'editorial-panel-reverse' : ''}`}>
    <Reveal className="editorial-panel-copy"><p className="eyebrow">{eyebrow}</p><h2>{title}</h2>{children}<Link className={`button ${dark ? 'button-light' : 'button-outline'}`} to={to}>{action}<span aria-hidden="true">↗</span></Link></Reveal>
    <figure className="editorial-panel-image"><img src={image} alt={alt} loading="lazy" decoding="async" /><figcaption>Escena conceptual KelseTS Cars</figcaption></figure>
  </section>;
}
