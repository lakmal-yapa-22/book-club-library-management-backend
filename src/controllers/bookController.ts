import { Request, Response, NextFunction } from "express";
import BookModel from "../models/book";
import { ApiError } from "../errors/apiError";

// 📌 Create Book
export const createBook = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
  try {
    if (req.body.isbn) {
      const existingBook = await BookModel.findOne({ isbn: req.body.isbn });
      if (existingBook) {
        throw new ApiError(400, "ISBN already exists");
      }
    }

    // Optional: Auto-generate custom ID if not provided
    if (!req.body.id) {
      const lastBook = await BookModel.findOne().sort({ createdAt: -1 });
      const nextId = lastBook?.id
          ? `BOOK_${(parseInt(lastBook.id.split("_")[1]) + 1)
              .toString()
              .padStart(4, "0")}`
          : "BOOK_0001";

      req.body.id = nextId;
    }

    const book = new BookModel(req.body);
    await book.save();

    res.status(201).json({ message: "New Book added Successfully", book });
  } catch (error: any) {
    if (error.code === 11000 && error.keyPattern?.isbn) {
      next(new ApiError(400, "ISBN already exists"));
    } else {
      next(error);
    }
  }
};

// 📌 Get All Books
export const getAllBooks = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
  try {
    const books = await BookModel.find();
    if (!books || books.length === 0) {
      throw new ApiError(404, "No Books found !!!");
    }
    res.status(200).json(books);
  } catch (error) {
    next(error);
  }
};

// 📌 Update Book by ID
export const updateBook = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
  try {
    if (!req.params.id) {
      throw new ApiError(400, "Book ID is required");
    }

    const updatedBook = await BookModel.findOneAndUpdate(
        { id: req.params.id },
        req.body,
        {
          new: true,
          runValidators: true,
        }
    );

    if (!updatedBook) {
      throw new ApiError(404, "Book not found");
    }

    res.status(200).json(updatedBook);
  } catch (error) {
    next(error);
  }
};

// 📌 Get Single Book
export const getOneBook = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
  try {
    const book = await BookModel.findOne({ id: req.params.id });
    if (!book) {
      throw new ApiError(404, "Book not found");
    }

    res.status(200).json(book);
  } catch (error) {
    next(error);
  }
};

// 📌 Delete Book
export const deleteBook = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
  try {
    const deleted = await BookModel.findOneAndDelete({ id: req.params.id });
    if (!deleted) {
      throw new ApiError(404, "Book not found");
    }

    res
        .status(200)
        .json({ message: "Book successfully deleted", deletedBook: deleted });
  } catch (error) {
    next(error);
  }
};
