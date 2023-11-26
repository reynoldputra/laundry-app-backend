import prisma from "#src/database/db.js"

class userService {
  static async createUser(name, email) {
    return await prisma.user.create({
      data: {
        name: String(name),
        email: String(email),
        status: "active"
      }
    });
  }

  static async getUserById(id) {
    return await prisma.user.findUnique({
      where: {
        id: Number(id)
      }
    });
  }

  static async getAllUser() {
    return await prisma.user.findMany();
  }

  static async updateUser(id, name, email) {
    return await prisma.user.update({
      where: {
        id: Number(id)
      },
      data: {
        name: String(name),
        email: String(email)
      }
    });
  }

  static async deleteUser(id) {
    await prisma.user.delete({
      where: {
        id: Number(id)
      }
    });
  }
}

export default userService
