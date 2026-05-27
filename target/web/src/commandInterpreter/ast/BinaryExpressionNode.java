package commandInterpreter.ast;

import commandInterpreter.Context;
import commandInterpreter.ast.values.MatrixValue;
import commandInterpreter.ast.values.NumberValue;
import commandInterpreter.ast.values.Value;
import commandInterpreter.exceptions.unchecked.CommandExecutorException;
import commandInterpreter.tokens.TokenType;
import mathlib.exceptions.MatrixArgumentException;

public class BinaryExpressionNode implements AstNode {
    private final AstNode left, right;
    private final TokenType op;

    public BinaryExpressionNode(AstNode left, TokenType op, AstNode right) {
        this.left = left;
        this.op = op;
        this.right = right;
    }

    @Override
    public Value execute(Context ctx) {
        Value operand1 = left.execute(ctx);
        Value operand2 = right.execute(ctx);

        return switch (op) {
            case PLUS  -> plus(operand1, operand2);
            case MULT  -> mult(operand1, operand2);
            case DIV   -> div(operand1, operand2);
            case MINUS -> minus(operand1, operand2);
            default    -> throw new CommandExecutorException("Unsupported operator: " + op);
        };
    }

    private Value plus(Value a, Value b) {
        if (a instanceof MatrixValue(var m1) && b instanceof MatrixValue(var m2)) {
            try {
                return new MatrixValue(m1.addMAtrix(m2));
            } catch (MatrixArgumentException e) {
                throw new CommandExecutorException(e.getMessage());
            }
        }
        if (a instanceof NumberValue(double x) && b instanceof NumberValue(double y)) {
            return new NumberValue(x + y);
        }
        throw new CommandExecutorException("Cannot perform Addition with given operands");
    }

    private Value mult(Value a, Value b) {
        if (a instanceof MatrixValue(var m1) && b instanceof MatrixValue(var m2)) {
            try {
                return new MatrixValue(m1.multiplyMatrix(m2));
            } catch (MatrixArgumentException e) {
                throw new CommandExecutorException(e.getMessage());
            }
        }
        if (a instanceof NumberValue(double x) && b instanceof NumberValue(double y)) {
            return new NumberValue(x * y);
        }
        throw new CommandExecutorException("Cannot perform Multiplication with given operands");
    }

    private Value minus(Value a, Value b) {
        if (a instanceof MatrixValue(var m1) && b instanceof MatrixValue(var m2)) {
            try {
                return new MatrixValue(m1.subtractMatrix(m2));
            } catch (MatrixArgumentException e) {
                throw new CommandExecutorException(e.getMessage());
            }
        }
        if (a instanceof NumberValue(double x) && b instanceof NumberValue(double y)) {
            return new NumberValue(x - y);
        }
        throw new CommandExecutorException("Cannot perform Subtraction with given operands");
    }

    private Value div(Value a, Value b) {
        if (a instanceof NumberValue(double x) && b instanceof NumberValue(double y)) {
            if (y == 0.0) {
                throw new CommandExecutorException("Division by zero");
            }
            return new NumberValue(x / y);
        }
        throw new CommandExecutorException("Cannot perform Division with given operands");
    }
}