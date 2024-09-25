import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./store/store.js";
import { SocketProvider } from "./components/SocketProvider.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        {/* <SocketProvider> */}
        <App />
        {/* </SocketProvider> */}
      </BrowserRouter>
    </Provider>
  </StrictMode>
);
