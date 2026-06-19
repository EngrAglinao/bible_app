// ================================================================
//  BibleVault Service Worker
//  Manages offline caching, PWA lifecycle, and asset versioning
// ================================================================

const CACHE_NAME = 'biblevault-v1';
const STATIC_ASSETS = [
  './',
  './index.html',
  './bibleData.js',
  './manifest.json',
  'https://fonts.googleapis.com/css2?family=Google+Sans:ital,wght@0,400;0,500;0,700;1,400;1,500&display=swap',
  'https://fonts.googleapis.com/icon?family=Material+Icons+Round'
];

// Install event — cache static assets
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(STATIC_ASSETS))
  );
  self.skipWaiting();
});

// Activate event — clean old caches
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

// Fetch event — cache-first for static, network-first for Firestore
self.addEventListener('fetch', event => {
  const url = new URL(event.request.url);

  // Network-first for Firebase API calls
  if (url.hostname.includes('firestore.googleapis.com') ||
      url.hostname.includes('firebase') ||
      url.hostname.includes('googleapis.com')) {
    event.respondWith(
      fetch(event.request).catch(() => caches.match(event.request))
    );
    return;
  }

  // Cache-first for static assets
  event.respondWith(
    caches.match(event.request).then(cached => {
      if (cached) return cached;
      return fetch(event.request).then(response => {
        if (!response || response.status !== 200 || response.type === 'opaque') return response;
        const clone = response.clone();
        caches.open(CACHE_NAME).then(cache => cache.put(event.request, clone));
        return response;
      }).catch(() => caches.match('./index.html'));
    })
  );
});

// Push notification handler (FCM)
self.addEventListener('push', event => {
  const data = event.data?.json() || {};
  const options = {
    body:  data.body  || 'You have a new notification from BibleVault.',
    icon:  './icons/icon-192.png',
    badge: './icons/icon-192.png',
    data:  { url: data.url || './' },
    actions: [
      { action: 'open', title: 'Open BibleVault' },
      { action: 'close', title: 'Dismiss' }
    ]
  };
  event.waitUntil(self.registration.showNotification(data.title || 'BibleVault', options));
});

// Notification click handler — deep linking
self.addEventListener('notificationclick', event => {
  event.notification.close();
  if (event.action === 'close') return;
  const url = event.notification.data?.url || './';
  event.waitUntil(
    clients.matchAll({ type: 'window' }).then(windowClients => {
      const existing = windowClients.find(c => c.url.includes('index.html'));
      if (existing) { existing.focus(); existing.navigate(url); }
      else clients.openWindow(url);
    })
  );
});