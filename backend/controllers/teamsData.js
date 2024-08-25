import TeamModel from "../models/TeamModel.js"

export const getTeams = async(req, res) =>{
    let teams;
    try {
         teams = await TeamModel.find({});
     
    } catch (error) {
        console.error("Error getting teams:", error);
        res.status(500).json({ message: "An error occurred while fetching teams data." });
    }
    res.status(200).json(teams);
}