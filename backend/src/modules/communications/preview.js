import '../../config/env.js';
import { emailMedia } from './emailBrand.js';
import { mkdir, writeFile } from 'node:fs/promises';
import { messageTemplate } from './templates.js';
import { renderEmail } from './renderEmail.js';
import { sampleTypes, sampleData } from './samples.js';
const folder = new URL('../../../.email-previews/', import.meta.url);
await mkdir(folder, { recursive: true });
for (const type of sampleTypes) {
  await writeFile(new URL(`${type}.html`, folder), renderEmail(messageTemplate(type, sampleData), { media: await emailMedia(type), webUrl: process.env.EMAIL_PREVIEW_WEB_URL || 'http://localhost:5173' }));
}
console.log('Diez comunicaciones de ejemplo en backend/.email-previews/. Sin envío por correo.');
