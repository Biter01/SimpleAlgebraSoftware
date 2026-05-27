package commandInterpreter.ast;

import commandInterpreter.Context;
import commandInterpreter.ast.values.Value;

public class StatementRoot implements AstNode {

    AstNode node;

    public StatementRoot(AstNode node) {
        this.node = node;
    }

    @Override
    public Value execute(Context ctx) {
        return node.execute(ctx);
    }

}
