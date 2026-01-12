import express from 'express';

export function createApp() {
    const app = express();

    app.use(express.json());

    app.get('/health', (_, res) => {
        res.status(200).json({ status: 'ok' });
    });

    return app;
}