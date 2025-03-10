const { Router } = require("express");
const adminRouter = Router();

adminRouter.post("/admin-signup", (req,res)=>{
    res.json({
        message: "admin signed up"
    })
})
adminRouter.post("/admin-signin", (req,res)=>{
    res.json({
        message: "admin signed in"
    })
})

adminRouter.post("/course-create", (req,res)=>{
    res.json({
        message: "course created"
    })
})

adminRouter.put("/course-update", (req,res)=>{
    res.json({
        message:"course updated"
    })
})

adminRouter.get("/courses-list", (req,res)=>{
    res.json({
        message: 'course list'
    })
}) 
module.exports = {
    adminRouter: adminRouter
};

module.exports = {
    adminRouter : adminRouter
}