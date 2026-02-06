package commandInterpreter.ast_tree;

import commandInterpreter.exceptions.CommandExecutorException;
import structures.Matrix;
import structures.exceptions.NoSolutionException;

import java.util.Arrays;

public class SolveFuncNode implements AstNode {
    public AstNode argument;

    public SolveFuncNode(AstNode arg) {
        this.argument = arg;
    }

    @Override
    public String execute() {
        var returnValue = argument.execute();

        if (returnValue instanceof Matrix matrix) {
            try {
                return Arrays.deepToString(matrix.linearSolve());
            } catch (NoSolutionException e) {
                throw new RuntimeException("No solution found for the given matrix");
            }
        }
        throw new CommandExecutorException("Your argument is not a matrix");
    }
}