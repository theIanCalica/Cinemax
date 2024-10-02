import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { Provider } from "react-redux"; // Import Provider from react-redux
import store from "./store"; // Import your Redux store (make sure you have this in your project)

const root = ReactDOM.createRoot(document.getElementById("root"));

// Wrap App with the Provider and pass the store
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
