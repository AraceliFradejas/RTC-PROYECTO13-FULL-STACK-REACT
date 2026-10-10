import '../../config/env.js';
import { emailMedia } from './emailBrand.js';
import { mkdir, writeFile } from 'node:fs/promises';
import { messageTemplate } from './templates.js';
import { renderEmail } from './renderEmail.js';
import { sampleTypes, sampleData } from './samples.js';
const folder = new URL('../../../.email-previews/', import.meta.url);
await mkdir(folder, { recursive: true });
for (const type of sampleTypes) {
  const media = await emailMedia(type);
  for (const language of ['es', 'en']) {
    const filename = language === 'es' ? `${type}.html` : `${type}.en.html`;
    await writeFile(new URL(filename, folder), renderEmail(messageTemplate(type, sampleData, { language }), { media, webUrl: process.env.EMAIL_PREVIEW_WEB_URL || 'http://localhost:5173' }));
  }
}
console.log('Veinte comunicaciones (castellano e inglés) de ejemplo en backend/.email-previews/. Sin envío por correo.');
