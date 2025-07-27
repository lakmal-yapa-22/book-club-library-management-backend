import express from "express";
import {getAllIssuedBooks, IssueBook, returnBook} from "../controllers/issueBookController";
import {getReaderById} from "../controllers/readerControler";
import ReaderRouter from "./reader.routes";
import {authenticateToken} from "../middleware/authenticateToken";


const IssueBookRouter = express.Router();

IssueBookRouter.use(authenticateToken)

IssueBookRouter.post("/", IssueBook);
IssueBookRouter.get("/", getAllIssuedBooks);
IssueBookRouter.post("/return/:id", returnBook);












export default IssueBookRouter;
