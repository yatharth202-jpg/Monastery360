// Monastery360 — offline-first service worker
// Owner: Samrat (Team Leader & Deployment Lead)
//
// Caches the app shell (HTML/CSS/JS) so the site still opens with no signal —
// directly answering the "poor connectivity in remote Sikkim" problem named
// in the strategy report. External assets (monastery photos, 360 panoramas,
// map tiles, fonts) are network-only: caching multi-MB images would blow the
// storage quota fast, so those simply won't load offline — an honest tradeoff,
// not a silent failure.

const CACHE_NAME = 'monastery360-shell-v1';
const APP_SHELL = [
  './',
  './index.html',
  './style.css',
  './script.js',
  './manifest.json'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(APP_SHELL))
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  const { request } = event;

  // Only handle same-origin app-shell requests; let everything else
  // (CDN libraries, Wikimedia photos, map tiles, Sketchfab) go to the network.
  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return;

  event.respondWith(
    caches.match(request).then((cached) => {
      if (cached) return cached;
      return fetch(request).catch(() =>
        new Response(
          '<html><body style="font-family:sans-serif;padding:2rem;background:#1F2A44;color:#F1E7D0;"><h2>You\'re offline</h2><p>This page isn\'t cached yet. Reconnect once to let Monastery360 cache the app shell for future offline use.</p></body></html>',
          { headers: { 'Content-Type': 'text/html' } }
        )
      );
    })
  );
});
