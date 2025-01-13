import mongoose from "mongoose";

const companyEventSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Please provide a title to the event"],
  },
  dueDate: {
    type: Date,
    required: [true, "Please provide due date of the event"],
  },
  time: [
    {
      startsAt: { type: String },
      endsAt: { type: String },
    },
  ],
  location: {
    type: String,
    required: [true, "Please provide the location of the event"],
  },
  numberOfGuests: {
    type: Number,
    required: [true, "Please provide number of guests to the event"],
  },
  budget: {
    //**Note - budget will need to be saved using the - MongoDb Model Monetary Data
    type: Number,
    required: [true, "Please provide the event budget"],
  },
  eventTheme: {
    type: String,
    required: [true, "Please provide theme of the event"],
  },
  activity: {
    type: String,
    required: [true, "Please provide the activity in the event"],
  },
  uid: {
    type: String,
    required: [true, "Please provide uid of the event creator"],
  },
});
const CompanyEventModel = mongoose.model("companyEvent", companyEventSchema);
export default CompanyEventModel;
