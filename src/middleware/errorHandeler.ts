import { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import { ApiError } from "../errors/apiError";
// මෙය Express middleware එකක්.
//     ඔයාලට error එකක් throw උනහම හෝ next(error) කලහම මෙයට එයි.
export const ErrorHandler = (
    error: any,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    // 📌 මේකෙන් බලන්නේ: response එක මේ වනවිටම client එකට යැවලාද කියලා.
    // එහෙම නම් error එක next() කරලා Express default handler එකට යවයි.
    if (res.headersSent) {
        return next(error);
    }

    // 🧪 Mongoose schema එකක required, match වගේ validations fail උනහම
    // මේකෙන් එන error messages ලිස්ට් එකක් client එකට දෙයි
    if (error instanceof mongoose.Error.ValidationError) {
        const errors = Object.values(error.errors).map((err: any) => err.message);
        return res.status(400).json({ message: "Validation failed", errors });
    }

    // 🔍MongoDB ObjectId එකක් invalid නම් (උදා: /api/books/invalid123)
    if (error instanceof mongoose.Error.CastError) {
        return res.status(400).json({
            message: `Invalid ${error.path}: ${error.value}`
        });
    }

    // වෙනත් Mongoose-related error එකක් උනොත් මෙය capture කරයි (e.g., DisconnectedError)
    if (error instanceof mongoose.Error) {
        return res.status(400).json({ message: error.message });
    }

    // ඔබගේ custom error class එකක් ApiError නම්,
    // එක use කරලා status සහ message return කරනවා.
    if (error instanceof ApiError) {
        return res.status(error.status).json({ message: error.message });
    }

    //  මෙය final fallback එක.
    // අනාවරණය නොවූ (unexpected) error එකක් නම්:
    // Console එකට error එක print කරයි
    // Client එකට 500 Internal Server Error කියලා දෙනවා
    console.error("🔥 Unhandled Error:", error);
    res.status(500).json({ message: "Internal server error" });
};

