import createHttpError from "http-errors";
import userService from "../services/user.service.js";

class UserController {
  static async createUser(req, res) {
    const { name, email, password } = req.body;
    const user = await userService.createUser({ name, email, password })
    delete user.password
    res.json({ message: "Success regiter user", data: user });
  }

  static async login(req, res) {
    const {email, password} = req.body
    const check = await userService.confirmEmailPassword(email, password)

    if(!check) throw createHttpError.BadRequest("Invalid username and/or password")

    res.json({message: "Success login"})
  }
}

export default UserController
