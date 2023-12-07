import { UserRole } from "@prisma/client";
import createHttpError from "http-errors";
import { comparePassword, hashPassword } from "../helpers/hash.helper.js";
import { signToken } from "../helpers/jwt.helper.js"
import { PrismaService } from "../database/prisma.service.js";
import { exclude } from "../helpers/prisma.helper.js";

class userService {
  static prismaService = new PrismaService();

  static async createUser(data, role) {
    try {
      let roleData

      if (role == UserRole.CUSTOMER) {
        roleData = {
          Customer: {
            create: {}
          }
        }
      } else if (role == UserRole.OWNER) {
        roleData = {
          Owner: {
            create: {}
          }
        }
      } else {
        throw createHttpError.BadRequest("Role not valid")
      }

      const hashedPassword = await hashPassword(data.password, 10);
      return await this.prismaService.user.create({
        data: {
          ...data,
          role: role,
          password: hashedPassword,
          ...roleData
        }
      });
    } catch (err) {
      if (err?.code === "P2002") {
        throw createHttpError.BadRequest("Email already used")
      }
      throw err
    }
  }

  static async confirmEmailPassword(email, password) {
    const user = await this.prismaService.user.findFirst({
      where: {
        email
      }
    })

    if (!user) throw createHttpError.BadRequest("Invalid username and/or password")

    const compare = await comparePassword(password, user.password)

    if (!compare) throw createHttpError.BadRequest("Invalid username and/or password")

    return {
      token: signToken(user.id)
    }
  }


  static async updateProfile(id, data) {
    const user = await this.prismaService.user.update({
      where: { id },
      data: data
    })

    return user
  }


  static async getUser(id) {
    const user = await this.prismaService.user.findFirst({
      where: {
        id
      }
    })

    delete user.password

    return user
  }

  static async getUsers() {
    const users = await this.prismaService.user.findMany({
      include : {
        Owner : true,
        Customer : true
      }
    })
    return exclude(users, ['password'])
  }
}

export default userService
