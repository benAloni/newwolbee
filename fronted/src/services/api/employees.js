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