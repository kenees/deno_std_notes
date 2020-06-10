import { Application } from 'https://deno.land/x/oak/mod.ts';
import { APP_HOST, APP_PORT } from './config.ts';
import router from './routing.ts';

const app = new Application();

app.use(router.routes())
app.use(router.allowedMethods())


console.log(`listening on ${APP_PORT}...`)

await app.listen(`${APP_HOST}:${APP_PORT}`);