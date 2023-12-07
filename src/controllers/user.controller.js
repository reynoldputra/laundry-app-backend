import createHttpError from "http-errors";
import userService from "../services/user.service.js";
import { UserRole } from "@prisma/client";
import { verifytoken } from "../helpers/jwt.helper.js";

class UserController {
  static async createOwner(req, res) {
    const { name, email, password } = req.body;
    const user = await userService.createUser({ name, email, password }, UserRole.OWNER)
    delete user.password
    res.json({ message: "Success regiter user", data: user });
  }

  static async createCustomer(req, res) {
    const { name, email, password } = req.body;
    const user = await userService.createUser({ name, email, password }, UserRole.CUSTOMER)
    delete user.password
    res.json({ message: "Success regiter user", data: user });
  }

  static async login(req, res) {
    const {email, password} = req.body
    const data = await userService.confirmEmailPassword(email, password)

    res.json({message: "Success login", data : data})
  }

  static async update(req, res) {
    const {id} = req.params
    const data = req.body
    const user = await userService.updateProfile(id, data)
    res.json({message: "Success update", data : user})
  }

  static async me(req, res) {
    const user = req.user
    const userData =  await userService.getUser(user.id)
    res.json({message: "Success verify token", data : userData})
  }

  static async getAll(req, res) {
    const userData =  await userService.getUsers()
    res.json({message: "Success verify token", data : userData})
  }
}

export default UserController
