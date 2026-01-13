import { Router } from 'express';
import { healthCheckRoutes } from './healthCheck.routes';
import { createLeadRoutes } from './createLead.routes';

const routes = Router();

// Health Check
routes.use(healthCheckRoutes);
routes.use(createLeadRoutes);

export { routes };