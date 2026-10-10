import { User } from '../modules/auth/models/User.js';

export async function demoAccountFilter(user) {
  if (!user.readOnly || user.role !== 'admin') return {};
  const ids = await User.distinct('_id', { readOnly: true });
  return { user: { $in: ids } };
}
