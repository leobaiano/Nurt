import express from 'express';
import { routes } from './shared/infra/http/routes';
import { apiSecurity } from './shared/infra/http/middlewares/apiSecurity';

export function createApp() {
  const app = express();

  app.use(express.json());

  /**
   * 🔓 Public routes (no auth)
   */
  app.get('/health', routes);

  /**
   * 🔐 Protected routes
   */
  app.use(apiSecurity);
  app.use(routes);

  return app;
}
