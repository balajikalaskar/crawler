import { runCrawler } from './scraper.crawler';
import { ScrapeResponse } from './scraper.types';

export const scrapeUrl = async (url: string): Promise<ScrapeResponse> => {
  const startTime = Date.now();
  
  try {
    const data = await runCrawler(url);
    const durationMs = Date.now() - startTime;
    
    return {
      success: true,
      data,
      metadata: { durationMs }
    };
  } catch (error: any) {
    console.error(`Scrape error for ${url}:`, error.message);
    return {
      success: false,
      error: {
        code: 'SCRAPE_FAILED',
        message: error.message || 'Unable to scrape the requested URL'
      }
    };
  }
};
