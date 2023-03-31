
const mongoose = require("mongoose");


const CartSchema = new mongoose.Schema(
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

        //createdAt:Date.now() No need for mongoose
    },
    {timestamps:true} // This gonna Create a Created At and updated At times
);

module.exports = mongoose.model("Cart",CartSchema);