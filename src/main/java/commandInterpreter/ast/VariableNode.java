package commandInterpreter.ast;

import commandInterpreter.Context;
import commandInterpreter.ast.values.Value;

public class VariableNode implements AstNode {
    public String identifier;

    public VariableNode(String name) {
        this.identifier = name;
    }

    @Override
    public Value execute(Context ctx) {
        return ctx.lookup(identifier);
    }

}
