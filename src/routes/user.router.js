import { Router } from "express";
import userController from "../controllers/user.controller.js";
import { createUserDto, loginDto, updateUserDto } from "../dto/user.dto.js";
import validate from "../middleware/validate.middleware.js";
import "express-async-errors";
import { jwtMiddleware } from "../middleware/jwt.middleware.js";

/**
 * @type {Router}
*/
const userRouter = new Router()

userRouter.get('/me', jwtMiddleware, userController.me);
userRouter.post('/register/owner', validate(createUserDto), userController.createOwner);
userRouter.post('/register/customer', validate(createUserDto), userController.createCustomer);
userRouter.post('/login', validate(loginDto), userController.login);
userRouter.patch('/:id', validate(updateUserDto), userController.update);


export default userRouter
