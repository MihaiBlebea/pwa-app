
var CACHE_STATIC_VERSION = "static-v1";

// Catch the event when Service Worker is installed
self.addEventListener("install", function(event) {
    // console.log("[Service Worker]: Installing Service Worker...", event);
    // Trigger event and then open the Local cashe
    event.waitUntil(caches.open(CACHE_STATIC_VERSION).then(function(cache) {
            console.log("[Service Worker]: Precache files...", cache);
            //cache.add("/");
            //cache.add("/index.html");
            //cache.add("/src/css/app.css");
            //cache.add("/src/js/app.js");
            cache.addAll([
                "/",
                "/index.html",
                "/src/css/app.css",
                "/src/js/app.js",
                "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
            ]);
        })
    );
});

// Catch the event when Service Worker is activated
self.addEventListener("activate", function(event) {
    // console.log("[Service Worker]: Activating Service Worker...", event);

    // Clean up the old caches
    event.waitUntil(
        caches.keys().then(function(keyList) {
            return Promise.all(keyList.map(function(key) {
                if(key !== CACHE_STATIC_VERSION && key !== "dynamic")
                {
                    console.log("[Service Worker] Remove old cache...", key);
                    return caches.delete(key);
                }
            }))
        })
    );

    return self.clients.claim();
});

// Catch the fetch event
self.addEventListener("fetch", function(event) {
    // console.log("[Service Worker]: Fetch something...", event);

    // set the response to the fetch event & get data from caches
    event.respondWith(caches.match(event.request)
        .then(function(response) {
            if(response)
            {
                return response;
            } else {
                // Make a dinamic cache store for the response
                return fetch(event.request).then(function(res) {
                    return caches.open("dynamic").then(function(cache) {
                        cache.put(event.request.url, res.clone());
                        return res;
                    });
                }).then(function(error) {

                });
            }
        })
    );
});
