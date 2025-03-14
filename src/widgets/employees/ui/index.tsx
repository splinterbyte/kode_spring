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
  height: 800px;
  margin-top: 16px;
  overflow-y: auto;
  scrollbar-width: thin;
  a {
    text-decoration: none;
    color: #000000;
  }
`;

export const Employees = () => {
  const { selectedDepartment } = store.useStoreGroup();
  const { setEmployees, employees, searchQuery } = store.useStoreSearch();
  const { sortByAlphabet } = store.useStoreSort();
  const { data: fetchEmployees = [], isLoading } =
    useGetEmployees(selectedDepartment);
  console.log(isLoading);

  useEffect(() => {
    if (!isLoading && fetchEmployees) {
      setEmployees(fetchEmployees.items);
    }
  }, [fetchEmployees, isLoading, setEmployees]);

  const filterEmployees = (employee: TEmployee) => {
    const searchFields = [
      employee.firstName,
      employee.lastName,
      employee.department,
      employee.userTag,
    ];

    return searchFields.some(
      (field) => field?.toLowerCase().includes(searchQuery.toLowerCase()) //+
    );
  };

  const filteredEmployees = employees.filter(filterEmployees);

  const employeesList = sortByAlphabet
    ? [...filteredEmployees].sort((a, b) =>
        (a.firstName ?? "").localeCompare(b.firstName ?? "")
      )
    : filteredEmployees;

  console.log(filteredEmployees);

  return (
    <EmployeesStyles>
      {isLoading ? (
        [...new Array(10)].map(() => <Skeleton />)
      ) : employeesList.length ? (
        employeesList?.map((employee: TEmployee) => (
          <Link to={`/profile/${employee.id}`}>
            <Employee
              key={employee.id}
              avatarUrl={employee.avatarUrl}
              firstName={employee.firstName}
              lastName={employee.lastName}
              userTag={employee.userTag}
              department={employee.department}
              birthday={employee.birthday}
            />
          </Link>
        ))
      ) : (
        <SearchError />
      )}
    </EmployeesStyles>
  );
};
