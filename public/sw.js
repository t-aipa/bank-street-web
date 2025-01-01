const CACHE_NAME = 'bank-street-v1'
const OFFLINE_URL = '/offline.html'

// Add list of files to cache here.
const urlsToCache = [
  '/',
  '/bank-station',
  '/bank-store',
  '/bank-atlas',
  '/manifest.json',
  '/offline.html',
  '/icons/icon-192x192.png',
  '/icons/icon-512x512.png'
]

self.addEventListener('install', (event) => {
  event.waitUntil(
    Promise.all([
      caches.open(CACHE_NAME)
        .then((cache) => cache.addAll(urlsToCache)),
      fetch(OFFLINE_URL)
        .then((response) => {
          return caches.open(CACHE_NAME)
            .then((cache) => {
              return cache.put(OFFLINE_URL, response)
            })
        })
    ])
  )
})

self.addEventListener('fetch', (event) => {
  if (event.request.mode === 'navigate' || 
      (event.request.method === 'GET' && 
       event.request.headers.get('accept').includes('text/html'))) {
    event.respondWith(
      fetch(event.request)
        .catch(() => {
          return caches.match(OFFLINE_URL)
        })
    )
    return
  }

  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // Cache hit - return response
        if (response) {
          return response
        }

        // Clone the request because it's a stream and can only be consumed once
        const fetchRequest = event.request.clone()

        return fetch(fetchRequest)
          .then((response) => {
            // Check if we received a valid response
            if (!response || response.status !== 200 || response.type !== 'basic') {
              return response
            }

            // Clone the response because it's a stream and can only be consumed once
            const responseToCache = response.clone()

            caches.open(CACHE_NAME)
              .then((cache) => {
                cache.put(event.request, responseToCache)
              })

            return response
          })
          .catch(() => {
            if (event.request.destination === 'image') {
              return caches.match('/icons/offline-image.png')
            }
          })
      })
  )
})

// Clean up old caches
self.addEventListener('activate', (event) => {
  const cacheWhitelist = [CACHE_NAME]

  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName)
          }
        })
      )
    })
  )
})

// Background sync
self.addEventListener('sync', (event) => {
  if (event.tag === 'sync-transactions') {
    event.waitUntil(syncTransactions())
  }
})

async function syncTransactions() {
  try {
    const cache = await caches.open(CACHE_NAME)
    const requests = await cache.keys()
    const transactionRequests = requests.filter(request => 
      request.url.includes('/api/transactions')
    )

    for (const request of transactionRequests) {
      try {
        await fetch(request)
        await cache.delete(request)
      } catch (error) {
        console.error('Error syncing transaction:', error)
      }
    }
  } catch (error) {
    console.error('Error in syncTransactions:', error)
  }
}
