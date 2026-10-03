export interface ScrapeResult {
  url: string;
  finalUrl: string;
  statusCode: number;
  title: string;
  description: string;
  headings: string[];
  content: string;
  links: Array<{ text: string; url: string }>;
}

export interface ScrapeResponse {
  success: boolean;
  data?: ScrapeResult;
  metadata?: {
    durationMs: number;
  };
  error?: {
    code: string;
    message: string;
  };
}
