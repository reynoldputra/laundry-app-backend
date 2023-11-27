import { Router } from "express";
import userController from "../controllers/user.controller.js";
import { createUserDto, getUserDto } from "../dto/user.dto.js";
import validate from "../middleware/validate.middleware.js";
import "express-async-errors";

const userRouter = new Router()

userRouter.post('/', validate(createUserDto), userController.createUser);
userRouter.get('/:id', validate(getUserDto), userController.getUser);
userRouter.get('/', userController.getAllUser);
userRouter.patch('/:id', userController.updateUser);
userRouter.delete('/:id', userController.deleteUser);


export default userRouter
