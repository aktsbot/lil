if ("serviceWorker" in navigator) {
  window.addEventListener("load", function() {
    navigator.serviceWorker.register("/sw.js").then(
      function(registration) {
        //check if page was loaded via service worker
        if (!navigator.serviceWorker.controller) {
          return;
        }

        // if updated service worker is waiting
        if (registration.waiting) {
          console.log("sw waiting");
          updateReady(registration.waiting);
        }
        //if service worker is installing
        if (registration.installing) {
          //track installing
          console.log("sw installing");
          trackInstalling(registration.installing);
          return;
        }

        //listen for service worker update
        registration.addEventListener("updatefound", function() {
          console.log("updatefound");
          trackInstalling(registration.installing);
        });

        // Registration was successful
        console.log(
          "ServiceWorker registration successful with scope: ",
          registration.scope
        );
      },
      function(err) {
        // registration failed :(
        console.log("ServiceWorker registration failed: ", err);
      }
    );
  });
}

function trackInstalling(worker) {
  worker.addEventListener("statechange", function() {
    if (worker.state == "installed") {
      updateReady(worker);
    }
  });
}

function updateReady(worker) {
  var doUpdate = confirm("An update is available, may I do the honors?");
  if (doUpdate) {
    worker.postMessage({ action: "skipWaiting" });
  }
}

navigator.serviceWorker.addEventListener("controllerchange", function() {
  window.location.reload();
});
