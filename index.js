const express = require('express');
const app = express();


app.post('/api/signup', (req, res) => {
    const { name, email, password } = req.body;
    res.json({ name, email, password });
})

app.post('/api/signin', (req, res) => {
    const { name, email, password } = req.body;
    res.json({ name, email, password });
}) 

app.post('/courses', (req, res) => {
    
})

app.post('/purchases', (req, res) => {
    
})
app.get('/course/purchase', (req, res) => {
    
})

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});