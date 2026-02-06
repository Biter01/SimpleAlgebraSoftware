package commandInterpreter.ast_tree;

import commandInterpreter.exceptions.CommandExecutorException;
import commandInterpreter.tokens.TokenType;
import structures.Matrix;

public class BinaryExpressionNode implements AstNode {
    AstNode left, right;
    TokenType op;

    public BinaryExpressionNode(AstNode left, TokenType op, AstNode right) {
        this.left = left;
        this.op = op;
        this.right = right;
    }

    @Override
    public Object execute() {
        var operand1 = left.execute();
        var operand2 = right.execute();


        return switch (op) {
            case PLUS -> plus(operand1, operand2);
            case MULT -> mult(operand1, operand2);
            //case DIV -> div();
            default -> throw new RuntimeException();
        };
    }

    public Object plus(Object operand1, Object operand2) {
        if(operand1 instanceof Matrix matrix1 && operand2 instanceof Matrix matrix2) {
            return matrix1.addMAtrix(matrix2);
        } else if(operand1 instanceof Double double1 && operand2 instanceof Double double2) {
            return double1 + double2;
        }

        throw new CommandExecutorException("Cannot perform Addition with given operands");
    }

    public Object mult(Object operand1, Object operand2) {
        if(operand1 instanceof Matrix matrix1 && operand2 instanceof Matrix matrix2) {
            return matrix1.multiplyMatrix(matrix2);
        } else if(operand1 instanceof Double double1 && operand2 instanceof Double double2) {
            return double1 * double2;
        }

        throw new CommandExecutorException("Cannot perform Addition with given operands");
    }

}
