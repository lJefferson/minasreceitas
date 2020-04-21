//Instalação do Service Worker
self.addEventListener('install', function(event){
    console.log("Service Worker instalado", event);
})

//Instalação do Service Worker
self.addEventListener('activate', function(event){
    console.log("Service Worker ativado", event);
})

//Skip Waiting (Ativação automática)
self.addEventListener("message", (event) => {
  if (event.data && event.data.type === "SKIP_WAITING") {
    self.skipWaiting();
  }
});


//Modo offline
const CACHE = "pwabuilder-offline";

importScripts('https://storage.googleapis.com/workbox-cdn/releases/5.0.0/workbox-sw.js');

//Salvar Páginas para uso Offline
workbox.routing.registerRoute(
  new RegExp('/*'),
  new workbox.strategies.StaleWhileRevalidate({
    cacheName: CACHE
  })
);