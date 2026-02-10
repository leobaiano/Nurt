import express from 'express';
import cors from 'cors';
import { routes } from './shared/infra/http/routes';
import { apiSecurity } from './shared/infra/http/middlewares/apiSecurity';
import { securityConfig } from './config/security';
import { authLoginRoutes } from './shared/infra/http/routes/authLogin.routes';
import { createLeadRoutes } from './shared/infra/http/routes/createLead.routes';
import { searchLeadsRoutes } from './shared/infra/http/routes/searchLeads.routes';
import { sendEmailRoutes } from './shared/infra/http/routes/sendEmail.routes';

export function createApp() {
  const app = express();

  app.use(cors({
    origin: securityConfig.allowedOrigins, // Usa a sua lista já existente
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'x-api-key'],
    credentials: true
  }));

  app.use(express.json());

  /**
   * 🔓 Public routes (no auth)
   */
  app.get('/health', routes);
  app.use(authLoginRoutes);

  /**
   * 🔐 Protected routes
   */
  app.use(apiSecurity);
  app.use(createLeadRoutes);
  app.use(searchLeadsRoutes);
  app.use(sendEmailRoutes);

  return app;
}
