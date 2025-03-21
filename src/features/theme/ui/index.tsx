import { store } from "@/shared";

export const ToggleTheme = () => {
  const { theme, toggleTheme } = store.useStoreTheme();

  return (
    <button onClick={toggleTheme}>
      Переключить на {theme === "light" ? "темную" : "светлую"} тему
    </button>
  );
};
