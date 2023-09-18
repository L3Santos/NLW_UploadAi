import {fastify} from "fastify";
import { getAllPromptsRouter } from "./routes/get-all-prompts";
import { uploadVideoRoute } from "./routes/upload-video";
import { createTranscriptionRoute } from "./routes/create-transcription";
import { generateAICompletionRoute } from "./routes/generate-ia-completion";
// import { fastifyCors } from '@fastity/fastifyCors';

const app = fastify();

// app.register(fastifyCors, {
//     origin: "*"
// })

app.register(getAllPromptsRouter);
app.register(uploadVideoRoute);
app.register(createTranscriptionRoute);
app.register(generateAICompletionRoute);


app.listen({
    port:3333,
}).then(() => {
    console.log("HTTP Server Running!")
})