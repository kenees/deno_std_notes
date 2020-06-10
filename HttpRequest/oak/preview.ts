import { Application } from 'https://deno.land/x/oak/mod.ts';

const app = new Application();

// example 1
// app.use((ctx : any) => {
//   ctx.response.body = 'hello11 world';
// });

// await app.listen({ port: 8080 });

// run 
// deno run --allow-net index.ts

// expmale 2
// 使用多个中间件
// Logger
app.use(async (ctx, next) => {
  await next();
  const rt = ctx.response.headers.get('X-Response-Time');
  console.log(`${ctx.request.method} ${ctx.request.url} - ${rt}`);
  ctx.response.body = 'hello world!'+ ctx.request.url;
});

// Timing
app.use(async (ctx, next) => {
  const start = Date.now();
  await next();
  const ms = Date.now() - start;
  ctx.response.headers.set('X-Response-Time', `${ms}ms`);
});

await app.listen({ hostname: '0.0.0.0', port: 8080 });