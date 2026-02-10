package commandInterpreter.ast_tree;

import commandInterpreter.Context;

public class StatementRoot implements AstNode {

    AstNode node;

    public StatementRoot(AstNode node) {
        this.node = node;
    }

    @Override
    public Object execute(Context ctx) {
        return node.execute(ctx);
    }

}
