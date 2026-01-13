import { Router } from 'express';
import { HttpController } from '../HttpController';
import { makeHealthCheckController } from '../../../../features/health-check/check-health';

const router = Router();
const httpController = new HttpController();

router.get('/health-check', async (_req, res) => {
    const controller = makeHealthCheckController();

    const httpResponse = await httpController.handle(() =>
        controller.handle()
    );

    res.status(httpResponse.statusCode).json(httpResponse.body);
});

export { router as healthCheckRoutes };