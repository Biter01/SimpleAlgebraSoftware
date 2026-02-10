package commandInterpreter.ast_tree;

import commandInterpreter.Context;
import commandInterpreter.exceptions.unchecked.CommandExecutorException;
import commandInterpreter.tokens.TokenType;
import math_lib.Matrix;
import math_lib.exceptions.MatrixArgumentException;

public class BinaryExpressionNode implements AstNode {
    AstNode left, right;
    TokenType op;

    public BinaryExpressionNode(AstNode left, TokenType op, AstNode right) {
        this.left = left;
        this.op = op;
        this.right = right;
    }

    @Override
    public Object execute(Context ctx) {
        var operand1 = left.execute(ctx);
        var operand2 = right.execute(ctx);

        return switch (op) {
            case PLUS -> plus(operand1, operand2);
            case MULT -> mult(operand1, operand2);
            case DIV -> div(operand1, operand2);
            case MINUS -> minus(operand1, operand2);
            default -> throw new RuntimeException();
        };
    }

    public Object plus(Object operand1, Object operand2) {
        if(operand1 instanceof Matrix matrix1 && operand2 instanceof Matrix matrix2) {
            try {
                return matrix1.addMAtrix(matrix2);
            } catch (MatrixArgumentException e) {
                throw new CommandExecutorException(e.getMessage());
            }

        } else if(operand1 instanceof Double double1 && operand2 instanceof Double double2) {
            return double1 + double2;
        }

        throw new CommandExecutorException("Cannot perform Addition with given operands");
    }

    public Object mult(Object operand1, Object operand2) {
        if(operand1 instanceof Matrix matrix1 && operand2 instanceof Matrix matrix2) {
            try {
                return matrix1.multiplyMatrix(matrix2);
            } catch (MatrixArgumentException e) {
                throw new CommandExecutorException(e.getMessage());
            }

        } else if(operand1 instanceof Double double1 && operand2 instanceof Double double2) {
            return double1 * double2;
        }

        throw new CommandExecutorException("Cannot perform Multiplication with given operands");
    }

    public Object minus(Object operand1, Object operand2) {
        if(operand1 instanceof Matrix matrix1 && operand2 instanceof Matrix matrix2) {
            try {
                return matrix1.subtractMatrix(matrix2);
            } catch (MatrixArgumentException e) {
                throw new CommandExecutorException("You cannot perform Substraction with given Matrices");
            }
        } else if(operand1 instanceof Double double1 && operand2 instanceof Double double2) {
            return double1 - double2;
        }

        throw new CommandExecutorException("Cannot perform Minus with given operands");
    }

    public Object div(Object operand1, Object operand2) {
        if(operand1 instanceof Double double1 && operand2 instanceof Double doubl2) {
            return double1/ doubl2;
        }

        throw new CommandExecutorException("Cannot perform Division with given operands");
    }
}