import mongoose from "mongoose";

type Book = {
    id: string;
    isbn: string;
    title: string;
    author: string;
    publisher: string;
    publishDate: Date;
    category: string;
    status: "Available" | "Borrowed";
};

const book = new mongoose.Schema<Book>(
    {
        id: {
            type: String,
            unique: true,
        },
        isbn: {
            type: String,
            required: [true, "ISBN is required"],
            unique: true,
            trim: true,
        },
        title: {
            type: String,
            required: [true, "Title is required"],
            minlength: [2, "Title must be at least 2 characters"],
            trim: true,
        },
        author: {
            type: String,
            required: [true, "Author is required"],
            trim: true,
        },
        publisher: {
            type: String,
            required: [true, "Publisher is required"],
            trim: true,
        },
        publishDate: {
            type: Date,
            required: [true, "Published date is required"],
        },
        category: {
            type: String,
            required: [true, "Category is required"],
        },
        status: {
            type: String,
            enum: ["Available", "Borrowed"],
            default: "Available",
        },
    },
    { timestamps: true }
);

book.set("toJSON", {
    transform: (_doc, ret: any) => {
        // custom id එක retain කරන්න
        // MongoDB _id, __v ඉවත් කරන්න
        delete ret._id;
        delete ret.__v;
    },
});

const BookModel = mongoose.model("Book", book);
export default BookModel;
