const express = require('express');
const app = express();
import userRouter from './Routes/user';
import courseRouter from './Routes/course';

app.use(express.json());

app.post("/user", userRouter);

app.post("/course", courseRouter);


app.listen(3000, () => {
    console.log('Server is running on port 3000');
});