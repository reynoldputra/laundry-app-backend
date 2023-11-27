import { z } from "zod";

export const createUserDto = z.object({
  body: z.object({
    name: z.string(),
    email: z.string()
  })
})

export const updateUserDto = z.object({
  body: z.object({
    name: z.string(),
    email: z.string()
  }),
  params: z.object({
    id: z.string()
  })
})

export const getUserDto = z.object({
  params: z.object({
    id: z.any()
  })
})
