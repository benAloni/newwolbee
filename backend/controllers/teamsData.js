import TeamModel from "../models/TeamModel.js";

export const getTeams = async (req, res) => {
  let teams;
  try {
    teams = await TeamModel.find({});
  } catch (error) {
    console.error("Error getting teams:", error);
    return res
      .status(500)
      .json({ message: "An error occurred while fetching teams data." });
  }
  return res.status(200).json(teams);
};
