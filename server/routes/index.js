import express from "express";
import { applicationDefault, getApps, initializeApp } from "firebase-admin/app";
import { getStorage, getDownloadURL } from "firebase-admin/storage";
import { fillUserInfo, verifyAuthentication } from "../controllers/userAuth.js";
import { getTeams } from "../controllers/teamsData.js";
import {
  getEmployees,
  getEmployee,
  addEmployee,
  updateEmployeeVacation,
  updateEmployeeInsights,
  updateEmployeeSickLeave,
  deleteEmployee,
  addFamilyMember,
  addSonEvent,
  updateEmployeeEvent,
} from "../controllers/employeesData.js";
import { getFoodHoliday } from "../controllers/foodHolidays.js";
import {
  addNotification,
  getAllNotifications,
  getEmployeesNotifications,
  updateEmployeeNotification,
  deleteNotification,
} from "../controllers/allNotificationsData.js";
import { addEvent, getEvents, deleteEvent } from "../controllers/eventsData.js";
import { isAuthenticated } from "../middleware/auth.js";
import {
  getCompanyEvents,
  addNewCompanyEvent,
  updateCompanyEvent,
  deleteCompanyEvent,
} from "../controllers/companyEventsData.js";
import checkBirthdays from "../schedulers/checkBirthdays.js";
import { getHolidaysOptionsDetails } from "../controllers/holidaysData.js";
import checkEmployeesEvents from "../schedulers/checkEmployeesEvents.js";
import {saveUserImageUrl} from "../controllers/userSettings.js"

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
router.get("/teams", getTeams);
//get all employees
router.get("/employees", getEmployees);
//get an employee by id
router.get("/employee/:employeeId", getEmployee);
//add new employee
router.post("/employee", addEmployee);
//delete an employee
router.delete("/employee", deleteEmployee);
//add Update employee
router.post("/employee/create-vacation", updateEmployeeVacation);
//update employee sick leave 
router.post("/updateEmployeeSickLeave", updateEmployeeSickLeave)

router.post('/updateEmployeeEvent', updateEmployeeEvent);

router.post("/addFamilyMember", addFamilyMember);

router.post('/addSonEvents', addSonEvent);  // This should match the endpoint you're calling
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
//update employee notification
router.put("/updateEmployeeNotification", updateEmployeeNotification);
//delete notification
router.delete("/deleteNotification", deleteNotification);

//delete event route
router.delete("/deleteEvent/:id", deleteEvent);
//add event note endpoint
// router.post("/addEventNote", addEventNote);
//update employee's insights & latest activity
router.put("/updateEmployeeInsights", updateEmployeeInsights);

router.get("/checkBirthdays", checkBirthdays)//for curl check. 
router.get("/checkEmployeesEventsNotifications", checkEmployeesEvents)//for curl check.
router.get("/getEmployeesNotifications", getEmployeesNotifications)//temporary route - till Eden adds the mongoose model discriminator
router.get("/getCompanyEvents", getCompanyEvents);
router.post("/addNewCompanyEvent", addNewCompanyEvent);
router.put("/updateCompanyEvent", updateCompanyEvent);
router.delete("/deleteCompanyEvent/:id", deleteCompanyEvent);
router.get("/getHolidaysOptionsDetails", getHolidaysOptionsDetails)

router.post("/saveUserImageUrl", saveUserImageUrl)


export default router;
