console.log("Service worker loaded");
self.addEventListener("push", e => {
  const data = e.data.json();
  self.registration.showNotification(data.title, {
    body: "Notified by you",
    icon: "https://ibb.co/iJdjRJ"
  });
});
