import { app, storage } from "../../firebase/firebaseConfig";
import {
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";

export const fetchUserProfilePic = async (uid) => {
  try {
    const storageRef = ref(
      storage,
     `users/${uid}/user-profile-pic`
    );
    const result = await getDownloadURL(storageRef);
    return result;
  } catch (error) {
    if (error.code === "storage/object-not-found") {
      // console.log("No profile picture set for this user yet.");
      return null;
    } else {
      console.error("Error fetching profile pic:", error);
    }
  }
};
export const fetchEmployeesProfilePics = async (uid, employeeId) => {
  try {
    const storageRef = ref(
      storage,
      `/employeesProfilePics/${uid}/${employeeId}`
    );
    const result = await getDownloadURL(storageRef);
    return result;
  } catch (error) {
    if (error.code === "storage/object-not-found") {
      // console.log("No profile picture set for this user yet.");
      return null;
    } else {
      console.error("Error fetching employees profile pics:", error);
    }
  }
};

