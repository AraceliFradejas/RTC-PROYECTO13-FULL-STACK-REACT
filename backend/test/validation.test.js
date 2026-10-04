import test from 'node:test';
import assert from 'node:assert/strict';
import { registration, appointmentInput } from '@kelsets-cars/contracts';
import { validateAppointmentDate } from '../src/utils/validation.js';
import { readDataset } from '../src/seeds/readDataset.js';
test('el registro rechaza roles enviados por el cliente', () => {
  assert.equal(registration.safeParse({ name: 'Araceli', email: 'a@example.com', password: 'contraseña-larga', role: 'admin' }).success, false);
});
test('una cita rechaza identificadores malformados', () => {
  assert.equal(appointmentInput.safeParse({ vehicle: 'otro', dealership: 'otro', date: '2026-10-05T10:00:00+02:00', service: 'Asesoramiento' }).success, false);
});
test('las citas respetan laborables y horas de Madrid en invierno y verano', () => {
  assert.equal(validateAppointmentDate('2026-10-05T08:00:00Z', new Date('2026-10-03T10:00:00Z')), true);
  assert.equal(validateAppointmentDate('2026-11-02T09:00:00Z', new Date('2026-10-03T10:00:00Z')), true);
  assert.equal(validateAppointmentDate('2026-10-04T08:00:00Z', new Date('2026-10-03T10:00:00Z')), false);
  assert.equal(validateAppointmentDate('2026-10-05T07:00:00Z', new Date('2026-10-03T10:00:00Z')), false);
  assert.equal(validateAppointmentDate('2026-10-05T08:30:00Z', new Date('2026-10-03T10:00:00Z')), false);
});
test('las citas rechazan pasado, fecha inválida y más de 90 días', () => {
  const now = new Date('2026-10-03T10:00:00Z');
  for (const date of ['2026-10-02T08:00:00Z', '2027-03-01T09:00:00Z', 'invalid']) assert.equal(validateAppointmentDate(date, now), false);
});
test('el CSV cumple conteo y relaciones sin conectar a Atlas', async () => {
  const { dealers, vehicles, workshops } = await readDataset();
  assert.equal(workshops.length, 4); assert.ok(workshops.every(value => dealers.some(dealer => dealer.seedKey === value.dealershipKey)));
  assert.ok(vehicles.length >= 100); assert.equal(dealers.length, 4);
  assert.equal(new Set(vehicles.map(value => value.seedKey)).size, vehicles.length);
  assert.ok(vehicles.every(value => dealers.some(dealer => dealer.seedKey === value.dealershipKey)));
});
test('las unidades añadidas conservan los datos no verificados como ausentes', async () => {
  const { vehicles } = await readDataset();
  const added = vehicles.filter(vehicle => vehicle.seedKey.startsWith('lux-'));
  assert.equal(added.length, 48);
  assert.equal(new Set(added.map(vehicle => `${vehicle.brand} ${vehicle.model}`)).size, 12);
  assert.ok(added.every(vehicle => vehicle.year === undefined && vehicle.mileage === undefined && vehicle.acquiredAt === undefined));
  assert.ok(added.every(vehicle => !vehicle.originalPrice && !vehicle.originalVin && vehicle.condition === 'Por completar'));
  assert.ok(added.every(vehicle => new URL(vehicle.sourceUrl).hostname !== 'docs.google.com'));
});
