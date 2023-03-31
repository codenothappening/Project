
const mongoose = require("mongoose");


const OrderSchema = new mongoose.Schema(
    {
        userId: {type: String , required : true},
        products: [
            {
                productId:{
                    type:String
                },
                quantity:{
                    type:Number,
                    default:1,
                },
            },
        ],
        amount:{type:Number,required:true},
        address: {type:Object , required:true},
        status:{
            type:String, default:"pending"
        },
        //createdAt:Date.now() No need for mongoose
    },
    {timestamps:true} // This gonna Create a Created At and updated At times
);

module.exports = mongoose.model("Order",OrderSchema);