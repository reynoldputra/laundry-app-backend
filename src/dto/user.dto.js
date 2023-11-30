import { z } from "zod";

export const createUserDto = z.object({
  body: z.object({
    name: z.string(),
    email: z.string(),
    password: z.string(),
  })
})

export const loginDto = z.object({
  body: z.object({
    email: z.string(),
    password: z.string()
  })
})

export const updateUserDto = z.object({
  params: z.object({
    id: z.union([z.string(), z.number()])
  }),
  body: z.object({
    name: z.string().optional(),
    address: z.string().optional(),
    lat: z.number().optional(),
    long: z.number().optional(),
  })
})
