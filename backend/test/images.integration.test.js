import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile, mkdir, writeFile } from 'node:fs/promises';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import request from 'supertest';
import { v2 as cloudinary } from 'cloudinary';
import app from '../src/app.js';
import { env } from '../src/config/env.js';
import { User } from '../src/modules/auth/models/User.js';
import { Vehicle } from '../src/modules/catalog/models/Vehicle.js';
import { Dealership } from '../src/modules/catalog/models/Dealership.js';

test('Cloudinary: permisos, validación, subida y sustitución en Atlas temporal', { skip: process.env.RUN_CLOUDINARY_TESTS !== 'true', timeout: 120000 }, async () => {
  const database = `kelsets_test_images_${Date.now()}`;
  const uploaded = new Set();
  const checks = [];
  let passed = false;
  await mongoose.connect(env.mongoUri, { dbName: database, serverSelectionTimeoutMS: 8000 });
  cloudinary.config({ cloud_name: process.env.CLOUDINARY_CLOUD_NAME, api_key: process.env.CLOUDINARY_API_KEY, api_secret: process.env.CLOUDINARY_API_SECRET });
  try {
    const dealer = await Dealership.create({ seedKey: 'photo-test', name: 'Sede temporal', city: 'Madrid' });
    const vehicle = await Vehicle.create({ seedKey: 'photo-test', brand: 'Porsche', model: '911 Carrera', bodyType: 'Coupé', fuel: 'Gasolina', sourceUrl: 'https://www.porsche.com/spain/', dealership: dealer._id });
    const users = await User.create(['admin', 'client', 'workshop', 'staff'].map(role => ({ name: 'Cuenta temporal', email: `${role}@photos.kelsets.example`, password: 'unused-hash', role })));
    const cookie = role => `session=${jwt.sign({ sub: String(users.find(user => user.role === role)._id) }, env.jwtSecret, { algorithm: 'HS256', expiresIn: '5m' })}`;
    const post = role => { const call = request(app).post(`/api/v1/vehicles/${vehicle._id}/image`).set('Origin', env.origins[0]); return role ? call.set('Cookie', cookie(role)) : call; };
    for (const [role, expected] of [[null, 401], ['client', 403], ['workshop', 403], ['staff', 403]]) {
      assert.equal((await post(role)).status, expected); checks.push({ case: role || 'anonymous', status: expected });
    }
    assert.equal((await post('admin')).status, 400); checks.push({ case: 'missing-file', status: 400 });
    assert.equal((await post('admin').attach('image', Buffer.from('fake image'), { filename: 'fake.jpg', contentType: 'image/jpeg' })).status, 400); checks.push({ case: 'fake-image', status: 400 });
    assert.equal((await post('admin').attach('image', Buffer.alloc(5 * 1024 * 1024 + 1), { filename: 'large.jpg', contentType: 'image/jpeg' })).status, 413); checks.push({ case: 'over-5MB', status: 413 });
    assert.equal((await post('admin').attach('wrong', Buffer.from('x'), { filename: 'photo.jpg', contentType: 'image/jpeg' })).status, 400); checks.push({ case: 'wrong-field', status: 400 });
    const photo = await readFile(new URL('../../frontend/public/images/vehicles/collection-porsche-911-carrera-1.jpg', import.meta.url));
    let previous;
    for (let index = 0; index < 2; index++) {
      const response = await post('admin').attach('image', photo, { filename: 'porsche-reference.jpg', contentType: 'image/jpeg' });
      assert.equal(response.status, 200);
      const { image, imagePublicId } = response.body.data;
      uploaded.add(imagePublicId);
      assert.ok(image.startsWith('https://res.cloudinary.com/'));
      assert.ok(imagePublicId.startsWith('kelsets-cars/'));
      const saved = await Vehicle.findById(vehicle._id);
      assert.equal(saved.image, image); assert.equal(saved.imagePublicId, imagePublicId);
      const publicResponse = await request(app).get(`/api/v1/vehicles/${vehicle._id}`);
      assert.equal(publicResponse.body.data.image, image);
      assert.equal((await fetch(image)).status, 200);
      if (previous) {
        assert.notEqual(previous, imagePublicId);
        await assert.rejects(cloudinary.api.resource(previous), error => (error.http_code || error.error?.http_code) === 404);
      }
      checks.push({ case: index ? 'replace-and-delete-previous' : 'upload-save-public-read', status: 200 });
      previous = imagePublicId;
    }
    passed = true;
  } finally {
    const cleanup = await Promise.allSettled([...uploaded].map(id => cloudinary.uploader.destroy(id, { invalidate: true })));
    await mongoose.connection.dropDatabase(); await mongoose.disconnect();
    assert.ok(cleanup.every(item => item.status === 'fulfilled'), 'No se ha completado la limpieza de Cloudinary');
    if (passed && process.env.SAVE_CLOUDINARY_EVIDENCE === 'true') {
      const directory = new URL('../../docs/evidencias/cloudinary/', import.meta.url);
      await mkdir(directory, { recursive: true });
      await writeFile(new URL('verificacion.json', directory), JSON.stringify({ checkedAt: new Date().toISOString(), scope: 'API HTTP multipart con Supertest, Atlas temporal y Cloudinary real; no prueba del navegador', checks, temporaryDatabaseDeleted: true, temporaryImagesDeleted: true }, null, 2) + '\n');
    }
  }
});
