import { client } from "../axiosClient/axiosClientApi";

export const fetchEmployees = async () => {
  try {
    const response = await client.get("/getEmployees");
    if (response.status === 200) {
      const result = response.data;
      return result;
    }
  } catch (error) {
    console.log("Error fetching employees :", error);
  }
};

export const addEmployee = async ({ employeeData }) => {
  try {
    const response = await client.post("/addEmployee", {
      employeeData,
    });
    console.log(employeeData)
    if (response.status === 200) {
      const result = response.data;
      return result;
    }
    if (response.status === 422) {
      throw new Error(
        `Employee with ID number: ${employeeData.employeeId} ,already exists`
      );
    }
  } catch (error) {
    console.log("Error saving employee", error);
    throw error;  }
};
