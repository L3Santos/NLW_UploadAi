import { FastifyInstance } from "fastify";
import { fastifyMultipart } from "@fastify/multipart";
import { prisma } from "../lib/prisma";

import { randomUUID } from "node:crypto";
import { pipeline } from "node:stream";
import { extname } from 'path';
import { promisify } from "node:util";

import  fs  from 'node:fs';
import path from "node:path"


const pump = promisify(pipeline)

export async function uploadVideoRoute(app: FastifyInstance) {
    app.register(fastifyMultipart, {
        limits: {
            fileSize: 1_048_576 * 100, //100mb
        }
    })

    app.post("/videos", async (request, reply) => {
        const data = await request.file()

        if(!data) {
            return reply.status(400).send({error: "Missing file input"})
        }

        const extension = path.extname(data.filename)

        if(extension !== '.mp3') {
            return reply.status(400).send({error: "Invalid input type, plasse upload a MP3."})
        }
        
        const fileBaseName = path.basename(data.filename, extension);
        const fileUploadName = `${fileBaseName}-${randomUUID()}-${extension}`
        const uploadDescription = path.resolve(__dirname, "../../tmp", fileUploadName);

        await pump(data.file, fs.createWriteStream(uploadDescription));

        const video = await prisma.video.create({
            data:{
                name: data.filename,
                path: uploadDescription,
            }
        })
        return {
            video,
        };
    });
} 