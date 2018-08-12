var CACHE_NAME = 'neighborhood-cache-v1';
var urlsToCache = [
    '/',
    '/src/index.html',
    '/src/index.css',
    '/src/index.tsx',
    '/src/App.tsx',
    '/src/App.css',
    '/src/map/GoogleMap.tsx',
    '/src/map/InfoWindow.tsx',
    '/src/map/PlaceMarker.tsx',
    '/src/menu/AppMenu.tsx',
    '/src/menu/AppMenu.css',
    '/src/menu/Items.tsx',
    '/src/menu/Items.css',
    '/src/menu/Search.tsx',
    '/src/menu/Search.css',
];

self.addEventListener('install', function (event) {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(function (cache) {
                console.log('Opened cache');
                return cache.addAll(urlsToCache);
            })
    );
});

self.addEventListener('fetch', function (event) {
    console.log('fetch');
    event.respondWith(
        caches.match(event.request, { ignoreSearch: true })
            .then(function (response) {
                if (response) {
                    console.log('cache hit', event.request.url);
                    return response;
                }
                console.log('cache miss', event.request.url)
                return fetch(event.request);
            }
            )
    );
});