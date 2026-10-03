import express from 'express';
import cors from 'cors';
import * as trpcExpress from '@trpc/server/adapters/express';
import { appRouter } from '../trpc/router';
import { createContext } from '../trpc/context';
import { errorHandler } from '../middleware/error.middleware';

export const createApp = () => {
  const app = express();

  app.use(cors());
  app.use(express.json());

  app.use(
    '/trpc',
    trpcExpress.createExpressMiddleware({
      router: appRouter,
      createContext,
    })
  );

  app.use(errorHandler);

  return app;
};
