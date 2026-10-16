// La Ronda: primero la red (preguntando siempre al servidor si hay versión nueva, sin fiarse de la caché del móvil)
// y, sin conexión, lo último guardado.
const CACHE = 'la-ronda-v3';
self.addEventListener('install', e => { self.skipWaiting(); });
self.addEventListener('activate', e => { e.waitUntil(self.clients.claim()); });
self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET' || new URL(req.url).origin !== self.location.origin) return;
  e.respondWith(fetch(req, {cache:'no-cache'}).then(res => { const copy = res.clone(); caches.open(CACHE).then(c => c.put(req, copy)); return res; })
    .catch(() => caches.match(req).then(r => r || caches.match('./'))));
});
