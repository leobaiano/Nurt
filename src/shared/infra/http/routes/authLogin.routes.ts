import { Router } from 'express';
import { authLoginController } from '@/features/auth/login';

const router = Router();

router.post('/auth/token', async (req, res) => {
  const response = await authLoginController.handle(req.body);
  return res.status(response.statusCode).json(response.body);
});

export { router as authLoginRoutes };
