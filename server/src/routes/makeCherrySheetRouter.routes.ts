import { Context, Hono } from "hono";
import { makeCherrySheet } from "../services/makeCherrySheet.ts";

const router = new Hono();

router.get(
  "/",
  (c: Context) => {
    let { num_sheets } = c.req.query() as { num_sheets?: number };
    num_sheets = num_sheets || 1;
    // 10問単位で作成する
    const content = makeCherrySheet(num_sheets * 10);
    return c.html(content);
  },
);

export default router;
