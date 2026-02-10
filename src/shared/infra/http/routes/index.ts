import { Router } from 'express';
import { healthCheckRoutes } from './healthCheck.routes';
import { createLeadRoutes } from './createLead.routes';
import { searchLeadsRoutes } from './searchLeads.routes';
import { sendEmailRoutes } from './sendEmail.routes';
import { authLoginRoutes } from './authLogin.routes';

const routes = Router();

routes.use(healthCheckRoutes);
routes.use(createLeadRoutes);
routes.use(searchLeadsRoutes);
routes.use(sendEmailRoutes);
routes.use(authLoginRoutes);

export { routes };
