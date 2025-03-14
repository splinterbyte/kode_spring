import { useQuery } from "@tanstack/react-query";
import { employeeApi } from "@/entities/employee";

export const useGetEmployees = (selectedDepartment: string | null) =>
  useQuery({
    queryKey: ["employees", selectedDepartment],
    queryFn: () => employeeApi.getEmployees(selectedDepartment),
    staleTime: 5 * 60 * 1000,
    retry: 1,
  });
