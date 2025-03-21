import { Search } from "@/features/search";
import { Group } from "@/features/group";
import styled from "styled-components";
import { useEffect, useState } from "react";
import { store, themes } from "@/shared";
import { useGetEmployees } from "@/widgets/employees/api/useGetEmployees";
import { ToggleTheme } from "@/features/theme/ui";

const TopBar = styled.div<{
  changeColor: boolean;
  tempBlue: boolean;
  themeBg: string;
}>`
  width: 100%;
  height: auto;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  transition: background-color 0.5s ease;

  /* Логика для background-color */
  background-color: ${({ tempBlue, changeColor, themeBg }) => {
    if (tempBlue) {
      return "#6534FF"; // Синий фон, если загрузка активна
    }
    return changeColor ? themeBg : "#F44336"; // Прозрачный или красный фон
  }};

  h1 {
    color: ${({ changeColor, tempBlue }) => {
      if (changeColor === false && tempBlue === false) {
        return "#fff";
      }
      if (tempBlue === true && changeColor === true) {
        return "#fff";
      }
      return "#000";
    }};
    width: 90%;
  }
`;

export const Topappbar = () => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const { selectedDepartment } = store.useStoreGroup();
  const { refetch } = useGetEmployees(selectedDepartment);
  const [tempBlue, setTempBlue] = useState(false);
  const theme = store.useStoreTheme((state) => state.theme);
  const updateNetworkStatus = () => {
    setIsOnline(navigator.onLine);
    if (navigator.onLine) {
      refetch();
      setTempBlue(true);
      setTimeout(() => {
        setTempBlue(false);
      }, 2000);
    }
  };

  useEffect(() => {
    window.addEventListener("online", updateNetworkStatus);
    window.addEventListener("offline", updateNetworkStatus);
    return () => {
      window.removeEventListener("online", updateNetworkStatus);
      window.removeEventListener("offline", updateNetworkStatus);
    };
  }, []);

  return (
    <TopBar
      changeColor={isOnline}
      tempBlue={tempBlue}
      themeBg={themes[theme].background}
    >
      <h1>Поиск</h1>
      <Search isOnline={isOnline} tempBlue={tempBlue} />
      <Group />
      <ToggleTheme />
    </TopBar>
  );
};
