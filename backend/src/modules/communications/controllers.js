import { localizeMessage } from './localizeMessage.js';
import { Message } from './Message.js';
import { send } from '../../utils/errors.js';
export async function listMessages(req, res) {
  const messages = await Message.find({ user: req.user._id }).sort({ createdAt: -1, _id: -1 }).limit(100).select('-eventKey -user -__v').lean();
  send(res, messages.map(message => localizeMessage(message, req.query.language)));
}
