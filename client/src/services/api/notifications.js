import { client } from "../axiosClient/axiosClientApi";

export const fetchNotifications = async (numOfDaysPrior) => {
  try {
      const response = await client.get(`/notifications/${numOfDaysPrior}`);
      if (response.status === 200) {
        // console.log(response.data.notifications);
        
          return response.data.notifications;
      }
  } catch (error) {
      console.log("Error fetching notifications:", error);
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
export const updateEmployeeNotification = async (updatedData) => { 
  try {
    const response = await client.put("updateEmployeeNotification", {
      updatedData,
    });
    if (response.status === 200) {
      return response;
    }
  } catch (error) {
    console.log("Error updating employee notification :", error);
  }
};
