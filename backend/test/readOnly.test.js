import test from 'node:test';
import assert from 'node:assert/strict';
import jwt from 'jsonwebtoken';
import { authenticate } from '../src/middlewares/auth.js';
import { env } from '../src/config/env.js';
import { User, publicUser } from '../src/modules/auth/models/User.js';
import { demoAccountFilter } from '../src/utils/demoScope.js';
import { checkReadOnlyAccess } from '../src/middlewares/readOnly.js';

for (const role of ['client', 'workshop', 'admin']) {
  test(`la sesión DEMO ${role} permite consultas y rechaza escrituras`, async (t) => {
    const previousSecret = env.jwtSecret;
    env.jwtSecret = 'test-readonly-session-secret-32-characters';
    t.after(() => { env.jwtSecret = previousSecret; });
    const user = { _id: '000000000000000000000001', role, readOnly: true };
    t.mock.method(User, 'findById', async () => user);
    const token = jwt.sign({ sub: user._id }, env.jwtSecret, { algorithm: 'HS256' });
    for (const method of ['GET', 'HEAD', 'OPTIONS']) {
      let continued = false;
      await authenticate({ method, cookies: { session: token } }, {}, () => { continued = true; });
      assert.equal(continued, true);
    }
    for (const method of ['POST', 'PATCH', 'PUT', 'DELETE']) {
      await assert.rejects(authenticate({ method, cookies: { session: token } }, {}, () => {
        assert.fail('Una cuenta DEMO no debe alcanzar el controlador de escritura.');
      }), error => error.status === 403);
    }
  });
}
test('las cuentas originales conservan las escrituras y el indicador público es explícito', () => {
  for (const method of ['POST', 'PATCH', 'PUT', 'DELETE']) {
    assert.doesNotThrow(() => checkReadOnlyAccess({ readOnly: false }, method));
  }
  assert.equal(publicUser({ _id: 'demo', readOnly: true }).readOnly, true);
  assert.equal(publicUser({ _id: 'original' }).readOnly, false);
});

test('Team DEMO limita sus consultas a usuarios DEMO y la administración original conserva su ámbito', async (t) => {
  t.mock.method(User, 'distinct', async (field, filter) => {
    assert.equal(field, '_id');
    assert.deepEqual(filter, { readOnly: true });
    return ['demo-client', 'demo-workshop'];
  });
  assert.deepEqual(await demoAccountFilter({ role: 'admin', readOnly: true }), { user: { $in: ['demo-client', 'demo-workshop'] } });
  assert.deepEqual(await demoAccountFilter({ role: 'admin', readOnly: false }), {});
});
