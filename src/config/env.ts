import 'dotenv/config';

type Env = {
    nodeEnv: 'development' | 'production' | 'test';
    port: number;
};

export const env: Env = {
    nodeEnv: (process.env.NODE_ENV as Env['nodeEnv']) ?? 'development',
    port: Number(process.env.PORT ?? 3000),
};