
const { Router } = require("express");
const userRouter = Router();
userRouter.post('/user/signup', (req, res) => {
    const { name, email, password } = req.body;

    res.json({ name,  email, password });
})

userRouter.post('/user/signin', (req, res) => {
    const { name, email, password } = req.body;
    res.json({ name, email, password });
}) 

userRouter.post('/user/purchases', (req, res) => {
    res.json({
        messge:"all courses purchased"
    })
})

module.exports ={
    userRouter: userRouter
};