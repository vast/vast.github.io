// Поменяйте версию после любой правки файлов ниже, иначе телефон продолжит показывать старые
const CACHE = 'eyexercise-v2'

const FILES = [
  './',
  './index.html',
  './manifest.webmanifest',
  './assets/alert.mp3',
  './icons/icon-180.png',
  './icons/icon-192.png',
  './icons/icon-512.png'
]

self.addEventListener('install', (event) => {
  event.waitUntil(caches.open(CACHE).then((cache) => cache.addAll(FILES)))
  self.skipWaiting()
})

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((key) => key !== CACHE).map((key) => caches.delete(key))))
      .then(() => self.clients.claim())
  )
})

self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return

  event.respondWith(
    caches.match(event.request, { ignoreSearch: true })
      .then((cached) => cached ? withRange(event.request, cached) : fetch(event.request))
  )
})

// Safari просит аудио кусками и не играет его, если получает файл целиком
async function withRange(request, response) {
  const range = request.headers.get('range')
  if (!range) return response

  const blob = await response.blob()
  const [, start, end] = /bytes=(\d*)-(\d*)/.exec(range) || []
  const from = Number(start) || 0
  const to = end ? Math.min(Number(end), blob.size - 1) : blob.size - 1

  return new Response(blob.slice(from, to + 1), {
    status: 206,
    headers: {
      'Content-Type': response.headers.get('Content-Type') || blob.type,
      'Content-Range': `bytes ${from}-${to}/${blob.size}`,
      'Content-Length': String(to - from + 1)
    }
  })
}
