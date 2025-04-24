self.addEventListener('install', event => {
  event.waitUntil(
    caches.open('dual-info-cache-v1').then(cache => {
      return cache.addAll([
        'index.html',
        'menu.html',
        'triad.html',
        'assistant.html',
        'splash.html',
        'manifest.json',
        'scripts/chat.js',
        'scripts/triad.js',
        'scripts/assistant.js',
        'data/dados.json',
        'data/triads.json',
        'assets/icons/icon-192.png',
        'assets/icons/icon-512.png',
        // Pode adicionar também seus PDFs específicos depois, se quiser
      ]);
    })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});