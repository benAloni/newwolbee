import express from "express";
import cors from "cors";
import xlsx from "xlsx";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import dotenv from "dotenv";
dotenv.config();
import dbConnection from "./Connection/dbConnection.js";
import router from "./routes/index.js";
import EmployeeModel from "./models/EmployeesModel.js";
import { log } from "console";

const app = express();
app.use(cors());
app.use(express.json());

app.use(express.static("fronted"));

app.use(
  cors({
    origin: [
      "http://www.wolbee.com", 
      "https://wolbee-front-gkfchuwp6q-uc.a.run.app",
      "http://localhost:3000",
    ],
    credentials: true,
  })
);

// // reading data from XL file
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);
// const filePath = path.join(__dirname, "employeesUpdated.xlsx");

// // Check if the file exists
// if (!fs.existsSync(filePath)) {
//   console.error("File not found:", filePath);
//   process.exit(1);
// }
// const workbook = xlsx.readFile(filePath);
// const worksheet = workbook.Sheets[workbook.SheetNames[0]];
// const data = xlsx.utils.sheet_to_json(worksheet);
// // data.splice(0, 1);
// console.log(data)


// FOR GOOD GOOD PRACTICE. since"" empty env is a red flag
const port = process.env.PORT ?? 5000;

// api endpoint

app.use("/api", router);

// app.post("/addemployee", async (req, res) => {
//   console.log('hi');
//   try {
//     const {
//       fullName, employeeOfManagerId, id, role, DataOfBirth, PlaceOfResidence, FamilyStatus,
//       NumOfChildren, YearsInTheCompany, Anniversary, InterestingFact, LastestActivity,
//       ClosestPersonalEvent, singers, FoodAndDrinks, Restaurants,ies } = req.body;

//     if (
//       fullName && employeeOfManagerId && id && role && DataOfBirth && PlaceOfResidence
//       && FamilyStatus && NumOfChildren !== undefined && YearsInTheCompany !== undefined
//       && Anniversary && InterestingFact && LastestActivity && ClosestPersonalEvent
//       && singers && FoodAndDrinks && Restaurants &&ies) {
//       const employee = new Employee({
//         fullName, employeeOfManagerId, id, role, DataOfBirth, PlaceOfResidence, FamilyStatus,
//         NumOfChildren, YearsInTheCompany, Anniversary, InterestingFact, LastestActivity,
//         ClosestPersonalEvent, singers, FoodAndDrinks, Restaurants,ies});

//       await employee.save();
//       console.log("Employee registered successfully:", employee);
//       res.status(201).send("Employee registered successfully");
//     } else {
//       res.status(400).send("Invalid data");
//     }
//   } catch (error) {
//     console.error("Error registering employee:", error);
//     res.status(500).send("Internal Server Error");
//   }
// });

// app.post('/findemployees', async (req, res) => {
//   try {
//     const manager = req.body;
//     if (manager) {
//       const currentManagerData = await Manager.findOne({
//         email: manager.email,
//         password: manager.password
//       });
//       if (currentManagerData) {
//         const employeesArr = await Employee.find({ employeeOfManagerId: currentManagerData.id });
//         console.log(employeesArr);
//         res.json(employeesArr);
//       }
//     } else {
//       res.status(400).send("Manager ID is required");
//     }
//   } catch (error) {
//     console.error("Error finding employees:", error);
//     res.status(500).send("Internal Server Error");
//   }
// });

dbConnection().then(() => {
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
});

// adding data from XL to db
// data.forEach(async (row) => {
//   const employee = new EmployeeModel({
//     fullName: row.fullName,
//     employeeOfManagerId: row.employeeOfManagerId,
//     id: row.id,
//     role: row.role,
//     team: row.team,
//     DataOfBirth: row.DataOfBirth,
//     PlaceOfResidence: row.PlaceOfResidence,
//     FamilyStatus: row.FamilyStatus,
//     NumOfChildren: row.NumOfChildren,
//     Seniority: row.Seniority,
//     Anniversary: row.Anniversary,
//     LatestActivity: row.LatestActivity || [],
//     InterestingFact: row.InterestingFact,
//     ClosestPersonalEvent: row.ClosestPersonalEvent || [],
//     singers: row.singers,
//     FoodAndDrinks: row.FoodAndDrinks || [],
//     Restaurants: row.Restaurants || [],
//     Hobbies: row.Hobbies || [],
//     TopInsights: row.TopInsights || [],
//     LatestInfo: row.LatestInfo || [],
//   });

//   await employee.save();
// });
