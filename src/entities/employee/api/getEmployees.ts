import { base } from "@/shared";

export const getEmployees = async (selectedDepartment: string | null) => {
  await new Promise((resolve) => setTimeout(resolve, 2000));
  const response = await base.baseURL.get(
    `/users?__example=${selectedDepartment ? selectedDepartment : "all"}`
  );
  return response.data;
};
