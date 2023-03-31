const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const userRoute = require("./routes/user");
const productRoute = require("./routes/product");
const authenticationRoute = require("./routes/authentication");
const cartRoute = require("./routes/cart");
const orderRoute = require("./routes/order");
const stripeRoute = require("./routes/stripe");
const cors = require("cors");
const bodyParser = require("body-parser")
const Product = require("./models/Product")

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
dotenv.config();

mongoose
        .connect(process.env.MONGO_URL)
        .then(()=> console.log("DBConnection Successful!")).
        catch((err)=>{
        console.log(err);
    });
app.use(cors());
app.use(express.json());


app.use("/api/users",userRoute);
app.use("/api/authentication",authenticationRoute);
app.use("/api/products",productRoute);
app.use("/api/carts",cartRoute);
app.use("/api/orders",orderRoute);
app.use("/api/checkout",stripeRoute);
    // Crating the roots
    // app.get("/api/test", ()=>{
    //     console.log("Test is Successful");
    // })

app.get("/api/products/search/:key", async(req,res)=>{
    let result = await Product.find({
        "$or" :[
            {title:{$regex : req.params.key}},
            {category:{$regex : req.params.key}},
        ]
    });
    res.send(result)
})

app.listen(process.env.PORT || 4005,()=>{
    console.log("Backend Server is running!");
});