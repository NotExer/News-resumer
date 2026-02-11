import { renderers } from './renderers.mjs';
import { c as createExports } from './chunks/entrypoint_Ckl-nBrZ.mjs';
import { manifest } from './manifest_CREd5dL6.mjs';

const _page0 = () => import('./pages/_image.astro.mjs');
const _page1 = () => import('./pages/api/news.astro.mjs');
const _page2 = () => import('./pages/api/summarize.astro.mjs');
const _page3 = () => import('./pages/index.astro.mjs');

const pageMap = new Map([
    ["node_modules/astro/dist/assets/endpoint/generic.js", _page0],
    ["src/pages/api/news.ts", _page1],
    ["src/pages/api/summarize.ts", _page2],
    ["src/pages/index.astro", _page3]
]);
const serverIslandMap = new Map();
const _manifest = Object.assign(manifest, {
    pageMap,
    serverIslandMap,
    renderers,
    middleware: () => import('./_noop-middleware.mjs')
});
const _args = {
    "middlewareSecret": "76250239-41cb-4c85-a1b3-8d3e05b5bd96",
    "skewProtection": false
};
const _exports = createExports(_manifest, _args);
const __astrojsSsrVirtualEntry = _exports.default;

export { __astrojsSsrVirtualEntry as default, pageMap };
