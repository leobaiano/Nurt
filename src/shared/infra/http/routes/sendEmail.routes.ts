import { Router } from 'express';
import { controller } from '../../../../features/email/send-email';

const router = Router();

router.get('/send-email', async (req, res) => {
  const response = await controller.handle(req.query, req.body);

  return res.status(response.statusCode).json(response.body);
});

export { router as sendEmailRoutes };
