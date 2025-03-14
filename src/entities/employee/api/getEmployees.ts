import { base } from "@/shared";

export const getEmployees = async (selectedDepartment: string | null) => {
  const response = await base.baseURL.get(
    `/users?__example=${selectedDepartment ? selectedDepartment : "all"}`
  );
  return response.data;
};
