import { Message } from './Message.js';
import { send } from '../../utils/errors.js';
export async function listMessages(req, res) {
  send(res, await Message.find({ user: req.user._id }).sort({ createdAt: -1, _id: -1 }).limit(100).select('-eventKey -user -__v'));
}
