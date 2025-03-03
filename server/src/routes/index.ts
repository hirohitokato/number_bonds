/**
 * すべてのルーティングを集約して、/api/ 配下に紐づける
 */
import { Hono } from "hono";
import makeCherrySheetRouter from "./makeCherrySheetRouter.routes.ts";

export function registerRoutes(app: Hono) {
  app.route("/cherry", makeCherrySheetRouter);
}
