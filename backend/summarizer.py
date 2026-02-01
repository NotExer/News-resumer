import os
import httpx
from dotenv import load_dotenv

load_dotenv()

class NewsSummarizer:
    def __init__(self):
        # We try localhost first, fallback to 127.0.0.1
        self.base_urls = ["http://localhost:11434", "http://127.0.0.1:11434"]
        self.model = "llama3"

    async def _get_working_url(self):
        async with httpx.AsyncClient() as client:
            for url in self.base_urls:
                try:
                    response = await client.get(url, timeout=2.0)
                    if response.status_code == 200 and "Ollama is running" in response.text:
                        return f"{url}/api/chat"
                except Exception:
                    continue
        return None

    async def summarize(self, text: str, title: str = ""):
        working_url = await self._get_working_url()
        if not working_url:
            return "Ollama no parece estar corriendo. Asegúrate de que la aplicación Ollama esté abierta."

        # Determine if we have full text or just a title
        is_only_title = False
        if not text or len(text) < 250:
            content_to_summarize = title
            is_only_title = True
        else:
            content_to_summarize = text

        if not content_to_summarize:
            return "No hay suficiente información para resumir esta noticia."

        system_prompt = "Eres un periodista experto y conciso. Tu tarea es generar resúmenes profesionales en español. Nunca pidas más información. Nunca saludes. Ve directo al grano."
        
        if is_only_title:
            user_prompt = f"Genera un breve párrafo explicativo (máximo 3 líneas) basado en este titular. No respondas con preguntas, solo da la información.\n\nTITULAR: {content_to_summarize}"
        else:
            user_prompt = f"Resume la siguiente noticia en máximo 3 párrafos cortos. No repitas el título.\n\nNOTICIA:\n{content_to_summarize}"
        
        payload = {
            "model": self.model,
            "messages": [
                {"role": "system", "content": system_prompt},
                {"role": "user", "content": user_prompt}
            ],
            "stream": False,
            "options": {
                "temperature": 0.1,
                "num_predict": 400
            }
        }
        
        try:
            async with httpx.AsyncClient(timeout=60.0) as client:
                response = await client.post(working_url, json=payload)
                
                if response.status_code != 200:
                    error_detail = response.text
                    print(f"Ollama API Error ({response.status_code}): {error_detail}")
                    return f"Error {response.status_code} de Ollama: {error_detail}"
                
                data = response.json()
                message = data.get("message", {})
                return message.get("content", "La IA no devolvió ninguna respuesta.")
        except Exception as e:
            print(f"Ollama Connection Error: {e}")
            return f"Error de conexión con la IA Local (Ollama): {str(e)}."

summarizer = NewsSummarizer()
