/* empty css                                 */
import { c as createComponent, d as addAttribute, r as renderHead, e as renderSlot, f as renderTemplate, g as createAstro, h as renderComponent, m as maybeRenderHead } from '../chunks/astro/server_BvP1pndJ.mjs';
import 'kleur/colors';
import 'clsx';
export { renderers } from '../renderers.mjs';

const $$Astro = createAstro();
const $$BaseLayout = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$BaseLayout;
  const { title } = Astro2.props;
  return renderTemplate`<html lang="es"> <head><meta charset="UTF-8"><meta name="description" content="News Resumer - Apple Style"><meta name="viewport" content="width=device-width"><link rel="icon" type="image/svg+xml" href="/favicon.svg"><link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet"><meta name="generator"${addAttribute(Astro2.generator, "content")}><title>${title}</title>${renderHead()}</head> <body class="bg-[#f5f5f7] min-h-screen"> <nav class="sticky top-0 z-50 glass h-12 flex items-center px-6 justify-between border-b border-black/5"> <div class="flex items-center gap-8"> <a href="/" class="text-xl font-semibold tracking-tight opacity-90">News Resumer</a> <div class="hidden md:flex gap-6 text-sm font-medium opacity-60"> <a href="#" class="hover:opacity-100 transition-opacity">Tecnología</a> <a href="#" class="hover:opacity-100 transition-opacity">Ciencia</a> <a href="#" class="hover:opacity-100 transition-opacity">Negocios</a> <a href="#" class="hover:opacity-100 transition-opacity">Salud</a> </div> </div> </nav> <main class="max-w-5xl mx-auto px-6 py-12"> ${renderSlot($$result, $$slots["default"])} </main> <footer class="py-12 border-t border-black/5 text-center text-sm opacity-40"> <p>&copy; 2026 News Resumer. White & Minimalist.</p> </footer> </body></html>`;
}, "C:/Users/samur/Downloads/News-resumer/frontend/src/layouts/BaseLayout.astro", void 0);

const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, { "title": "News Resumer - Noticias Recientes", "data-astro-cid-j7pv25f6": true }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<header class="mb-12" data-astro-cid-j7pv25f6> <h1 class="text-5xl font-bold tracking-tight mb-4" data-astro-cid-j7pv25f6>Lo último.</h1> <p class="text-xl text-black/40 font-medium" data-astro-cid-j7pv25f6>
Noticias de Google, resumidas con precisión por IA.
</p> </header> <div class="flex flex-wrap justify-between items-center gap-6 mb-8" data-astro-cid-j7pv25f6> <div class="flex gap-3 overflow-x-auto no-scrollbar" data-astro-cid-j7pv25f6> ${[
    "Todo",
    "Tecnolog\xEDa",
    "Ciencia",
    "Negocios",
    "Salud",
    "Entretenimiento",
    "Deportes"
  ].map((cat) => renderTemplate`<button class="category-filter whitespace-nowrap px-5 py-2 rounded-full bg-black/5 text-black/60 text-sm font-medium hover:bg-black/10 transition-all border border-transparent" data-astro-cid-j7pv25f6> ${cat} </button>`)} </div> <div class="flex gap-2 bg-black/5 p-1 rounded-2xl border border-black/5" data-astro-cid-j7pv25f6> ${[
    { label: "\u{1F1EA}\u{1F1F8} ES", lang: "es", country: "ES" },
    { label: "\u{1F1FA}\u{1F1F8} EN", lang: "en", country: "US" },
    { label: "\u{1F1E7}\u{1F1F7} PT", lang: "pt", country: "BR" }
  ].map((l) => renderTemplate`<button${addAttribute(l.lang, "data-lang")}${addAttribute(l.country, "data-country")} class="lang-filter px-3 py-1.5 rounded-xl text-xs font-bold transition-all hover:bg-white" data-astro-cid-j7pv25f6> ${l.label} </button>`)} </div> </div> <div id="news-grid" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 opacity-0 translate-y-4 transition-all duration-700" data-astro-cid-j7pv25f6> <!-- News items will be injected here --> <div class="col-span-full py-20 text-center opacity-40" data-astro-cid-j7pv25f6> <div class="animate-spin inline-block w-8 h-8 border-[3px] border-current border-t-transparent text-black rounded-full" role="status" aria-label="loading" data-astro-cid-j7pv25f6></div> <p class="mt-4 font-medium" data-astro-cid-j7pv25f6>Buscando noticias frescas...</p> </div> </div>  <div id="summary-modal" class="fixed inset-0 z-[100] flex items-center justify-center p-6 opacity-0 pointer-events-none" data-astro-cid-j7pv25f6> <div id="summary-modal-card" class="bg-white rounded-3xl w-full max-w-2xl shadow-2xl overflow-hidden" data-astro-cid-j7pv25f6> <div class="p-8" data-astro-cid-j7pv25f6> <div class="flex justify-between items-start mb-6" data-astro-cid-j7pv25f6> <div data-astro-cid-j7pv25f6> <span class="text-[10px] font-bold uppercase tracking-wider text-apple-blue bg-apple-blue/10 px-2 py-0.5 rounded-full mb-2 inline-block" data-astro-cid-j7pv25f6>Resumen IA</span> <h2 id="modal-title" class="text-2xl font-bold leading-tight" data-astro-cid-j7pv25f6></h2> </div> <button id="close-modal" class="p-2 rounded-full hover:bg-black/5 transition-all text-black/60 hover:text-black" data-astro-cid-j7pv25f6> <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-x" data-astro-cid-j7pv25f6><path d="M18 6 6 18" data-astro-cid-j7pv25f6></path><path d="m6 6 12 12" data-astro-cid-j7pv25f6></path></svg> </button> </div> <div id="modal-content" class="text-lg leading-relaxed text-black/80 prose prose-slate max-h-[50vh] overflow-y-auto pr-2" data-astro-cid-j7pv25f6> <!-- Summary text --> </div> </div> <div class="bg-[#f5f5f7] p-6 flex justify-end" data-astro-cid-j7pv25f6> <button id="close-modal-btn" class="bg-black text-white text-sm font-semibold px-8 py-3 rounded-2xl hover:bg-black/80 transition-all shadow-lg" data-astro-cid-j7pv25f6>
Entendido
</button> </div> </div> </div>   ` })}`;
}, "C:/Users/samur/Downloads/News-resumer/frontend/src/pages/index.astro", void 0);

const $$file = "C:/Users/samur/Downloads/News-resumer/frontend/src/pages/index.astro";
const $$url = "";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	default: $$Index,
	file: $$file,
	url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
