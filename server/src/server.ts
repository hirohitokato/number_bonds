import { Hono } from "hono";
import { compress } from "hono/compress";
//import { load } from "mod";
import { registerRoutes } from "./routes/index.ts";
import { serveStatic } from "https://deno.land/x/hono/middleware.ts";

// Honoアプリを生成
const app = new Hono({ strict: true });
app.use(compress());

// deno deploy環境とローカル(server/下のワークスペース)との、どちらかを見極める
const isRepositoryRootDir = (await queryDirEntries(".")).includes(".gitignore");
const staticRoot = isRepositoryRootDir ? "server/src/." : ".";

// ルーティングを登録
registerRoutes(app);
app.get("/static/*", serveStatic({ root: staticRoot }));

Deno.serve(app.fetch);

async function queryDirEntries(dirPath: string): Promise<string[]> {
  const entries: string[] = [];
  for await (const entry of Deno.readDir(dirPath)) {
    entries.push(entry.name);
  }
  return entries;
}
