import express from 'express';
import { routes } from './shared/infra/http/routes';

export function createApp() {
    const app = express();

    app.use(express.json());

    app.use(routes);

    return app;
}
