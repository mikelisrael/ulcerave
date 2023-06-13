/* This code is importing necessary modules and components for a React application, including the React
and ReactDOM libraries, a custom `App` component, and CSS files for styling. It is also importing an
`AppProvider` component from a custom `context.jsx` file. Finally, it is rendering the `App`
component wrapped in a `React.StrictMode` and `AppProvider` component using `ReactDOM.createRoot` to
render the application to the DOM. */
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./Layout.jsx";
import "./index.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { AppProvider } from "./context.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AppProvider>
      <App />
    </AppProvider>
  </React.StrictMode>
);
