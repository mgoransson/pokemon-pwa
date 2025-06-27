const CACHE_NAME = 'pokemon-go-pwa-v1.03';
const ASSETS_TO_CACHE = [
  '/',
  '/index.html',
  '/assets/images/pokemon/bulbasaur.gif',
  '/assets/images/pokemon/charmander.gif',
  '/assets/images/pokemon/squirtle.gif',
  '/assets/images/pokemon/pikachu.gif',
  '/assets/images/pokeball.png',
  '/assets/images/map.jpg',
  '/assets/images/background.jpg',
  // lägg till fler assets och pokemon-gifs här
];

// Install-eventet: cacha viktiga filer
self.addEventListener('install', event => {
  console.log('ServiceWorker installerad och cachear assets');
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(ASSETS_TO_CACHE))
  );
});

// Fetch-eventet: svara från cache om möjligt, annars från nätet
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(cachedResponse => {
        if (cachedResponse) {
          return cachedResponse;
        }
        return fetch(event.request).catch(() => {
          // Returnera en tom svar istället för att kasta fel
          return new Response(null, { status: 204, statusText: 'No Content' });
        });
      })
  );
});

// Optional: rensa gammal cache vid aktivering
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys.filter(key => key !== CACHE_NAME)
          .map(key => caches.delete(key))
      );
    })
  );
});
