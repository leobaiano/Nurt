import { Router } from 'express';
import { createLeadFeature } from '../../../../features/leads/create-lead';

const router = Router();

router.post('/create-leads', async (req, res) => {
  const controller = createLeadFeature();
  const response = await controller.handle(req.body);
  res.status(201).json(response.body);
});

export { router as createLeadRoutes };