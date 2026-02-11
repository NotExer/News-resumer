import type { APIRoute } from 'astro';

export const POST: APIRoute = async ({ request }) => {
  try {
    const apiKey = import.meta.env.GROQ_API_KEY || process.env.GROQ_API_KEY;

    if (!apiKey || apiKey === 'your_groq_api_key_here') {
      return new Response(
        JSON.stringify({
          summary: 'Error: No se ha configurado la API Key de Groq. Añade GROQ_API_KEY en las variables de entorno de Vercel.',
          title: 'Error de configuración',
        }),
        { status: 200, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const body = await request.json();
    const { url, title, description } = body;

    if (!title && !description) {
      return new Response(
        JSON.stringify({
          summary: 'No hay suficiente información para resumir esta noticia.',
          title: 'Sin información',
        }),
        { status: 200, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const systemPrompt = 'Eres un periodista experto y conciso. Tu tarea es generar resúmenes profesionales en español. Nunca pidas más información. Nunca saludes. Ve directo al grano.';

    const hasFullContent = description && description.length > 200;
    let userPrompt: string;

    if (hasFullContent) {
      userPrompt = `Resume la siguiente noticia en máximo 3 párrafos cortos. No repitas el título.\n\nTítulo: ${title}\nDescripción: ${description}`;
    } else {
      userPrompt = `Genera un breve párrafo explicativo (máximo 3-4 líneas) basado en este titular de noticia. No respondas con preguntas, solo da la información de forma profesional.\n\nTITULAR: ${title}`;
    }

    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'llama-3.3-70b-versatile',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userPrompt },
        ],
        temperature: 0.1,
        max_tokens: 400,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Groq API error:', errorText);
      return new Response(
        JSON.stringify({
          summary: `Error de la IA: ${response.status} - ${errorText}`,
          title: 'Error',
        }),
        { status: 200, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const data = await response.json();
    const summary = data.choices?.[0]?.message?.content || 'La IA no devolvió ninguna respuesta.';

    return new Response(
      JSON.stringify({ summary, title }),
      { headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error: any) {
    console.error('Summarization error:', error);
    return new Response(
      JSON.stringify({
        summary: `Error al generar el resumen: ${error.message || 'Error desconocido'}`,
        title: 'Error',
      }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  }
};
