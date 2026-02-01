from datetime import datetime
import json
import os
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from scraper import scraper
from summarizer import summarizer
from pydantic import BaseModel

app = FastAPI(title="News Resumer API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class SummarizeRequest(BaseModel):
    url: str
    title: str = None
    description: str = None

@app.get("/health")
async def health_check():
    return {"status": "ok"}

CATEGORY_MAP = {
    "TECNOLOGÍA": "TECHNOLOGY",
    "CIENCIA": "SCIENCE",
    "NEGOCIOS": "BUSINESS",
    "SALUD": "HEALTH",
    "ENTRETENIMIENTO": "ENTERTAINMENT",
    "DEPORTES": "SPORTS"
}

# Persistent cache file
CACHE_FILE = "news_cache.json"
CACHE_TTL_SECONDS = 600 # 10 minutes

def load_cache():
    if os.path.exists(CACHE_FILE):
        try:
            with open(CACHE_FILE, "r") as f:
                return json.load(f)
        except:
            return {}
    return {}

def save_cache(cache):
    try:
        with open(CACHE_FILE, "w") as f:
            json.dump(cache, f)
    except:
        pass

@app.get("/news")
async def get_news(category: str = None, query: str = None, lang: str = "es", country: str = "ES"):
    cache_key = f"{lang}_{country}_{category or 'all'}_{query or 'none'}"
    now = datetime.now().timestamp()
    
    cache = load_cache()
    
    # Check cache
    if cache_key in cache:
        cache_entry = cache[cache_key]
        if now - cache_entry["timestamp"] < CACHE_TTL_SECONDS:
            print(f"Returning cached news for {cache_key}")
            return cache_entry["data"]

    print(f"Fetching news from GNews. Lang: {lang}, Country: {country}, Category: {category}")
    scraper.set_config(lang, country)
    try:
        # Increase results again to be absolutely sure
        scraper.google_news.max_results = 40 
        
        current_topic = None
        if category:
            cat_upper = category.upper()
            current_topic = CATEGORY_MAP.get(cat_upper, cat_upper)

        if current_topic and current_topic != "TODO":
            news = scraper.get_news_by_topic(current_topic)
        elif query:
            news = scraper.get_news_by_query(query)
        else:
            news = scraper.get_top_news()
        
        # Normalize news data for the frontend
        normalized_news = []
        for item in (news or []):
            normalized_news.append({
                "title": item.get("title", "No title"),
                "description": item.get("description", ""),
                "url": item.get("url", ""),
                "published_date": item.get("published date", ""),
                "source": item.get("publisher", {}).get("title", "Source")
            })
            
        print(f"Found {len(normalized_news)} news items")
        
        # Update cache
        cache[cache_key] = {
            "data": normalized_news,
            "timestamp": now
        }
        save_cache(cache)
        
        return normalized_news
    except Exception as e:
        print(f"Error fetching news: {e}")
        return []

@app.post("/summarize")
async def summarize_news(request: SummarizeRequest):
    print(f"--- Summarization Request ---")
    print(f"URL: {request.url}")
    print(f"Frontend Title: {request.title}")
    try:
        article = scraper.fetch_full_content(request.url)
        
        # Determine content and title
        content = article.text if article else ""
        title = article.title if article and len(article.title) > 10 else request.title or "Noticia"
        
        # Prepare robust context for the AI
        content_for_ai = content
        if len(content) < 500:
             print("Content is short, prioritizing description from frontend.")
             content_for_ai = f"Resumen/Contexto: {request.description}\n\nTexto adicional: {content}"
        else:
             # Even with long content, the description helps anchor the AI to the correct topic
             content_for_ai = f"Contexto principal: {request.description}\n\nNoticia completa:\n{content}"
        
        summary = await summarizer.summarize(content_for_ai, title=title)
        print(f"Summary generated (first 50 chars): {summary[:50]}...")
        print(f"-----------------------------")
        return {"summary": summary, "title": title}
    except Exception as e:
        print(f"Summarization endpoint error: {e}")
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
