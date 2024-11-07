import express from "express";
import { applicationDefault, getApps, initializeApp } from "firebase-admin/app";
import { getStorage, getDownloadURL } from "firebase-admin/storage";
import { fillUserInfo, verifyAuthentication } from "../controllers/userAuth.js";
import { getTeams } from "../controllers/teamsData.js";
import {
  getEmployees,
  addEmployee,
  updateEmployeeVacation,
  updateEmployeeInsights,
  deleteEmployee,
} from "../controllers/employeesData.js";
import { getFoodHoliday } from "../controllers/foodHolidays.js";
import {
  addNotification,
  getAllNotifications,
} from "../controllers/allNotificationsData.js";
import { addEvent, getEvents, deleteEvent } from "../controllers/eventsData.js";
import { isAuthenticated } from "../middleware/auth.js";
import {
  getCompanyEvents,
  addNewCompanyEvent,
  updateCompanyEvent,
  deleteCompanyEvent,
} from "../controllers/companyEventsData.js";
const router = express.Router();
initializeApp({
  //in order to verify user Id tokens
  credential: applicationDefault(),
  projectId: "wolbee-444d9",
  // storageBucket: "wolbee-444d9.appspot.com",
});

// const bucket = getStorage().bucket();

router.use(isAuthenticated);

//final registration step - use token for validation(if user exists in firebase)then save civil id in db
router.post("/create-account", fillUserInfo);
// //login
router.post("/login", verifyAuthentication);
//get Teams
router.get("/getTeams", getTeams);
//get all employees
router.get("/getEmployees", getEmployees);
//add new employee
router.post("/addEmployee", addEmployee);
//delete an employee
router.delete("/deleteEmployee", deleteEmployee);
//add Update employee
router.post("/updateEmployeeVacation", updateEmployeeVacation);
//get all food holidays
router.get("/getFoodHoliday", getFoodHoliday);
//get all events
router.get("/getEvents", getEvents);
//add event to calendar
router.post("/addEvent", addEvent);
//add All Notifications
router.post("/addNotification", addNotification);
//get All Notifications
router.get("/getAllNotifications", getAllNotifications);
// Add delete event route
router.delete("/deleteEvent/:id", deleteEvent);
//add event note endpoint
// router.post("/addEventNote", addEventNote);
//update employee's insights & latest activity
router.put("/updateEmployeeInsights", updateEmployeeInsights);

router.get("/getCompanyEvents", getCompanyEvents);
router.post("/addNewCompanyEvent", addNewCompanyEvent);
router.put("/updateCompanyEvent", updateCompanyEvent);
router.delete("/deleteCompanyEvent/:id", deleteCompanyEvent);
export default router;
