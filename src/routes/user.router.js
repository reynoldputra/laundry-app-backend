import { Router } from "express";
import userController from "../controllers/user.controller.js";
import { createUserDto, loginDto } from "../dto/user.dto.js";
import validate from "../middleware/validate.middleware.js";
import "express-async-errors";

const userRouter = new Router()

userRouter.post('/register', validate(createUserDto), userController.createUser);
userRouter.post('/login', validate(loginDto), userController.login);


export default userRouter
