import test from 'node:test';
import assert from 'node:assert/strict';
import express from 'express';
import request from 'supertest';
import { cloudinaryImageUrl, createImageDelivery } from '../src/modules/catalog/controllers/imageDelivery.js';
import { errorHandler } from '../src/utils/errors.js';
import { VEHICLE_IMAGE_MAX_BYTES } from '@kelsets-cars/contracts';
const id = '507f1f77bcf86cd799439011';
function application(fetchImage, vehicle = { imagePublicId: 'kelsets-cars/photo' }) {
  const app = express();
  app.get('/vehicles/:id/image', createImageDelivery({ findVehicle: async () => vehicle, fetchImage, cloudName: () => 'demo' }));
  app.use(errorHandler); return app;
}
test('la entrega construye un destino Cloudinary fijo y rechaza identificadores externos', () => {
  assert.equal(cloudinaryImageUrl('kelsets-cars/photo', 'demo'), 'https://res.cloudinary.com/demo/image/upload/kelsets-cars/photo');
  for (const value of ['https://other.example/x', '../private', 'other/photo', 'kelsets-cars/../secret', 'kelsets-cars/photo?url=other']) assert.throws(() => cloudinaryImageUrl(value, 'demo'));
  assert.throws(() => cloudinaryImageUrl('kelsets-cars/photo', 'demo/other'));
});
test('sirve solo la fotografía guardada, con caché breve y sin aceptar URL del visitante', async () => {
  let call;
  const app = application(async (...args) => { call = args; return new Response(Buffer.from([1, 2, 3]), { headers: { 'content-type': 'image/jpeg' } }); });
  const response = await request(app).get(`/vehicles/${id}/image?url=https://other.example`);
  assert.equal(response.status, 200);
  assert.match(response.headers['content-type'], /image\/jpeg/);
  assert.equal(response.headers['cache-control'], 'public, max-age=300');
  assert.equal(call[0], 'https://res.cloudinary.com/demo/image/upload/kelsets-cars/photo');
  assert.equal(call[1].redirect, 'error');
  assert.ok(call[1].signal instanceof AbortSignal);
  assert.deepEqual(response.body, Buffer.from([1, 2, 3]));
});
test('no sirve HTML, respuestas fallidas, imágenes vacías o de tamaño excesivo', async () => {
  const responses = [new Response('<html>error</html>', { headers: { 'content-type': 'text/html' } }), new Response('error', { status: 404 }), new Response('', { headers: { 'content-type': 'image/jpeg' } }), new Response(Buffer.alloc(VEHICLE_IMAGE_MAX_BYTES + 1), { headers: { 'content-type': 'image/png' } })];
  for (const response of responses) assert.equal((await request(application(async () => response)).get(`/vehicles/${id}/image`)).status, 503);
  assert.equal((await request(application(async () => { throw new Error('network'); })).get(`/vehicles/${id}/image`)).status, 503);
  assert.equal((await request(application(() => assert.fail('No debe consultar Cloudinary'), null)).get(`/vehicles/${id}/image`)).status, 404);
});
