// Service worker for an installable, content-only site. Bump VERSION to drop old caches.
// Pages: network first (always fresh online), cached copy offline. Hashed build assets and icons: cache first.
// Images: stale-while-revalidate, capped. Nothing cross-origin, nothing but GET.
const VERSION = "v1";
const PAGES = `pages-${VERSION}`, STATIC = `static-${VERSION}`, IMAGES = `images-${VERSION}`;
const PRECACHE = ["/", "/resume", "/projects/guap", "/projects/baseline", "/offline", "/icons/icon-192.png", "/manifest.webmanifest"];
const MAX_IMAGES = 40;

self.addEventListener("install", (e) => {
  e.waitUntil(caches.open(PAGES).then((c) => c.addAll(PRECACHE)).then(() => self.skipWaiting()));
});
self.addEventListener("activate", (e) => {
  e.waitUntil(caches.keys().then((keys) => Promise.all(keys.filter((k) => ![PAGES, STATIC, IMAGES].includes(k)).map((k) => caches.delete(k)))).then(() => self.clients.claim()));
});

const trim = async (name, max) => { const c = await caches.open(name); const keys = await c.keys(); for (const k of keys.slice(0, Math.max(0, keys.length - max))) await c.delete(k); };

self.addEventListener("fetch", (e) => {
  const req = e.request;
  const url = new URL(req.url);
  if (req.method !== "GET" || url.origin !== self.location.origin) return;
  if (url.pathname.endsWith(".pdf") || url.pathname.startsWith("/resume.")) return; // resume files: always from the network

  if (req.mode === "navigate") {
    e.respondWith(
      fetch(req).then((res) => { if (res.ok) { const copy = res.clone(); caches.open(PAGES).then((c) => c.put(req, copy)); } return res; })
        .catch(async () => (await caches.match(req)) || (await caches.match("/offline")) || Response.error()),
    );
    return;
  }
  if (url.pathname.startsWith("/_next/static/") || url.pathname.startsWith("/icons/")) {
    e.respondWith(caches.match(req).then((hit) => hit || fetch(req).then((res) => { if (res.ok) { const copy = res.clone(); caches.open(STATIC).then((c) => c.put(req, copy)); } return res; })));
    return;
  }
  if (url.pathname.startsWith("/_next/image")) {
    e.respondWith(caches.open(IMAGES).then(async (c) => {
      const hit = await c.match(req);
      const net = fetch(req).then((res) => { if (res.ok) { c.put(req, res.clone()); trim(IMAGES, MAX_IMAGES); } return res; }).catch(() => hit);
      return hit || net;
    }));
  }
});
