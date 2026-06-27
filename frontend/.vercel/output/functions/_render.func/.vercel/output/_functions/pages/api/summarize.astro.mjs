import { GoogleGenerativeAI } from '@google/generative-ai';
export { renderers } from '../../renderers.mjs';

const POST = async ({ request }) => {
  try {
    const apiKey = undefined                               || process.env.GEMINI_API_KEY;
    if (!apiKey || apiKey === "your_gemini_api_key_here") {
      return new Response(
        JSON.stringify({
          summary: "Error: No se ha configurado la API Key de Gemini. Añade GEMINI_API_KEY en las variables de entorno de Vercel.",
          title: "Error de configuración"
        }),
        { status: 200, headers: { "Content-Type": "application/json" } }
      );
    }
    const body = await request.json();
    const { url, title, description } = body;
    if (!title && !description) {
      return new Response(
        JSON.stringify({
          summary: "No hay suficiente información para resumir esta noticia.",
          title: "Sin información"
        }),
        { status: 200, headers: { "Content-Type": "application/json" } }
      );
    }
    let contentForAI = "";
    if (description && description.length > 50) {
      contentForAI = `Título: ${title}

Descripción/Contexto: ${description}`;
    } else {
      contentForAI = `Título: ${title}`;
    }
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
    const systemPrompt = "Eres un periodista experto y conciso. Tu tarea es generar resúmenes profesionales en español. Nunca pidas más información. Nunca saludes. Ve directo al grano.";
    const hasFullContent = description && description.length > 200;
    let userPrompt;
    if (hasFullContent) {
      userPrompt = `Resume la siguiente noticia en máximo 3 párrafos cortos. No repitas el título.

NOTICIA:
${contentForAI}`;
    } else {
      userPrompt = `Genera un breve párrafo explicativo (máximo 3-4 líneas) basado en este titular de noticia. No respondas con preguntas, solo da la información de forma profesional.

TITULAR: ${title}`;
    }
    const result = await model.generateContent({
      contents: [{ role: "user", parts: [{ text: `${systemPrompt}

${userPrompt}` }] }],
      generationConfig: {
        temperature: 0.1,
        maxOutputTokens: 400
      }
    });
    const response = result.response;
    const summary = response.text() || "La IA no devolvió ninguna respuesta.";
    return new Response(
      JSON.stringify({ summary, title }),
      { headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Summarization error:", error);
    return new Response(
      JSON.stringify({
        summary: `Error al generar el resumen: ${error.message || "Error desconocido"}`,
        title: "Error"
      }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  }
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  POST
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
