import mongoose from "mongoose";

const foodSchema = new mongoose.Schema({
    name: String,
    date: String,
  });

  const FoodHolidaysModel = mongoose.model('foodHoliday', foodSchema);

export default FoodHolidaysModel;