import { Request, Response, NextFunction } from "express";
import { ApiError } from "../errors/apiError";
import jwt, { JsonWebTokenError, TokenExpiredError, JwtPayload } from 'jsonwebtoken';

export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
    try {
        const authHeader = req.headers["authorization"];
        const token = authHeader && authHeader.split(" ")[1]; // ✅ FIXED: split by space

        if (!token) {
            return next(new ApiError(403, "Access token not provided"));
        }

        jwt.verify(
            token,
            process.env.ACCESS_TOKEN_SECRET!,
            (error, decoded) => {
                if (error) {
                    if (error instanceof TokenExpiredError) {
                        return next(new ApiError(403, "Access token expired"));
                    } else if (error instanceof JsonWebTokenError) {
                        return next(new ApiError(403, "Invalid access token"));
                    } else {
                        return next(new ApiError(500, "Error verifying access token"));
                    }
                }

                if (!decoded || typeof decoded === "string") {
                    return next(new ApiError(401, "Access token payload invalid"));
                }

                // Optionally attach user to request object
                (req as any).user = decoded as JwtPayload;

                next(); // ✅ If token is valid, continue to next route
            }
        );

    } catch (err) {
        next(err); // Pass error to centralized error handler
    }
};
