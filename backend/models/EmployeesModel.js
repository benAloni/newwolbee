import mongoose from "mongoose";

const employeeSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: [true, "Please provide full name"],
  },
  employeeOfManagerId: {
    type: String,
    required: [true, "Please provide the employee's manager Id"],
  },
  employeeId: {
    type: String,
    // unique: true,
    required: [true, "Please provide civil id"],
  },
  role: {
    type: String,
    required: [true, "Please provide role"],
  },
  team: {
    type: String,
    required: [true, "Please provide team name"],
  },
  dateOfBirth: {
    type: Date,
    required: [true, "Please provide date of birth"],
  },
  address: {
    type: String,
    required: [true, "Please provide place of residence"],
  },
  religion: {
    type: String,
  },
  passport: {
    type: String,
  },
  gender: {
    type: String,
    required: [true, "Please provide a gender"],
  },
  state: {
    type: String,
  },
  country: {
    type: String,
  },
  pinCode: {
    type: String,
  },
  department: {
    type: String,
  },
  designation: {
    type: String,
  },
  email: {
    type: String,
  },
  phone: {
    type: String,
  },
  maritalStatus: {
    type: String,
  },
  children: {
    type: String,
  },
  startDay: {
    type: Date,
    required: [true, "Please provide start date in the company"],
  },
  anniversary: {
    type: Date,
  },
  latestActivity: {
    type: Array,
  },
  interestingFact: {
    type: String,
  },
  closestPersonalEvent: {
    type: [String],
  },
  singers: {
    type: [String],
  },
  foodAndDrinks: [
    {
      food1: { type: String },
      food2: { type: String },
      drink: { type: String },
    },
  ],
  restaurants: [
    {
      restaurant1: { type: String },
      restaurant2: { type: String },
    },
  ],
  hobbies: [
    {
      hobby1: { type: String },
      hobby2: { type: String },
      hobby3: { type: String },
    },
  ],
  topInsights: {
    type: Array,
  },
  latestInfo: {
    type: Array,
  },
  vacation: [
    {
      destination: { type: String },
      purposeOfTrip: { type: String },
      startDate: { type: Date },
      endDate: { type: Date },
    },
  ],
  uid: { type: String },
});

const EmployeeModel = mongoose.model("employee", employeeSchema);

export default EmployeeModel;
