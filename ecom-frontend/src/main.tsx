import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { MantineProvider } from "@mantine/core";
import '@mantine/core/styles.css'
import '@mantine/carousel/styles.css';
import { AuthProvider } from "./Components/AuthContext.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AuthProvider>
      <MantineProvider>
        <App />
      </MantineProvider>
      </AuthProvider>
  </StrictMode>
);
