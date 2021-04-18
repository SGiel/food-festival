const APP_PREFIX = 'FoodFest-';     
const VERSION = 'version_01';
const CACHE_NAME = APP_PREFIX + VERSION;

// We can't hardcode an absolute path if we want this to work in development and production, because 
// this page will be hosted at the github.io/projectname 
// Note that we intentionally didn't include the images in assets.
const FILES_TO_CACHE = [
  "./index.html",
  "./events.html",
  "./tickets.html",
  "./schedule.html",
  "./assets/css/style.css",
  "./assets/css/bootstrap.css",
  "./assets/css/tickets.css",
  "./dist/app.bundle.js",
  "./dist/events.bundle.js",
  "./dist/tickets.bundle.js",
  "./dist/schedule.bundle.js"
];

// Use self instead of window.addEventListener, because service workers run before the window
// object has even been created. The self keyword is used to instantiate listeners on the 
// service worker. The context of self here refers to the service worker object.

// Respond with cached resources
// fetch used when want to tell service worker what to do with something in the cache
self.addEventListener('fetch', function (e) {
  console.log('fetch request : ' + e.request.url)

 // respondWith will intercept the http response in order to send resources from the service worker
  e.respondWith(
    // match the request with the same resource that is in the cache if it exists
    caches.match(e.request).then(function (request) {
      if (request) { // if cache is available, respond with cache
        console.log('responding with cache : ' + e.request.url)
        // returns request if it exists in the cache, else it will fetch it from the network
        return request
      } else {       // if there are no cache, try fetching request
        console.log('file is not cached, fetching : ' + e.request.url)
        return fetch(e.request)
      }

      // You can omit if/else for console.log & put one line below like this too.
      // return request || fetch(e.request)
    })
  )
})

// Cache resources
self.addEventListener('install', function (e) {
  // waitUntil method on the event says to wait until the enclosing code is finished executing
  e.waitUntil(
    caches.open(CACHE_NAME).then(function (cache) {
      console.log('installing cache : ' + CACHE_NAME)
      return cache.addAll(FILES_TO_CACHE)
    })
  )
})

// Delete outdated caches
self.addEventListener('activate', function(e) {
  e.waitUntil(
    // caches.keys() returns a promise with an array of the cache keys
    // then pass through a function with a keylist holding the cache keys
    caches.keys().then(function(keyList) {
      // `keyList` contains all cache names under your username.github.io
      // filter out ones that have this app prefix to create keeplist
      // ?? HOW DOES INDEXOF WORK WITH APP_PREFIX
      let cacheKeeplist = keyList.filter(function(key) {
        // any key that matches the index of APP_PREFIX???
        return key.indexOf(APP_PREFIX);
      });
      // add current cache name to keeplist
      cacheKeeplist.push(CACHE_NAME);
      // ?? deletes old versions of cache list???
      return Promise.all(
        keyList.map(function(key, i) {
          if (cacheKeeplist.indexOf(key) === -1) {
            console.log('deleting cache : ' + keyList[i]);
            return caches.delete(keyList[i]);
          }
        })
      );
    })
  );
});