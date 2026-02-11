const h="",l=document.getElementById("news-grid"),c=document.getElementById("summary-modal"),g=document.getElementById("modal-title"),m=document.getElementById("modal-content");let n="Todo",u="es",b="ES",d=!1;async function p(){if(l){l.classList.remove("opacity-100"),l.classList.add("opacity-40");try{let t=`${h}/api/news?lang=${u}&country=${b}`;n&&n!=="Todo"&&(t+=`&category=${n}`);const r=await(await fetch(t)).json();x(r)}catch(t){console.error("Error fetching news:",t),l.innerHTML='<p class="col-span-full text-center py-20 opacity-40">Error al cargar noticias. ¿Está encendido el servidor backend?</p>'}finally{l.classList.remove("opacity-0","opacity-40"),l.classList.add("opacity-100","translate-y-0")}}}function x(t){if(l){if(!t||t.length===0){l.innerHTML='<p class="col-span-full text-center py-20 opacity-40">No se encontraron noticias.</p>';return}l.innerHTML=t.map(e=>`
				<div class="bg-white rounded-2xl p-6 shadow-[0_4px_24px_rgba(0,0,0,0.04)] border border-black/5 hover:shadow-[0_8px_32px_rgba(0,0,0,0.08)] transition-all duration-300 group flex flex-col h-full">
					<div class="flex-1">
						<div class="flex items-center gap-2 mb-3">
							<span class="text-[10px] font-bold uppercase tracking-wider text-apple-blue bg-apple-blue/10 px-2 py-0.5 rounded-full">${e.source||"Noticia"}</span>
							<span class="text-[10px] text-black/40 font-medium">${e.published_date?new Date(e.published_date).toLocaleDateString():"Reciente"}</span>
						</div>
						<h3 class="text-xl font-semibold leading-tight mb-3 group-hover:text-apple-blue transition-colors">
							<a href="${e.url}" target="_blank" rel="noopener noreferrer">${e.title}</a>
						</h3>
						<p class="text-[15px] leading-relaxed text-black/60 line-clamp-3 mb-4">
							${e.description||"Sin descripción disponible."}
						</p>
					</div>
					
					<div class="flex items-center gap-3 mt-4 pt-4 border-t border-black/5">
						<button 
							data-url="${e.url}"
							data-title="${e.title.replace(/"/g,"&quot;")}"
							data-description="${(e.description||"").replace(/"/g,"&quot;")}"
							class="summarize-btn flex-1 bg-black text-white text-sm font-medium py-2 px-4 rounded-xl hover:bg-black/80 transition-all flex items-center justify-center gap-2"
						>
							<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-sparkles"><path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.937A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .962 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.582a.5.5 0 0 1 0 .962L15.5 14.063A2 2 0 0 0 14.063 15.5L12.5 21.635a.5.5 0 0 1-.962 0L9.937 15.5Z"/><path d="M20 3v4"/><path d="M22 5h-4"/><path d="M4 17v2"/><path d="M5 18H3"/></svg>
							Resumir con IA
						</button>
						<a 
							href="${e.url}" 
							target="_blank" 
							class="p-2 rounded-xl border border-black/10 hover:bg-black/5 transition-all text-black/40 hover:text-black/80"
						>
							<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-external-link"><path d="M15 3h6v6"/><path d="M10 14 21 3"/><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/></svg>
						</a>
					</div>
				</div>
			`).join(""),document.querySelectorAll(".summarize-btn").forEach(e=>{e.addEventListener("click",async()=>{if(d)return;const r=e.getAttribute("data-url"),a=e.getAttribute("data-title"),o=e.getAttribute("data-description");y(r,a,o,e)})})}}async function y(t,e,r,a){if(d)return;d=!0;const o=a.innerHTML;document.querySelectorAll(".summarize-btn").forEach(i=>{const s=i;s.disabled=!0,s.classList.add("opacity-50","cursor-not-allowed")}),a.classList.remove("opacity-50"),a.classList.add("ring-2","ring-apple-blue/50"),a.innerHTML=`
                <div class="flex items-center gap-2">
                    <svg class="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <span>Resumiendo...</span>
                </div>
            `;try{const s=await(await fetch(`${h}/api/summarize`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({url:t,title:e,description:r})})).json();g&&(g.innerText=e),m&&(m.innerHTML=s.summary.replace(/\n/g,"<br>")),c&&(c.classList.remove("hidden"),c.classList.add("flex"))}catch(i){console.error("Error summarizing:",i),alert("No se pudo resumir la noticia. Verifica el servidor y la API Key.")}finally{d=!1,document.querySelectorAll(".summarize-btn").forEach(i=>{const s=i;s.disabled=!1,s.classList.remove("opacity-50","cursor-not-allowed","ring-2","ring-apple-blue/50")}),a.innerHTML=o}}p();function f(){document.querySelectorAll(".lang-filter").forEach(t=>{t.getAttribute("data-lang")===u?(t.classList.add("bg-white","shadow-sm","text-black"),t.classList.remove("text-black/40")):(t.classList.remove("bg-white","shadow-sm","text-black"),t.classList.add("text-black/40"))})}f();document.querySelectorAll(".category-filter").forEach(t=>{const e=t,r=e.innerText.trim();r==="Todo"&&(e.classList.add("bg-black","text-white"),e.classList.remove("bg-black/5","text-black/60")),e.addEventListener("click",()=>{n=r,p(),document.querySelectorAll(".category-filter").forEach(a=>{const o=a;o.classList.remove("bg-black","text-white"),o.classList.add("bg-black/5","text-black/60")}),e.classList.add("bg-black","text-white"),e.classList.remove("bg-black/5","text-black/60")})});document.querySelectorAll(".lang-filter").forEach(t=>{t.addEventListener("click",()=>{u=t.getAttribute("data-lang")||"es",b=t.getAttribute("data-country")||"ES",f(),p()})});[document.getElementById("close-modal"),document.getElementById("close-modal-btn")].forEach(t=>{t&&t.addEventListener("click",()=>{c&&(c.classList.add("hidden"),c.classList.remove("flex"))})});
