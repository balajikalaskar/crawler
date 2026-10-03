import { CheerioCrawler, Configuration } from 'crawlee';
import { extractPageData } from './scraper.extractor';
import { ScrapeResult } from './scraper.types';

export const runCrawler = async (url: string): Promise<ScrapeResult> => {
  let result: Partial<ScrapeResult> = {};
  
  // Local config to isolate state and avoid writing to disk for the prototype
  const config = new Configuration({
    persistStorage: false,
  });

  const crawler = new CheerioCrawler({
    maxRequestsPerCrawl: 1,
    requestHandlerTimeoutSecs: 30,
    async requestHandler({ request, $, response }) {
      if (!$) throw new Error('Cheerio instance not initialized');
      
      const extractedData = extractPageData($);

      result = {
        url: request.url,
        finalUrl: request.loadedUrl || request.url,
        statusCode: response?.statusCode || 200,
        ...extractedData
      };
    },
    failedRequestHandler({ request }) {
      throw new Error(`Failed to crawl ${request.url}`);
    }
  }, config);

  await crawler.run([url]);

  if (!result.title && !result.content) {
    throw new Error('Failed to extract data from the page');
  }

  return result as ScrapeResult;
};
