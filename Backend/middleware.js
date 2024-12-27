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
            const secretKey = process.env.JWT_SECRET;
            if (!secretKey) {
                throw new Error("JWT_SECRET is not defined in environment variables.");
            }

            // Decode JWT (split header, payload, and signature)
            const [headerB64, payloadB64, signatureB64] = token.split(".");
            if (!headerB64 || !payloadB64 || !signatureB64) {
                throw new Error("Invalid token format.");
            }

            // Convert base64 to binary
            const signature = Uint8Array.from(atob(signatureB64.replace(/-/g, "+").replace(/_/g, "/")), c =>
                c.charCodeAt(0)
            );

            // Create a crypto key from the secret
            const key = await crypto.subtle.importKey(
                "raw",
                new TextEncoder().encode(secretKey),
                { name: "HMAC", hash: "SHA-256" },
                false,
                ["verify"]
            );

            // Verify the signature
            const valid = await crypto.subtle.verify(
                "HMAC",
                key,
                signature,
                new TextEncoder().encode(`${headerB64}.${payloadB64}`)
            );

            if (!valid) {
                throw new Error("Invalid token signature.");
            }

            // Parse payload and attach to the request
            const payload = JSON.parse(atob(payloadB64.replace(/-/g, "+").replace(/_/g, "/")));
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

