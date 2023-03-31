const mongoose = require("mongoose");


const ProductSchema = new mongoose.Schema(
    {
        title: {type: String , required : true , unique: true},
        description: {type: String, required : true},
        image: {type:String, required:true},
        category: {type:Array},
        size: {type:Array},
        color: {type:Array},
        price: {type:Number, required:true},
        inStock:{type:Boolean,default:true},
        //createdAt:Date.now() No need for mongoose
    },
    {timestamps:true} // This gonna Create a Created At and updated At times
);

module.exports = mongoose.model("Product",ProductSchema);