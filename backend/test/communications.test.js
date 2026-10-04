import test from 'node:test';
import assert from 'node:assert/strict';
import { accountRegistration, workshopDecision } from '@kelsets-cars/contracts';
import { messageTemplate } from '../src/modules/communications/templates.js';
import { renderEmail } from '../src/modules/communications/renderEmail.js';
const input = { accountType: 'workshop', name: 'Alex', email: 'alex@example.com', password: 'contraseña-demo', workshopName: 'Taller Demo', city: 'Madrid', address: 'Calle de Prueba 10', phone: '+34 600 000 000', specialties: ['Mecánica'] };
test('el taller necesita especialidad y no puede asignarse permisos', () => {
  assert.equal(accountRegistration.safeParse(input).success, true);
  for (const extra of [{ role: 'admin' }, { status: 'approved' }, { specialties: [] }, { specialties: ['Otra'] }]) assert.equal(accountRegistration.safeParse({ ...input, ...extra }).success, false);
  assert.equal(workshopDecision.safeParse({ status: 'rejected' }).success, false);
});
test('los mensajes diferencian solicitud pendiente, aprobación y cancelación', () => {
  assert.match(messageTemplate('workshop.received', input).text, /no tendrá acceso/);
  assert.match(messageTemplate('workshop.approved', input).text, /siguiente fase/);
  const pending = messageTemplate('appointment.pending', { ...input, date: '2026-10-06T08:00:00Z' });
  assert.match(pending.text, /todavía debe confirmar/);
  assert.match(pending.text, /10:00/);
});
test('el HTML escapa contenido personal y rechaza destinos externos', () => {
  const message = messageTemplate('client.welcome', { name: '<script>alert(1)</script>' });
  assert.ok(!renderEmail(message).includes('<script>'));
  assert.match(renderEmail(message), /&lt;script&gt;/);
  assert.throws(() => renderEmail({ ...message, actionPath: '//evil.example' }));
});

test('las muestras Sandbox identifican la prueba y enlazan a la web configurada', () => {
  const message = messageTemplate('client.welcome', { name: 'Alex Demo' });
  const html = renderEmail(message, { sandbox: true, webUrl: 'https://kelsets.example' });
  assert.match(html, /MAILTRAP SANDBOX/);
  assert.match(html, /href="https:\/\/kelsets.example\/catalogo"/);
  assert.throws(() => renderEmail(message, { webUrl: 'javascript:alert(1)' }));
  assert.throws(() => renderEmail(message, { webUrl: 'https://token@kelsets.example' }));
});

test('las diez muestras tienen contenido completo y las asignaciones incluyen fecha', async () => {
  const { sampleTypes, sampleData } = await import('../src/modules/communications/samples.js');
  for (const type of sampleTypes) {
    const message = messageTemplate(type, sampleData);
    assert.doesNotMatch(message.text, /undefined|Invalid Date/);
    assert.ok(message.subject && message.actionLabel);
    if (['appointment.assigned', 'workshop.assignment'].includes(type)) {
      assert.match(message.text, /10:00/);
      assert.match(message.text, /hora de Madrid/);
    }
  }
});
