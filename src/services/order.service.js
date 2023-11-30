import createHttpError from "http-errors";
import { exclude } from "../helpers/prisma.helper.js";
import { OrderStatus, UserRole } from "@prisma/client";
import { PrismaService } from "../database/prisma.service.js";

class orderService {
  static prismaService = new PrismaService();

  static async createOrder(data, userId) {
    data.status = OrderStatus.PICKUP
    data.serviceId = parseInt(data.serviceId)
    data.laundryIn = (new Date()).toISOString()

    console.log(userId)

    const customer = await this.prismaService.customer.findFirst({
      where: {
        userId
      }
    })

    if (!customer) throw createHttpError.BadRequest("Customer not found")

    data.customerId = customer.id

    const service = await this.prismaService.service.findFirst({
      where: {
        id: data.serviceId
      }
    })
    if (!service) throw createHttpError.BadRequest("Service not found")

    const order = this.prismaService.order.create({
      data
    })

    return order
  }

  static async getAllOrder(userid) {
    console.log(userid)
    const user = await this.prismaService.user.findFirst({
      where: {
        id: userid
      },
      include: {
        Owner: true,
        Customer: true
      }
    })

    let orders

    if (user.role == UserRole.OWNER) {
      orders = await this.prismaService.order.findMany({
        where: {
          Service: {
            ownerId: user.Owner.id
          }
        },
        include: {
          Service: {
            include: {
              Owner: {
                include: {
                  User: true
                }
              }
            }
          }
        }
      })
    } else {
      orders = await this.prismaService.order.findMany({
        where: {
          customerId: user.Customer.id
        },
        include: {
          Service: {
            include: {
              Owner: {
                include: {
                  User: true
                }
              }
            }
          }
        }
      })
    }

    return exclude(orders, ['password'])
  }

  static async getOrder(id) {
    const order = await this.prismaService.order.findMany({
      where: {
        id
      },
      include: {
        Service: {
          include: {
            Owner: {
              include: {
                User: true
              }
            }
          }
        }
      }
    })

    return exclude(order, ['password'])
  }

  static async updateOrder(id, data) {
    const order = await this.prismaService.order.update({
      where: {
        id: id
      },
      data,
      include: {
        Service: {
          include: {
            Owner: {
              include: {
                User: true
              }
            }
          }
        }
      }
    })

    return exclude(order, ['password'])
  }

  static async deleteService(id) {
    const order = await this.prismaService.order.delete({
      where: {
        id: id
      },
      include: {
        Service: {
          include: {
            Owner: {
              include: {
                User: true
              }
            }
          }
        }
      }
    })

    return exclude(order, ['password'])
  }
}

export default orderService


