import { useLanguage } from '../../../shared/i18n/LanguageProvider.jsx';
const questions = [
  ['¿Cómo solicito una cita?', 'Entra en el catálogo, abre la ficha de un vehículo y selecciona solicitar cita. Necesitas una cuenta para elegir el motivo, la fecha y la hora.'],
  ['¿Qué motivos puedo elegir?', 'Prueba de conducción, asesoramiento o mantenimiento. La cita queda vinculada al vehículo y a su sede.'],
  ['¿Puedo consultar y cancelar mis citas?', 'Sí. En Mi cuenta puedes consultar tus citas y cancelar las que sigan activas.'],
  ['¿Las imágenes representan unidades disponibles?', 'Las fotografías reales ilustran modelos. Las escenas de marca son conceptuales. La disponibilidad de cada unidad se consulta en su ficha del catálogo.'],
  ['¿Es un concesionario real?', 'KelseTS Cars es una marca ficticia creada para este proyecto académico. Las sedes y las solicitudes forman parte de la demostración; no se realiza una compraventa real.'],
];
export function FaqSection() {
  const { t } = useLanguage();
  return <section id="preguntas" className="section faq-section"><div><p className="eyebrow">{t("ANTES DE EMPEZAR")}</p><h2>{t("Las cosas claras.")}<br />{t("Desde el principio.")}</h2></div><div>{questions.map(([question, answer]) => <details key={question}><summary>{t(question)}<span aria-hidden="true">+</span></summary><p>{t(answer)}</p></details>)}</div></section>;
}
