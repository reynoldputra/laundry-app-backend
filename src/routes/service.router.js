import { Router } from "express";
import "express-async-errors";
import ServiceController from "../controllers/service.controller.js"
import validate from "../middleware/validate.middleware.js";
import { createServiceDto, deleteServiceDto, getServicedto, updateServiceDto } from "../dto/service.dto.js";

/**
 * @type {Router}
*/
const serviceRouter = new Router()

serviceRouter.get('/', ServiceController.getAllServices);
serviceRouter.get('/:id', validate(getServicedto), ServiceController.getService);
serviceRouter.post('/', validate(createServiceDto), ServiceController.createService);
serviceRouter.patch('/:id', validate(updateServiceDto), ServiceController.update);
serviceRouter.delete('/:id', validate(deleteServiceDto), ServiceController.delete);


export default serviceRouter

