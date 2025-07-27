import { NextFunction, Request, Response } from "express";
import ReaderModel from "../models/reader";
import { ApiError } from "../errors/apiError";

// Create a new reader with auto-generated ID if not provided
export const createReader = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
  try {
    // Auto-generate ID if not provided
    if (!req.body.id) {
      const count = await ReaderModel.countDocuments();
      const newId = `READER_${(count + 1).toString().padStart(4, "0")}`;
      req.body.id = newId;
    }

    const reader = new ReaderModel(req.body);
    await reader.save();
    res.status(201).json(reader);
  } catch (error: any) {
    next(error);
  }
};

// Get all readers
export const getReaders = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
  try {
    const readers = await ReaderModel.find();

    if (!readers || readers.length === 0) {
      throw new ApiError(404, "No Readers found !!!");
    }

    res.status(200).json(readers);
  } catch (error: any) {
    next(error);
  }
};

// Get a single reader by ID
export const getReaderById = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
  try {
    const reader = await ReaderModel.findOne({ id: String(req.params.id) });

    if (!reader) {
      throw new ApiError(404, "Reader not found");
    }

    res.status(200).json(reader);
  } catch (error: any) {
    next(error);
  }
};

// Update a reader by ID
export const updateReader = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
  try {
    const updatedReader = await ReaderModel.findOneAndUpdate(
        { id: String(req.params.id) },
        req.body,
        {
          new: true,
          runValidators: true,
        }
    );

    if (!updatedReader) {
      throw new ApiError(404, "Reader not found");
    }

    res.status(200).json({
      message: "Reader Updated Successfully",
      updatedReader,
    });
  } catch (error: any) {
    next(error);
  }
};

// Delete a reader by ID
export const deleteReader = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
  try {
    const deletedReader = await ReaderModel.findOneAndDelete({
      id: String(req.params.id),
    });

    if (!deletedReader) {
      throw new ApiError(404, "Reader not found");
    }

    res.status(200).json({ message: "Reader Deleted Successfully" });
  } catch (error: any) {
    next(error);
  }
};
