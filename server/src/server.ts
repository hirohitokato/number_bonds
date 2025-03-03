import { Hono } from "hono";
import { compress } from "hono/compress";
import { load } from "mod";
import { registerRoutes } from "./routes/index.ts";
import { serveStatic } from "https://deno.land/x/hono/middleware.ts";
import process from "node:process";

// Honoアプリを生成
const app = new Hono({ strict: true });
app.use(compress());

// ルーティングを登録
console.log("current dir: " + process.cwd());
registerRoutes(app);
app.get("/static/*", serveStatic({ root: "./" }));

Deno.serve(app.fetch);
