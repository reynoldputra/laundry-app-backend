import { PrismaClient } from "@prisma/client";
import { Router } from "express";

const userRouter = new Router()
const prisma = new PrismaClient()

userRouter.post('/', async (req, res) => {
    const { name, email } = req.body;
    const user = await prisma.user.create({ 
        data: {
            name: String(name),
            email: String(email),
            status: "active"
        }
    });
    res.json({ message: "success", data: user });
});

userRouter.get('/:id', async (req, res) => {
    const { id } = req.params;
    const user = await prisma.user.findUnique({
        where: {
            id: Number(id)
        }
    });
    res.json({ message: "success", data: user });
});

userRouter.get('/', async (req, res) => {
    const users = await prisma.user.findMany();
    res.json({ message: "success", data: users });
});

userRouter.patch('/:id', async (req, res) => {
    const { id } = req.params;
    const { name, email } = req.body;
    const user = await prisma.user.update({
        where: {
            id: Number(id)
        },
        data: {
            name: String(name),
            email: String(email)
        }
    });
    res.json({ message: "success", data: user });
});

userRouter.delete('/:id', async (req, res) => {
    const { id } = req.params;
    const user = await prisma.user.delete({
        where: {
            id: Number(id)
        }
    });
    res.json({ message: "success" });
});


export default userRouter
