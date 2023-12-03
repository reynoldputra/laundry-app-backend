import { z } from "zod";
import { ServiceType, OrderStatus } from "@prisma/client";
import { NumberOrStringAsNumberSchema } from "./dto.js";

const ServiceTypeSchema = z.enum([
  ServiceType.CUCI_BASAH,
  ServiceType.CUCI_KERING,
  ServiceType.CUCI_SETRIKA,
]);

export const createServiceDto = z.object({
  body: z.object({
    ownerId: z.string(),
    price: z.number().positive(),
    type: ServiceTypeSchema,
  })
})

export const getServicedto = z.object({
  params: z.object({
    id: NumberOrStringAsNumberSchema
  }),
})

export const getLspDto = z.object({
  params: z.object({
    id: z.string()
  }),
})

export const deleteServiceDto = z.object({
  params: z.object({
    id: NumberOrStringAsNumberSchema
  }),
})

export const updateServiceDto = z.object({
  params: z.object({
    id: NumberOrStringAsNumberSchema
  }),
  body: z.object({
    ownerId: z.string().optional(),
    price: z.number().positive().optional(),
    type: ServiceTypeSchema.optional(),
  })
})
