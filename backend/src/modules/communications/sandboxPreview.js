import '../../config/env.js';
import { emailMedia } from './emailBrand.js';
import { messageTemplate } from './templates.js';
import { renderEmail, renderEmailText } from './renderEmail.js';
import { sampleTypes, sampleData } from './samples.js';
const SANDBOX_SEND_INTERVAL_MS = 12_000;
const SANDBOX_REQUEST_TIMEOUT_MS = 15_000;

const token = process.env.MAILTRAP_API_TOKEN;
const inbox = process.env.MAILTRAP_INBOX_ID;
if (!token || !/^[1-9]\d*$/.test(inbox || '')) throw new Error('Configura MAILTRAP_API_TOKEN y MAILTRAP_INBOX_ID en backend/.env.');
const selected = process.argv[2];
if (selected && !sampleTypes.includes(selected)) throw new Error('Tipo de muestra no válido.');
for (const type of selected ? [selected] : sampleTypes) {
  const message = messageTemplate(type, sampleData);
  const media = await emailMedia(type, { inline: true });
  const response = await fetch(`https://sandbox.api.mailtrap.io/api/send/${inbox}`, {
    method: 'POST', signal: AbortSignal.timeout(SANDBOX_REQUEST_TIMEOUT_MS),
    headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ from: { email: 'comunicaciones@kelsets.example', name: 'KelseTS Cars · Pruebas' }, to: [{ email: 'demo@kelsets.example', name: 'Alex Demo' }], subject: `[MUESTRA ${type}] ${message.subject}`, text: renderEmailText(message, { sandbox: true, webUrl: process.env.EMAIL_PREVIEW_WEB_URL || 'http://localhost:5173' }), attachments: media.attachments, html: renderEmail(message, { media, sandbox: true, webUrl: process.env.EMAIL_PREVIEW_WEB_URL || 'http://localhost:5173' }) }),
  });
  let result;
  try { result = await response.json(); } catch { throw new Error(`Mailtrap devolvió una respuesta no válida (HTTP ${response.status}).`); }
  if (!response.ok || result.success !== true) throw new Error(`Mailtrap no aceptó ${type} (HTTP ${response.status}). Revisa credenciales y límites del Sandbox.`);
  console.log(`Sandbox: ${type} aceptado. Sin entrega a buzones personales.`);
  if (!selected && type !== sampleTypes.at(-1)) await new Promise(resolve => setTimeout(resolve, SANDBOX_SEND_INTERVAL_MS));
}
