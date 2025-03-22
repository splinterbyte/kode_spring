import { themes, useStoreTheme } from "@/shared";
import searchError from "@/shared/assets/searchError.svg";
import { useTranslation } from "react-i18next";
import styled from "styled-components";

const SearchErrorStyles = styled.div<{ theme: string }>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 70vh;
  span {
    &:first-of-type {
      font-weight: 600;
      font-size: 17px;
      line-height: 22px;
      margin: 8px 0 12px 0;
      color: ${({ theme }) => theme.color};
    }

    color: #97979b;
  }
  img {
    height: 56px;
    width: 56px;
  }
`;

export const SearchError = () => {
  const { t } = useTranslation();
  const { theme } = useStoreTheme();
  return (
    <SearchErrorStyles theme={themes[theme]}>
      <img src={searchError} />
      <span>{t("srcErrorTitle")}</span>
      <span>{t("srcErrorMessage")}</span>
    </SearchErrorStyles>
  );
};
