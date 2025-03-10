const express = require('express');
const app = express();
const { userRouter }= require('./Routes/user');
const { courseRouter } = require('./Routes/course');

app.use(express.json());

app.post("/api/v1/user", userRouter);
app.get("/api/v1/course", courseRouter);


app.listen(3000, () => {
    console.log('Server is running on port 3000');
});