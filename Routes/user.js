
const { Router } = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { jwtsecret } = require("../config");
const { purchaseModel } = require("../db/db");
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
userRouter.get('/course-purchase', usermiddleware, async (req, res) => {
    const userId = req.userId;
    const { courseID } = req.body;
    const purchase = await purchaseModel.create({
        userID: userId._id,
        courseID: courseID
    });
    res.json({
        purchase: purchase
})
console.log(purchase);
})
module.exports ={
    userRouter: userRouter
    
};