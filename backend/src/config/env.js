import dotenv from 'dotenv';
import { fileURLToPath } from 'node:url';

dotenv.config({ path: fileURLToPath(new URL('../../.env', import.meta.url)), quiet: true });
export const env = {
  port: Number(process.env.PORT || 3000),
  mongoUri: process.env.MONGODB_URI,
  jwtSecret: process.env.JWT_SECRET,
  production: process.env.NODE_ENV === 'production',
  origins: (process.env.FRONTEND_URL || 'http://localhost:5173').split(',').map(s => s.trim()),
};
export function requireDatabaseConfig() {
  if (!env.mongoUri) throw new Error('Configura MONGODB_URI en backend/.env.');
}
export function requireAuthConfig() {
  if (!env.jwtSecret || env.jwtSecret.length < 32) throw new Error('JWT_SECRET debe tener al menos 32 caracteres.');
}
