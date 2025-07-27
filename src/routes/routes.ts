
import express from 'express'
import ReaderRouter from './reader.routes'
import BookRouter from './book.routes'
import IssueBookRouter from './issueBook.routes'
import authRouter from "./auth.routes";



const rootRouter = express.Router()

rootRouter.use("/reader" , ReaderRouter)
rootRouter.use("/book" , BookRouter)
rootRouter.use("/issueBook", IssueBookRouter)
rootRouter.use("/auth",authRouter)

export default rootRouter

//
// ✅ rootRouter කියන්නේ සියලුම sub-routes එකට centralized access point එකක්.
// ✅ Code එක modularized කරලා තියෙන්නේ – maintain karanna easy.

