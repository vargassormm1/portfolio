// Service worker for an installable, content-only site. Generated into public/sw.js at build time
// (scripts/build-sw.mjs) with VERSION set to the commit, so every deploy installs fresh caches and drops old ones.
// Pages: network first (always fresh online), cached copy offline. Hashed build assets and icons: cache first.
// Images: stale-while-revalidate, capped. Nothing cross-origin, nothing but GET.
const VERSION = "__VERSION__";
const PAGES = `pages-${VERSION}`, STATIC = `static-${VERSION}`, IMAGES = `images-${VERSION}`;
// /resume is deliberately not precached: it's only ever cached after a visit, and expires like any other page.
const PRECACHE = ["/", "/projects/guap", "/projects/baseline", "/offline"];
const MAX_PAGES = 30, MAX_STATIC = 120, MAX_IMAGES = 40;
const PAGE_MAX_AGE = 14 * 24 * 3600 * 1000; // offline copies older than this show the offline page instead

self.addEventListener("install", (e) => {
  e.waitUntil(caches.open(PAGES).then((c) => Promise.all(PRECACHE.map((p) => fetch(p).then((r) => (r.ok ? c.put(self.location.origin + p, r) : undefined))))).then(() => self.skipWaiting()));
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
    const key = url.origin + url.pathname; // ignore ?utm_… and other query strings
    e.respondWith(
      fetch(req).then((res) => {
        if (res.ok && !res.redirected) { const copy = res.clone(); e.waitUntil(caches.open(PAGES).then((c) => c.put(key, copy)).then(() => trim(PAGES, MAX_PAGES))); }
        return res;
      }).catch(async () => {
        const hit = await caches.match(key, { cacheName: PAGES });
        const age = hit ? Date.now() - Date.parse(hit.headers.get("date") || "") : Infinity;
        if (hit && age < PAGE_MAX_AGE) return hit;
        return (await caches.match(url.origin + "/offline", { cacheName: PAGES })) || Response.error();
      }),
    );
    return;
  }
  if (url.pathname.startsWith("/_next/static/") || url.pathname.startsWith("/icons/")) {
    e.respondWith(caches.match(req).then((hit) => hit || fetch(req).then((res) => { if (res.ok) { const copy = res.clone(); e.waitUntil(caches.open(STATIC).then((c) => c.put(req, copy)).then(() => trim(STATIC, MAX_STATIC))); } return res; })));
    return;
  }
  if (url.pathname.startsWith("/_next/image")) {
    e.respondWith(caches.open(IMAGES).then(async (c) => {
      const hit = await c.match(req);
      const net = fetch(req).then((res) => { if (res.ok) e.waitUntil(c.put(req, res.clone()).then(() => trim(IMAGES, MAX_IMAGES))); return res; });
      if (hit) { e.waitUntil(net.catch(() => {})); return hit; }
      return net.catch(() => Response.error());
    }));
  }
});
