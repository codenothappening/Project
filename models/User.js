
const mongoose = require("mongoose");



const UserSchema = new mongoose.Schema(
    {
        username:{type: String , required : true , unique: true},
        email:{type: String, required : true, unique: true},
        password:{type:String, required:true},
        isAdmin:{
            type:Boolean,
            default:false,
        },
        img:{type:String},
        //createdAt:Date.now() No need for mongoose
    },
    {timestamps:true} // This gonna Create a Created At and updated At times
);

module.exports = mongoose.model("User",UserSchema);