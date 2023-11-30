import { z } from "zod";
import { OrderStatus } from "@prisma/client";
import { DateSchema, NumberOrStringAsNumberSchema } from "./dto.js";

const OrderStatusSchema = z.enum([
  OrderStatus.PICKUP,
  OrderStatus.WASHING,
  OrderStatus.CLEANING,
  OrderStatus.DRYING,
  OrderStatus.DELIVER,
]);

export const createOrderDto = z.object({
  body: z.object({
    estimatedTime: DateSchema,
    // laundryIn: DateSchema,
    // customerId : z.string(),
    serviceId : NumberOrStringAsNumberSchema
  })
})

export const getOrderDto = z.object({
  params: z.object({
    id: z.string()
  }),
})

export const deleteOrderDto = z.object({
  params: z.object({
    id: z.string()
  }),
})

export const updateOrderDto = z.object({
  params: z.object({
    id: z.string()
  }),
  body: z.object({
    estimatedTime: DateSchema.optional(),
    laundryIn: DateSchema.optional(),
    status: OrderStatusSchema.optional(),
    // customerId : z.string().optional(),
    serviceId : NumberOrStringAsNumberSchema.optional()
  })
})
