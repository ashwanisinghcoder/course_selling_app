
const { Router } = require("express");
const adminRouter = Router();
const jwt = require("jsonwebtoken");
const { jwtadminsecret } = require("../config");
const { adminModel, courseModel } = require("../db/db");
const bcrypt = require("bcrypt");
const adminmiddleware = require("../middleware/adminmiddleware.js");
adminRouter.post("/admin-signup", async (req,res)=>{
    const { email, password, firstname, lastname } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log(hashedPassword);
    console.log(hashedPassword);
    await adminModel.create({
        email:  email,
        password: hashedPassword,
        firstname : firstname,
        lastname : lastname
    });
    console.log(process.env.MongoDBURI);
    res.json({
        message: "admin signed up"
    })
});

adminRouter.post("/admin-signin",async (req,res)=>{
    const { email, password } = req.body;
    const admin = await adminModel.findOne({ email: email });
    if(admin){   
        const originalPassword = await bcrypt.compare(password, admin.password);
        if(!originalPassword){
            res.status(400).json({
                message: "Incorrect Password"
            })
        }
        else{
            const token =  jwt.sign({
                id: admin._id
            }, jwtadminsecret);
            res.json({ token });
        }
       
    }
    else{
        res.status(400).json({
            message: "Incorrect Credentials"
        })
    }
}) 
adminRouter.post("/course-create", adminmiddleware,  async (req,res)=>{
    const adminId = req.adminId;
    const { title, description, price, image ,creator } = req.body;
    const course = await courseModel.create({
        title: title,
        description: description,
        price: price,
        image: image,
        creatorID: adminId._id,
        creator: creator
    });
    res.json({
        message: "course created",
        course: course._id,
    })
})
adminRouter.put("/course-update", adminmiddleware, async (req,res)=>{
    const adminId = req.adminId;
    const { courseID, title, description, price, image } = req.body;
    const course = await courseModel.findOneAndUpdate({ _id: courseID , creatorID: adminId._id }, {
        title: title,
        description: description,
        price: price,
        image: image,
    });
    res.json({
        message:"course updated",
        course: course._id
    })
})

adminRouter.get("/courses-list", adminmiddleware, async (req,res)=>{
        const adminId = req.adminId._id;
        const courses = await courseModel.find({creatorID: adminId});
            res.json({
                message: "courses list",
                courses: courses
            })
        
}) 
module.exports = {
    adminRouter: adminRouter
};
