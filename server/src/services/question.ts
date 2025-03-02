export enum Operator {
  ADD = "ADD",
  SUB = "SUB",
  RANDOM = "RANDOM",
}

/// A question object.
export class Question {
  /// The left-hand side of the equation.
  lhs: number;
  /// The right-hand side of the equation
  rhs: number;
  /// The operator to be used in the equation.
  operator: Operator;
  /// The correct answer to the equation.
  answer: number;

  constructor(lhs: number, rhs: number, operator: Operator, answer: number) {
    this.lhs = lhs;
    this.rhs = rhs;
    this.operator = operator;
    this.answer = answer;
  }

  isEqual(other: Question): boolean {
    return (
      this.lhs === other.lhs &&
      this.rhs === other.rhs &&
      this.operator === other.operator &&
      this.answer === other.answer
    );
  }
}
