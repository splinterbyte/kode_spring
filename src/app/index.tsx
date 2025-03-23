import { createRoot } from "react-dom/client";
import { QueryProvider } from "./providers";
import { AppRouter } from "./router";
import { TogglePanel } from "@/features/togglePanel";
import "./config/i18n";

createRoot(document.getElementById("root")!).render(
  <QueryProvider>
    <AppRouter />
    <TogglePanel />
  </QueryProvider>
);
