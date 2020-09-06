self.addEventListener('install', function(e) {
 e.waitUntil(
   caches.open('weatherapp').then(function(cache) {
     return cache.addAll([
       '/',
       'index.html',
       '/?homescreen=1',
       'main.css',
       'main.js'
     ]);
   })
 );
});

self.addEventListener('fetch', function(event) {
  console.log(event.request.url);

  event.respondWith(
    caches.match(event.request).then(function(response) {
      return response || fetch(event.request);
    })
  );
});
 