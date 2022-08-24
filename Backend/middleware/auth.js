const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports = (req, res, next)=>{
    try {
        const token = req.session.token;  // récupération du jwt dans le cookie de session
        const decodedToken = jsonwebtoken.verify(token, process.env.TOKEN_KEY);
        const userId = decodedToken.userId;
        if (req.body.userId && req.body.userId !== userId) {
            console.log("User ID not valid");
            throw "Invalid user ID";  
        } else {
            next();
        }
    } catch (error) {
        res.status(401).json({
            error: error | 'Invalid request !' });
    }
};