import { Operator, Question } from "./question.ts";

const MAX_RETRY = 20;

export function makeQuestion(
  lhs: number | null,
  rhs: number | null,
  operator: Operator | null,
  questions: Question[],
): Question {
  let newQuestion: Question = null!;
  let numRetries = 0;
  while (numRetries < MAX_RETRY) {
    if (!operator) {
      operator = Math.random() > 0.5 ? Operator.ADD : Operator.SUB;
    }

    if (!lhs) {
      switch (operator) {
        case Operator.ADD:
          lhs = getRandomInt(1, 10);
          break;
        case Operator.SUB:
          lhs = getRandomInt(11, 19);
          break;
        default:
          throw new Error("Invalid operator type.");
      }
    }

    if (!rhs) {
      switch (operator) {
        case Operator.ADD:
          rhs = getRandomInt(10 - lhs % 10, 10);
          break;
        case Operator.SUB:
          rhs = getRandomInt(lhs - 9, 10);
          break;
        default:
          throw new Error("Invalid operator type.");
      }
    }

    let answer: number;
    switch (operator) {
      case Operator.ADD:
        answer = lhs + rhs;
        break;
      case Operator.SUB:
        answer = lhs - rhs;
        break;
      default:
        throw new Error("Invalid operator type.");
    }

    newQuestion = new Question(lhs, rhs, operator, answer);
    if (!questions.some((q) => q.isEqual(newQuestion))) {
      return newQuestion;
    }
    lhs = null;
    rhs = null;
    operator = null;
    numRetries++;
  }
  console.log("Failed to generate a unique question.");
  return newQuestion;
}

/// Returns a random integer between min (inclusive) and max (exclusive).
function getRandomInt(min: number, max: number): number {
  const minCeiled = Math.ceil(min);
  const maxFloored = Math.floor(max);
  return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled); // 上限は除き、下限は含む
}
