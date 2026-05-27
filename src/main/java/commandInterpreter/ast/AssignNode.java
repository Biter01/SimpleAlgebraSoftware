package commandInterpreter.ast;

import commandInterpreter.Context;
import commandInterpreter.ast.values.Value;

public class AssignNode implements AstNode {

    String name;
    AstNode value;

    public AssignNode(String name, AstNode value) {
        this.name = name;
        this.value = value;
    }

    @Override
    public Value execute(Context ctx) {
        Value excutedValue = this.value.execute(ctx);
        ctx.set(this.name, excutedValue);
        return excutedValue;
    }

}
