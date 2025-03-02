export enum Operator {
  ADD = "ADD",
  SUB = "SUB",
  RANDOM = "RANDOM",
}

/// A question object.
export type Question = {
  /// The left-hand side of the equation.
  lhs: number;
  /// The right-hand side of the equation
  rhs: number;
  /// The operator to be used in the equation.
  operator: Operator;
  /// The correct answer to the equation.
  answer: number;
};
