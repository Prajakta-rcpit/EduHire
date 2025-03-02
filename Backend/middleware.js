const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.auth = async (req, res, next) => {
    try {
        
        const token = req.cookies?.token;
        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Token Missing",
            });
        }

        try {
            const payload = jwt.verify(token, process.env.JWT_SECRET);
            req.user = payload; 
            next(); 
        } catch (error) {
            console.error("Token verification error:", error);
            return res.status(401).json({
                success: false,
                message: "Token is Invalid",
            });
        }
    } catch (error) {
        console.error("Auth middleware error:", error);
        return res.status(500).json({
            success: false,
            message: "Something went wrong while verifying the token",
        });
    }
};
