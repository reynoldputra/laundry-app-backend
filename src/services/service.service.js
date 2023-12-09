import createHttpError from "http-errors";
import { exclude } from "../helpers/prisma.helper.js";
import { PrismaClient } from "@prisma/client";

class serviceService {
  static prismaService = new PrismaClient();

  static async createService(data) {
    const check = await this.prismaService.service.findFirst({
      where: {
        ownerId: data.ownerId,
        type: data.type
      }
    })

    if (check) throw createHttpError.BadRequest("Service already exist")

    const service = this.prismaService.service.create({
      data
    })

    return service
  }

  static async getAllServices() {
    const services = await this.prismaService.service.findMany({
      include: {
        Owner: {
          include: {
            User: true
          }
        }
      }
    })

    return exclude(services, ['password'])
  }

  static async getService(id) {
    const service = await this.prismaService.service.findFirst({
      include: {
        Owner: {
          include: {
            User: true
          }
        }
      }
    })

    return exclude(service, ['password'])
  }

  static async updateService(id, data) {
    const service = await this.prismaService.service.update({
      where: {
        id : parseInt(id)
      },
      data,
      include: {
        Owner: {
          include: {
            User: true
          }
        }
      }
    })

    return service
  }

  static async deleteService(id) {
    const service = await this.prismaService.service.delete({
      where: {
        id : parseInt(id)
      },
      include: {
        Owner: {
          include: {
            User: true
          }
        }
      }
    })

    return service
  }

  static async getAllLsp() {
    const lsp = await this.prismaService.user.findMany({
      where : {
        Owner : {
          isNot : null
        }
      }
    })

    return exclude(lsp, "password")
  }
  
  static async getLsp(id) {
    console.log(id)
    const lsp = await this.prismaService.service.findMany({
      where : {
        Owner : {
          userId : id
        }
      }
    })

    return exclude(lsp, "password")
  }
}

export default serviceService

