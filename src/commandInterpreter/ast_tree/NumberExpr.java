package commandInterpreter.ast_tree;

import commandInterpreter.Context;

public class NumberExpr implements AstNode {

    public Double value;

    public NumberExpr(Double value) {
        this.value = value;
    }

    @Override
    public Double execute(Context ctx) {
        return value;
    }
}
