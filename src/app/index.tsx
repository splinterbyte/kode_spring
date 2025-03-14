import { createRoot } from "react-dom/client";
import { QueryProvider } from "./providers";
import { AppRouter } from "./router";
import "./global.css";

createRoot(document.getElementById("root")!).render(
  <QueryProvider>
    <AppRouter />
  </QueryProvider>
);
