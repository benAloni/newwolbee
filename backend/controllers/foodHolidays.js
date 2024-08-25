import FoodHolidaysModel from "../models/FoodHolidaysModel.js";

export const getFoodHoliday =  async (req, res) => {
    let FoodHoliday;
  try {    
    FoodHoliday = await FoodHolidaysModel.find({})            
    } catch (error) {
      console.error("Error finding FoodHoliday:", error);
      res.status(500).send("Internal Server Error");
    }
    res.status(200).json(FoodHoliday);
  }