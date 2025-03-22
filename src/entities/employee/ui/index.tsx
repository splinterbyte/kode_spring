import styled from "styled-components";
import { TEmployee } from "../types";
import { themes, useStoreTheme } from "@/shared";
import { useTranslation } from "react-i18next";

const EmployeeStyle = styled.div<{ theme: string }>`
  height: 80px;
  display: flex;
  img {
    width: 72px;
    height: 72px;
    border-radius: 100%;
  }
  div {
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin-left: 16px;
    width: 100%;
    span {
      &:first-child {
        font-size: 20px;
        font-weight: 500;
        color: ${({ theme }) => theme.color};
      }
      &:last-child {
        font-size: 16px;
        color: #55555c;
      }
    }
  }
  p {
    align-items: center;
    font-size: 12px;
    display: flex;
    width: 70px;
    justify-content: right;
    color: #55555c;
  }
`;

export const Employee = ({
  avatarUrl,
  firstName,
  lastName,
  userTag,
  department,
  birthday,
}: TEmployee) => {
  const { theme } = useStoreTheme();
  const { i18n } = useTranslation();
  const formatDate = (dateString: string): string => {
    const options: Intl.DateTimeFormatOptions = {
      day: "2-digit",
      month: "short",
    };
    const date = new Date(dateString);

    return date
      .toLocaleDateString(`${i18n.language}`, options)
      .replace(".", "");
  };

  return (
    <EmployeeStyle theme={themes[theme]}>
      <img src={avatarUrl} />
      <div>
        <span>
          {firstName} {lastName} <span>{userTag}</span>
        </span>
        <span>{department}</span>
      </div>
      <p>{birthday && formatDate(birthday)}</p>
    </EmployeeStyle>
  );
};
