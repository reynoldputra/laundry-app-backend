import userService from "../services/user.service.js";

class UserController {
  static async createUser(req, res) {
    const { name, email } = req.body;
    const user = await userService.createUser(name, email)
    res.json({ message: "success", data: user });
  }

  static async getUser(req, res) {
    const { id } = req.params;
    const user = await userService.getUserById(id)
    res.json({ message: "success", data: user });
  }

  static async getAllUser(_, res) {
    const users = await userService.getAllUser()
    res.json({ message: "success", data: users })
  }

  static async updateUser(req, res) {
    const { id } = req.params;
    const { name, email } = req.body;
    const user = await userService.updateUser(id, name, email)
    res.json({ message: "success", data: user });
  }

  static async deleteUser(req, res) {
    const { id } = req.params;
    await userService.deleteUser(id)
    res.json({ message: "success" });

  }
}

export default UserController
