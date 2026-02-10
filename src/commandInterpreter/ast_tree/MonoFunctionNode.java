package commandInterpreter.ast_tree;

import commandInterpreter.Context;
import commandInterpreter.exceptions.unchecked.CommandExecutorException;
import math_lib.LinearExpression;
import math_lib.Matrix;
import math_lib.exceptions.DeterminantException;
import math_lib.exceptions.NoSolutionException;

import java.util.Arrays;

public class MonoFunctionNode implements AstNode {

    AstNode argument;
    FunctionType functionType;

    public MonoFunctionNode(FunctionType functionType, AstNode argument) {
        this.functionType = functionType;
        this.argument = argument;
    }

    @Override
    public Object execute(Context ctx) {
        return switch (functionType) {
            case SOLVE -> executeSolve(ctx);
            case DETERMINANT -> executeDeterminant(ctx);
            case GAUSS -> executeGauss(ctx);
        };
    }

    private Matrix executeGauss(Context ctx) {
        var returnValue = argument.execute(ctx);

        if(returnValue instanceof Matrix matrix) {
            return matrix.gaussElimination();
        }
        throw new CommandExecutorException("Your argument is not a matrix");
    }

    private String executeSolve(Context ctx) {
        var returnValue = argument.execute(ctx);

        if (returnValue instanceof Matrix matrix) {
            try {
                return Arrays.toString(matrix.linearSolve());
            } catch (NoSolutionException e) {
                throw new CommandExecutorException("There is no solution for the linear system");
            }
        }
        throw new CommandExecutorException("Your argument is not a matrix");
    }

    private String executeDeterminant(Context ctx) {
        var returnValue = argument.execute(ctx);

        if(returnValue instanceof Matrix matrix) {
            try {
                double val = matrix.laplaceExpansion();
                return  "" + val;
            } catch (DeterminantException e) {
                throw new CommandExecutorException("Determinant can only be calculated for square matrices");
            }
        }
        throw new CommandExecutorException("Your argument is not a matrix");
    }
}
