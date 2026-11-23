'use strict';
const CACHE = 'tolvuleikir-v3';
const ASSETS = [
  "./",
  "./index.html",
  "./style.css",
  "./app.js",
  "./manifest.webmanifest",
  "./assets/app.svg",
  "./assets/apple.svg",
  "./assets/ball.svg",
  "./assets/banana.svg",
  "./assets/blocks.svg",
  "./assets/brush.svg",
  "./assets/carrot.svg",
  "./assets/cup.svg",
  "./assets/document.svg",
  "./assets/folder-images.svg",
  "./assets/folder-sound.svg",
  "./assets/folder-text.svg",
  "./assets/hammer.svg",
  "./assets/headphones.svg",
  "./assets/icon-192.png",
  "./assets/icon-512.png",
  "./assets/key.svg",
  "./assets/kite.svg",
  "./assets/landscape.svg",
  "./assets/leaf.svg",
  "./assets/letter.svg",
  "./assets/medal.svg",
  "./assets/music.svg",
  "./assets/notebook.svg",
  "./assets/pack.svg",
  "./assets/pear.svg",
  "./assets/photo.svg",
  "./assets/portrait.svg",
  "./assets/robot.svg",
  "./assets/ruler.svg",
  "./assets/star.svg",
  "./assets/teddy.svg",
  "./assets/treasure.svg",
  "./assets/wrench.svg"
];
self.addEventListener('install', event => {
  event.waitUntil(caches.open(CACHE).then(cache => cache.addAll(ASSETS)));
});
self.addEventListener('activate', event => {
  event.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(key => key.startsWith('tolvuleikir-') && key !== CACHE).map(key => caches.delete(key)))).then(() => self.clients.claim()));
});
self.addEventListener('fetch', event => {
  const url = new URL(event.request.url);
  if (event.request.method !== 'GET' || url.origin !== self.location.origin) return;
  if (event.request.mode === 'navigate') {
    event.respondWith(caches.match('./index.html').then(cached => cached || fetch(event.request)));
    return;
  }
  event.respondWith(caches.match(event.request).then(cached => cached || fetch(event.request)));
});
