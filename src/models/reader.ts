import mongoose from "mongoose";

type Reader = {
    id: string;
    name: string;
    email: string;
    phone: number;
    address: string;
    isActive: boolean;
    memberShipId: string;
    borrowedBooks: string[];
};

const readerSchema = new mongoose.Schema<Reader>(
    {
        id: {
            type: String,
            unique: true,
        },
        name: {
            type: String,
            required: [true, "Name is required"],
            minlength: [3, "Name must be at least 3 characters long"],
            trim: true,
        },
        email: {
            type: String,
            required: [true, "Email is required"],
            unique: true,
            lowercase: true,
            trim: true,
            match: [
                /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/,
                "Please enter a valid email address",
            ],
        },
        phone: {
            type: Number,
            required: [true, "Phone number is required"],
            validate: {
                validator: (v: number) => v.toString().length >= 10,
                message: "Phone number must be at least 10 digits",
            },
        },
        address: {
            type: String,
            required: [true, "Address is required"],
            minlength: [5, "Address must be at least 5 characters long"],
            trim: true,
        },
        isActive: {
            type: Boolean,
            default: true,
        },
        memberShipId: {
            type: String,
            required: [true, "Membership ID is required"],
            trim: true,
        },
        borrowedBooks: {
            type: [String],
            default: [],
        },
    },
    {
        timestamps: true,
    }
);

readerSchema.set("toJSON", {
    transform: (_doc, ret: any) => {
        delete ret._id;
        delete ret.__v;
    },
});

const ReaderModel = mongoose.model("Reader", readerSchema);

export default ReaderModel;
