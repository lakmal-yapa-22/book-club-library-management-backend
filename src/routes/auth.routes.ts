import {Router} from "express";
import {loginUser, refreshToken, signUpUser} from "../controllers/auth.controller";
import {authenticateToken} from "../middleware/authenticateToken";

const authRouter = Router();

authRouter.post("/signUp",signUpUser);
authRouter.get("/users",authenticateToken)
authRouter.post("/login",loginUser)
authRouter.post("/refresh-token",refreshToken)

export default authRouter;