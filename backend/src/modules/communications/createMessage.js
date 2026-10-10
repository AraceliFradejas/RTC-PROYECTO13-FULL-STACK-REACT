import { Message } from './Message.js';
import { messageTemplate } from './templates.js';
import { renderEmail } from './renderEmail.js';
export async function createMessage({ user, type, eventKey, data, session }) {
  const content = messageTemplate(type, data);
  const english = messageTemplate(type, data, { language: 'en' });
  const translations = { en: { subject: english.subject, text: english.text, actionLabel: english.actionLabel, html: renderEmail(english) } };
  await Message.create([{ user, type, eventKey, ...content, html: renderEmail(content), translations, delivery: 'simulated' }], { session });
}
