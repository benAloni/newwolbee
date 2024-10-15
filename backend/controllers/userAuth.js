import UserModel from "../models/UserModel.js";
import { getAuth } from "firebase-admin/auth";

//"register"
export const fillUserInfo = async (req, res) => {
 const { fullName ,civilId } = req.body
 const {user} = req
 let payload;
  try {
  //add user's details with user claims
  await getAuth().setCustomUserClaims(user.uid, {
    fullName,
    email: user.email,
    role: civilId == 0 ? "manager" : "otherUser",
  });
  //save users role and civil id in db
  payload = {
    civilId,
    uid: user.uid,
    fullName,
    role: civilId == 0 ? "manager" : "otherUser",
  };
  const createUser = new UserModel(payload);
    const savedNewUser = await createUser.save();
    return res.status(201).json(savedNewUser)
  } catch (error) {
    console.log(error.message);
    return res.status(500).send(error.message);
  }
};
//"login"
export const verifyAuthentication = async (req, res) => {
  const {user} = req
  try {
    return res.status(200).json(user.uid);
  } catch (error) {

    console.log(error.message);
    return res.status(500).send(error.message);
  }
};
