import { jwtVerify } from "jose";

export const auth = async (req, res, next) => {
    try {
        const token = req.cookies?.token; // Extract token from cookies
        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Token Missing",
            });
        }

        try {
            const secret = new TextEncoder().encode(process.env.JWT_SECRET); // Use the secret key from environment variables

            // Verify the token using jose
            const { payload } = await jwtVerify(token, secret);
            req.user = payload; // Attach the payload to the request
            next(); // Proceed to the next middleware
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
