import { Operator, Question } from "./question.ts";

export function makeQuestion(
  lhs: number | null,
  rhs: number | null,
  operator: Operator = Operator.RANDOM,
): Question {
  if (operator === Operator.RANDOM) {
    operator = Math.random() > 0.5 ? Operator.ADD : Operator.SUB;
  }
  if (!lhs) {
    lhs = getRandomInt(1, 9);
  }

  if (!rhs) {
    rhs = getRandomInt(10 - lhs % 10, 9);
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

  return {
    lhs,
    rhs,
    operator,
    answer,
  };
}

/// Returns a random integer between min (inclusive) and max (exclusive).
function getRandomInt(min: number, max: number): number {
  const minCeiled = Math.ceil(min);
  const maxFloored = Math.floor(max);
  return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled); // 上限は除き、下限は含む
}
