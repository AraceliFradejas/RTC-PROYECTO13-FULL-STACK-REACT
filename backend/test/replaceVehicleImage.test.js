import test from 'node:test';
import assert from 'node:assert/strict';
import { replaceVehicleImage } from '../src/modules/catalog/services/replaceVehicleImage.js';

const uploaded = { secure_url: 'https://example.invalid/new.jpg', public_id: 'kelsets-cars/new' };

function fixture(save) {
  return { image: 'https://example.invalid/old.jpg', imagePublicId: 'kelsets-cars/old', save };
}

test('guarda la nueva fotografía antes de retirar la anterior', async () => {
  const events = [];
  const vehicle = fixture(async () => events.push('save'));
  await replaceVehicleImage(vehicle, uploaded, async (id) => events.push(id));
  assert.deepEqual(events, ['save', 'kelsets-cars/old']);
  assert.equal(vehicle.imagePublicId, uploaded.public_id);
});

test('si falla el guardado conserva la referencia anterior y limpia la subida', async () => {
  const failure = new Error('Atlas no disponible');
  const deleted = [];
  const vehicle = fixture(async () => {
    throw failure;
  });
  await assert.rejects(
    replaceVehicleImage(vehicle, uploaded, async (id) => deleted.push(id)),
    (error) => error === failure,
  );
  assert.deepEqual(deleted, ['kelsets-cars/new']);
  assert.equal(vehicle.imagePublicId, 'kelsets-cars/old');
  assert.equal(vehicle.image, 'https://example.invalid/old.jpg');
});

test('no borra imágenes anteriores ajenas a la carpeta de la aplicación', async () => {
  const deleted = [];
  const vehicle = fixture(async () => {});
  vehicle.imagePublicId = 'another-project/old';
  await replaceVehicleImage(vehicle, uploaded, async (id) => deleted.push(id));
  assert.deepEqual(deleted, []);
});

test('un fallo al retirar la imagen anterior no revierte la ficha ya guardada', async () => {
  const vehicle = fixture(async () => {});
  const originalWarn = console.warn;
  const warnings = [];
  console.warn = (message) => warnings.push(message);
  try {
    await replaceVehicleImage(vehicle, uploaded, async () => {
      throw new Error('Cloudinary no disponible');
    });
    assert.equal(vehicle.imagePublicId, uploaded.public_id);
    assert.equal(warnings.length, 1);
  } finally {
    console.warn = originalWarn;
  }
});
