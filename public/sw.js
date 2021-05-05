let cacheDta = "appV1";

this.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(cacheData).then((cache) => {
      cache.addAll([
        // "/static/js/main.chunk.js",
        // "/static/js/0.chunk.js",
        // "/static/js/bundle.js",
        // "/static/css/main.chunk.css",
        // "/index.html",
        "/",
      ]);
    })
  );
});

this.addEventListener("fetch", (event) => {
  //   console.warn("url" + event.request.url);

  if (!navigator.online) {
    if (event.request.url === "http://localhost:3000/") {
      event.waitUntil(
        this.registration.showNotification("Internet", {
          body: "Hello lexfer no estas en linea",
        })
      );
    }
    event.respondWith(
      caches.match(event.request).then((resp) => {
        if (resp) {
          return resp;
        }
        let requestUrl = event.request.clone();
        fetch(requestUrl);
      })
    );
  }
});
