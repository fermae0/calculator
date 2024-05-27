import React from "react";
import * as ReactDOMClient from "react-dom/client";
import App from "./App.js";
import "./css/styles.css"

const app = ReactDOMClient.createRoot(document.getElementById("app"))
app.render(<App />)
