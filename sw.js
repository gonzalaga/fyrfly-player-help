const CACHE_VERSION = "fyrfly-help-v1";
const STATIC_CACHE = `${CACHE_VERSION}-static`;
const FAQ_CACHE = `${CACHE_VERSION}-faq`;

const STATIC_ASSETS = [
  "/",
  "/index.html",
  "/offline.html",
  "/manifest.webmanifest",
  "/assets/remix8-logo.png",
  "/assets/apple-touch-icon.png",
  "/assets/icons/remix8-192.png",
  "/assets/icons/remix8-512.png"
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(STATIC_CACHE)
      .then((cache) => cache.addAll(STATIC_ASSETS))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) => Promise.all(
      keys
        .filter((key) => ![STATIC_CACHE, FAQ_CACHE].includes(key))
        .map((key) => caches.delete(key))
    )).then(() => self.clients.claim())
  );
});

function shouldBypassCache(url) {
  return url.pathname.startsWith("/admin") || url.pathname.startsWith("/.netlify");
}

async function networkFirstFaq(request) {
  const cache = await caches.open(FAQ_CACHE);
  try {
    const response = await fetch(request);
    if (response.ok) {
      await cache.put("/manual-faqs.json", response.clone());
    }
    return response;
  } catch (error) {
    return await cache.match("/manual-faqs.json") || new Response("{\"faqs\":[]}", {
      headers: { "Content-Type": "application/json" }
    });
  }
}

async function cacheFirst(request) {
  const cached = await caches.match(request);
  if (cached) {
    return cached;
  }
  const response = await fetch(request);
  if (response.ok) {
    const cache = await caches.open(STATIC_CACHE);
    await cache.put(request, response.clone());
  }
  return response;
}

async function navigationFallback(request) {
  try {
    return await fetch(request);
  } catch (error) {
    return await caches.match("/offline.html");
  }
}

self.addEventListener("fetch", (event) => {
  const url = new URL(event.request.url);

  if (url.origin !== self.location.origin || shouldBypassCache(url)) {
    return;
  }

  if (url.pathname === "/manual-faqs.json") {
    event.respondWith(networkFirstFaq(event.request));
    return;
  }

  if (event.request.mode === "navigate") {
    event.respondWith(navigationFallback(event.request));
    return;
  }

  if (event.request.method === "GET") {
    event.respondWith(cacheFirst(event.request));
  }
});
