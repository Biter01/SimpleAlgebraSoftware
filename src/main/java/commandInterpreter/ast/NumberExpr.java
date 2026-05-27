package commandInterpreter.ast;

import commandInterpreter.Context;
import commandInterpreter.ast.values.NumberValue;
import commandInterpreter.ast.values.Value;

public class NumberExpr implements AstNode {

    private final double value;

    public NumberExpr(double value) {
        this.value = value;
    }

    @Override
    public Value execute(Context ctx) {
        return new NumberValue(value);
    }
}