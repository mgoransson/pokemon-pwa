if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('service-worker.js')
      .then(reg => console.log('ServiceWorker registrerad!', reg))
      .catch(err => console.log('ServiceWorker fel:', err));
  });
}
