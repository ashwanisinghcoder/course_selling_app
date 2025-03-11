
const { Router } = require("express");
const { userModel } = require("../db/db");
const userRouter = Router();
userRouter.post('/user/signup', (req, res) => {
   
})

userRouter.post('/user/signin', (req, res) => {
   
})
     

userRouter.post('/user/purchases', (req, res) => {
    res.json({
        messge:"all courses purchased"
    })
})

module.exports ={
    userRouter: userRouter
};