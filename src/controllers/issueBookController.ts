import IssueBookModel from "../models/issueBook";
import BookModel from "../models/book";
import ReaderModel from "../models/reader";
import { Request, Response, NextFunction } from "express";
import { ApiError } from "../errors/apiError";

// 📌 Issue a book to a reader
export const IssueBook = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
  try {
    const { book, reader, dueDate } = req.body;

    // 1. Check if book exists
    const foundBook = await BookModel.findOne({ id: book });
    if (!foundBook) {
      return res.status(404).json({ message: "Book not found" });
    }
    if (foundBook.status === "Borrowed") {
      return res.status(400).json({ message: "Book already borrowed" });
    }

    // 2. Check if reader exists
    const foundReader = await ReaderModel.findOne({ id: reader });
    if (!foundReader) {
      return res.status(404).json({ message: "Reader not found" });
    }

    // 3. Auto-generate issue ID
    const count = await IssueBookModel.countDocuments();
    const newIssueId = `ISSUE_${(count + 1).toString().padStart(4, "0")}`;

    // 4. Create issue record
    const issue = new IssueBookModel({
      id: newIssueId,
      book: foundBook.id,
      reader: foundReader.id,
      dueDate,
    });

    await issue.save();

    // 5. Update book status
    foundBook.status = "Borrowed";
    await foundBook.save();

    // 6. Return response
    res.status(201).json({
      message: "Book issued successfully",
      issue,
    });
  } catch (err) {
    next(err);
  }
};

// 🔁 Return a borrowed book
export const returnBook = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
  try {
    const { id } = req.params;

    // 1. Find the book
    const returnToBeBook = await BookModel.findOne({ id });
    if (!returnToBeBook) {
      throw new ApiError(404, "Book not found to return");
    }

    // 2. If already returned
    if (returnToBeBook.status === "Available") {
      return res.status(400).json({ message: "Book already returned" });
    }

    // 3. Update book status to "Available"
    returnToBeBook.status = "Available";
    await returnToBeBook.save();

    // 4. Update latest issue record's status to "Returned"
    await IssueBookModel.findOneAndUpdate(
        { book: id, status: "Not Returned" }, // Only if not returned
        { status: "Returned" },
        { sort: { createdAt: -1 } } // latest issue
    );

    // 5. Respond
    return res.status(200).json({
      message: "Book returned successfully",
      returnToBeBook,
    });
  } catch (error) {
    next(error);
  }
};



export const getAllIssuedBooks = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
  try {
    const issuedBooks = await IssueBookModel.find();

    const populatedIssuedBooks = await Promise.all(
        issuedBooks.map(async (issue) => {
          const book = await BookModel.findOne({ id: issue.book });
          const reader = await ReaderModel.findOne({ id: issue.reader });

          return {
            ...issue.toObject(),
            book,
            reader,
          };
        })
    );

    res.status(200).json({
      message: "Issued books fetched successfully",
      count: populatedIssuedBooks.length,
      data: populatedIssuedBooks,
    });
  } catch (error) {
    next(error);
  }
};