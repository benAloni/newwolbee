import { client } from "../axiosClient/axiosClientApi";

export const saveUserImageUrl = async ({ imageUrl }) => {
  try {
    const response = await client.post("/employee/save-user-image-url", { imageUrl });
    if (response.status === 200) {
      const result = response.data;
      console.log(result);
      return result;
    }
  } catch (error) {
    console.log("Error saving user image :", error);
  }
};
