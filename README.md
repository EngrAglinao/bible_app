# 📖 BibleVault — Progressive Web App

> **A fully responsive, offline-capable Scripture study Progressive Web App built as a zero-dependency Single Page Application.**

[![PWA Ready](https://img.shields.io/badge/PWA-Ready-brightgreen?style=flat-square&logo=googlechrome)](https://web.dev/progressive-web-apps/)
[![Firebase](https://img.shields.io/badge/Firebase-v10-orange?style=flat-square&logo=firebase)](https://firebase.google.com/)
[![Material Design 3](https://img.shields.io/badge/Material-Design_3-blue?style=flat-square)](https://m3.material.io/)
[![Zero NPM](https://img.shields.io/badge/NPM_Dependencies-Zero-success?style=flat-square)](.)
[![Google Sans](https://img.shields.io/badge/Font-Google_Sans-red?style=flat-square)](https://fonts.google.com/)

---

## Table of Contents

1. [Architecture Overview](#1-architecture-overview)
2. [File Structure](#2-file-structure)
3. [SPA Navigation Mechanics](#3-spa-navigation-mechanics)
4. [Firebase Configuration Checklist](#4-firebase-configuration-checklist)
5. [Production Security Rules](#5-production-security-rules)
6. [bibleData.js Schema Reference](#6-bibledatajs-schema-reference)
7. [Feature Documentation](#7-feature-documentation)
8. [GitHub Pages Deployment](#8-github-pages-deployment)
9. [PWA Service Worker & Caching](#9-pwa-service-worker--caching)
10. [Push Notifications Setup](#10-push-notifications-setup)
11. [Admin Console](#11-admin-console)
12. [Troubleshooting](#12-troubleshooting)

---

## 1. Architecture Overview

BibleVault is engineered with a **zero-dependency philosophy** — no Node.js, no npm, no build tools, no bundlers. Every feature runs natively in the browser using:

| Technology | Purpose | Source |
|---|---|---|
| **HTML5** | Single-file SPA shell | Native |
| **CSS3 Custom Properties** | Material Design 3 theming | Native |
| **ES Modules** | Firebase SDK loading | CDN (gstatic.com) |
| **Web Speech API** | Audio Bible (TTS) | Native Browser |
| **IndexedDB / CacheAPI** | Offline persistence | Native Browser |
| **Service Worker** | PWA caching & lifecycle | Native Browser |
| **Firebase Auth v10** | Google Sign-In | CDN |
| **Firebase Firestore v10** | Community, prayers, notes | CDN |
| **Firebase Messaging v10** | Push notifications | CDN |
| **Google Fonts** | Google Sans typeface | CDN |
| **Material Icons Round** | Icon system | CDN |

### Key Architectural Decisions

**Why a `<script type="module">` block for Firebase?**
Firebase SDK v10+ is ESM-only on CDN (via `https://www.gstatic.com/firebasejs/10.x.x/`). The `type="module"` script tag in `index.html` allows native `import` statements without a bundler. All Firebase imports use direct ES module URLs from Google's gstatic CDN.

**Why is `bibleData.js` external?**
Embedding all 66 books × 4 Bible versions of Scripture text inline would make `index.html` unmanageably large (~5–15 MB) and would prevent efficient browser caching of the application shell. By keeping Bible data in a separate file, the browser can cache it independently, and the service worker can manage it separately for optimal offline performance.

**Why localStorage + Firestore dual-write?**
All user data (highlights, notes, streak) writes to `localStorage` immediately for instant UI feedback and offline support. When Firebase is available and the user is authenticated, data also syncs to Firestore. On reconnect, Firestore's `enableIndexedDbPersistence()` reconciles any offline changes automatically.

---

## 2. File Structure

```
your-project/
│
├── index.html          ← Main SPA application (all HTML, CSS, JS logic)
├── bibleData.js        ← Externalized Bible text, commentary, metadata
├── sw.js               ← Service Worker (you must create this separately)
├── manifest.json       ← PWA Web App Manifest (you must create this)
└── README.md           ← This file
```

### Creating `manifest.json`

Create a `manifest.json` file in the root directory:

```json
{
  "name": "BibleVault",
  "short_name": "BibleVault",
  "description": "Your personal Scripture study companion",
  "start_url": "./index.html",
  "scope": "./",
  "display": "standalone",
  "orientation": "portrait-primary",
  "background_color": "#f6fbf4",
  "theme_color": "#1a6b3c",
  "icons": [
    {
      "src": "icons/icon-192.png",
      "sizes": "192x192",
      "type": "image/png",
      "purpose": "maskable any"
    },
    {
      "src": "icons/icon-512.png",
      "sizes": "512x512",
      "type": "image/png",
      "purpose": "maskable any"
    }
  ],
  "categories": ["education", "lifestyle", "utilities"],
  "shortcuts": [
    {
      "name": "Read Bible",
      "short_name": "Read",
      "url": "./index.html#Genesis-1-1",
      "icons": [{ "src": "icons/icon-192.png", "sizes": "192x192" }]
    },
    {
      "name": "Prayer Wall",
      "short_name": "Prayer",
      "url": "./index.html",
      "icons": [{ "src": "icons/icon-192.png", "sizes": "192x192" }]
    }
  ]
}
```

### Creating `sw.js` (Service Worker)

Create a `sw.js` file in the root directory:

```javascript
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
```

---

## 3. SPA Navigation Mechanics

BibleVault implements a **client-side Single Page Application** pattern without any framework or router library. Here's how the navigation system works:

### Central State Object

All application state is managed through a single `STATE` object at the top of the script:

```javascript
const STATE = {
  currentTab:     'home',    // Active view
  currentBook:    'Genesis', // Active Bible book
  currentChapter: 1,         // Active chapter number
  currentVersion: 'ESV',     // Active Bible version
  studyMode:      false,     // Deep Study Mode toggle
  parallelMode:   false,     // Parallel reading toggle
  // ... all other state properties
};
```

**Why a single state object?** This prevents mismatched rendering updates where two independent variables get out of sync. Every UI component reads from `STATE` and every user action updates `STATE` before triggering a re-render.

### View Switching

Views are implemented as `<div class="view">` elements. Only one has the `.active` class at any time:

```javascript
window.switchTab = function(tab) {
  STATE.currentTab = tab;
  
  // Deactivate all views
  document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));
  
  // Activate target view
  document.getElementById(`view-${tab}`)?.classList.add('active');
  
  // Update navigation indicators
  document.querySelectorAll('.nav-item, .desktop-nav-tab').forEach(el => {
    el.classList.toggle('active', el.dataset.tab === tab);
  });
};
```

CSS controls visibility:
```css
.view { display: none; }
.view.active { display: block; }
```

### Hash-Based Deep Linking

The URL hash enables deep linking to specific Bible verses. Format: `#BookName-Chapter-Verse`

**Examples:**
- `index.html#John-3-16` → Opens John chapter 3, scrolls to verse 16
- `index.html#Romans-8-28` → Opens Romans chapter 8, scrolls to verse 28
- `index.html#1-Corinthians-13-1` → Numbered books work too

The router listens for `hashchange` events and processes the hash on initial load:

```javascript
window.addEventListener('hashchange', () => handleHashRoute(window.location.hash));
```

### No Transition Failures

The system avoids transition failures through:
1. **Guard checks** — `if (!window.BIBLE_DATA)` before any data access
2. **Optional chaining** — `data?.books?.[book]?.chapters?.[ch]` prevents null errors
3. **Graceful fallbacks** — empty state UI shown when data isn't available
4. **Demo mode** — full UI works without Firebase credentials
5. **Load order** — `bibleData.js` loads before the module script via DOM order

---

## 4. Firebase Configuration Checklist

### Step 1: Create a Firebase Project

1. Go to [https://console.firebase.google.com/](https://console.firebase.google.com/)
2. Click **"Add project"** → Follow the setup wizard
3. Enable **Google Analytics** (optional but recommended)

### Step 2: Register Your Web App

1. In your project, click the **Web** icon (`</>`)
2. Register your app with a nickname (e.g., "BibleVault Web")
3. Copy the `firebaseConfig` object shown

### Step 3: Enable Authentication

1. In Firebase Console → **Authentication** → **Sign-in method**
2. Enable **Google** as a sign-in provider
3. Set your **Project public-facing name** and **Support email**
4. Add your deployment domain to **Authorized domains**

### Step 4: Create Firestore Database

1. In Firebase Console → **Firestore Database** → **Create database**
2. ⚠️ **CRITICAL:** Choose **"Start in production mode"** — NOT test mode
3. Select your preferred server location (closest to your users)
4. Apply the security rules from Section 5 below

### Step 5: Swap Configuration in `index.html`

Locate the `FIREBASE_CONFIG` block at the **very top** of the `<script type="module">` tag in `index.html`. It is marked with large ASCII art banners for easy identification:

```javascript
// ================================================================
// 🔥 FIREBASE CONFIGURATION — REPLACE WITH YOUR OWN CREDENTIALS
// ================================================================
const FIREBASE_CONFIG = {
  apiKey:            "YOUR_API_KEY_HERE",          // ← Replace
  authDomain:        "YOUR_PROJECT.firebaseapp.com", // ← Replace
  projectId:         "YOUR_PROJECT_ID",             // ← Replace
  storageBucket:     "YOUR_PROJECT.appspot.com",    // ← Replace
  messagingSenderId: "YOUR_SENDER_ID",              // ← Replace
  appId:             "YOUR_APP_ID",                 // ← Replace
  measurementId:     "YOUR_MEASUREMENT_ID"          // ← Replace (optional)
};
```

Replace each placeholder string with the actual values from your Firebase project settings.

### Step 6: Configure FCM (Push Notifications)

1. In Firebase Console → **Project Settings** → **Cloud Messaging**
2. Generate a **VAPID key pair** (Web Push certificates)
3. Copy the public key
4. In `index.html`, replace `'YOUR_VAPID_KEY_HERE'` in the `getToken()` call:
   ```javascript
   const token = await getToken(messaging, { vapidKey: 'YOUR_ACTUAL_VAPID_KEY' });
   ```

### Configuration Checklist Summary

- [ ] Firebase project created
- [ ] Web app registered in Firebase Console
- [ ] Google Sign-In provider enabled
- [ ] Authorized domains configured (including your deployment URL)
- [ ] Firestore database created in **production mode**
- [ ] Firestore security rules applied (see Section 5)
- [ ] `FIREBASE_CONFIG` block in `index.html` updated with real credentials
- [ ] VAPID key configured for push notifications
- [ ] `sw.js` created and deployed alongside `index.html`
- [ ] `manifest.json` created and deployed

---

## 5. Production Security Rules

> ⚠️ **CRITICAL SECURITY WARNING**
> 
> BibleVault is architected for **Production Security Rules**. Never deploy with Firestore Test Mode (`allow read, write: if true`) as it exposes ALL your data to anyone on the internet.

### Firestore Security Rules

Apply these rules in **Firebase Console → Firestore Database → Rules**:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {

    // ============================================================
    //  USER PROFILES
    //  - Users can read/write only their own profile
    // ============================================================
    match /users/{userId} {
      allow read:  if request.auth != null;
      allow write: if request.auth != null && request.auth.uid == userId;
    }

    // ============================================================
    //  COMMUNITY NOTES (Public Posts)
    //  - Anyone authenticated can read
    //  - Only the post owner can write/delete their own notes
    //  - Likes can be updated by any authenticated user
    // ============================================================
    match /communityNotes/{noteId} {
      allow read:   if request.auth != null;
      allow create: if request.auth != null
                    && request.resource.data.uid == request.auth.uid
                    && request.resource.data.text is string
                    && request.resource.data.text.size() > 0
                    && request.resource.data.text.size() <= 2000;
      allow update: if request.auth != null
                    && (resource.data.uid == request.auth.uid
                        || request.resource.data.diff(resource.data).affectedKeys()
                                                  .hasOnly(['likes']));
      allow delete: if request.auth != null
                    && (resource.data.uid == request.auth.uid
                        || request.auth.token.email == 'buenavistaaglinaodanny@gmail.com');
    }

    // ============================================================
    //  COMMUNITY NOTE COMMENTS
    // ============================================================
    match /communityNotes/{noteId}/comments/{commentId} {
      allow read:   if request.auth != null;
      allow create: if request.auth != null
                    && request.resource.data.uid == request.auth.uid
                    && request.resource.data.text.size() <= 1000;
      allow delete: if request.auth != null
                    && (resource.data.uid == request.auth.uid
                        || request.auth.token.email == 'buenavistaaglinaodanny@gmail.com');
    }

    // ============================================================
    //  PRAYER REQUESTS
    //  - Any authenticated user can read and create
    //  - Only owner can update (or admin for moderation)
    //  - prayedCount can be incremented by any authenticated user
    // ============================================================
    match /prayerRequests/{prayerId} {
      allow read:   if request.auth != null;
      allow create: if request.auth != null
                    && request.resource.data.uid == request.auth.uid
                    && request.resource.data.text is string
                    && request.resource.data.text.size() > 0
                    && request.resource.data.text.size() <= 2000;
      allow update: if request.auth != null
                    && (resource.data.uid == request.auth.uid
                        || request.resource.data.diff(resource.data).affectedKeys()
                                                  .hasOnly(['prayedCount', 'isPraise'])
                        || request.auth.token.email == 'buenavistaaglinaodanny@gmail.com');
      allow delete: if request.auth != null
                    && (resource.data.uid == request.auth.uid
                        || request.auth.token.email == 'buenavistaaglinaodanny@gmail.com');
    }

    // ============================================================
    //  PRAYER REQUEST COMMENTS
    // ============================================================
    match /prayerRequests/{prayerId}/comments/{commentId} {
      allow read:   if request.auth != null;
      allow create: if request.auth != null
                    && request.resource.data.uid == request.auth.uid
                    && request.resource.data.text.size() <= 1000;
      allow delete: if request.auth != null
                    && (resource.data.uid == request.auth.uid
                        || request.auth.token.email == 'buenavistaaglinaodanny@gmail.com');
    }

    // ============================================================
    //  ANNOUNCEMENTS (Admin only)
    // ============================================================
    match /announcements/{announcementId} {
      allow read:   if request.auth != null;
      allow write:  if request.auth != null
                    && request.auth.token.email == 'buenavistaaglinaodanny@gmail.com';
    }

    // ============================================================
    //  DEFAULT: DENY ALL
    //  Any path not explicitly covered above is denied.
    // ============================================================
    match /{document=**} {
      allow read, write: if false;
    }
  }
}
```

### Security Rule Principles Applied

| Principle | Implementation |
|---|---|
| **Authentication Required** | All rules check `request.auth != null` |
| **Ownership Enforcement** | Writes require `request.auth.uid == resource.data.uid` |
| **Admin Gating** | Admin-only operations check `request.auth.token.email` |
| **Data Validation** | `text.size() > 0` and `text.size() <= 2000` prevent abuse |
| **Field-Level Updates** | `hasOnly([...])` prevents users from modifying unauthorized fields |
| **Default Deny** | Explicit `allow read, write: if false` on `{document=**}` |

---

## 6. bibleData.js Schema Reference

The `bibleData.js` file must expose `window.BIBLE_DATA` with the following structure. The sample included contains Genesis 1-2, John 1, 3, Psalm 23, Romans 8, Matthew 5 in ESV/NIV/NLT/RSV. For a complete production deployment, populate all 66 books.

### Full Schema

```javascript
window.BIBLE_DATA = {

  // ============================================================
  //  BOOK METADATA (all 66 books)
  // ============================================================
  bookMeta: {
    "Genesis": {
      abbr:      "Gen",                    // Short abbreviation
      testament: "OT",                     // "OT" or "NT"
      category:  "Law",                    // Genre/category
      chapters:  50,                       // Total chapter count
      author:    "Moses (traditionally)",  // Author attribution
      date:      "c. 1446–1406 BC",       // Date written
      intro:     "Full introduction text..." // Paragraph for book intro card
    }
    // ... repeat for all 66 books
  },

  // ============================================================
  //  BIBLE TEXT BY VERSION (4 versions)
  // ============================================================
  versions: {
    ESV: {
      label: "English Standard Version",
      books: {
        "Genesis": {
          intro: { /* same structure as bookMeta["Genesis"] */ },
          chapters: {
            1: [
              { v: 1, t: "In the beginning, God created the heavens and the earth." },
              { v: 2, t: "The earth was without form and void..." },
              // ... all verses
            ],
            2: [ /* ... */ ],
            // ... chapters 1–50
          }
        },
        // ... all 66 books
      }
    },
    NIV: { /* same structure */ },
    NLT: { /* same structure */ },
    RSV: { /* same structure */ }
  },

  // ============================================================
  //  COMMENTARY (keyed by "Book-Chapter-Verse")
  // ============================================================
  commentary: {
    "John-3-16": {
      title:       "The Gospel in One Verse",
      explanation: "Full commentary paragraph...",
      wordOrigins: [
        {
          word:   "so loved",
          origin: "Greek: οὕτως ἠγάπησεν (houtōs ēgapēsen) — explanation..."
        }
      ],
      crossRefs: [
        {
          ref:  "Romans 5:8",
          text: "God shows his love for us in that while we were still sinners..."
        }
      ]
    }
    // Add commentary for as many verses as desired
  },

  // ============================================================
  //  VERSE OF THE DAY ROTATION (10+ verses recommended)
  // ============================================================
  verseOfTheDay: [
    {
      ref:        "John 3:16",
      version:    "ESV",
      text:       "For God so loved the world...",
      reflection: "Reflection paragraph on this verse..."
    }
    // ... more entries
  ],

  // ============================================================
  //  READING PLANS
  // ============================================================
  readingPlans: [
    {
      id:          "nt90",
      name:        "New Testament in 90 Days",
      description: "Read through the NT in 90 days, ~3 chapters/day.",
      totalDays:   90,
      books:       ["Matthew", "Mark", ..., "Revelation"]
    }
    // ... more plans
  ],

  // ============================================================
  //  DIVINE WORDS INDEX (Red Letter)
  //  Maps: BookName → chapter_number → [verse_numbers]
  // ============================================================
  divineWords: {
    "John": {
      3:  [16, 17, 18],         // John 3:16–18 — Jesus speaking
      14: [1, 2, 3, 6, 7]      // John 14 — "I am the way..."
    },
    "Matthew": {
      5:  [3, 4, 5, 6, 7, 8, 9, 10, 11, 12],  // Beatitudes
      11: [28, 29, 30]                           // "Come to me..."
    }
    // ... more books where God/Jesus speaks
  },

  // ============================================================
  //  PROFANITY FILTER LIST
  // ============================================================
  profanityList: ["word1", "word2"],  // Words to filter from public posts

  // ============================================================
  //  CONVENIENCE ARRAYS (auto-generated)
  // ============================================================
  allBooks: ["Genesis", ..., "Revelation"],   // All 66, in canonical order
  otBooks:  ["Genesis", ..., "Malachi"],      // 39 OT books
  ntBooks:  ["Matthew", ..., "Revelation"]   // 27 NT books
};
```

### Open-Source Bible Data Sources

For populating all 66 books across 4 versions in production:

| Source | License | URL |
|---|---|---|
| scrollmapper/bible_databases | Public Domain (for ESV, NIV — check version licensing) | [github.com/scrollmapper/bible_databases](https://github.com/scrollmapper/bible_databases) |
| NeuroSynonyms/bible | Various | [github.com/NeuroSynonyms/bible](https://github.com/NeuroSynonyms/bible) |
| thiagobodruk/bible | MIT | [github.com/thiagobodruk/bible](https://github.com/thiagobodruk/bible) |
| API.Bible | Free tier | [api.bible](https://api.bible) |

> ⚠️ **Note:** ESV and NIV are under copyright. The ESV API is available for free personal/church use. Always verify licensing before deploying text at scale.

---

## 7. Feature Documentation

### Deep Study Mode

**Toggle:** The switch in the reader toolbar (🧠 icon) activates Study Mode.

**Behavior when ON:**
- All verses receive a dashed underline border
- Hover state changes to a tinted primary color highlight
- Clicking any verse opens the Commentary Panel
- Text selection is disabled in favor of the click-to-explain engine

**Behavior when OFF:**
- Normal text selection is restored
- Clicking a verse opens the Highlight Toolbar (color picker + note)

### Audio Bible (TTS)

Uses the native **Web Speech API** (`speechSynthesis`). No external API key required.

**Controls:**
- FAB button (bottom-right) or toolbar speaker icon
- Reads verses sequentially, highlighting each verse as it reads
- Smooth auto-scroll keeps active verse in view

**Browser Support:** Chrome, Edge, Safari, Firefox (limited on some mobile browsers)

### Swipe Gesture Safety

Touch swipe navigation includes a critical safety guard:

```javascript
document.getElementById('reader-content')?.addEventListener('touchend', e => {
  // SAFETY: Ignore if text is selected
  if (window.getSelection().toString().length > 0) return;
  // ... swipe logic
});
```

This prevents accidental chapter navigation when users are selecting text to copy.

### Email Privacy Masking

All user emails are masked before DOM insertion via the `maskEmail()` function:

```javascript
function maskEmail(email) {
  const [local, domain] = email.split('@');
  return local.charAt(0) + '****@' + domain;
  // "john.doe@gmail.com" → "j****@gmail.com"
}
```

Raw email addresses never appear in the DOM. The `STATE.user.email` is only used for Firestore writes (protected by security rules) and admin identification.

### Highlight Colors

| Color | CSS Class | Usage |
|---|---|---|
| 🟡 Yellow | `.hl-yellow` | General highlights |
| 🟢 Mint Green | `.hl-mint` | Promises / encouragement |
| 🔵 Light Blue | `.hl-blue` | Cross-references / wisdom |
| 🩷 Pink | `.hl-pink` | Love / grace |

Highlights persist in `localStorage` and survive page refreshes.

---

## 8. GitHub Pages Deployment

### Step 1: Prepare Repository

```bash
# Create a new repository on GitHub, then:
git init
git add .
git commit -m "Initial BibleVault deployment"
git remote add origin https://github.com/YOUR_USERNAME/biblevault.git
git push -u origin main
```

### Step 2: Enable GitHub Pages

1. Go to your repository → **Settings** → **Pages**
2. Under **Source**, select **Deploy from a branch**
3. Select branch: `main`, folder: `/ (root)`
4. Click **Save**
5. Your app will be at: `https://YOUR_USERNAME.github.io/biblevault/`

### Step 3: Critical — Relative Paths for PWA

BibleVault is configured with **relative paths** throughout to work correctly under GitHub Pages subdirectory namespaces:

| Configuration | Value | Reason |
|---|---|---|
| Service Worker registration | `./sw.js` | Relative path prevents 404 under `/biblevault/sw.js` |
| SW scope | `./` | Restricts SW scope to app subdirectory |
| Manifest link | `./manifest.json` | Loads from same directory |
| `start_url` in manifest | `./index.html` | Relative to manifest location |
| `scope` in manifest | `./` | Must match SW scope |

> ⚠️ **If you use absolute paths** (e.g., `/sw.js`), GitHub Pages will fail to register the service worker because the file would be looked for at `https://YOUR_USERNAME.github.io/sw.js` instead of `https://YOUR_USERNAME.github.io/biblevault/sw.js`.

### Step 4: Update Firebase Authorized Domains

After deployment, add your GitHub Pages URL to Firebase Auth:

1. Firebase Console → **Authentication** → **Settings** → **Authorized domains**
2. Add: `YOUR_USERNAME.github.io`

### Step 5: Subdirectory Deployment Verification

Test that all PWA features work by checking:

```
✅ App loads at: https://YOUR_USERNAME.github.io/biblevault/
✅ Service Worker registers (DevTools → Application → Service Workers)
✅ App is installable (browser shows install prompt)
✅ Works offline after first load (DevTools → Network → Offline)
✅ Hash routing works: /biblevault/index.html#John-3-16
✅ Firebase sign-in works (authorized domain configured)
```

### Step 6: Custom Domain (Optional)

For a custom domain (e.g., `biblevault.app`):

1. In GitHub Pages settings → **Custom domain** → Enter your domain
2. Add these DNS records at your registrar:
   ```
   CNAME  www    YOUR_USERNAME.github.io
   A      @      185.199.108.153
   A      @      185.199.109.153
   A      @      185.199.110.153
   A      @      185.199.111.153
   ```
3. Add custom domain to Firebase Auth authorized domains
4. Enable **Enforce HTTPS** in GitHub Pages settings

---

## 9. PWA Service Worker & Caching

### Caching Strategy

| Asset Type | Strategy | Rationale |
|---|---|---|
| `index.html` | Cache-first, update in background | Shell loads instantly; updates on next visit |
| `bibleData.js` | Cache-first, update in background | Large file; cached for offline reading |
| Firebase API calls | Network-first, cache fallback | Data must be fresh; fallback for offline |
| Google Fonts | Cache-first | Static; doesn't change |
| Material Icons | Cache-first | Static icon font |

### Offline Persistence

Firebase Firestore's **IndexedDB persistence** is enabled in the app:

```javascript
enableIndexedDbPersistence(db).catch(err => {
  if (err.code === 'failed-precondition') {
    // Multiple tabs open — persistence available in first tab only
  } else if (err.code === 'unimplemented') {
    // Browser doesn't support persistence
  }
});
```

This means:
- Community posts and prayer requests load from IndexedDB when offline
- User notes sync when connection is restored
- Streak and reading progress always save to localStorage (no network needed)

---

## 10. Push Notifications Setup

### Firebase Cloud Messaging (FCM)

FCM requires HTTPS. It works on:
- ✅ Your deployed GitHub Pages URL
- ✅ Custom domain with HTTPS
- ❌ `localhost` (use local notification fallback instead)
- ❌ `file://` protocol

### Local Development Fallback

BibleVault automatically falls back to the **Web Notifications API** when FCM is unavailable:

```javascript
function sendLocalNotification(title, body) {
  if (Notification.permission !== 'granted') return;
  new Notification(title, { body, icon: './icons/icon-192.png' });
}
```

This triggers when:
- A new comment is posted on content you interact with
- An admin broadcasts an announcement
- FCM is unavailable (non-HTTPS environment)

### Requesting Notification Permission

The app requests permission after the user signs in. Users must grant permission in their browser for notifications to work. They can always revoke permission in browser settings.

---

## 11. Admin Console

### Access

The Admin Console tab is **only visible** when the authenticated user's email matches the hardcoded admin address:

```javascript
const ADMIN_EMAIL = 'buenavistaaglinaodanny@gmail.com';

function checkAdminStatus(user) {
  if (user.email === ADMIN_EMAIL) {
    // Reveal admin tab in both mobile and desktop nav
  }
}
```

### Admin Capabilities

| Feature | Description |
|---|---|
| **Post Announcement** | Global banner displayed to all users at top of app |
| **Clear Announcement** | Remove the global banner |
| **View Users** | List of registered Firebase users (requires Firestore setup) |
| **Delete Posts** | Remove community notes or prayer requests (security rules allow admin deletes) |
| **Flagged Content** | Auto-flagged posts containing profanity for review |

### Profanity Filter

The filter runs **before content is saved** to Firestore:

```javascript
function filterProfanity(text) {
  let filtered = text;
  BIBLE_DATA.profanityList.forEach(word => {
    const regex = new RegExp(`\\b${word}\\b`, 'gi');
    filtered = filtered.replace(regex, '****');
  });
  return filtered;
}
```

The `flagged: true` field is also set on the Firestore document so admins can filter and review flagged content in the Admin Console.

---

## 12. Troubleshooting

### Firebase Sign-In Not Working

| Problem | Solution |
|---|---|
| "auth/unauthorized-domain" | Add your domain to Firebase Auth → Authorized Domains |
| Popup blocked | Allow popups for your domain in browser settings |
| "auth/api-key-not-valid" | Verify `apiKey` in `FIREBASE_CONFIG` |

### Service Worker Not Registering

| Problem | Solution |
|---|---|
| 404 on `sw.js` | Ensure `sw.js` is in the same directory as `index.html` |
| Wrong scope | Check `scope: './'` in registration matches your file structure |
| HTTPS required | Service Workers only work on HTTPS or localhost |

### Bible Text Not Loading

| Problem | Solution |
|---|---|
| "Bible data not loaded" snackbar | Check that `bibleData.js` is in the same directory as `index.html` |
| Chapter shows empty state | That chapter hasn't been populated in `bibleData.js` yet |
| `window.BIBLE_DATA is undefined` | Ensure `<script src="bibleData.js">` loads BEFORE the module script |

### PWA Install Prompt Not Showing

The `beforeinstallprompt` event only fires when:
- ✅ App is served over HTTPS
- ✅ App has a valid `manifest.json` with required fields
- ✅ App has a registered Service Worker
- ✅ User has not previously dismissed/installed the prompt

### Firebase Offline Persistence Error

```
FirebaseError: Failed to get document because the client is offline
```

This is expected on first load without network. After the first online load, IndexedDB caches the data and subsequent loads work offline.

---

## Security Checklist Before Going Live

- [ ] All placeholder credentials replaced in `FIREBASE_CONFIG`
- [ ] Firebase Auth authorized domains updated with production URL
- [ ] Firestore production security rules applied (NOT test mode)
- [ ] Environment-specific VAPID key set for FCM
- [ ] Firebase API key restricted to your domain in Google Cloud Console
- [ ] No sensitive data (admin emails, keys) logged to browser console
- [ ] `console.log` statements referencing auth tokens removed or guarded
- [ ] Content Security Policy (CSP) headers configured on hosting
- [ ] HTTPS enforced (required for SW, FCM, and modern browser features)

---

## License

This project is released for personal and ministry use. Bible text content within `bibleData.js` may be subject to separate copyright depending on the translation version used. Always verify text licensing for your deployment context.

---

*Built with ❤️ for the Body of Christ — BibleVault PWA*
