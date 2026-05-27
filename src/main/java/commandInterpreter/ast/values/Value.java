package commandInterpreter.ast.values;

public sealed interface Value permits NumberValue, MatrixValue, SolutionValue {}