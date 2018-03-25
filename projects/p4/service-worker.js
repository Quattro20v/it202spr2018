var cacheName = 'weatherPWA-step-6-1';
var filesToCache = [
  'https://preview.c9users.io/mvaras2/it202spr2018/projects/p4/',
  'https://preview.c9users.io/mvaras2/it202spr2018/projects/p4/index.html',
  'https://preview.c9users.io/mvaras2/it202spr2018/projects/p4/scripts/app.js',
  'https://preview.c9users.io/mvaras2/it202spr2018/projects/p4/styles/inline.css',
  'https://preview.c9users.io/mvaras2/it202spr2018/projects/p4/images/clear.png',
  'https://preview.c9users.io/mvaras2/it202spr2018/projects/p4/images/cloudy-scattered-showers.png',
  'https://preview.c9users.io/mvaras2/it202spr2018/projects/p4/images/cloudy.png',
  'https://preview.c9users.io/mvaras2/it202spr2018/projects/p4/images/fog.png',
  'https://preview.c9users.io/mvaras2/it202spr2018/projects/p4/images/ic_add_white_24px.svg',
  'https://preview.c9users.io/mvaras2/it202spr2018/projects/p4/images/ic_refresh_white_24px.svg',
  'https://preview.c9users.io/mvaras2/it202spr2018/projects/p4/images/partly-cloudy.png',
  'https://preview.c9users.io/mvaras2/it202spr2018/projects/p4/images/rain.png',
  'https://preview.c9users.io/mvaras2/it202spr2018/projects/p4/images/scattered-showers.png',
  'https://preview.c9users.io/mvaras2/it202spr2018/projects/p4/images/sleet.png',
  'https://preview.c9users.io/mvaras2/it202spr2018/projects/p4/images/snow.png',
  'https://preview.c9users.io/mvaras2/it202spr2018/projects/p4/images/thunderstorm.png',
  'https://preview.c9users.io/mvaras2/it202spr2018/projects/p4/images/wind.png'
];

self.addEventListener('install', function(e) {
  console.log('[ServiceWorker] Install');
  e.waitUntil(
    caches.open(cacheName).then(function(cache) {
      console.log('[ServiceWorker] Caching app shell');
      return cache.addAll(filesToCache);
    })
  );
});

self.addEventListener('activate', function(e) {
  console.log('[ServiceWorker] Activate');
  e.waitUntil(
    caches.keys().then(function(keyList) {
      return Promise.all(keyList.map(function(key) {
        if (key !== cacheName) {
          console.log('[ServiceWorker] Removing old cache', key);
          return caches.delete(key);
        }
      }));
    })
  );
  return self.clients.claim();
});

self.addEventListener('fetch', function(e) {
  console.log('[ServiceWorker] Fetch', e.request.url);
  e.respondWith(
    caches.match(e.request).then(function(response) {
      return response || fetch(e.request);
    })
  );
});