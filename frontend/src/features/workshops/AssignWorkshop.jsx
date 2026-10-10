import { useLanguage } from '../../shared/i18n/LanguageProvider.jsx';
import { useState } from 'react';
import { api } from '../../shared/services/api.js';
export function AssignWorkshop({ appointment, workshops, onAssigned }) {
  const { t } = useLanguage();
  const [error, setError] = useState(''); const [busy, setBusy] = useState(false);
  const choices = workshops.filter(item => !item.dealership || item.dealership === appointment.dealership?._id);
  async function assign(event) {
    event.preventDefault(); setError(''); setBusy(true);
    try { await api.appointments.assignWorkshop(appointment._id, { workshop: new FormData(event.currentTarget).get('workshop') }); onAssigned(); }
    catch (error) { setError(error.message); } finally { setBusy(false); }
  }
  return <form onSubmit={assign} aria-busy={busy}><label>{t("Taller colaborador")}<select name="workshop" required defaultValue=""><option value="" disabled>{t("Selecciona un taller")}</option>{choices.map(item => <option key={item._id} value={item._id}>{item.name} · {item.city}</option>)}</select></label><button className="button button-outline" disabled={busy || !choices.length}>{busy ? t("Asignando…") : t("Asignar taller")}</button>{error && <p role="alert" className="form-error">{t(error)}</p>}</form>;
}
