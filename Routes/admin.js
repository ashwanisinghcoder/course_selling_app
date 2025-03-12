
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
    await adminModel.create({
        email:  email,
        password: hashedPassword,
        firstname : firstname,
        lastname : lastname
    });
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
        course: course,
        adminId: adminId
        
    })
})

adminRouter.put("/course-update", adminmiddleware, (req,res)=>{
    res.json({
        message:"course updated"
    })
})

adminRouter.get("/courses-list", adminmiddleware, (req,res)=>{
    res.json({
        message: 'course list'
    })
}) 
module.exports = {
    adminRouter: adminRouter
};
