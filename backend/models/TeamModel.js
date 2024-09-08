import mongoose from "mongoose";


const teamSchema = new mongoose.Schema({
    name : {
        type : String,
        required : [true,"please provide name"],
        // unique : true  ??
    },
    teamLeader : {
        type : mongoose.Schema.ObjectId,
        required : [true, "please provide team leader details"]
    },
})

const TeamModel = mongoose.model('team', teamSchema);

export default TeamModel;