import '../backend/src/config/env.js';
import { mkdir, writeFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { sampleTypes, sampleData } from '../backend/src/modules/communications/samples.js';
import { messageTemplate } from '../backend/src/modules/communications/templates.js';
import { renderEmailText } from '../backend/src/modules/communications/renderEmail.js';
import { emailIdentity } from '../backend/src/modules/communications/emailBrand.js';
const token = process.env.MAILTRAP_API_TOKEN;
const inbox = process.env.MAILTRAP_INBOX_ID;
if (!token || !/^[1-9]\d*$/.test(inbox || '')) throw Error('Configura el token y el ID privado de Sandbox.');
async function get(path, json = true) {
  const response = await fetch(`https://mailtrap.io/api/${path}`, { headers: { Authorization: `Bearer ${token}` }, signal: AbortSignal.timeout(15000) });
  if (!response.ok) throw Error(`Lectura Sandbox rechazada (HTTP ${response.status}). No se reintenta.`);
  return json ? response.json() : response.text();
}
const accounts = await get('accounts');
let base;
for (const account of accounts) {
  const inboxes = await get(`accounts/${account.id}/inboxes`);
  if (inboxes.some(item => String(item.id) === inbox)) { base = `accounts/${account.id}/inboxes/${inbox}/messages`; break; }
}
if (!base) throw Error('La bandeja no es accesible con este token.');
const messages = await get(base);
const folder = new URL('../docs/evidencias/mailtrap/recibidos/', import.meta.url);
await mkdir(folder, { recursive: true });
const results = [];
const normalized = value => value.replace(/\r\n/g, '\n').trim();
for (const type of sampleTypes) {
  const message = messages.filter(item => item.subject?.startsWith(`[MUESTRA ${type}]`)).sort((a,b) => b.id-a.id)[0];
  if (!message || !message.html_body_size || !message.text_body_size) throw Error(`Falta HTML o texto recibido: ${type}`);
  if (!String(message.to_email).includes('demo@kelsets.example')) throw Error('La muestra no usa el destinatario ficticio previsto.');
  const [html, text] = await Promise.all([get(`${base}/${message.id}/body.htmlsource`,false),get(`${base}/${message.id}/body.txt`,false)]);
  const expected = renderEmailText(messageTemplate(type,sampleData), { sandbox: true, webUrl: process.env.EMAIL_PREVIEW_WEB_URL || 'http://localhost:5173' });
  if (normalized(text) !== normalized(expected)) throw Error(`Texto recibido distinto de la plantilla actual: ${type}`);
  if (!html.includes('cid:kelsets-logo') || !html.includes('cid:kelsets-editorial') || !html.includes(emailIdentity(type).heading)) throw Error(`HTML recibido incompleto o anterior: ${type}`);
  const links = [...html.matchAll(/href="([^"]+)"/g)].map(match => match[1]);
  const web = new URL(process.env.EMAIL_PREVIEW_WEB_URL || 'http://localhost:5173');
  if (links.length !== 5 || links.some(link => new URL(link).origin !== web.origin)) throw Error(`Destino de enlace inesperado: ${type}`);
  await writeFile(new URL(`${type}.html`,folder),html);
  await writeFile(new URL(`${type}.txt`,folder),text);
  results.push({ type, messageId: message.id, receivedAt: message.created_at, html: true, text: true, textMatchesTemplate: true, cidImages: true, links, image: emailIdentity(type).image, htmlSha256: createHash('sha256').update(html).digest('hex'), textSha256: createHash('sha256').update(text).digest('hex') });
  console.log(`${type}: recibido, HTML y texto correctos, imágenes CID y cinco enlaces a la web.`);
  if (type !== sampleTypes.at(-1)) await new Promise(resolve => setTimeout(resolve,1500));
}
const analysis = await get(`${base}/${results[0].messageId}/analyze`);
await writeFile(new URL('../compatibilidad-api.json',folder),JSON.stringify(analysis,null,2)+'\n');
await writeFile(new URL('../verificacion.json',folder),JSON.stringify({ reviewedOn:new Intl.DateTimeFormat('sv-SE', { timeZone:'Europe/Madrid' }).format(new Date()), scope:'Muestras ficticias de Mailtrap Sandbox; no entrega personal ni eventos automáticos de la aplicación.', messages:results },null,2)+'\n');
console.log('Diez muestras recibidas verificadas y exportadas. La lectura no crea ni modifica mensajes.');
