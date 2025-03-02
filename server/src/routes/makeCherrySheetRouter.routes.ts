import { Context, Hono } from "hono";
import { makeCherrySheet } from "../services/makeCherrySheet.ts";

const router = new Hono();

router.get(
  "/",
  (c: Context) => {
    let { num_questions } = c.req.query() as { num_questions?: number };
    num_questions = num_questions || 5;
    const content = makeCherrySheet(num_questions);
    return c.html(content);
  },
);

export default router;
