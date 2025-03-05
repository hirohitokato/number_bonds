import { Context, Hono } from "hono";
import { makeCherrySheet } from "../services/makeCherrySheet.ts";
import { makeQuestion } from "../services/makeQuestion.ts";
import { Question } from "../services/question.ts";

const router = new Hono();

router.get(
  "/",
  (c: Context) => {
    let { num_sheets } = c.req.query() as { num_sheets?: number };
    num_sheets = num_sheets || 1;

    // 10問単位で作成する
    const questions: Question[] = [];
    for (let i = 0; i < num_sheets * 10; i++) {
      questions.push(makeQuestion(null, null, null, questions));
    }

    // HTMLを生成
    const content = makeCherrySheet(questions);
    return c.html(content);
  },
);

export default router;
