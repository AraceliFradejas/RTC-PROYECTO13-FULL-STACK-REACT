import test from 'node:test';
import assert from 'node:assert/strict';
import { createApiClient, ApiError } from '../src/index.js';
const success = data => new Response(JSON.stringify({ success: true, data }), { status: 200 });
test('serializa entradas y conserva signal y credenciales', async () => {
  const controller = new AbortController(); let call;
  const api = createApiClient({ baseUrl: '/api/v1/', fetchImpl: async (...args) => { call = args; return success({ id: '1' }); } });
  await api.request('/appointments', { method: 'POST', body: { service: 'Asesoramiento' }, signal: controller.signal });
  assert.equal(call[0], '/api/v1/appointments'); assert.equal(call[1].credentials, 'include');
  assert.equal(call[1].signal, controller.signal); assert.deepEqual(JSON.parse(call[1].body), { service: 'Asesoramiento' });
});
test('un error de permisos conserva mensaje y estado HTTP', async () => {
  const api = createApiClient({ baseUrl: '/api/v1', fetchImpl: async () => new Response(JSON.stringify({ success: false, error: 'Sin permiso' }), { status: 403 }) });
  await assert.rejects(api.auth.me(), error => error instanceof ApiError && error.status === 403 && error.message === 'Sin permiso');
});
test('una respuesta HTML no se presenta como éxito', async () => {
  const api = createApiClient({ baseUrl: '/api/v1', fetchImpl: async () => new Response('<html>Error</html>', { status: 502 }) });
  await assert.rejects(api.auth.me(), error => error.status === 502);
});
test('FormData se conserva sin fijar Content-Type ni boundary', async () => {
  const data = new FormData(); data.append('image', new Blob(['image']), 'foto.jpg'); let options;
  const api = createApiClient({ baseUrl: '/api/v1', fetchImpl: async (url, input) => { options = input; return success(null); } });
  await api.catalog.uploadImage('123', data);
  assert.equal(options.body, data); assert.equal(options.headers['Content-Type'], undefined);
});
test('la bandeja selecciona idioma y conserva la cancelación de la petición', async () => {
  const controller = new AbortController(); const calls = [];
  const api = createApiClient({ baseUrl: '/api/v1', fetchImpl: async (...args) => { calls.push(args); return success([]); } });
  await api.messages.list({ language: 'en', signal: controller.signal });
  await api.messages.list({ language: 'fr' });
  assert.equal(calls[0][0], '/api/v1/messages?language=en');
  assert.equal(calls[0][1].signal, controller.signal);
  assert.equal(calls[1][0], '/api/v1/messages?language=es');
});
