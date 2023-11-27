import { z } from "zod";

export const createUserDto = z.object({
  body: z.object({
    name: z.string(),
    email: z.string(),
    password: z.string()
  })
})

export const loginDto = z.object({
  body: z.object({
    email: z.string(),
    password: z.string()
  })
})
