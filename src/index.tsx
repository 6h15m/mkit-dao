import React from "react";
import { createRoot } from "react-dom/client";
import { MoralisProvider } from "react-moralis";
import "./styles/index.css";
import "./styles/tailwind.css";
import App from "./App";

const container = document.getElementById("root");

if (!container) {
  throw new Error("Failed to find the root element");
}

const root = createRoot(container);
root.render(
  <MoralisProvider
    serverUrl={`https://sffwt39os2zb.usemoralis.com:2053/server`}
    appId={`ZDl05ks4ZHzSHyo99WkfwLfWnL9RbctdQkoUoFe2`}
  >
    <App />
  </MoralisProvider>,
);
