export function ResourceState({ resource, children }) {
  if (resource.status === 'loading') return <p className="notice" role="status">Cargando…</p>;
  if (resource.status === 'error') return <div className="notice"><p role="alert">{resource.error.message || 'No se ha podido cargar el contenido.'}</p><button className="button" onClick={resource.retry}>Volver a intentar</button></div>;
  return children(resource.data);
}
