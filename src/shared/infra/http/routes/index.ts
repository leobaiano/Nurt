import { Router } from 'express';
import { healthCheckRoutes } from './healthCheck.routes';
import { createLeadRoutes } from './createLead.routes';
import { searchLeadsRoutes } from './searchLeads.routes';

const routes = Router();

// Health Check
routes.use(healthCheckRoutes);
routes.use(createLeadRoutes);
routes.use(searchLeadsRoutes);

export { routes };