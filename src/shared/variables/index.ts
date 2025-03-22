import { useTranslation } from "react-i18next";

export const useDepartments = () => {
  const { t } = useTranslation();

  return [
    { name: t("departments.all"), tag: "" },
    { name: t("departments.android"), tag: "android" },
    { name: t("departments.ios"), tag: "ios" },
    { name: t("departments.design"), tag: "design" },
    { name: t("departments.management"), tag: "management" },
    { name: t("departments.back_office"), tag: "back_office" },
    { name: t("departments.frontend"), tag: "frontend" },
    { name: t("departments.hr"), tag: "hr" },
    { name: t("departments.pr"), tag: "pr" },
    { name: t("departments.backend"), tag: "backend" },
    { name: t("departments.support"), tag: "support" },
    { name: t("departments.analytics"), tag: "analytics" },
  ];
};

export const themes: {
  [key: string]: {
    backgroundBlack: string;
    backgroundGray: string;
    backgroundProfile: string;
    color: string;
  };
} = {
  light: {
    backgroundBlack: "#ffffff",
    color: "#000000",
    backgroundGray: "#ffffff",
    backgroundProfile: "#F7F7F8",
  },
  dark: {
    backgroundBlack: "#1a1a1a",
    backgroundGray: "#252525",
    backgroundProfile: "#1a1a1a",
    color: "#ffffff",
  },
};
