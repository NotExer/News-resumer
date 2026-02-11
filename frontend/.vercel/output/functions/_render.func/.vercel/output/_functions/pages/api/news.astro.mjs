import Parser from 'rss-parser';
export { renderers } from '../../renderers.mjs';

const parser = new Parser({
  customFields: {
    item: [["source", "source"]]
  }
});
const CATEGORY_MAP = {
  "TODO": "",
  "TECNOLOGÍA": "CAAqJggKIiBDQkFTRWdvSUwyMHZNRGRqTVhZU0FtVnpHZ0pGVXlnQVAB",
  "TECHNOLOGY": "CAAqJggKIiBDQkFTRWdvSUwyMHZNRGRqTVhZU0FtVnpHZ0pGVXlnQVAB",
  "CIENCIA": "CAAqJggKIiBDQkFTRWdvSUwyMHZNRFp0Y1RjU0FtVnpHZ0pGVXlnQVAB",
  "SCIENCE": "CAAqJggKIiBDQkFTRWdvSUwyMHZNRFp0Y1RjU0FtVnpHZ0pGVXlnQVAB",
  "NEGOCIOS": "CAAqJggKIiBDQkFTRWdvSUwyMHZNRGx6TVdZU0FtVnpHZ0pGVXlnQVAB",
  "BUSINESS": "CAAqJggKIiBDQkFTRWdvSUwyMHZNRGx6TVdZU0FtVnpHZ0pGVXlnQVAB",
  "SALUD": "CAAqIQgKIhtDQkFTRGdvSUwyMHZNR3QwTlRFU0FtVnpLQUFQAQ",
  "HEALTH": "CAAqIQgKIhtDQkFTRGdvSUwyMHZNR3QwTlRFU0FtVnpLQUFQAQ",
  "ENTRETENIMIENTO": "CAAqJggKIiBDQkFTRWdvSUwyMHZNREpxYW5RU0FtVnpHZ0pGVXlnQVAB",
  "ENTERTAINMENT": "CAAqJggKIiBDQkFTRWdvSUwyMHZNREpxYW5RU0FtVnpHZ0pGVXlnQVAB",
  "DEPORTES": "CAAqJggKIiBDQkFTRWdvSUwyMHZNRFp1ZEdvU0FtVnpHZ0pGVXlnQVAB",
  "SPORTS": "CAAqJggKIiBDQkFTRWdvSUwyMHZNRFp1ZEdvU0FtVnpHZ0pGVXlnQVAB"
};
const LOCALE_MAP = {
  "es_ES": { hl: "es", gl: "ES", ceid: "ES:es" },
  "en_US": { hl: "en", gl: "US", ceid: "US:en" },
  "pt_BR": { hl: "pt-BR", gl: "BR", ceid: "BR:pt-419" }
};
const cache = /* @__PURE__ */ new Map();
const CACHE_TTL = 6e5;
const GET = async ({ url }) => {
  const lang = url.searchParams.get("lang") || "es";
  const country = url.searchParams.get("country") || "ES";
  const category = url.searchParams.get("category") || "";
  const query = url.searchParams.get("query") || "";
  const cacheKey = `${lang}_${country}_${category}_${query}`;
  const now = Date.now();
  const cached = cache.get(cacheKey);
  if (cached && now - cached.timestamp < CACHE_TTL) {
    return new Response(JSON.stringify(cached.data), {
      headers: { "Content-Type": "application/json" }
    });
  }
  try {
    const localeKey = `${lang}_${country}`;
    const locale = LOCALE_MAP[localeKey] || LOCALE_MAP["es_ES"];
    let rssUrl;
    if (query) {
      rssUrl = `https://news.google.com/rss/search?q=${encodeURIComponent(query)}&hl=${locale.hl}&gl=${locale.gl}&ceid=${locale.ceid}`;
    } else if (category && category.toUpperCase() !== "TODO") {
      const topicToken = CATEGORY_MAP[category.toUpperCase()];
      if (topicToken) {
        rssUrl = `https://news.google.com/rss/topics/${topicToken}?hl=${locale.hl}&gl=${locale.gl}&ceid=${locale.ceid}`;
      } else {
        rssUrl = `https://news.google.com/rss/search?q=${encodeURIComponent(category)}&hl=${locale.hl}&gl=${locale.gl}&ceid=${locale.ceid}`;
      }
    } else {
      rssUrl = `https://news.google.com/rss?hl=${locale.hl}&gl=${locale.gl}&ceid=${locale.ceid}`;
    }
    const feed = await parser.parseURL(rssUrl);
    const articles = (feed.items || []).slice(0, 40).map((item) => ({
      title: item.title || "Sin título",
      description: item.contentSnippet || item.content || "",
      url: item.link || "",
      published_date: item.pubDate || "",
      source: item.source?._ || item.source || item.creator || "Fuente"
    }));
    cache.set(cacheKey, { data: articles, timestamp: now });
    return new Response(JSON.stringify(articles), {
      headers: { "Content-Type": "application/json" }
    });
  } catch (error) {
    console.error("Error fetching news RSS:", error);
    return new Response(JSON.stringify([]), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  GET
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
