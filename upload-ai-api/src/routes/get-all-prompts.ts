import { FastifyInstance } from "fastify";
import { prisma } from "../lib/prisma";


export async function getAllPromptsRouter(app: FastifyInstance) {
    app.get("/prompts", async () => {
        const prompsts = await prisma.prompt.findMany({})
        return prompsts
    });
} 