const express = require('express');
const app = express();
const { userModel, adminModel, courseModel, purchaseModel } = require('./db/db');
const { userRouter }= require('./Routes/user');
const { courseRouter } = require('./Routes/course');
const { adminRouter } = require("./Routes/admin")
app.use(express.json());

app.post("/api/v1/user", userRouter);
app.get("/api/v1/course", courseRouter);
app.post("/api/v1/admin" , adminRouter)


app.listen(3000, () => {
    console.log('Server is running on port 3000');
});