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
    if (response.status === 200) {
      return response;
    }
    if (response.status === 422) {
      throw new Error(
        `Employee with ID number: ${employeeData.employeeId} ,already exists`
      );
    }
  } catch (error) {
    console.log("Error saving employee", error);
    throw error
     }
};
export const deleteEmployee = async (id) => {
  try {
    const response = await client.delete("/deleteEmployee", {
      data: { id } 
    })
    if (response.status === 200) {
      return response;
    }

  } catch (error) {
    console.log("Error deleting employee", error);
  }
}
export const updateEmployeeVacation = async ({
  id,
  purposeOfTrip,
  destination,
  startDate,
  endDate,
}) => {
  try {
    const response = await client.post("/updateEmployeeVacation", {
      id,
      purposeOfTrip,
      destination,
      startDate,
      endDate,
    });
    if (response.status === 200) {
      // const result = response.data;
      return response;
    }
  } catch (error) {
    console.log("Error updating employee's vacation:", error);
  }
};