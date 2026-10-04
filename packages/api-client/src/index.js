export class ApiError extends Error {
  constructor(message, status) { super(message); this.name = 'ApiError'; this.status = status; }
}
// No depende de React, del DOM ni del almacenamiento del navegador.
export function createApiClient({ baseUrl, fetchImpl = globalThis.fetch, getHeaders = () => ({}) }) {
  async function request(path, { body, method = 'GET', signal, multipart = false } = {}) {
    const response = await fetchImpl(`${baseUrl.replace(/\/$/, '')}${path}`, {
      method, signal, credentials: 'include',
      headers: { ...(!multipart && body !== undefined ? { 'Content-Type': 'application/json' } : {}), ...await getHeaders() },
      body: body === undefined ? undefined : multipart ? body : JSON.stringify(body),
    });
    let payload;
    try { payload = await response.json(); }
    catch { throw new ApiError('El servidor ha devuelto una respuesta no válida.', response.status); }
    if (!response.ok || !payload.success) throw new ApiError(payload.error || 'No se ha podido completar la petición.', response.status);
    return payload.data;
  }
  return {
    request,
    auth: {
      me: options => request('/auth/me', options),
      login: body => request('/auth/login', { method: 'POST', body }),
      register: body => request('/auth/register', { method: 'POST', body }),
      logout: () => request('/auth/logout', { method: 'POST' }),
    },
    catalog: {
      list: (query = '', options) => request(`/vehicles${query ? `?${query}` : ''}`, options),
      detail: (id, options) => request(`/vehicles/${encodeURIComponent(id)}`, options),
      dealerships: options => request('/dealerships', options),
    },
    appointments: {
      list: options => request('/appointments', options),
      create: body => request('/appointments', { method: 'POST', body }),
      update: (id, body) => request(`/appointments/${encodeURIComponent(id)}`, { method: 'PATCH', body }),
      assignWorkshop: (id, body) => request(`/appointments/${encodeURIComponent(id)}/workshop`, { method: 'POST', body }),
    },
    messages: { list: options => request('/messages', options) },
    workshops: {
      list: options => request('/workshops', options),
      assignable: options => request('/workshops/assignable', options),
      me: options => request('/workshops/me', options),
      jobs: options => request('/workshops/jobs', options),
      applications: options => request('/workshops/applications', options),
      review: (id, body) => request(`/workshops/${encodeURIComponent(id)}/review`, { method: 'PATCH', body }),
    },
  };
}
