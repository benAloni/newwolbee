import { client } from "../axiosClient/axiosClientApi";


export const fetchEvents = async () => {
    try {
      const response = await client.get("/getEvents");
      if (response.status === 200) {
        const result = response.data;
        return result;
      }
    } catch (error) {
      console.log("Error fetching events :", error);
    }
  };


export const addEvent = async (eventData) => {
    try {
      const response = await client.post("/addEvents", {
        eventData,
      });
      if (response.status === 200) {
        const result = response.data;
        return result;
      }
    } catch (error) {
      console.log("Error adding new event :", error);
    }
  };



