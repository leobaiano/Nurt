import { env } from './env';

export const securityConfig = {
  apiKey: env.apiToken,

  allowedOrigins: env.allowedOrigins
    ? env.allowedOrigins.split(',').map(origin => origin.trim())
    : [],
};
