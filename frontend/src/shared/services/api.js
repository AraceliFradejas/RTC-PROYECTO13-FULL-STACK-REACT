import { createApiClient } from '@kelsets-cars/api-client';
export const api = createApiClient({ baseUrl: import.meta.env.VITE_API_URL || '/api/v1' });
