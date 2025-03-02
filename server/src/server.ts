import { Hono } from "hono";
import { compress } from "hono/compress";
import { load } from "mod";
import { registerRoutes } from "./routes/index.ts";

// Honoアプリを生成
const app = new Hono({ strict: false });
app.use(compress());

// ルーティングを登録
registerRoutes(app);

Deno.serve(app.fetch);
