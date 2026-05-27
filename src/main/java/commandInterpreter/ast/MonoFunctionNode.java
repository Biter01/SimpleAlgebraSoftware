package commandInterpreter.ast;

import commandInterpreter.Context;
import commandInterpreter.ast.values.MatrixValue;
import commandInterpreter.ast.values.NumberValue;
import commandInterpreter.ast.values.SolutionValue;
import commandInterpreter.ast.values.Value;
import commandInterpreter.exceptions.unchecked.CommandExecutorException;
import mathlib.Matrix;
import mathlib.exceptions.DeterminantException;
import mathlib.exceptions.NoSolutionException;

public class MonoFunctionNode implements AstNode {

    private final AstNode argument;
    private final FunctionType functionType;

    public MonoFunctionNode(FunctionType functionType, AstNode argument) {
        this.functionType = functionType;
        this.argument = argument;
    }

    @Override
    public Value execute(Context ctx) {
        return switch (functionType) {
            case SOLVE       -> executeSolve(ctx);
            case DETERMINANT -> executeDeterminant(ctx);
            case GAUSS       -> executeGauss(ctx);
        };
    }

    private Value executeGauss(Context ctx) {
        Matrix matrix = requireMatrix(argument.execute(ctx));
        return new MatrixValue(matrix.gaussElimination());
    }

    private Value executeSolve(Context ctx) {
        Matrix matrix = requireMatrix(argument.execute(ctx));
        try {
            return new SolutionValue(matrix.linearSolve());
        } catch (NoSolutionException e) {
            throw new CommandExecutorException("There is no solution for the linear system");
        }
    }

    private Value executeDeterminant(Context ctx) {
        Matrix matrix = requireMatrix(argument.execute(ctx));
        try {
            return new NumberValue(matrix.laplaceExpansion());
        } catch (DeterminantException e) {
            throw new CommandExecutorException("Determinant can only be calculated for square matrices");
        }
    }

    private static Matrix requireMatrix(Value v) {
        if (v instanceof MatrixValue(var matrix)) {
            return matrix;
        }
        throw new CommandExecutorException("Argument is not a matrix");
    }
}