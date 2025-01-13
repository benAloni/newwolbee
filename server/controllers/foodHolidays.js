import FoodHolidaysModel from "../models/FoodHolidaysModel.js";

export const getFoodHoliday =  async (req, res) => {
    let FoodHoliday;
  try {    
    FoodHoliday = await FoodHolidaysModel.find({})            
    } catch (error) {
      console.error("Error finding FoodHoliday:", error);
      return  res.status(500).send("Internal Server Error");
    }
    return res.status(200).json(FoodHoliday);
  }