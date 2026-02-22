# News Resumer 📰✨

Una aplicación web minimalista inspirada en la estética de Apple que agrupa noticias globales de Google News y ofrece resúmenes inteligentes utilizando IA (Gemini).


## 📺 Preview

**🌐 Visita el sitio:**  [https://news-resumer.vercel.app](https://news-resumer.vercel.app)

## 🚀 Características

- **Agregador de Noticias**: Obtiene las últimas noticias organizadas por categorías (Tecnología, Ciencia, Negocios, Salud, etc.).
- **Resúmenes con IA**: Utiliza **Google Gemini** (gratis) para generar resúmenes profesionales.
- **Filtros Multi-idioma**: Visualiza noticias en Español, Inglés y Portugués con un solo clic.
- **Rendimiento Optimizado**: Sistema de caché en memoria para cargas instantáneas y soporte para hasta 40 noticias por categoría.
- **Diseño Premium**: Interfaz limpia, responsiva y con animaciones sutiles.
- **Deploy en Vercel**: Funciona 100% en la nube, sin servidor local.

## 🛠️ Tecnologías

- **Astro** (SSR) + adaptador Vercel
- **Tailwind CSS**
- **Google Gemini API** (IA gratuita)
- **Google News RSS** (scraping de noticias)

## 📋 Requisitos Previos

- **Node.js** y **npm** instalados.
- Una **API Key de Google Gemini** gratuita: [Obtener aquí](https://aistudio.google.com/app/apikey)

## 🔧 Desarrollo Local

```bash
cd frontend
npm install
# Edita frontend/.env con tu GEMINI_API_KEY
npm run dev
```
La aplicación estará en `http://localhost:4321`.

## 🤖 Uso de la IA
Cuando hagas clic en "Resumir con IA", la app se conecta automáticamente a Google Gemini para procesar la noticia. El tier gratuito incluye suficientes solicitudes para uso personal.
