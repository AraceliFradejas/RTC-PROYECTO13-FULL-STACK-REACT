import { mkdir, writeFile } from 'node:fs/promises';
import { renderEmail, renderEmailText } from '../backend/src/modules/communications/renderEmail.js';
import { emailIdentity } from '../backend/src/modules/communications/emailBrand.js';
import { messageTemplate } from '../backend/src/modules/communications/templates.js';
import { sampleTypes, sampleData } from '../backend/src/modules/communications/samples.js';
const folder = new URL('../docs/evidencias/correos/', import.meta.url);
await mkdir(folder, { recursive: true });
for (const type of sampleTypes) {
  const message = messageTemplate(type, sampleData);
  const identity = emailIdentity(type);
  const options = { sandbox: true, webUrl: 'http://localhost:5173', media: {
    logoSrc: '../../../frontend/public/images/brand/logo-email.png',
    heroSrc: `../../../frontend/public/images/editorial/${identity.image}`,
  } };
  await writeFile(new URL(`${type}.html`, folder), renderEmail(message, options));
  await writeFile(new URL(`${type}.txt`, folder), renderEmailText(message, options));
}
console.log('Diez HTML y diez textos de demostración actualizados. No se ha enviado ningún correo.');
