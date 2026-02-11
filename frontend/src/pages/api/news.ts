import type { APIRoute } from 'astro';
import Parser from 'rss-parser';

const parser = new Parser({
  customFields: {
    item: [['source', 'source']],
  },
});

const CATEGORY_MAP: Record<string, string> = {
  'TODO': '',
  'TECNOLOGÍA': 'CAAqJggKIiBDQkFTRWdvSUwyMHZNRGRqTVhZU0FtVnpHZ0pGVXlnQVAB',
  'TECHNOLOGY': 'CAAqJggKIiBDQkFTRWdvSUwyMHZNRGRqTVhZU0FtVnpHZ0pGVXlnQVAB',
  'CIENCIA': 'CAAqJggKIiBDQkFTRWdvSUwyMHZNRFp0Y1RjU0FtVnpHZ0pGVXlnQVAB',
  'SCIENCE': 'CAAqJggKIiBDQkFTRWdvSUwyMHZNRFp0Y1RjU0FtVnpHZ0pGVXlnQVAB',
  'NEGOCIOS': 'CAAqJggKIiBDQkFTRWdvSUwyMHZNRGx6TVdZU0FtVnpHZ0pGVXlnQVAB',
  'BUSINESS': 'CAAqJggKIiBDQkFTRWdvSUwyMHZNRGx6TVdZU0FtVnpHZ0pGVXlnQVAB',
  'SALUD': 'CAAqIQgKIhtDQkFTRGdvSUwyMHZNR3QwTlRFU0FtVnpLQUFQAQ',
  'HEALTH': 'CAAqIQgKIhtDQkFTRGdvSUwyMHZNR3QwTlRFU0FtVnpLQUFQAQ',
  'ENTRETENIMIENTO': 'CAAqJggKIiBDQkFTRWdvSUwyMHZNREpxYW5RU0FtVnpHZ0pGVXlnQVAB',
  'ENTERTAINMENT': 'CAAqJggKIiBDQkFTRWdvSUwyMHZNREpxYW5RU0FtVnpHZ0pGVXlnQVAB',
  'DEPORTES': 'CAAqJggKIiBDQkFTRWdvSUwyMHZNRFp1ZEdvU0FtVnpHZ0pGVXlnQVAB',
  'SPORTS': 'CAAqJggKIiBDQkFTRWdvSUwyMHZNRFp1ZEdvU0FtVnpHZ0pGVXlnQVAB',
};

// Language/country to Google News locale
const LOCALE_MAP: Record<string, { hl: string; gl: string; ceid: string }> = {
  'es_ES': { hl: 'es', gl: 'ES', ceid: 'ES:es' },
  'en_US': { hl: 'en', gl: 'US', ceid: 'US:en' },
  'pt_BR': { hl: 'pt-BR', gl: 'BR', ceid: 'BR:pt-419' },
};

// Simple in-memory cache
const cache = new Map<string, { data: any; timestamp: number }>();
const CACHE_TTL = 600_000; // 10 minutes in ms

export const GET: APIRoute = async ({ url }) => {
  const lang = url.searchParams.get('lang') || 'es';
  const country = url.searchParams.get('country') || 'ES';
  const category = url.searchParams.get('category') || '';
  const query = url.searchParams.get('query') || '';

  const cacheKey = `${lang}_${country}_${category}_${query}`;
  const now = Date.now();

  // Check cache
  const cached = cache.get(cacheKey);
  if (cached && now - cached.timestamp < CACHE_TTL) {
    return new Response(JSON.stringify(cached.data), {
      headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    const localeKey = `${lang}_${country}`;
    const locale = LOCALE_MAP[localeKey] || LOCALE_MAP['es_ES'];

    let rssUrl: string;

    if (query) {
      rssUrl = `https://news.google.com/rss/search?q=${encodeURIComponent(query)}&hl=${locale.hl}&gl=${locale.gl}&ceid=${locale.ceid}`;
    } else if (category && category.toUpperCase() !== 'TODO') {
      const topicToken = CATEGORY_MAP[category.toUpperCase()];
      if (topicToken) {
        rssUrl = `https://news.google.com/rss/topics/${topicToken}?hl=${locale.hl}&gl=${locale.gl}&ceid=${locale.ceid}`;
      } else {
        // Fallback: search by category name
        rssUrl = `https://news.google.com/rss/search?q=${encodeURIComponent(category)}&hl=${locale.hl}&gl=${locale.gl}&ceid=${locale.ceid}`;
      }
    } else {
      rssUrl = `https://news.google.com/rss?hl=${locale.hl}&gl=${locale.gl}&ceid=${locale.ceid}`;
    }

    const feed = await parser.parseURL(rssUrl);

    const articles = (feed.items || []).slice(0, 40).map((item) => ({
      title: item.title || 'Sin título',
      description: item.contentSnippet || item.content || '',
      url: item.link || '',
      published_date: item.pubDate || '',
      source: (item as any).source?._  || (item as any).source || item.creator || 'Fuente',
    }));

    // Update cache
    cache.set(cacheKey, { data: articles, timestamp: now });

    return new Response(JSON.stringify(articles), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error fetching news RSS:', error);
    return new Response(JSON.stringify([]), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};
