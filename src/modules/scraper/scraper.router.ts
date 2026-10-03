import { z } from 'zod';
import { router, publicProcedure } from '../../trpc/trpc';
import { scrapeUrl } from './scraper.service';

export const scraperRouter = router({
  scrape: publicProcedure
    .input(
      z.object({
        url: z.string().url().refine((val) => val.startsWith('http://') || val.startsWith('https://'), {
          message: 'Only HTTP and HTTPS protocols are supported',
        }),
      })
    )
    .query(async ({ input }) => {
      return await scrapeUrl(input.url);
    }),
});
