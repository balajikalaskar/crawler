import type { CheerioAPI } from 'cheerio';

export const extractPageData = ($: CheerioAPI) => {
  const title = $('title').text().trim();
  const description = $('meta[name="description"]').attr('content')?.trim() || '';
  
  const headings: string[] = [];
  $('h1, h2, h3').each((_, el) => {
    const text = $(el).text().trim();
    if (text) headings.push(text);
  });

  // Extract main textual content
  $('script, style, noscript, nav, footer, header').remove();
  const content = $('body').text().replace(/\s+/g, ' ').trim();

  const links: Array<{ text: string; url: string }> = [];
  $('a').each((_, el) => {
    const text = $(el).text().trim();
    const url = $(el).attr('href');
    if (text && url && (url.startsWith('http') || url.startsWith('/'))) {
      links.push({ text, url });
    }
  });

  return {
    title,
    description,
    headings,
    content,
    links,
  };
};
