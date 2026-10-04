import { Message } from './Message.js';
import { messageTemplate } from './templates.js';
import { renderEmail } from './renderEmail.js';
export async function createMessage({ user, type, eventKey, data, session }) {
  const content = messageTemplate(type, data);
  await Message.create([{ user, type, eventKey, ...content, html: renderEmail(content), delivery: 'simulated' }], { session });
}
