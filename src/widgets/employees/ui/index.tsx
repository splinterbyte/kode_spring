import { Employee, TEmployee } from "@/entities/employee";
import { useGetEmployees } from "../api/useGetEmployees";
import styled from "styled-components";
import { store } from "@/shared";
import { Skeleton } from "./skeleton";
import { useEffect } from "react";
import { SearchError } from "./error";
import { Link } from "react-router";

const EmployeesStyles = styled.div`
  display: flex;
  flex-direction: column;
  width: 90%;
  box-sizing: border-box;

  margin-top: 16px;

  a {
    text-decoration: none;
    color: #000000;
  }

  .line {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    margin: 28px 0 28px 0;
    span {
      width: 160px;
      color: #c3c3c6;
      display: flex;
      justify-content: center;
    }
  }
`;

export const Employees = () => {
  const { selectedDepartment } = store.useStoreGroup();
  const { setEmployees, employees, searchQuery } = store.useStoreSearch();
  const { sortByAlphabet, sortByBirthday } = store.useStoreSort();
  const { loading, setLoading } = store.useStoreLoading();
  const { data: fetchEmployees = [], isLoading } =
    useGetEmployees(selectedDepartment);

  useEffect(() => {
    if (isLoading) {
      // Устанавливаем загрузку только если текущее значение loading отличается от isLoading
      const currentLoading = loading; // Получаем текущее значение loading
      if (currentLoading !== isLoading) {
        setLoading(isLoading);
      }
    } else {
      setLoading(isLoading);
    }
    if (!isLoading && fetchEmployees) {
      setEmployees(fetchEmployees.items);
      localStorage.setItem("employees", JSON.stringify(fetchEmployees.items));
    }
  }, [fetchEmployees, isLoading, loading, setEmployees, setLoading]);

  const filterEmployees = (employee: TEmployee) => {
    const searchFields = [
      employee.firstName,
      employee.lastName,
      employee.department,
      employee.userTag,
    ];

    return searchFields.some((field) =>
      field?.toLowerCase().includes(searchQuery.toLowerCase())
    );
  };

  const filteredEmployees = employees.filter(filterEmployees);

  const sortedByAlphabet = sortByAlphabet
    ? [...filteredEmployees].sort((a, b) =>
        (a.firstName ?? "").localeCompare(b.firstName ?? "")
      )
    : filteredEmployees;

  const today = new Date();
  const currentYear = today.getFullYear();

  const currentYearUsers: TEmployee[] = [];
  const nextYearUsers: TEmployee[] = [];

  sortedByAlphabet.forEach((user) => {
    const birthDate = user.birthday ? new Date(user.birthday) : new Date();
    const thisYearsBirthday = new Date(
      currentYear,
      birthDate.getMonth(),
      birthDate.getDate()
    );

    if (thisYearsBirthday > today) {
      currentYearUsers.push(user);
    } else {
      nextYearUsers.push(user);
    }
  });

  const sortByBirthdayFunc = (a: TEmployee, b: TEmployee) => {
    const dateA = new Date(a.birthday || "");
    const dateB = new Date(b.birthday || "");
    if (dateA.getMonth() !== dateB.getMonth()) {
      return dateA.getMonth() - dateB.getMonth();
    }
    return dateA.getDate() - dateB.getDate();
  };

  currentYearUsers.sort(sortByBirthdayFunc);
  nextYearUsers.sort(sortByBirthdayFunc);

  const data =
    (sortByBirthday &&
      (currentYearUsers.length > 0 || nextYearUsers.length > 0)) ||
    (!sortByBirthday && sortedByAlphabet.length > 0);

  return (
    <EmployeesStyles>
      {isLoading ? (
        [...new Array(10)].map((_, index) => <Skeleton key={index} />)
      ) : data ? (
        <>
          {sortByBirthday ? (
            <>
              {currentYearUsers.length > 0 && (
                <>
                  {currentYearUsers.map((employee: TEmployee) => (
                    <Link to={`/profile/${employee.id}`} key={employee.id}>
                      <Employee
                        avatarUrl={employee.avatarUrl}
                        firstName={employee.firstName}
                        lastName={employee.lastName}
                        userTag={employee.userTag}
                        department={employee.department}
                        birthday={employee.birthday}
                      />
                    </Link>
                  ))}
                </>
              )}

              {currentYearUsers.length > 0 && nextYearUsers.length > 0 && (
                <div className="line">
                  <hr />
                  <span>2026</span> <hr />
                </div>
              )}
              {nextYearUsers.length > 0 && (
                <>
                  {nextYearUsers.map((employee: TEmployee) => (
                    <Link to={`/profile/${employee.id}`} key={employee.id}>
                      <Employee
                        avatarUrl={employee.avatarUrl}
                        firstName={employee.firstName}
                        lastName={employee.lastName}
                        userTag={employee.userTag}
                        department={employee.department}
                        birthday={employee.birthday}
                      />
                    </Link>
                  ))}
                </>
              )}
            </>
          ) : (
            sortedByAlphabet.map((employee: TEmployee) => (
              <Link to={`/profile/${employee.id}`} key={employee.id}>
                <Employee
                  avatarUrl={employee.avatarUrl}
                  firstName={employee.firstName}
                  lastName={employee.lastName}
                  userTag={employee.userTag}
                  department={employee.department}
                />
              </Link>
            ))
          )}
        </>
      ) : (
        <SearchError />
      )}
    </EmployeesStyles>
  );
};
