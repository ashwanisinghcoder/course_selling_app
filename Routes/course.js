
const { Router } = require("express");
const courseRouter = Router();
const { purchaseModel, courseModel } = require("../db/db");
const usermiddleware = require("../middleware/usermiddleware.js");
courseRouter.post('/purchase', usermiddleware, async (req, res) => {
    const userId = req.userId;
    const { courseID } = req.body;
    await purchaseModel.create({
        userID: userId,
        courseID: courseID
    });
    res.json({
        message: "you have successfully purchased the course"
    })
})

courseRouter.get("/preview", async (req,res)=>{
    const courses = await courseModel.find({});
        res.json({
            courses: courses
        })
}) 
module.exports = {
    courseRouter: courseRouter
};