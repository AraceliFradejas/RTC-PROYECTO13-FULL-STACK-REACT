import test from 'node:test';
import assert from 'node:assert/strict';
import { accountRegistration, workshopDecision } from '@kelsets-cars/contracts';
import { messageTemplate } from '../src/modules/communications/templates.js';
import { renderEmail } from '../src/modules/communications/renderEmail.js';
import { localizeMessage } from '../src/modules/communications/localizeMessage.js';
import { sampleTypes, sampleData } from '../src/modules/communications/samples.js';
import { emailIdentity } from '../src/modules/communications/emailBrand.js';

test('las diez comunicaciones inglesas conservan destinos, datos personales y hora de Madrid', () => {
  for (const type of sampleTypes) {
    const original = messageTemplate(type, sampleData);
    const english = messageTemplate(type, sampleData, { language: 'en' });
    assert.equal(english.actionPath, original.actionPath);
    assert.match(english.text, /Alex Demo/);
    assert.doesNotMatch(english.text, /undefined|Invalid Date/);
    if (type.includes('appointment') || type === 'workshop.assignment') assert.match(english.text, /10:00/);
    if (type === 'workshop.rejected') assert.ok(english.text.includes(sampleData.reason));
    assert.equal(emailIdentity(type, 'en').image, emailIdentity(type).image);
    const html = renderEmail(english);
    assert.match(html, /lang="en"/);
    assert.match(html, /logo-email.png/);
    assert.match(html, /Our essence/);
  }
});
test('las plantillas históricas reconocidas se traducen sin modificar su documento', () => {
  for (const type of sampleTypes) {
    const message = { ...messageTemplate(type, sampleData), _id: 'historic', createdAt: '2026-10-06', html: 'historic HTML' };
    const before = structuredClone(message);
    const translated = localizeMessage(message, 'en');
    assert.equal(translated.language, 'en', type);
    assert.equal(translated._id, message._id);
    assert.equal(translated.createdAt, message.createdAt);
    assert.deepEqual(message, before);
    assert.equal(localizeMessage(message, 'es').text, message.text);
    for (const altered of [{ text: message.text + '\nOtra información' }, { actionPath: '/otro-destino' }, { subject: 'Otra comunicación' }]) {
      assert.equal(localizeMessage({ ...message, ...altered }, 'en').language, 'es');
    }
  }
});
test('las comunicaciones nuevas usan la traducción histórica guardada y no la exponen como metadatos', () => {
  const message = { ...messageTemplate('client.welcome', sampleData), translations: { en: { subject: 'Historic subject', text: 'Historic name', html: 'Historic HTML', actionLabel: 'Explore' } } };
  const english = localizeMessage(message, 'en');
  assert.equal(english.text, 'Historic name');
  assert.equal(english.translations, undefined);
  assert.equal(localizeMessage(message, 'fr').language, 'es');
  assert.equal(localizeMessage(message, 'es').translations, undefined);
});
test('una fecha histórica inválida o una asignación ambigua conserva el castellano', () => {
  const message = messageTemplate('appointment.assigned', sampleData);
  assert.equal(localizeMessage({ ...message, text: message.text.replace(/6 de octubre de 2026/, '31 de febrero de 2026') }, 'en').language, 'es');
  const ambiguous = messageTemplate('appointment.assigned', { ...sampleData, vehicle: 'Modelo a medida' });
  assert.equal(localizeMessage(ambiguous, 'en').language, 'es');
  assert.equal(localizeMessage({ type: 'unknown', text: 'Hola, Alex.\n\nOtro mensaje' }, 'en').language, 'es');
});
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
