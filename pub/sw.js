var CACHE_NAME = "lil-cache-v1";
//new
var urlsToCache = [
  "/",
  "script.js",
  "android-chrome-192x192.png",
  "android-chrome-384x384.png",
  "apple-touch-icon.png",
  "favicon-16x16.png",
  "favicon-32x32.png",
  "favicon.ico",
  "mstile-150x150.png",
  "safari-pinned-tab.svg",
  "vue.js"
];

self.addEventListener("install", function(event) {
  console.log("installing");
  // Perform install steps
  event.waitUntil(
    caches.open(CACHE_NAME).then(function(cache) {
      console.log("Opened cache");
      return cache.addAll(urlsToCache).then(function() {
        console.log("All resources have been fetched and cached.");
      });
    })
  );
});

self.addEventListener("fetch", function(event) {
  event.respondWith(
    caches.match(event.request).then(function(response) {
      return response || fetch(event.request);
    })
  );
});

self.addEventListener("message", function(event) {
  this.console.log("message received " + event.data.action);
  if (event.data.action == "skipWaiting") {
    self.skipWaiting();
  }
});

self.addEventListener("activate", function(event) {
  var OLD_CACHE = "lil-cache-";
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.map(function(cacheName) {
          if (cacheName.includes(OLD_CACHE) && cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
