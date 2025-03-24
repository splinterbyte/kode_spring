import { Search } from "@/features/search";
import { Group } from "@/features/group";
import styled from "styled-components";
import { useEffect, useState } from "react";
import { themes } from "@/shared";
import { useGetEmployees } from "@/widgets/employees/api/useGetEmployees";
import { useStoreGroup, useStoreTheme } from "@/shared/store";
import { useTranslation } from "react-i18next";
import { TogglePanel } from "@/features/togglePanel";

const TopBar = styled.div<{
  changeColor: boolean;
  tempBlue: boolean;
  theme: string;
}>`
  width: 100%;
  height: auto;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  transition: background-color 0.5s ease;

  background-color: ${({ tempBlue, changeColor, theme }) =>
    tempBlue ? "#6534FF" : changeColor ? theme.backgroundBlack : "#F44336"};

  h1 {
    color: ${({ changeColor, tempBlue, theme }) =>
      (changeColor === false && tempBlue === false) ||
      (changeColor === true && tempBlue === true)
        ? "#fff"
        : theme.color};
    margin: 10px 0 10px 0;
    width: 90%;
    display: flex;
    justify-content: space-between;
  }
`;

export const Topappbar = () => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const { selectedDepartment } = useStoreGroup();
  const { refetch } = useGetEmployees(selectedDepartment);
  const [tempBlue, setTempBlue] = useState(false);
  const theme = useStoreTheme((state) => state.theme);
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const { t } = useTranslation();
  return (
    <TopBar changeColor={isOnline} tempBlue={tempBlue} theme={themes[theme]}>
      <h1>
        {t("search")} <TogglePanel />
      </h1>
      <Search isOnline={isOnline} tempBlue={tempBlue} />
      <Group />
    </TopBar>
  );
};
