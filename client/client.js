const publicVapidKey =
  "BGX1XvgLeKSu8H0sCSPA3pipEYOfnIUf_yO3uXkVTSXPhDUZuzhGZ787ETFz8wukfIe3N6MtL1DNHrom2-FMTxI";

// Check for Service workers
if ("serviceWorker" in navigator) {
  send().catch(err => {
    console.error(err);
  });
}

// Register the service worker
// Register push
// Send the notification
async function send() {
  // Register ServiceWorker
  console.log("Registering service worker");
  const register = await navigator.serviceWorker.register("worker.js", {
    scope: "/"
  });
  console.log("Service worker registered");

  //   Register Push
  console.log("Registering push");
  const subscription = await register.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey: urlBase64ToUint8Array(publicVapidKey)
  });
  console.log("Push registered");

  //   Send Push Notification
  console.log("sending push");
  await fetch("/api/v1/subscribe", {
    method: "POST",
    body: JSON.stringify(subscription),
    headers: {
      "content-type": "application/json"
    }
  });
  console.log("sent push");
}

function urlBase64ToUint8Array(base64String) {
  const padding = "=".repeat((4 - base64String.length % 4) % 4);
  const base64 = (base64String + padding)
    .replace(/\-/g, "+")
    .replace(/_/g, "/");

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}
