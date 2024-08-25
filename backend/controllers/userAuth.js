import UserModel from "../models/UserModel.js";
import { getAuth } from "firebase-admin/auth";

//"register"
export const fillUserInfo = async (req, res) => {
 const { civilId } = req.body
 const {uid} = req
 let payload;
  try {
  //add user's role with user claims
   await getAuth().setCustomUserClaims(uid, {role: civilId == 0 ? "manager" : "otherUser", civilId})
  //save users role and civil id in db
  payload = {
    civilId,
    uid,
    role: civilId == 0 ? "manager" : "otherUser"
  }
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
  const {uid} = req
  try {
    return res.status(200).json(uid);
  } catch (error) {

    console.log(error.message);
    return res.status(500).send(error.message);
  }
};
