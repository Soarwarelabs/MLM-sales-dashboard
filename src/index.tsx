import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "App";
import { logger } from "utilities";

if ("serviceWorker" in navigator) {
  navigator.serviceWorker
    .register("./firebase-messaging-sw.js")
    .then(() => {
      logger("Background notifications enabled");
    })
    .catch((err) => {
      logger("Service worker registration failed, error");
    });
}

ReactDOM.render(<App />, document.getElementById("root"));
