import { TEmployee } from "@/entities/employee";
import { Link, useParams } from "react-router";
import styled from "styled-components";
import arrow from "@/shared/assets/arrow.svg";
import star from "@/shared/assets/star.svg";
import phone from "@/shared/assets/phone.svg";
import { store } from "@/shared";
import { useGetEmployees } from "@/widgets/employees/api/useGetEmployees";
import { useEffect } from "react";

const ProfileStyles = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  .wrapper {
    width: 90%;
  }
  .main {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    height: 280px;
    background-color: #f7f7f8;

    .arrow {
      height: 60px;
      width: 100%;
      display: flex;
      align-items: center;
    }
    .card {
      display: flex;
      width: 100%;
      height: 220px;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      img {
        height: 104px;
        width: 104px;
        border-radius: 64px;
      }
      h1 {
        margin-top: 24px;
        font-size: 24px;
        span {
          color: #97979b;
          font-size: 17px;
          font-weight: 400;
          margin: 4px 0 2px 4px;
        }
      }
      span {
        margin-top: 12px;
        font-size: 13px;
        color: #97979b;
      }
    }
  }
  .details {
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: center;
    .wrapper {
      div {
        height: 60px;
        display: flex;
        align-items: center;
        img {
          margin-right: 14px;
        }
        a {
          color: black;
          text-decoration: none;
          display: flex;
        }
        span {
          display: flex;
        }
        .bdate {
          width: 90%;
        }
        .age {
          width: 10%;
          display: flex;
          justify-content: right;
          color: #97979b;
        }
      }
      hr {
        border: none;
        height: 1px;
        background-color: #f7f7f8;
      }
    }
  }
`;

export const Profile = () => {
  const { id } = useParams();
  const { employees, setEmployees } = store.useStoreSearch();
  const { data: fetchEmployees = [], isLoading } = useGetEmployees("");

  useEffect(() => {
    if (!isLoading && fetchEmployees && employees.length === 0) {
      setEmployees(fetchEmployees.items);
    }
  }, [fetchEmployees, isLoading, employees, setEmployees]);
  const employee = employees.find((emp: TEmployee) => emp.id === id);

  const formatPhone = employee?.phone
    ?.replace(/\D/g, "")
    ?.replace(/^7(\d{3})(\d{3})(\d{2})(\d{2})$/, "+7 ($1) $2 $3 $4");

  const months = [
    "января",
    "февраля",
    "марта",
    "апреля",
    "мая",
    "июня",
    "июля",
    "августа",
    "сентября",
    "октября",
    "ноября",
    "декабря",
  ];

  const age = employee?.birthday
    ? new Date().getFullYear() -
      new Date(employee?.birthday).getFullYear() -
      (new Date().getTime() <
      new Date(employee?.birthday).setFullYear(new Date().getFullYear())
        ? 1
        : 0)
    : undefined;

  const ageSuffix = age
    ? age % 10 === 1 && age % 100 !== 11
      ? "год"
      : age % 10 >= 2 && age % 10 <= 4 && (age % 100 < 10 || age % 100 >= 20)
      ? "года"
      : "лет"
    : undefined;

  const [year, month, day] = employee?.birthday?.split("-") ?? [];
  const monthIndex = parseInt(month ?? "1", 10) - 1;
  const formatBirthday =
    year && month && day ? `${day} ${months[monthIndex]} ${year}` : "";

  return (
    <ProfileStyles>
      <div className="main">
        <div className="wrapper">
          <span className="arrow">
            <Link to="/">
              <img src={arrow} />
            </Link>
          </span>
          <div className="card">
            <img src={employee?.avatarUrl} />
            <h1>
              {employee?.firstName} {employee?.lastName}
              <span>{employee?.userTag}</span>
            </h1>
            <span>{employee?.department}</span>
          </div>
        </div>
      </div>
      <div className="details">
        <div className="wrapper">
          <div>
            <span className="bdate">
              <img src={star} />
              {formatBirthday}
            </span>

            <span className="age">
              {age} {ageSuffix}
            </span>
          </div>
          <hr />
          <div>
            <a href={`tel:${employee?.phone}`}>
              <img src={phone} />
              {formatPhone}
            </a>
          </div>
        </div>
      </div>
    </ProfileStyles>
  );
};
