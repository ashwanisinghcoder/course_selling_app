require('dotenv').config();
console.log(process.env.MongoDBURI);
const express = require('express');
const app = express();

const mongoose = require('mongoose');
const { userRouter }= require('./Routes/user');
const { courseRouter } = require('./Routes/course');
const { adminRouter } = require("./Routes/admin")
app.use(express.json());

app.use("/api/v1/user", userRouter);
app.use("/api/v1/course", courseRouter);
app.use("/api/v1/admin" , adminRouter)


const connectDB = async () => {
    await mongoose.connect(process.env.MongoDBURI);
    app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
};
connectDB();