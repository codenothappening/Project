
const User = require("../models/User");
const {verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin} = require("./verifyToken");
const router = require("express").Router();

// router.get("/usertest",(req,res)=>{
//     res.send("User test is Successfull");
// });

// router.post("/userposttest",(req,res)=>{
//     const username = req.body.username;
//     //console.log(username);
//     res.send("Your username is : "+ username);
// })

// The Upper Code is Just a test

// UPDATE
router.put("/:id", verifyToken ,async (req,res) =>{ // put because we are updating
    //   if(req.user.id === req.params.id || req.user.isAdmin){

    //   }
    if(req.body.password){
        req.body.password = CryptoJS.AES.encrypt(
            req.body.password, 
            process.env.PASS_SEC)
            .toString();
    }
    try{
        const updatedUser = await User.findByIdAndUpdate(req.params.id,{
            $set: req.body
        },{new:true});
        res.status(200).json(updatedUser);
    }catch(err){
        res.status(500).json(err);
    }
});



// DELETE

router.delete("/:id", verifyTokenAndAuthorization , async(req,res) =>{
    try{
        await User.findByIdAndDelete(req.params.id)
        res.status(200).json("User has been deleted...")
    }catch(err){
        res.status(500).json(err)
    }
})

//GET USER

router.get("/find/:id",verifyTokenAndAdmin,async(req,res)=>{
    try{
        const user = await User.findById(req.params.id);
        const {password,...others} = user._doc;
        res.status(200).json(others);
    }catch(err){
        res.status(500).json(err);
    }
})

// GET ALL USER

//router.get("/find/:id", verifyTokenAndAdmin , async(req,res) =>{    // For only one user
router.get("/", verifyTokenAndAdmin , async(req,res) =>{ // Users
    const query = req.query.new
    try{
        //const user = await User.findById(req.params.id) // For only one User
        // res.status(200).json()
        const users = query ? await User.find().sort({_id : -1}).limit(5) 
        : await User.find();
        //const {password , ...others} = user._doc;
        //res.status(200).json(others); // For only one user
        res.status(200).json(users);
    }
    catch(err){
        res.status(500).json(err)
    }
});


// GET USER STATS

router.get("/stats", verifyTokenAndAdmin, async(req,res) =>{
    const date = new Date();
    const lastYear = new Date(date.setFullYear(date.getFullYear() - 1));

    try{
        const data = await User.aggregate([
            {$match : {createdAt : {$gte: lastYear}}},
            {
                $project: {
                    month: { $month : "$createdAt" },
                },
            },
            {
                $group: {
                    _id : "$month",
                    total: {$sum : 1},
                },
            },
        ]); 
        res.status(201).json(data)   
    }catch(err){
        res.status(500).json(err);
    }
});

module.exports = router;


