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
  ethnicity: {
    type: String,
  },
  passportNumber: {
    type: String,
  },
  passportExpDate: {
    type: Date,
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
    required: [true, "Please provide email address"],
  },
  phone: {
    type: String,
    required: [true, "Please provide Phone Number"],
    
  },
  maritalStatus: {
    type: String,
  },
  anniversary: {
    type: Date,
  },
  spouseInfo: {
    fullName: { type: String },
    gender: {
      type: String,
    },
    dateOfBirth: {
      type: Date,
    },
    
    nationality: { type: String },
    employmentStatus: { type: String },
  },
    familyMembers: [
      {
        name: { type: String },
        relationship: { type: String },
        gender: { type: String },
        dateOfBirth: { type: Date },
        show: { type: Boolean },
        phone: { type: Number },
        childrenEvents: [{ 
          typeOfEvent: { type: String },
          startDate: { type: Date },
          endDate: { type: Date },
          show: { type: Boolean },
        }],
      },
    ],
  emergencyContact:
    {
      fullName: { type: String },
      relationshipType: { type: String },
      phone: { type: String },
    },
  startDay: {
    type: Date,
    required: [true, "Please provide start date in the company"],
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
  favoriteSinger: {
    type: String,
  },
  favoriteFoods: {
    type: [String],
  },
  favoriteDrink: {
    type: String,
  },
  favoriteRestaurants: {
    type: [String],
  },
  hobbies: {
    type: [String],
  },
  topInsights: {
    type: Array,
  },
  latestInsights: {
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
  sickLeave: [
    {
      startDate: { type: Date },
      endDate: { type: Date },
    },
  ],

  wedding: [
    {
      startDate: { type: Date },
      show: { type: Boolean },
  }
],
engagement: [
    {
      startDate: { type: Date },
      show: { type: Boolean },
  }
],
weddingAnniversary  : [
    {
      startDate: { type: Date },
      show: { type: Boolean },
  }
],

  remainingSickLeaveDays: {
    type: Number,
  },
  remainingVacationLeaveDays: {
    type: Number,
  },
  uid: {
    type: String,
    required: [true, "Please provide uid of the employee creator"],
  },
  imageUrl: {
    type: String,
  },
});

const EmployeeModel = mongoose.model("memployee", employeeSchema);

export default EmployeeModel;
