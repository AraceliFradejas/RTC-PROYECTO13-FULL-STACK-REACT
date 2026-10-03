import test from 'node:test';
import assert from 'node:assert/strict';
import request from 'supertest';
import app from '../src/app.js';
test('salud publica versión sin necesitar Atlas', async () => {
  const response = await request(app).get('/api/v1/health');
  assert.equal(response.status, 200); assert.equal(response.body.data.version, 'v1');
});
test('se rechaza escritura sin Origin antes de acceder a la base de datos', async () => {
  const response = await request(app).post('/api/v1/auth/register').send({ role: 'admin' });
  assert.equal(response.status, 403);
});
test('se rechaza escritura desde un origen ajeno', async () => {
  const response = await request(app).post('/api/v1/auth/logout').set('Origin', 'https://otro.example');
  assert.equal(response.status, 403);
});
