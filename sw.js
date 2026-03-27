/**
 * Service Worker for LFULeaks PWA
 * Provides caching with network-first for HTML, cache-first for assets
 *
 * Cache version is updated on each deploy via deploy.bat
 */

const CACHE_VERSION = "1774569663";
const CACHE_NAME = `lfuleaks-v${CACHE_VERSION}`;

const urlsToCache = [
  "/LFULeaks/",
  "/LFULeaks/index.html",
  "/LFULeaks/manifest.json",
];

// Install event - cache core resources and skip waiting
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(urlsToCache).catch((err) => {
        console.error("Cache addAll failed:", err);
      });
    })
  );
  // Immediately activate new service worker
  self.skipWaiting();
});

// Fetch event - network-first for HTML, cache-first for assets
self.addEventListener("fetch", (event) => {
  const url = new URL(event.request.url);

  // Network-first for HTML files (always get fresh content)
  if (
    event.request.mode === "navigate" ||
    url.pathname.endsWith(".html") ||
    url.pathname.endsWith("/")
  ) {
    event.respondWith(
      fetch(event.request)
        .then((response) => {
          // Clone and cache the fresh response
          const responseClone = response.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, responseClone);
          });
          return response;
        })
        .catch(() => {
          // Fallback to cache if network fails
          return caches.match(event.request);
        })
    );
    return;
  }

  // Cache-first for other assets (images, manifest, etc.)
  event.respondWith(
    caches.match(event.request).then((response) => {
      return (
        response ||
        fetch(event.request).then((fetchResponse) => {
          // Cache new assets
          const responseClone = fetchResponse.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, responseClone);
          });
          return fetchResponse;
        })
      );
    })
  );
});

// Activate event - clean up old caches and claim clients
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (cacheName !== CACHE_NAME && cacheName.startsWith("lfuleaks-")) {
              console.log("Deleting old cache:", cacheName);
              return caches.delete(cacheName);
            }
          })
        );
      })
      .then(() => {
        // Take control of all clients immediately
        return self.clients.claim();
      })
  );
});
