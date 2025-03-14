import { TEmployee } from "@/entities/employee";
import { store } from "@/shared";
import { Link, useParams } from "react-router";
import styled from "styled-components";
import arrow from "@/shared/assets/arrow.svg";

const ProfileStyles = styled.div`
  display: flex;
  justify-content: center;

  .main {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    height: 280px;
    background-color: #f7f7f8;
    .wrapper {
      width: 90%;
    }
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
`;

export const Profile = () => {
  const { id } = useParams();
  const { employees } = store.useStoreSearch();
  const employee = employees.find((emp: TEmployee) => emp.id === id);
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
    </ProfileStyles>
  );
};
