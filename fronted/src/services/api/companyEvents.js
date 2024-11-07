import { client } from "../axiosClient/axiosClientApi";

export const fetchCompanyEvents = async () => {
  try {
    const response = await client.get("/getCompanyEvents");
    if (response.status === 200) {
      const result = response.data;
      return result;
    }
  } catch (error) {
    console.log("Error fetching company events :", error);
  }
};

export const addNewCompanyEvent = async (newCompanyEventData) => {
  try {
    const response = await client.post("/addNewCompanyEvent", {
      newCompanyEventData,
    });
    if (response.status === 200) {
      const result = response.data;
      return result;
    }
  } catch (error) {
    console.log("Error adding new company event :", error);
  }
};
export const deleteCompanyEvent = async (id) => {
  try {
    const response = await client.delete("/deleteCompanyEvent", {
      data: { id },
    });
    if (response.status === 200) {
      return response;
    }
  } catch (error) {
    console.log("Error deleting company event", error);
  }
};
export const updateCompanyEvent = async ({
    id,
    dueDate,
    time,
    location,
    numberOfGuests,
    budget,
    eventTheme,
    activity,
}) => {
  try {
    const response = await client.put("/updateCompanyEvent", {
      id,
      dueDate,
      time,
      location,
      numberOfGuests,
      budget,
      eventTheme,
      activity,
    });
    if (response.status === 200) {
      // const result = response.data;
      return response;
    }
  } catch (error) {
    console.log("Error updating employee's vacation:", error);
  }
};
