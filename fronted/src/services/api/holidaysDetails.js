import { client } from "../axiosClient/axiosClientApi";



export const fetchHolidaysDetailsOptions = async () => {
    try {
      const response = await client.get("/getHolidaysOptionsDetails");
      if (response.status === 200) {
        const result = response.data;
        return result;
      }
    } catch (error) {
      console.log("Error fetching holidays options details:", error);
    }
  };
  

