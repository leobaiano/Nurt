// src/shared/infra/http/routes/searchLeads.routes.ts
import { Router } from 'express';
import { searchLeadsFeature } from '../../../../features/leads/search-leads/search-leads';

const router = Router();

router.get('/leads/search', async (req, res) => {
  const controller = searchLeadsFeature();
  const response = await controller.handle(req.query);

  res.status(response.statusCode).json(response.body);
});

export { router as searchLeadsRoutes };
