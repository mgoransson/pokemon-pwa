self.addEventListener('install', event => {
  console.log('ServiceWorker installerad');
});

self.addEventListener('fetch', event => {
  event.respondWith(fetch(event.request));
});
