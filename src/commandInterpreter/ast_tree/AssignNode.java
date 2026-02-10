package commandInterpreter.ast_tree;

import commandInterpreter.Context;

public class AssignNode implements AstNode {

    String name;
    AstNode value;

    public AssignNode(String name, AstNode value) {
        this.name = name;
        this.value = value;
    }

    @Override
    public Object execute(Context ctx) {
        Object excutedValue = this.value.execute(ctx);
        ctx.set(this.name, excutedValue);
        return excutedValue;
    }

}
