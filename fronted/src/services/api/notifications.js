import { client } from "../axiosClient/axiosClientApi";

export const fetchNotifications = async () => {

  try {
    const response = await client.get("/getAllNotifications");
    if (response.status === 200) {
      const result = response.data;
      return result;
    }
  } catch (error) {
    console.log("Error fetching notifications :", error);
  }
};
export const fetchEmployeesNotifications = async () => {
  try {
    const response = await client.get("/getEmployeesNotifications");
    if (response.status === 200) {
      const result = response.data;
      return result;
    }
  } catch (error) {
    console.log("Error fetching employees notifications :", error);
  }
};
