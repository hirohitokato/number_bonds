import {
  assertEquals,
  assertExists,
  assertNotEquals,
} from "https://deno.land/std@0.190.0/testing/asserts.ts";
import { makeQuestion } from "../services/makeQuestion.ts";
import { Operator } from "../services/question.ts";

Deno.test("makeQuestion() returns a question object", () => {
  const question = makeQuestion(null, null);
  assertExists(question.lhs);
  assertExists(question.rhs);
  assertExists(question.operator);
  assertExists(question.answer);
  assertNotEquals(question.operator, Operator.RANDOM);
  assertNotEquals(question.answer, null);
  assertEquals(typeof question.lhs, "number");
  assertEquals(typeof question.rhs, "number");
  assertEquals(typeof question.answer, "number");
});

Deno.test("makeQuestion() returns a question object with the given operator(add)", () => {
  const question = makeQuestion(12, 8, Operator.ADD);
  assertEquals(question.operator, Operator.ADD);
  assertEquals(question.lhs, 12);
  assertEquals(question.rhs, 8);
  assertEquals(question.answer, 20);
});

Deno.test("makeQuestion() returns a question object with the given operator(sub)", () => {
  const question = makeQuestion(12, 8, Operator.SUB);
  assertEquals(question.operator, Operator.SUB);
  assertEquals(question.lhs, 12);
  assertEquals(question.rhs, 8);
  assertEquals(question.answer, 4);
});
