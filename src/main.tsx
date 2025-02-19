import React from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { AuthProvider } from "./context/AuthContext.tsx";
import { BrowserRouter } from "react-router-dom";

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter> {/* ✅ Wrap the entire app with Router */}
      <AuthProvider> {/* ✅ AuthContext inside Router */}
        <App />
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
