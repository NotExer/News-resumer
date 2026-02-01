from gnews import GNews
from datetime import datetime

class NewsScraper:
    def __init__(self, language='es', country='ES'):
        self.google_news = GNews(language=language, country=country, max_results=30)

    def set_config(self, language, country):
        self.google_news.language = language
        self.google_news.country = country
        self.google_news.max_results = 40

    def get_top_news(self):
        return self.google_news.get_top_news()

    def get_news_by_topic(self, topic: str):
        return self.google_news.get_news_by_topic(topic)

    def get_news_by_query(self, query: str):
        return self.google_news.get_news(query)

    def fetch_full_content(self, url: str):
        try:
            return self.google_news.get_full_article(url)
        except Exception as e:
            print(f"Error fetching full content: {e}")
            return None

scraper = NewsScraper()
