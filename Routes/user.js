
const { Router } = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { jwtsecret } = require("../config");
const { purchaseModel, courseModel } = require("../db/db");
const { userModel } = require("../db/db");
const usermiddleware = require("../middleware/usermiddleware.js");
const userRouter = Router();
userRouter.post('/signup',async (req, res) => {
    const { email, password, firstname, lastname } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
        await userModel.create({
        email:  email,
        password: hashedPassword,
        firstname : firstname,
        lastname : lastname
    });
    res.json({
        messge: "user signed up"
    })
})
userRouter.post('/signin',async (req, res) => {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email: email });
    if(user){   
        const originalPassword = await bcrypt.compare(password, user.password);
        if(!originalPassword){
            res.status(400).json({
                message: "Incorrect Password"
            })
        }
        const token =  jwt.sign({
            id: user._id
        }, jwtsecret);
        res.json({ token });
    }
    else{
        res.status(400).json({
            message: "Incorrect Credentials"
        })
    }
}) 
userRouter.get("/purchases" ,usermiddleware, async (req,res)=>{
    const userID = req.userId;
    const purchases = await purchaseModel.find({ userID: userID });
    const courseData  =  await courseModel.find({
        _id: {
            $in: purchases.map(purchase => purchase.courseID)
        }
    })
    res.json({
        purchases: purchases,
        courses: courseData
    }) 
})

module.exports ={
    userRouter: userRouter
    
};