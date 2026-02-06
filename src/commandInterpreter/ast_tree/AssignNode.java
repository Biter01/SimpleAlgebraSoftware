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
    public Object execute() {
        Context.getInstance().set(this.name, this.value);
        return value.execute();
    }

}
