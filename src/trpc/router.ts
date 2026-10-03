import { router } from './trpc';
import { scraperRouter } from '../modules/scraper/scraper.router';

export const appRouter = router({
  scraper: scraperRouter,
});

export type AppRouter = typeof appRouter;
