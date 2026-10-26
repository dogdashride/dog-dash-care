const CACHE_NAME = "dog-dash-care-v2-push";
const APP_FILES = ["./", "./index.html", "./manifest.json", "./icon.svg"];
self.addEventListener("install", event => {
  event.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(APP_FILES)).then(() => self.skipWaiting()));
});
self.addEventListener("activate", event => {
  event.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k.startsWith("dog-dash-care-") && k !== CACHE_NAME).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener("fetch", event => {
  if (event.request.method !== "GET" || new URL(event.request.url).origin !== self.location.origin) return;
  event.respondWith(caches.match(event.request).then(cached => cached || fetch(event.request).then(response => {
    if (response.ok) { const copy = response.clone(); caches.open(CACHE_NAME).then(cache => cache.put(event.request, copy)); }
    return response;
  }).catch(() => caches.match("./index.html"))));
});
self.addEventListener("push", event => {
  let data = { title: "Dog Dash Care", body: "You have a dog care reminder." };
  try { if (event.data) data = { ...data, ...event.data.json() }; } catch (_) { if (event.data) data.body = event.data.text(); }
  event.waitUntil(self.registration.showNotification(data.title || "Dog Dash Care", {
    body: data.body || "You have a dog care reminder.",
    icon: "./icon.svg",
    badge: "./icon.svg",
    tag: data.tag || "dog-dash-care-reminder",
    data: { url: data.url || "./" },
    renotify: false
  }));
});
self.addEventListener("notificationclick", event => {
  event.notification.close();
  const target = new URL(event.notification.data?.url || "./", self.location.origin).href;
  event.waitUntil(clients.matchAll({ type: "window", includeUncontrolled: true }).then(list => {
    for (const client of list) if (client.url.startsWith(self.location.origin) && "focus" in client) return client.focus().then(c => c.navigate ? c.navigate(target) : c);
    return clients.openWindow ? clients.openWindow(target) : undefined;
  }));
});
