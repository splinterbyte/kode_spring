import { useStoreTheme } from "@/shared";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";

const TogglePanelStyles = styled.div`
  position: fixed;
  bottom: 20px;
  right: 20px;

  font-size: 16px;
  color: white;
  border: none;
  border-radius: 5px;
  transition: background-color 0.3s ease;
  display: flex;
  flex-direction: column;
  height: 120px;
  justify-content: space-evenly;
  button {
    appearance: none;
    background-color: #000000;
    border: 2px solid #1a1a1a;
    border-radius: 15px;
    box-sizing: border-box;
    color: #ffffff;
    cursor: pointer;
    justify-content: center;
    align-items: center;
    display: flex;
    font-size: 16px;
    font-weight: 600;
    line-height: normal;
    margin: 0;
    height: 50px;
    width: 50px;
    outline: none;
    text-align: center;
    text-decoration: none;
    transition: all 300ms cubic-bezier(0.23, 1, 0.32, 1);
    user-select: none;
    -webkit-user-select: none;
    touch-action: manipulation;
    will-change: transform;

    &:disabled {
      pointer-events: none;
    }

    &:hover {
      box-shadow: rgba(0, 0, 0, 0.25) 0 8px 15px;
      transform: translateY(-2px);
    }

    &:active {
      box-shadow: none;
      transform: translateY(0);
    }
  }
`;

export const TogglePanel = () => {
  const { theme, toggleTheme } = useStoreTheme();
  const { i18n } = useTranslation();
  const [language, setLanguage] = useState(i18n.language);

  const availableLanguages = ["ru", "en"];

  // Функция для переключения языка
  const toggleLanguage = () => {
    const currentIndex = availableLanguages.indexOf(language);
    const nextIndex = (currentIndex + 1) % availableLanguages.length;
    const nextLanguage = availableLanguages[nextIndex];

    setLanguage(nextLanguage); // Обновляем состояние
    i18n.changeLanguage(nextLanguage); // Меняем язык в i18next
  };

  return (
    <TogglePanelStyles>
      <button onClick={toggleTheme}>{theme === "light" ? "☀️" : "🌙"}</button>

      <button onClick={toggleLanguage}>{i18n.language}</button>
    </TogglePanelStyles>
  );
};
