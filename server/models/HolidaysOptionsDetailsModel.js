import mongoose from "mongoose";

const holidaysOptionsDetailsSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  optionName: {
    type: String,
    required: true,
  },
});

const HolidaysOptionsDetailsModel = mongoose.model('holidayoptionsdetails', holidaysOptionsDetailsSchema);


export default HolidaysOptionsDetailsModel;