import { Router } from 'express';
import { healthCheckRoutes } from './healthCheck.routes';

const routes = Router();

// Health Check
routes.use(healthCheckRoutes);

// Futuro:
// routes.use(createLeadRoutes);
// routes.use(listLeadsRoutes);

export { routes };