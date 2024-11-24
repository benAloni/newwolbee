import HolidaysOptionsDetailsModel from "../models/HolidaysOptionsDetailsModel.js";


export const getHolidaysOptionsDetails = async (req, res) => {
    try {
      const holidaysOptionsDetails = await HolidaysOptionsDetailsModel.find(); 
      res.status(200).json(holidaysOptionsDetails);
    } catch (error) {
      console.error("Error getting holidays options details:", error);
      res.status(500).json("Internal Server Error");
    }
  };
  