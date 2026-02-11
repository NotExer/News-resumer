# News Resumer 📰✨

Una aplicación web minimalista inspirada en la estética de Apple que agrupa noticias globales de Google News y ofrece resúmenes inteligentes utilizando IA (Gemini).

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

## 🚀 Deploy en Vercel (Gratis)

### 1. Sube el repo a GitHub
```bash
git add .
git commit -m "Ready for Vercel"
git push
```

### 2. Importa en Vercel
1. Ve a [vercel.com/new](https://vercel.com/new)
2. Importa tu repositorio de GitHub
3. Configura:
   - **Root Directory**: `frontend`
   - **Framework Preset**: Astro
   - **Build Command**: `npm run build`
   - **Output Directory**: `.vercel/output`

### 3. Variables de Entorno
En **Settings → Environment Variables** añade:
| Variable | Valor |
|---|---|
| `GEMINI_API_KEY` | Tu API key de Google AI Studio |

### 4. ¡Deploy!
Haz clic en **Deploy** y en ~1 minuto tendrás tu app en producción. 🎉

## 🤖 Uso de la IA
Cuando hagas clic en "Resumir con IA", la app se conecta automáticamente a Google Gemini para procesar la noticia. El tier gratuito incluye suficientes solicitudes para uso personal.
