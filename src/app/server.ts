import { createApp } from './app';
import { env } from '../config/env';

export const startServer = () => {
  const app = createApp();

  app.listen(env.PORT, () => {
    console.log(`🚀 Server running on http://localhost:${env.PORT}`);
    console.log(`tRPC Endpoint: http://localhost:${env.PORT}/trpc`);
  });
};
