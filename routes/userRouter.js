import express from "express";
import { loginUser, saveUser } from "../controller/userController.js";

const userRouter = express.Router(); //create router ekak

userRouter.post('/', saveUser); //
userRouter.post('/login',loginUser)

export default userRouter;