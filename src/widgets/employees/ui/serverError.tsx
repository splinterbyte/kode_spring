import { themes, useStoreTheme } from "@/shared";
import { useTranslation } from "react-i18next";
import saucer from "@/shared/assets/saucer.svg";
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
    &:last-of-type {
      margin-top: 8px;
      color: #6534ff;
      font-weight: 600;
      cursor: pointer;
    }

    color: #97979b;
  }
  img {
    height: 56px;
    width: 56px;
  }
  a {
  }
`;

export const ServerError = () => {
  const { t } = useTranslation();
  const { theme } = useStoreTheme();

  return (
    <SearchErrorStyles theme={themes[theme]}>
      <img src={saucer} />
      <span>{t("srvErrorTitle")}</span>
      <span>{t("srvErrorMessage")}</span>
      <span onClick={() => window.location.reload()}>{t("srvTryAgain")}</span>
    </SearchErrorStyles>
  );
};
