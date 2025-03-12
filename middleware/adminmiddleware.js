const jwt = require("jsonwebtoken");
const { jwtadminsecret } = require("../config");
function adminmiddleware(req, res, next) {
    const token = req.headers.token;
    const decoded = jwt.verify(token, jwtadminsecret);
        if(decoded){
            req.adminId = decoded.id;
            next();
        }
        else{
        res.status(400).json({
            message: "No Token Provided"
        })
    }
} 
module.exports = adminmiddleware;