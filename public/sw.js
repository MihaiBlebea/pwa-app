// Catch the event when Service Worker is installed
self.addEventListener("install", function(event) {
    // console.log("[Service Worker]: Installing Service Worker...", event);
    // Trigger event and then open the Local cashe
    event.waitUntil(caches.open("static").then(function(cache) {
            console.log("[Service Worker]: Precache files...", cache);
            cache.add("/src/js/app.js");
        })
    );
});

// Catch the event when Service Worker is activated
self.addEventListener("activate", function(event) {
    // console.log("[Service Worker]: Activating Service Worker...", event);
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
                return fetch(event.request);
            }
        })
    );
});
