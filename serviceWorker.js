const cache_container = "static_v1";
const files = [
    "./",
    "./manifest.json",
    "./data/levels.json",
    "./node_modules/bootstrap/dist/css/bootstrap.min.css",
    "./node_modules/bootstrap/dist/js/bootstrap.min.js",
    "./sources/graphics/bus.png",
    "./sources/graphics/car (2).png",
    "./sources/graphics/car (3).png",
    "./sources/graphics/car (4).png",
    "./sources/graphics/car (5).png",
    "./sources/graphics/car.png",
    "./sources/graphics/menu.png",
    "./sources/graphics/road2.png",
    "./sources/graphics/favicon1.png",
    "./sources/sounds/button-hover.mp3",
    "./sources/sounds/button-click.mp3",
    "./sources/sounds/menu-theme.mp3",
    "./sources/sounds/No Happy Endings2.mp3",
    "./sources/sounds/Car Acceleration Sound2.mp3",
    "./sources/sounds/deceleration.mp3",
    "./sources/sounds/breaking.mp3",
    "./sources/sounds/basic moving car.mp3",
    "./sources/sounds/win2.mp3",
    "./sources/sounds/car crash3.mp3",
    "./sources/icons/*",
    "./css/style.css",
    "./scripts/Car.js",
    "./scripts/Player.js",
    "./scripts/Road.js",
    "./scripts/script.js"
];

self.addEventListener('install', function(event){
    //console.log("installed", event)
    event.waitUntil(
        caches.open(cache_container)
        .then(cache => {
            cache.addAll(files)
        })
    )
})

/*
self.addEventListener("activate", function(event) {
    console.log("activated", event)
})
*/

self.addEventListener('fetch', function(event){
    event.respondWith(
        caches.match(event.request)
        .then(response => {
            if(response){
                return response
            } 
        })
    )
})
