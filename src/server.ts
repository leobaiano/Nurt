import { createApp } from './app';
import { env } from './config/env';
import { connectMongo, disconnectMongo } from './config/mongo';

async function bootstrap() {
  try {
    // 1️⃣ Connect infrastructure
    await connectMongo();

    // 2️⃣ Create HTTP app
    const app = createApp();

    // 3️⃣ Start server
    const server = app.listen(env.port, () => {
      console.log(`🚀 Nurt API running on port ${env.port}`);
    });

    // 4️⃣ Graceful shutdown
    const shutdown = async () => {
      console.log('🛑 Shutting down server...');

      await disconnectMongo();

      server.close(() => {
        process.exit(0);
      });
    };

    process.on('SIGTERM', shutdown);
    process.on('SIGINT', shutdown);
  } catch (error) {
    console.error('❌ Failed to start application');
    console.error(error);
    process.exit(1);
  }
}

bootstrap();
