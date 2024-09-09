import express from "express";
import { applicationDefault, getApps, initializeApp } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import { fillUserInfo, verifyAuthentication } from "../controllers/userAuth.js";
import { getTeams } from "../controllers/teamsData.js";
import { getEmployees } from "../controllers/employeesData.js";
import {
  addEvent,
  // addEventNote,
  getEvents,
} from "../controllers/eventsData.js";

const router = express.Router();
initializeApp({
  //in order to verify user Id tokens
  credential: applicationDefault(),
  projectId: "wolbee-444d9"
});


const authMiddleware = async (req, res, next) => {
  let { authorization } = req.headers;
  if (!authorization) {
    return res.status(401).json({ error: "Authorization key is missing" });
  }
  //   console.log(req.headers);
  const idToken = authorization.startsWith("Bearer ")
    ? authorization.slice(7)
    : null;
  if (!idToken) {
    return res.status(401).json({ error: "Bearer token is missing" });
  }
  try {
    const decodedToken = await getAuth().verifyIdToken(idToken); //check if token is valid - authentication(where does the request come from?)
    req.uid = decodedToken.uid; //put uid from firebase in the req - identification(who's making the request)
    next();
  } catch (error) {
    console.error("Error verifying token:", error);
    let status = 401;
    let message = "Unauthorized";

    switch (error.code) {
      case "auth/argument-error":
        message = "Invalid token format";
        break;
      case "auth/id-token-expired":
        message = "Token has expired";
        break;
      case "auth/id-token-revoked":
        message = "Token has been revoked";
        break;
      default:
        status = 500;
        message = "Internal server error";
        break;
    }

    return res.status(status).json({ error: message });
  }
};

router.use(authMiddleware);

//final registration step - use token for validation(if user exists in firebase)then save civil id in db
router.post("/fill-info", fillUserInfo);
// //login
router.post("/login", verifyAuthentication);
//get Teams
router.get("/teams", getTeams);
//get all employees
router.get("/getEmployees", getEmployees);
//get all events
router.get("/getEvents", getEvents);
//add event to calendar
router.post("/addEvent", addEvent);
//add event note endpoint
// router.post("/addEventNote", addEventNote);

export default router;
