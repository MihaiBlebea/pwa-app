// Catch the event when Service Worker is installed
self.addEventListener("install", function(event) {
    console.log("[Service Worker]: Installing Service Worker...", event);
});

// Catch the event when Service Worker is activated
self.addEventListener("activate", function(event) {
    console.log("[Service Worker]: Activating Service Worker...", event);
    return self.clients.claim();
});

// Catch the fetch event
self.addEventListener("fetch", function(event) {
    console.log("[Service Worker]: Fetch something...", event);
    // set the response to the fetch event
    event.respondWith(fetch(event.request));
});
