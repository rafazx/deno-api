import { Application } from "https://deno.land/x/oak/mod.ts";
import "https://deno.land/x/dotenv/load.ts";

import route from './routes/index.routes.ts';

const app = new Application();


const port = parseInt(Deno.env.get('PORT') || '')

app.use(route.routes());
app.use(route.allowedMethods());

console.log(`Server running on port:${port}`)
await app.listen({ port });