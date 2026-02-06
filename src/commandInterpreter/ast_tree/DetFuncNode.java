package commandInterpreter.ast_tree;

import commandInterpreter.exceptions.CommandExecutorException;
import structures.Matrix;

public class DetFuncNode implements AstNode {
    public AstNode argument;

    public DetFuncNode(AstNode arg) {
        this.argument = arg;
    }

    @Override
    public Object execute() {
        var returnValue = argument.execute();

        if(returnValue instanceof Matrix matrix) {
            double val = matrix.laplaceExpansion();
            return  "" + val;
        }
        throw new CommandExecutorException("Your argument is not a matrix");
    }
}
