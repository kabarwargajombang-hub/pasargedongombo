const CACHE_NAME = "pasar-gedongombo-v2";


const urlsToCache = [
"/",
"/index.html",
"/style.css",
"/manifest.json",
"/navbar.js",
"/app.js"
];


// INSTALL

self.addEventListener("install", event => {

event.waitUntil(

caches.open(CACHE_NAME)

.then(cache=>{

return cache.addAll(urlsToCache);

})

);

});




// FETCH

self.addEventListener("fetch", event=>{


event.respondWith(

fetch(event.request)

.catch(()=>{

return caches.match(event.request);

})

);


});




// ACTIVATE

self.addEventListener("activate", event=>{


event.waitUntil(

caches.keys()

.then(keys=>{


return Promise.all(

keys.map(key=>{


if(key !== CACHE_NAME){

return caches.delete(key);

}


})


);


})


);


});
