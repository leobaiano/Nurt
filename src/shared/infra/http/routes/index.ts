import { Router } from 'express';
import { healthCheckRoutes } from './healthCheck.routes';
import { createLeadRoutes } from './createLead.routes';
import { searchLeadsRoutes } from './searchLeads.routes';
import { sendEmailRoutes } from './sendEmail.routes';

const routes = Router();

// Health Check
routes.use(healthCheckRoutes);
routes.use(createLeadRoutes);
routes.use(searchLeadsRoutes);
routes.use(sendEmailRoutes);

export { routes };