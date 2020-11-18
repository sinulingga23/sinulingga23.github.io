importScripts("https://storage.googleapis.com/workbox-cdn/releases/3.6.3/workbox-sw.js");

workbox.precaching.precacheAndRoute([
    {url: "/", revision: 1},
    {url: "/service-worker.js", revision: 1},
    {url: "/index.html", revision: 1},
    {url: "/css/materialize.min.css", revision: 1},
    {url: "/css/style.css", revision: 1},
    {url: "/js/materialize.min.js", revision: 1},
    {url: "/js/nav.js", revision: 1},
    {url: "/js/api.js", revision: 1},
    {url: "/js/league.js", revision: 1},
    {url: "/js/operation_db.js", revision: 1},
    {url: "/js/idb.js", revision: 1},
    {url: "/js/db.js", revision: 1},
    {url: "/public/nav.html", revision: 1},
    {url: "/public/img/logo_2001.png", revision: 1},
    {url: "/public/img/logo_2002.png", revision: 1},
    {url: "/public/img/logo_2003.png", revision: 1},
    {url: "/public/img/football-ball.png", revision: 1},
    {url: "/public/pages/about.html", revision: 1},
    {url: "/public/pages/favoriteteams.html", revision: 1},
    {url: "/public/pages/liga.html", revision: 1},
    {url: "/public/pages/detail.html", revision: 1},
    {url: "/public/pages/standing.html", revision: 1},
    {url: "/manifest.json", revision: 1},
    {url: "/push.js", revision: 1},
],
{
    ignoreUrlParametersMatching: [/.*/]
});


workbox.routing.registerRoute(
    /\.(?:png|gif|jpg|jpeg|svg)$/,
    workbox.strategies.cacheFirst({
        cacheName: "images",
        plugins: [
            new workbox.expiration.Plugin({
                maxEntries: 200,
                maxAgeSeconds: 7 * 24 * 60 * 60,
            }),
        ],
    })
);

workbox.routing.registerRoute(
    new RegExp('https://api.football-data.org/v2/'),
    workbox.strategies.staleWhileRevalidate()
)

workbox.routing.registerRoute(
    new RegExp('https://upload.wikimedia.org/'),
    workbox.strategies.cacheFirst({
        cacheName: 'bagde-team',
        plugins: [
            new workbox.cacheableResponse.Plugin({
                statuses: [0, 200],
            }),
            new workbox.expiration.Plugin({
                maxAgeSeconds: 60 * 60 * 24 * 365,
                maxEntries: 30,
            }),
        ],
    })
)

workbox.routing.registerRoute(
    /^https:\/\/fonts\.googleapis\.com/,
    workbox.strategies.staleWhileRevalidate({
        cacheName: 'google-fonts-stylesheets',
    })
);


// Menyimpan cache untuk file font selama 1 tahun
workbox.routing.registerRoute(
    /^https:\/\/fonts\.gstatic\.com/,
    workbox.strategies.cacheFirst({
        cacheName: 'google-fonts-webfonts',
        plugins: [
            new workbox.cacheableResponse.Plugin({
                statuses: [0, 200],
            }),
            new workbox.expiration.Plugin({
                maxAgeSeconds: 60 * 60 * 24 * 365,
                maxEntries: 30,
            }),
        ],
    })
);

workbox.routing.registerRoute(
    /\.(?:js|css)$/,
    new workbox.strategies.StaleWhileRevalidate({
        cacheName: 'static-resources',
    })
);



self.addEventListener('push', function(event) {
    var body;
    if (event.data) {
      body = event.data.text();
    } else {
      body = 'Push message no payload';
    }
    var options = {
      body: body,
      icon: 'img/notification.png',
      vibrate: [100, 50, 100],
      data: {
        dateOfArrival: Date.now(),
        primaryKey: 1
      }
    };
    event.waitUntil(
      self.registration.showNotification('Push Notification', options)
    );
  });
  