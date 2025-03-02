import { Context, Hono } from "hono";
import { makeCherrySheet } from "../services/makeCherrySheet.ts";

const router = new Hono();

router.get(
  "/",
  (c: Context) => {
    const { num_questions } = c.req.query() as { num_questions?: number };
    return c.json({});
  },
);

export default router;
