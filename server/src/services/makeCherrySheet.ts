import { Operator, Question } from "./question.ts";
import { makeQuestion } from "./makeQuestion.ts";

const MAX_QUESTIONS_PER_PAGE = 10;

const HTML_BODY = `<!DOCTYPE html><html lang="ja">
<head>
    <meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>サクランボ計算</title>
    <link rel="stylesheet" type="text/css" href="/static/style/cherrySheet.css"/>
</head>
<body>PLACEHOLDER</body>
</html>`;

const SHEET_HEADER = `
<div class="sheet">
    <div class="header">
      <div class="title">さくらんぼけいさん</div>
      <div class="name">なまえ：</div>
    </div>
    <div class="grid">
`;
const SHEET_FOOTER =
  `</div><div class="footer"><div>- PLACEHOLDER -</div></div></div>`;

const QUESTION = `<div class="question">
<svg viewBox="0 0 200 75">
  <text x="5" y="7" fill="black" text-anchor="left" font-size="9" alignment-baseline="central">PLACEHOLDER-01)</text>
  <text x="35" y="20" fill="black" text-anchor="middle" font-size="24" alignment-baseline="central">PLACEHOLDER-02</text>
  <text x="65" y="20" fill="black" text-anchor="middle" font-size="24" alignment-baseline="central">PLACEHOLDER-03</text>
  <text x="95" y="20" fill="black" text-anchor="middle" font-size="24" alignment-baseline="central">PLACEHOLDER-04</text>
  <text x="125" y="20" fill="black" text-anchor="middle" font-size="24" alignment-baseline="central">=</text>
  <path d="M 75 55 L 90 35" stroke="gray" stroke-width="1" fill="none" />
  <path d="M 100 35 L 115 55" stroke="gray" stroke-width="1" fill="none" />
  <circle cx="75" cy="57" r="15" stroke="gray" stroke-width="1" fill="white" />
  <circle cx="115" cy="57" r="15" stroke="gray" stroke-width="1" fill="white" />
  <rect x="150" y="3" width="34" height="34" stroke="gray" stroke-width="1" fill="white" />
  <!-- 全体の枠（見やすさのため） -->
</svg></div>`;

export function makeCherrySheet(num_questions: number): string {
  const questions: Question[] = [];
  for (let i = 0; i < num_questions; i++) {
    questions.push(makeQuestion(null, null, null, questions));
  }
  console.warn("HOME");
  console.warn(Deno.env.get("HOME"));
  console.warn("CWD");
  console.warn(Deno.env.get("CWD"));
  console.error("current dir: ");
  console.error(Deno.cwd());
  // Calculate the total number of pages required
  const num_pages = Math.ceil(num_questions / MAX_QUESTIONS_PER_PAGE);
  let question_divs = "";
  for (let page = 0; page < num_pages; page++) {
    question_divs += SHEET_HEADER;
    for (
      let qIndex = 0;
      qIndex <
        Math.min(
          questions.length - page * MAX_QUESTIONS_PER_PAGE,
          MAX_QUESTIONS_PER_PAGE,
        );
      qIndex++
    ) {
      const index = qIndex + page * MAX_QUESTIONS_PER_PAGE;
      const question = questions[index];
      const operator = question.operator === Operator.ADD ? "+" : "−";
      question_divs += QUESTION
        .replace("PLACEHOLDER-01", `${index + 1}`)
        .replace("PLACEHOLDER-02", `${question.lhs}`)
        .replace("PLACEHOLDER-03", `${operator}`)
        .replace("PLACEHOLDER-04", `${question.rhs}`);
    }
    question_divs += SHEET_FOOTER.replace(
      "PLACEHOLDER",
      `${page + 1} / ${num_pages}`,
    );
  }

  const content = HTML_BODY.replace("PLACEHOLDER", `${question_divs}`);

  return content;
}
