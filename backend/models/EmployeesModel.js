import mongoose from "mongoose";

const employeeSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: [true, "please provide full name"]
    },
    employeeOfManagerId: {
        type: String,
        required: [true, "please provide employee of manager id"]
    },
    id: { // Change to civilId?
        type: String,
        unique: true,
        required: [true, "please provide civil id"]
    },
    role: {
        type: String,
        required: [true, "please provide role"]
    },
    team: {
        type: mongoose.Schema.ObjectId,
        required: [true, "please provide team id"]
    },
    DataOfBirth: {
        type: String,
        required: [true, "please provide date of birth"]
    },
    PlaceOfResidence: {
        type: String,
        required: [true, "please provide place of residence"]
    },
    FamilyStatus: {
        type: String,
        required: [true, "please provide family status"]
    },
    NumOfChildren: {
        type: Number,
        required: [true, "please provide number of children"]
    },
    Seniority: {
        type: Number,
        required: [true, "please provide years in the company"]
    },
    Anniversary: {
        type: String,
        required: [true, "please provide anniversary date"]
    },
    LatestActivity: {
        type: Array,
        required: [true, "please provide latest activity"]
    },
    InterestingFact: {
        type: String,
        required: [true, "please provide interesting fact"]
    },
    ClosestPersonalEvent: {
        type: Array,
        required: [true, "please provide closest personal event"]
    },
    singers: {
        type: Array,
        required: [true, "please provide singers"]
    },
    FoodAndDrinks: {
        type: Array,
        required: [true, "please provide food and drinks"]
    },
    Restaurants: {
        type: Array,
        required: [true, "please provide restaurants"]
    },
    Hobbies: {
        type: Array,
        required: [true, "please provide hobbies"]
    },
    TopInsights: {
        type: Array,
        required: [true, "please provide top insights"]
    },
    LatestInfo: {
        type: Array,
        required: [true, "please provide latest info"]
    },
});

const EmployeeModel = mongoose.model('employees', employeeSchema);

export default EmployeeModel;
