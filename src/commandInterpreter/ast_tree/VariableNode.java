package commandInterpreter.ast_tree;

import commandInterpreter.Context;

public class VariableNode implements AstNode {
    public String identifier;

    public VariableNode(String name) {
        this.identifier = name;
    }

    @Override
    public Object execute(Context ctx) {
        return ctx.lookup(identifier);
    }

}
