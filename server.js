const express = require("express");
const webPush = require("web-push");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();

// Set static path
app.use(express.static(path.join(__dirname, "client")));

// Use body-parser
app.use(bodyParser.json);

const publicVapidKey =
  "BGX1XvgLeKSu8H0sCSPA3pipEYOfnIUf_yO3uXkVTSXPhDUZuzhGZ787ETFz8wukfIe3N6MtL1DNHrom2-FMTxI";
const privateVapidKey = "UYPMN32KhZ2dxmNGwWomXH19Uhpr4Xg1KAucs5eQOQ4";

webPush.setVapidDetails(
  "mailto: senthilvcet12@gmail.com",
  publicVapidKey,
  privateVapidKey
);

// Subscribe Route
app.post("api/v1/subscribe", (req, res) => {
  // Get PushSubscription object
  const subscription = req.body;

  res.status(201).json({});

  //   Create Payload
  const payload = JSON.stringify({ title: "Test Notification" });
  webPush.sendNotification(subscription, payload).catch(err => {
    console.error(err);
  });
});

const port = 3000;
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
