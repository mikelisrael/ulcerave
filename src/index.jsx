import React from "react";
import ReactDOM from "react-dom/client";
import App from "./Layout.jsx";
import "./index.css";
import { AppProvider } from "./context.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AppProvider>
      <App />
    </AppProvider>
  </React.StrictMode>
);
