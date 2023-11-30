import { verifytoken } from "../helpers/jwt.helper.js";
import orderService from "../services/order.service.js"

class OrderController {
  static async createOrder(req, res) {
    const data = req.body;
    const userId = req.user.id
    const order = await orderService.createOrder(data, userId)
    res.json({ message: "Success create order", data: order });
  }

  static async getAllOrders(req, res) {
    const userId = req.user.id
    const orders = await orderService.getAllOrder(userId)
    res.json({ message: "Success get all orders", data: orders });
  }

  static async getOrder(req, res) {
    const { id } = req.params
    const data = await orderService.getOrder(id)
    res.json({ message: "Success get detail order", data: data })
  }

  static async update(req, res) {
    const { id } = req.params
    const data = req.body
    const order = await orderService.updateOrder(id, data)
    res.json({ message: "Success update", data: order })
  }

  static async delete(req, res) {
    const { id } = req.params
    const order = await orderService.deleteService(id)
    res.json({ message: "Success delete", data: order })
  }
}

export default OrderController

