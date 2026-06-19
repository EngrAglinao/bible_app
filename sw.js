/**
 * =============================================================================
 * SW.JS — Service Worker for Bible PWA
 * =============================================================================
 * Handles offline caching, PWA lifecycle, and push notification support.
 * Compatible with GitHub Pages sub-directory deployment.
 * =============================================================================
 */

const CACHE_NAME = 'bible-pwa-v1.0.0';
const OFFLINE_URL = './index.html';

const ASSETS_TO_CACHE = [
  './',
  './index.html',
  './bibleData.js',
  './sw.js',
  'https://fonts.googleapis.com/css2?family=Google+Sans:wght@300;400;500;700&family=Google+Sans+Display:wght@400;500;700&display=swap',
  'https://fonts.googleapis.com/icon?family=Material+Icons+Round'
];

// ============================================================
// INSTALL EVENT — Cache all core assets
// ============================================================
self.addEventListener('install', (event) => {
  console.log('[SW] Installing service worker...');
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('[SW] Caching core assets');
      return cache.addAll(ASSETS_TO_CACHE.map(url => {
        return new Request(url, { mode: 'no-cors' });
      })).catch(err => {
        console.warn('[SW] Some assets failed to cache:', err);
      });
    })
  );
  self.skipWaiting();
});

// ============================================================
// ACTIVATE EVENT — Clean up old caches
// ============================================================
self.addEventListener('activate', (event) => {
  console.log('[SW] Activating service worker...');
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter(name => name !== CACHE_NAME)
          .map(name => {
            console.log('[SW] Deleting old cache:', name);
            return caches.delete(name);
          })
      );
    })
  );
  self.clients.claim();
});

// ============================================================
// FETCH EVENT — Network first, cache fallback strategy
// ============================================================
self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;

  const url = new URL(event.request.url);

  // Skip Firebase and Google Auth requests
  if (
    url.hostname.includes('firebaseapp.com') ||
    url.hostname.includes('googleapis.com') ||
    url.hostname.includes('firebase.com') ||
    url.hostname.includes('google.com')
  ) {
    return;
  }

  event.respondWith(
    fetch(event.request)
      .then((response) => {
        if (response && response.status === 200) {
          const cloned = response.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(event.request, cloned));
        }
        return response;
      })
      .catch(() => {
        return caches.match(event.request).then((cached) => {
          if (cached) return cached;
          if (event.request.mode === 'navigate') {
            return caches.match(OFFLINE_URL);
          }
          return new Response('Offline - content not available', { status: 503 });
        });
      })
  );
});

// ============================================================
// PUSH NOTIFICATION HANDLER
// ============================================================
self.addEventListener('push', (event) => {
  const data = event.data ? event.data.json() : {};
  const title = data.title || 'Bible PWA';
  const options = {
    body: data.body || 'You have a new notification',
    icon: data.icon || './icon-192.png',
    badge: './icon-72.png',
    data: { url: data.url || './' },
    actions: [
      { action: 'open', title: 'Open App' },
      { action: 'dismiss', title: 'Dismiss' }
    ]
  };

  event.waitUntil(self.registration.showNotification(title, options));
});

// ============================================================
// NOTIFICATION CLICK HANDLER
// ============================================================
self.addEventListener('notificationclick', (event) => {
  event.notification.close();

  if (event.action === 'dismiss') return;

  const urlToOpen = event.notification.data?.url || './';

  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then((clientList) => {
      for (const client of clientList) {
        if (client.url.includes(self.location.origin) && 'focus' in client) {
          client.postMessage({ type: 'NOTIFICATION_CLICK', url: urlToOpen });
          return client.focus();
        }
      }
      return clients.openWindow(urlToOpen);
    })
  );
});

// ============================================================
// MESSAGE HANDLER — For local notification fallback triggers
// ============================================================
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }

  if (event.data && event.data.type === 'LOCAL_NOTIFY') {
    const { title, body, url } = event.data;
    self.registration.showNotification(title || 'Bible PWA', {
      body: body || '',
      icon: './icon-192.png',
      data: { url: url || './' }
    });
  }
});

console.log('[SW] ✅ Service Worker script parsed successfully.');
