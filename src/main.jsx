import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { Toaster } from "react-hot-toast";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Toaster
      position="top-right"
      toastOptions={{
        duration: 3000,

        style: {
          background: "#111",
          color: "#fff",
          border: "1px solid #c8912a",
          borderRadius: "12px",
        },

        success: {
          iconTheme: {
            primary: "#c8912a",
            secondary: "#111",
          },
        },

        error: {
          iconTheme: {
            primary: "#ff4d4f",
            secondary: "#111",
          },
        },
      }}
    />

    <App />
  </React.StrictMode>
);
