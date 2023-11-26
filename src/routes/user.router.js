import { Router } from "express";
import userController from "../controllers/user.controller.js";

const userRouter = new Router()

userRouter.post('/', userController.createUser);
userRouter.get('/:id', userController.getUser);
userRouter.get('/', userController.getAllUser);
userRouter.patch('/:id', userController.updateUser);
userRouter.delete('/:id', userController.deleteUser);


export default userRouter
