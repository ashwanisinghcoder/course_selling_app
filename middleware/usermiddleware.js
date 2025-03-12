const jwt = require("jsonwebtoken");

const { jwtsecret } = require("../config");
function usermiddleware(req, res, next) {
    const token = req.headers.token;
    const decoded = jwt.verify(token, jwtsecret);
        if(decoded){
            req.userId = decoded.id;
            next();
        }
        else{
        res.status(400).json({
            message: "No Token Provided"
        })
    }
} 

module.exports = usermiddleware;
