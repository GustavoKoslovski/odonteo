import React from "react";
import ReactDOM from "react-dom";
import App from "./App.js";
import reportWebVitals from "./reportWebVitals";

import "./index.css";

export const ReactStrictMode = (
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

export const rootElement = document.getElementById("root");

ReactDOM.render(ReactStrictMode, rootElement);

reportWebVitals();
