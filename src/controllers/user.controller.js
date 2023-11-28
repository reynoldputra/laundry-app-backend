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
    const data = await userService.confirmEmailPassword(email, password)

    res.json({message: "Success login", data : data})
  }
}

export default UserController
