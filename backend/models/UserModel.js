import mongoose from "mongoose";


const userSchema = new mongoose.Schema({
    civilId : {  
        type : String,
        required : [true, "please provide Id"]
    },
    uid:{
        type : String,
        required : [true, "please provide uid"]
    },
    fullName : {
        type : String,
        required : [true, "please provide fullName"]
    },
    role : {
        type : String,
        required : [true, "please provide a role"]
    },
})

const UserModel = mongoose.model('users', userSchema);

export default UserModel;

