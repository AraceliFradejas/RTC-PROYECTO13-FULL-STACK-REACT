import mongoose from 'mongoose';
import { env, requireDatabaseConfig } from './env.js';

let connection;
export async function connectDatabase() {
  requireDatabaseConfig();
  if (mongoose.connection.readyState === 1) return mongoose.connection;
  connection ??= mongoose.connect(env.mongoUri, { serverSelectionTimeoutMS: 8000 }).catch(error => {
    connection = null;
    throw error;
  });
  return connection;
}
