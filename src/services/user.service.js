import prisma from "#src/database/db.js"
import { UserRole } from "@prisma/client";
import createHttpError from "http-errors";
import { comparePassword, hashPassword } from "../helpers/hash.helper.js";

class userService {
  static async createUser(data) {
    try {
      const hashedPassword = await hashPassword(data.password, 10);
      return await prisma.user.create({
        data: {
          ...data,
          role: UserRole.CUSTOMER,
          password: hashedPassword
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
    const user = await prisma.user.findFirst({
      where: {
        email
      }
    })
    
    if(!user) throw createHttpError.BadRequest("Invalid username and/or password")

    const compare = await comparePassword(password, user.password)
    return compare
  }
}

export default userService
