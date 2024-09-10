import mongoose from "mongoose";



const employeeSchema = new mongoose.Schema({
    FullName: {
      type: String,
      required: [true, "Please provide full name"]
    },
    EmployeeOfManagerId: {
      type: String,
      required: [true, "Please provide employee of manager id"]
    },
    EmployeeID: { 
      type: String, 
      unique: true, 
      required: [true, "Please provide civil id"], 
    },
    Role: {
      type: String,
      required: [true, "Please provide role"]
    },
    Team: {
      type: String,
      required: [true, "Please provide team id"]
    },
    DataOfBirth: {
      type: Date, 
      required: [true, "Please provide date of birth"]
    },
    Address: {
      type: String,
      required: [true, "Please provide place of residence"]
    },
    Religion : {
      type: String,
    },
    Passport : {
      type: String,
    },
    Gender : {
      type: String,
    },
    State : {
      type: String,
    },
    Country : {
      type: String,
    },
    PinCode : {
      type: String,
    },
    Department  : {
      type: String,
    },
    Designation   : {
      type: String,
    },
    Email : {
      type: String,
    },
    Phone: {
      type: String,
    },
    MaritalStatus: {
      type: String,
    },
    NumOfChildren: {
      type: Number,
    },
    StartDay: {
      type: Date, 
      required: [true, "Please provide start date in the company"]
    },
    Anniversary: {
      type: Date, 
    },
    LatestActivity: {
      type: Array,
    },
    InterestingFacts: {
      type: String,
    },
    ClosestPersonalEvent: {
      type: [String],
    },
    Singers: {
      type: [String],
    },
    FoodAndDrinks: [{
      food1: { type: String },
      food2: { type: String },
      drink: { type: String }
    }],
    Restaurants: [{
      restaurant1: { type: String },
      restaurant2: { type: String }
    }],
    Hobbies: [{
      hobby1: { type: String },
      hobby2: { type: String },
      hobby3: { type: String }
    }],
    TopInsights: {
      type: Array,
    },
    LatestInfo: {
      type: Array,
    },
    Vacation: [{
    name:{type:String},
    startDate: {type: Date},
     endDate: {type: Date },
        }],
     
   
    uid:
    {type:String} ,
  });
  
  const EmployeeModel = mongoose.model('Employee', employeeSchema);
  
  export default EmployeeModel;
  
