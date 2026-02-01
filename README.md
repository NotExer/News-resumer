# News Resumer 📰✨

Una aplicación web minimalista inspirada en la estética de Apple que agrupa noticias globales de Google News y ofrece resúmenes inteligentes utilizando IA local.

## 🚀 Características

- **Agregador de Noticias**: Obtiene las últimas noticias organizadas por categorías (Tecnología, Ciencia, Negocios, Salud, etc.).
- **Resúmenes con IA Local**: Utiliza **Ollama** para generar resúmenes profesionales sin costo de API y con total privacidad.
- **Filtros Multi-idioma**: Visualiza noticias en Español, Inglés y Portugués con un solo clic.
- **Rendimiento Optimizado**: Sistema de caché persistente para cargas instantáneas y soporte para hasta 40 noticias por categoría.
- **Diseño Premium**: Interfaz limpia, responsiva y con animaciones sutiles siguiendo el diseño de Apple.

## 🛠️ Tecnologías

### Backend
- **Python 3.10+**
- **FastAPI**: Servidor de alto rendimiento.
- **GNews**: Para el scraping de noticias de Google.
- **HttpX**: Comunicación asíncrona con la IA.
- **Caché Persistente**: Almacenamiento local en JSON.

### Frontend
- **Astro**: Framework de islas para un rendimiento web superior.
- **Tailwind CSS**: Estilizado moderno y responsivo.
- **JavaScript**: Lógica del cliente sin dependencias pesadas.

## 📋 Requisitos Previos

- **Python** instalado (v3.10 o superior).
- **Node.js** y **npm** instalados.
- **Ollama**: [Descárgalo aquí](https://ollama.com/) e instala el modelo Llama 3 (`ollama run llama3`).

## 🔧 Instalación

### 1. Clonar el repositorio
```bash
git clone https://github.com/NotExer/news-resumer.git
cd news-resumer
```

### 2. Configuración del Backend
Navega a la carpeta del servidor y configura el entorno:
```bash
cd backend
pip install -r requirements.txt
python main.py
```
*El servidor correrá en `http://127.0.0.1:8000`.*

### 3. Configuración del Frontend
Navega a la carpeta del cliente e instala las dependencias:
```bash
cd ../frontend
npm install
npm run dev
```
*La aplicación estará disponible en `http://localhost:4321`.*

## 🤖 Uso de la IA
Asegúrate de tener la aplicación **Ollama** abierta en segundo plano. Cuando hagas clic en el botón "Resumir con IA", la aplicación se conectará automáticamente a tu modelo local instalado para procesar la noticia.

---
Hecho con ❤️ para amantes de la información.
