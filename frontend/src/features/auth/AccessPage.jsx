import { AccessForm } from './AccessForm.jsx';
import { PrivateHero } from './PrivateHero.jsx';
export function AccessPage() {
  return <div className="access-page">
    <PrivateHero eyebrow="TU ESPACIO KelseTS" title={<>Cada detalle.<br /><em>También aquí.</em></>} description="Tus visitas, el cuidado de tu coche y las personas que lo hacen posible." action />
    <section className="access-content" id="acceso" aria-labelledby="access-form-title"><AccessForm /><p className="small access-demo-note">Las comunicaciones de esta demostración aparecen en tu cuenta. No enviamos correos.</p></section>
  </div>;
}
