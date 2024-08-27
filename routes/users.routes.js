import { Router } from "express";
import { register } from "../controllers/users.controllers.js";
import { login } from "../controllers/users.controllers.js";
const userRouter = Router()

userRouter.post("/register", register);
userRouter.post("/login", login)

export default userRouter