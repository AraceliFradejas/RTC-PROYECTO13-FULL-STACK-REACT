import app from './app.js';
import { env, requireAuthConfig } from './config/env.js';
import { connectDatabase } from './config/database.js';
requireAuthConfig();
await connectDatabase();
app.listen(env.port, () => console.log(`KelseTS Cars API: http://localhost:${env.port}/api`));
