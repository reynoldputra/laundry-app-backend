import { Router } from "express";
import "express-async-errors";
import OrderController from "../controllers/order.controller.js"
import validate from "../middleware/validate.middleware.js";
import { createOrderDto, deleteOrderDto, getOrderDto, updateOrderDto } from "../dto/order.dto.js";
import { jwtMiddleware } from "../middleware/jwt.middleware.js";

/**
 * @type {Router}
*/
const orderRouter = new Router()


orderRouter.use(jwtMiddleware)

orderRouter.get('/', OrderController.getAllOrders);
orderRouter.get('/:id', validate(getOrderDto), OrderController.getOrder);
orderRouter.post('/', validate(createOrderDto), OrderController.createOrder);
orderRouter.patch('/:id', validate(updateOrderDto), OrderController.update);
orderRouter.delete('/:id', validate(deleteOrderDto), OrderController.delete);


export default orderRouter
