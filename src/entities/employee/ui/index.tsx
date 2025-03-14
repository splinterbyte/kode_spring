import styled from "styled-components";
import { TEmployee } from "../types";
const EmployeeStyle = styled.div`
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
    width: 85%;
    span {
      &:first-child {
        font-size: 20px;
        font-weight: 500;
      }
      &:last-child {
        font-size: 16px;
        color: #55555c;
      }
    }
  }
  p {
    align-items: center;
    display: flex;
  }
`;

const formatDate = (dateString: string): string => {
  const options: Intl.DateTimeFormatOptions = {
    day: "2-digit",
    month: "short",
  };
  const date = new Date(dateString);
  return date.toLocaleDateString("ru-RU", options).replace(".", "");
};

export const Employee = ({
  avatarUrl,
  firstName,
  lastName,
  userTag,
  department,
  birthday,
}: TEmployee) => {
  return (
    <EmployeeStyle>
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
