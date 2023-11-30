import { PrismaClient } from "@prisma/client";

export class PrismaService extends PrismaClient {
    static instance;

    constructor(){
        if(!PrismaService.instance){
            PrismaService.instance = new PrismaClient()
        }
        return PrismaService.instance;
    }
}

