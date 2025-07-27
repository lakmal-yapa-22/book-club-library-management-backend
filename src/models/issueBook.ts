import mongoose from "mongoose";

type IssueBook = {
    id: string;
    reader: string;
    book: string;
    lendingDate: Date;
    dueDate: Date;
    status: "Returned" | "Not Returned"; // 👈 Add this type
};

const issueBookSchema = new mongoose.Schema<IssueBook>(
    {
        id: {
            type: String,
            unique: true,
        },
        book: {
            type: String,
            ref: "Book",
            required: true,
        },
        reader: {
            type: String,
            ref: "Reader",
            required: true,
        },
        lendingDate: {
            type: Date,
            default: Date.now,
        },
        dueDate: {
            type: Date,
            required: true,
        },
        status: {
            type: String,
            enum: ["Returned", "Not Returned"],
            default: "Not Returned", // 👈 Default value
        },
    },
    {
        timestamps: true,
    }
);

// Clean JSON output
issueBookSchema.set("toJSON", {
    transform: (_doc, ret: any) => {
        delete ret._id;
        delete ret.__v;
    },
});

const IssueBookModel = mongoose.model("IssueBook", issueBookSchema);

export default IssueBookModel;
