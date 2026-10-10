import { useEffect, useId, useRef, useState } from 'react';
import { api } from '../../shared/services/api.js';
import { VEHICLE_IMAGE_MAX_BYTES } from '@kelsets-cars/contracts';

export function VehicleImageUpload({ vehicle, onUploaded }) {
  const inputId = useId();
  const input = useRef(null);
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState('');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  useEffect(() => {
    if (!file) { setPreview(''); return; }
    const url = URL.createObjectURL(file);
    setPreview(url);
    return () => URL.revokeObjectURL(url);
  }, [file]);
  function clear() { setFile(null); if (input.current) input.current.value = ''; }
  function select(event) {
    const selected = event.target.files?.[0];
    setError(''); setSuccess(''); setFile(null);
    if (!selected) return;
    if (!['image/jpeg', 'image/png', 'image/webp'].includes(selected.type)) {
      setError('Elige una fotografía JPEG, PNG o WebP.'); event.target.value = ''; return;
    }
    if (!selected.size || selected.size > VEHICLE_IMAGE_MAX_BYTES) {
      setError('La fotografía debe tener contenido y ocupar como máximo 4 MB.'); event.target.value = ''; return;
    }
    setFile(selected);
  }
  async function submit(event) {
    event.preventDefault();
    if (!file || busy) return;
    setBusy(true); setError(''); setSuccess('');
    try {
      const data = new FormData(); data.append('image', file);
      const updated = await api.catalog.uploadImage(vehicle._id, data);
      clear(); setSuccess('Fotografía guardada. Ya puedes verla en la ficha y en el catálogo.');
      onUploaded(updated);
    } catch (error) { setError(error.message); }
    finally { setBusy(false); }
  }
  return <section className="vehicle-image-upload" aria-labelledby={`${inputId}-title`}>
    <div><p className="eyebrow">KelseTS CARS TEAM · FOTOGRAFÍA</p>
      <h2 id={`${inputId}-title`}>Cuida la primera impresión.</h2>
      <p>Actualiza la fotografía de {vehicle.brand} {vehicle.model} en {vehicle.dealership?.city}. La nueva imagen sustituirá a la actual de esta unidad.</p>
      <p className="small" id={`${inputId}-help`}>JPEG, PNG o WebP · máximo 4 MB. Utiliza una fotografía propia o con permiso de publicación. Si procede de nuestra biblioteca, conserva su atribución en los créditos.</p>
    </div>
    <form onSubmit={submit} aria-busy={busy}>
      <label htmlFor={inputId}>Seleccionar fotografía<input ref={input} id={inputId} type="file" accept="image/jpeg,image/png,image/webp" onChange={select} disabled={busy} aria-describedby={`${inputId}-help`} /></label>
      {preview && <figure className="upload-preview"><img src={preview} alt={`Vista previa de la nueva fotografía de ${vehicle.brand} ${vehicle.model}`} onError={() => { clear(); setError('No se puede leer esta imagen. Elige otra fotografía.'); }} /><figcaption>{file?.name} · {(file?.size / 1024 / 1024).toFixed(2)} MB</figcaption></figure>}
      {error && <p className="form-error" role="alert">{error}</p>}
      <p role="status">{busy ? 'Guardando la fotografía…' : success}</p>
      <div className="upload-actions"><button className="button" disabled={!file || busy} type="submit">{busy ? 'Guardando…' : 'Guardar fotografía'}</button>{file && <button className="button button-outline" disabled={busy} type="button" onClick={clear}>Descartar selección</button>}</div>
    </form>
  </section>;
}
